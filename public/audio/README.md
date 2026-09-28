# Voice narration

Place the narration audio files here. Paths are wired in `lib/constants.ts`
(`VOICE`) and used by the `useVoice` hook / `VoiceControl` component.

Expected files:

```
hero-intro.mp3     # opening / identity-card intro
about.mp3
stack.mp3
experience.mp3
projects.mp3
contact.mp3
```

Notes:

- Audio never autoplays — playback is always user-initiated.
- Keep the transcript in sync with `data/portfolio.ts` (`HERO.voice.transcript`)
  for accessibility / captions.
