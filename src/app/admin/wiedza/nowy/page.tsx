import { requireAdmin } from "@/lib/auth";
import { getKnowledgeCategories } from "@/lib/data";
import { ArticleForm } from "../article-form";

export default async function NewArticlePage() {
  await requireAdmin();
  const categories = await getKnowledgeCategories();
  return (
    <>
      <h1 className="text-2xl font-bold">Nowy artykuł</h1>
      <ArticleForm categories={categories} />
    </>
  );
}
