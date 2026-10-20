import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoPlayer } from "@/components/video-player";
import { getTechnique } from "@/lib/data";
import { TECHNIQUE_CATEGORY_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: PageProps<"/techniki/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const technique = await getTechnique(slug);
  return { title: technique?.name ?? "Technika" };
}

export default async function TechniquePage({ params }: PageProps<"/techniki/[slug]">) {
  const { slug } = await params;
  const technique = await getTechnique(slug);
  if (!technique) notFound();

  return (
    <article className="space-y-6">
      <Link href={`/techniki?kategoria=${technique.category}`} className="text-sm text-muted hover:text-accent-text">
        ← {TECHNIQUE_CATEGORY_LABELS[technique.category]}
      </Link>
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{technique.name}</h1>
        <p className="mt-1 text-lg text-muted">
          {technique.name_jp}
          {technique.belt_level && <span className="ml-3 text-sm">· {technique.belt_level}</span>}
        </p>
      </header>
      <VideoPlayer playbackId={technique.mux_playback_id} title={technique.name} />
      {technique.description && <p className="max-w-2xl leading-relaxed">{technique.description}</p>}
    </article>
  );
}
