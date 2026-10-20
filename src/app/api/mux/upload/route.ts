import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getMux } from "@/lib/mux";

// Tworzy jednorazowy URL do bezpośredniego uploadu pliku z przeglądarki do Mux.
// ID techniki trafia do `passthrough`, więc webhook wie, gdzie zapisać playback ID.
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (user?.role !== "admin") {
    return NextResponse.json({ error: "Brak uprawnień" }, { status: 403 });
  }

  const { techniqueId } = (await request.json()) as { techniqueId?: string };
  if (!techniqueId) {
    return NextResponse.json({ error: "Brak techniqueId" }, { status: 400 });
  }

  const upload = await getMux().video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin,
    new_asset_settings: {
      playback_policies: ["public"],
      passthrough: techniqueId,
      video_quality: "basic",
    },
  });

  return NextResponse.json({ url: upload.url, id: upload.id });
}
