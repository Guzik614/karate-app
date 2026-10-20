import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getArticleBySlug } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/wiedza/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return { title: article?.title ?? "Artykuł", description: article?.excerpt ?? undefined };
}

export default async function ArticlePage({ params }: PageProps<"/wiedza/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <Link href={`/wiedza#${article.category_slug}`} className="text-sm text-muted hover:text-accent">
        ← Teoria i Wiedza
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>
      {article.excerpt && <p className="mt-3 text-lg text-muted">{article.excerpt}</p>}
      <div className="mt-8">
        <Markdown>{article.body}</Markdown>
      </div>
    </article>
  );
}
