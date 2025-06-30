import React from "react";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  const { slug } = params;

  // Example: fetch from your API later
  // const res = await fetch(`${process.env.API_URL}/api/article/${slug}`);
  // const article = await res.json();

  // Dummy content
  const article = {
    title: "AI Reshaping Social Media Trends",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is radically changing how we create and consume content.</p>
      <h3>Impact on Marketing</h3>
      <p>Brands now use AI tools to optimize engagement and outreach.</p>
      <img src="https://source.unsplash.com/random/800x400?ai" alt="AI Image" />
    `,
    publishedAt: "June 30, 2025"
  };

  if (!article) return notFound();

  return (
    <main className="bg-black text-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-8">{article.publishedAt}</p>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </main>
  );
}
