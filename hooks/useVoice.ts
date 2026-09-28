import { useCallback, useEffect, useRef, useState } from "react";

export interface VoiceState {
  isReady: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  /** Playback progress, 0..1. */
  progress: number;
  error: string | null;
}

export interface VoiceControls {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  replay: () => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  seek: (seconds: number) => void;
}

const INITIAL: VoiceState = {
  isReady: false,
  isPlaying: false,
  isMuted: false,
  duration: 0,
  currentTime: 0,
  progress: 0,
  error: null,
};

/**
 * Headless audio-narration hook. Creates a single HTMLAudioElement for `src` and
 * exposes state + controls. Playback is always user-initiated (never autoplays).
 */
export function useVoice(
  src: string,
): VoiceState & { controls: VoiceControls } {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<VoiceState>(INITIAL);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = src;
    audioRef.current = audio;

    // Transient playback state resets once the new source reports metadata.
    // (To hard-reset a swapped source immediately, remount the consumer via `key`.)
    const onLoaded = () =>
      setState((s) => ({
        ...s,
        isReady: true,
        duration: audio.duration || 0,
        currentTime: 0,
        progress: 0,
        error: null,
      }));
    const onTime = () =>
      setState((s) => ({
        ...s,
        currentTime: audio.currentTime,
        progress: audio.duration ? audio.currentTime / audio.duration : 0,
      }));
    const onPlay = () => setState((s) => ({ ...s, isPlaying: true }));
    const onPause = () => setState((s) => ({ ...s, isPlaying: false }));
    const onEnded = () =>
      setState((s) => ({ ...s, isPlaying: false, progress: 1 }));
    const onError = () =>
      setState((s) => ({ ...s, error: "Audio unavailable", isReady: false }));

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      setState((s) => ({ ...s, error: "Playback blocked", isPlaying: false }));
    });
  }, []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else a.pause();
  }, [play]);

  const replay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    play();
  }, [play]);

  const setMuted = useCallback((muted: boolean) => {
    const a = audioRef.current;
    if (a) a.muted = muted;
    setState((s) => ({ ...s, isMuted: muted }));
  }, []);

  const mute = useCallback(() => setMuted(true), [setMuted]);
  const unmute = useCallback(() => setMuted(false), [setMuted]);
  const toggleMute = useCallback(
    () => setMuted(!(audioRef.current?.muted ?? false)),
    [setMuted],
  );

  const seek = useCallback((seconds: number) => {
    const a = audioRef.current;
    if (a) a.currentTime = seconds;
  }, []);

  return {
    ...state,
    controls: { play, pause, toggle, replay, mute, unmute, toggleMute, seek },
  };
}
