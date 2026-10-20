"use client";

import { useState } from "react";

type Status = { kind: "idle" } | { kind: "uploading"; progress: number } | { kind: "done" } | { kind: "error"; message: string };

// Wysyła plik prosto z przeglądarki do Mux (bez przechodzenia przez nasz serwer).
export function VideoUpload({ techniqueId }: { techniqueId: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onFile(file: File) {
    setStatus({ kind: "uploading", progress: 0 });
    const res = await fetch("/api/mux/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ techniqueId }),
    });
    if (!res.ok) {
      setStatus({ kind: "error", message: "Nie udało się utworzyć uploadu." });
      return;
    }
    const { url } = (await res.json()) as { url: string };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setStatus({ kind: "uploading", progress: Math.round((e.loaded / e.total) * 100) });
    };
    xhr.onload = () =>
      setStatus(xhr.status < 300 ? { kind: "done" } : { kind: "error", message: `Błąd ${xhr.status}` });
    xhr.onerror = () => setStatus({ kind: "error", message: "Błąd sieci podczas wysyłania." });
    xhr.send(file);
  }

  if (status.kind === "uploading") {
    return <span className="text-sm text-muted">Wysyłanie… {status.progress}%</span>;
  }
  if (status.kind === "done") {
    return <span className="text-sm text-green-600">Wysłano. Mux przetwarza wideo (ok. 1 min).</span>;
  }

  return (
    <label className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-sm hover:border-accent">
      {status.kind === "error" ? `${status.message} Spróbuj ponownie` : "Wgraj wideo"}
      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onFile(file);
        }}
      />
    </label>
  );
}
