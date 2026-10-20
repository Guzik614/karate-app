"use client";

import MuxPlayer from "@mux/mux-player-react";

type Props = {
  playbackId: string | null;
  title: string;
};

// Odtwarzacz Mux z kontrolą prędkości, przydatną do analizy ruchu (0.25×–1×).
export function VideoPlayer({ playbackId, title }: Props) {
  if (!playbackId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-card text-sm text-muted">
        Wideo dla tej techniki nie zostało jeszcze dodane.
      </div>
    );
  }

  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      metadata={{ video_title: title }}
      playbackRates={[0.25, 0.5, 0.75, 1]}
      accentColor="#d01f32"
      className="aspect-video w-full overflow-hidden rounded-xl"
    />
  );
}
