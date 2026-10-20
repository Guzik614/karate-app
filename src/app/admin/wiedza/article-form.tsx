"use client";

import { useActionState, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Article, KnowledgeCategory } from "@/lib/types";
import { saveArticle, type ArticleFormState } from "./actions";

const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 outline-none focus:border-accent";

export function ArticleForm({
  article,
  categories,
}: {
  article?: Article;
  categories: KnowledgeCategory[];
}) {
  const [state, formAction, pending] = useActionState<ArticleFormState, FormData>(saveArticle, {});
  const [body, setBody] = useState(article?.body ?? "");
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <form action={formAction} className="space-y-4">
      {article && <input type="hidden" name="id" value={article.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1">
          <span className="text-sm font-medium">Tytuł</span>
          <input name="title" required defaultValue={article?.title} className={inputClass} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Adres (slug)</span>
          <input
            name="slug"
            defaultValue={article?.slug}
            placeholder="tworzony z tytułu, jeśli pusty"
            className={inputClass}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Kategoria</span>
          <select
            name="category_slug"
            required
            defaultValue={article?.category_slug ?? categories[0]?.slug}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Kolejność</span>
          <input
            name="sort_order"
            type="number"
            defaultValue={article?.sort_order ?? 0}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-sm font-medium">Zajawka</span>
        <textarea name="excerpt" rows={2} defaultValue={article?.excerpt ?? ""} className={inputClass} />
      </label>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Treść (Markdown)</span>
          <div className="flex gap-1 text-sm">
            {(["edit", "preview"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded px-3 py-1 ${tab === t ? "bg-accent text-white" : "hover:bg-card"}`}
              >
                {t === "edit" ? "Edycja" : "Podgląd"}
              </button>
            ))}
          </div>
        </div>
        <textarea
          name="body"
          rows={20}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${inputClass} font-mono text-sm ${tab === "edit" ? "" : "hidden"}`}
          placeholder={"## Nagłówek\n\nTekst akapitu, **pogrubienie**, listy:\n- punkt\n- punkt"}
        />
        {tab === "preview" && (
          <div className="prose prose-stone min-h-64 max-w-none rounded-lg border border-border bg-card p-4 dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body || "_Brak treści_"}</ReactMarkdown>
          </div>
        )}
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="published" defaultChecked={article?.published ?? false} />
        <span>Opublikowany (widoczny dla wszystkich)</span>
      </label>

      {state.error && <p className="text-sm text-accent">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Zapisywanie…" : "Zapisz artykuł"}
      </button>
    </form>
  );
}
