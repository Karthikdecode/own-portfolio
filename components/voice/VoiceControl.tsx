"use client";

import { useVoice } from "@/hooks/useVoice";
import { VoiceBar } from "@/components/voice/VoiceBar";

interface VoiceControlProps {
  src: string;
  label?: string;
  className?: string;
}

/** Standalone narration control (owns its own audio via useVoice). */
export function VoiceControl({ src, label, className }: VoiceControlProps) {
  const { controls, ...state } = useVoice(src);
  return (
    <VoiceBar state={state} controls={controls} label={label} className={className} />
  );
}
