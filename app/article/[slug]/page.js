"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ArticlePage() {
  const { slug } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      async function fetchArticle() {
        const res = await fetch("/api/all-articles");
        const json = await res.json();
        const found = json.categories
          ?.flatMap(cat => cat.articles)
          ?.find(a => a.slug === slug);
        setArticle(found);
      }
      fetchArticle();
    }
  }, [slug, status]);

  if (status === "loading") return <div className="p-8">Checking authentication...</div>;
  if (status === "unauthenticated") return <div className="p-8">Redirecting to login...</div>;
  if (!article) return <div className="p-8">Loading article...</div>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
      <img
        src={
          (article.media?.images && article.media.images.length > 0 && article.media.images[0]) ||
          `https://source.unsplash.com/600x400?technology`
        }
        alt={article.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p className="text-lg text-gray-300">{article.content}</p>
    </main>
  );
}
