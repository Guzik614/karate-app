"use client";

import Link from "next/link";
import { useRef } from "react";
import { VideoPlayer } from "@/components/video-player";

type Props = {
  label: string; // tekst wymagania, np. „Seiken Oi Tsuki (J/C/G)”
  slug: string;
  name: string;
  playbackId: string | null;
};

// Technika z wymagań egzaminacyjnych z przyciskiem ▶, który otwiera film w okienku.
export function TechniqueVideoButton({ label, slug, name, playbackId }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="group inline-flex items-center gap-2 rounded-lg border border-border bg-input px-2.5 py-1.5 text-left text-sm transition-colors hover:border-accent"
      >
        <span
          aria-hidden
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
            playbackId ? "bg-accent text-white" : "border border-border text-muted"
          }`}
        >
          ▶
        </span>
        <span className="group-hover:text-accent-text">{label}</span>
      </button>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-0 text-foreground backdrop:bg-black/70"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h3 className="font-semibold">{name}</h3>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="rounded px-2 text-xl leading-none text-muted hover:text-foreground"
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <VideoPlayer playbackId={playbackId} title={name} />
          <Link href={`/techniki/${slug}`} className="mt-3 inline-block text-sm text-accent-text hover:underline">
            Opis techniki →
          </Link>
        </div>
      </dialog>
    </>
  );
}
