import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { sortByRequirements } from "@/content/grade-requirements";
import { getGrades, getTechniques } from "@/lib/data";
import { TECHNIQUE_CATEGORY_LABELS } from "@/lib/types";
import { VideoUpload } from "./video-upload";

export default async function AdminTechniquesPage() {
  await requireAdmin();
  const [all, grades] = await Promise.all([getTechniques(), getGrades()]);
  // Od najniższego stopnia: najpierw tor seniorski i dan, potem techniki tylko z wymagań juniorskich.
  const techniques = sortByRequirements(all, [
    ...grades.filter((g) => g.track === "senior").map((g) => g.code),
    ...grades.filter((g) => g.track === "junior").map((g) => g.code),
  ]);

  return (
    <>
      <h1 className="text-2xl font-bold">Techniki i wideo</h1>
      <p className="text-sm text-muted">
        Wgraj nagranie przy technice. Po przetworzeniu przez Mux wideo pojawi się automatycznie na
        stronie techniki.
      </p>
      <ul className="divide-y divide-border rounded-xl border border-border bg-card">
        {techniques.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <Link href={`/techniki/${t.slug}`} className="font-medium hover:text-accent-text">
                {t.name}
              </Link>
              <p className="text-sm text-muted">
                {t.belt_level && `${t.belt_level} · `}
                {TECHNIQUE_CATEGORY_LABELS[t.category]} ·{" "}
                {t.mux_playback_id ? "wideo dodane" : "brak wideo"}
              </p>
            </div>
            <VideoUpload techniqueId={t.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
