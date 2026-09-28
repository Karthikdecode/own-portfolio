"use client";

import type { VoiceControls, VoiceState } from "@/hooks/useVoice";
import { cn, formatTime } from "@/lib/utils";

interface VoiceBarProps {
  state: VoiceState;
  controls: VoiceControls;
  label?: string;
  className?: string;
}

/** Presentational, touch-friendly narration control (state supplied by useVoice). */
export function VoiceBar({
  state,
  controls,
  label = "Voice intro",
  className,
}: VoiceBarProps) {
  const { isPlaying, isMuted, currentTime, duration, progress } = state;
  const percent = Math.round(progress * 100);

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/70 px-2.5 py-1.5 backdrop-blur sm:gap-3 sm:px-3",
        className,
      )}
    >
      <button
        type="button"
        onClick={controls.toggle}
        aria-label={isPlaying ? "Pause narration" : "Play narration"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-80"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="flex min-w-0 flex-col">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Narration progress"
          className="mt-1 h-px w-16 bg-border sm:w-28"
        >
          <div className="h-px bg-accent" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <span className="hidden font-mono text-[10px] tabular-nums text-muted-foreground min-[380px]:inline-block">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <button
        type="button"
        onClick={controls.toggleMute}
        aria-label={isMuted ? "Unmute narration" : "Mute narration"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
      >
        <VolumeIcon muted={isMuted} />
      </button>

      <button
        type="button"
        onClick={controls.replay}
        aria-label="Replay narration"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
      >
        <ReplayIcon />
      </button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}
function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
      {muted ? (
        <>
          <line x1="16" y1="9" x2="21" y2="14" />
          <line x1="21" y1="9" x2="16" y2="14" />
        </>
      ) : (
        <path d="M16 9a4 4 0 010 6" />
      )}
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4 12a8 8 0 108-8" />
      <path d="M4 4v5h5" />
    </svg>
  );
}
