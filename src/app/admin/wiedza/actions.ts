"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type ArticleFormState = { error?: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function saveArticle(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const user = await requireAdmin();

  const id = formData.get("id")?.toString() || null;
  const title = formData.get("title")?.toString().trim() ?? "";
  const slug = slugify(formData.get("slug")?.toString() || title);
  const article = {
    title,
    slug,
    excerpt: formData.get("excerpt")?.toString().trim() || null,
    body: formData.get("body")?.toString() ?? "",
    category_slug: formData.get("category_slug")?.toString() ?? "",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };

  if (!title || !slug) return { error: "Podaj tytuł artykułu." };
  if (!article.category_slug) return { error: "Wybierz kategorię." };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("articles").update(article).eq("id", id)
    : await supabase.from("articles").insert({ ...article, author_id: user.id });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Artykuł o takim adresie (slug) już istnieje."
          : `Nie udało się zapisać: ${error.message}`,
    };
  }

  revalidatePath("/wiedza", "layout");
  revalidatePath("/admin/wiedza");
  redirect("/admin/wiedza");
}

export async function deleteArticle(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/wiedza", "layout");
  revalidatePath("/admin/wiedza");
  redirect("/admin/wiedza");
}
