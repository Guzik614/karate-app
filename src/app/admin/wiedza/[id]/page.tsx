import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getArticleById, getKnowledgeCategories } from "@/lib/data";
import { deleteArticle } from "../actions";
import { ArticleForm } from "../article-form";

export default async function EditArticlePage({ params }: PageProps<"/admin/wiedza/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const [article, categories] = await Promise.all([getArticleById(id), getKnowledgeCategories()]);
  if (!article) notFound();

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Edycja: {article.title}</h1>
        {article.published && (
          <Link href={`/wiedza/${article.slug}`} className="text-sm text-muted hover:text-accent-text">
            Zobacz na stronie →
          </Link>
        )}
      </div>
      <ArticleForm article={article} categories={categories} />
      <form action={deleteArticle} className="border-t border-border pt-4">
        <input type="hidden" name="id" value={article.id} />
        <button type="submit" className="text-sm text-accent-text hover:underline">
          Usuń artykuł
        </button>
      </form>
    </>
  );
}
