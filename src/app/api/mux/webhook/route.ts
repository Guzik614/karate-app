import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getMux } from "@/lib/mux";
import { createServiceClient } from "@/lib/supabase/server";

// Webhook Mux (Settings → Webhooks → URL: https://<domena>/api/mux/webhook).
// Po przetworzeniu wideo zapisuje playback ID przy technice.
export async function POST(request: NextRequest) {
  const body = await request.text();

  let event;
  try {
    event = await getMux().webhooks.unwrap(body, request.headers);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowy podpis" }, { status: 400 });
  }

  if (event.type === "video.asset.ready") {
    const asset = event.data;
    const techniqueId = asset.passthrough;
    const playbackId = asset.playback_ids?.find((p) => p.policy === "public")?.id;

    if (techniqueId && playbackId) {
      const { error } = await createServiceClient()
        .from("techniques")
        .update({ mux_asset_id: asset.id, mux_playback_id: playbackId })
        .eq("id", techniqueId);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      revalidatePath("/techniki", "layout");
    }
  }

  return NextResponse.json({ received: true });
}
