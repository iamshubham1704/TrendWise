import React from "react";
import Link from "next/link";

export default function Home() {
  const articles = [
    {
      title: "AI Reshaping Social Media Trends",
      slug: "ai-social-media",
      excerpt: "How AI is transforming content strategies.",
      image: "https://source.unsplash.com/random/400x300?ai"
    },
    {
      title: "Top Google Searches This Week",
      slug: "google-trends",
      excerpt: "What’s everyone looking for right now?",
      image: "https://source.unsplash.com/random/400x300?trending"
    },
    {
      title: "Twitter’s Viral Memes",
      slug: "twitter-memes",
      excerpt: "Funniest content on Twitter this week.",
      image: "https://source.unsplash.com/random/400x300?memes"
    }
  ];

  const categories = ["AI", "Tech News", "Social Media", "Marketing", "SEO"];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-6xl font-extrabold mb-4 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          TrendWise
        </h1>
        <p className="max-w-xl text-gray-400 text-lg">
          Your AI-powered platform to discover, generate & track the hottest digital trends.
        </p>
        <Link href="#articles" className="mt-8 inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-lg hover:scale-105 transition">
          Explore Trends
        </Link>
      </section>

      {/* Latest Articles */}
      <section id="articles" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 border-b-2 border-cyan-500 inline-block pb-2">
          Latest Articles
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article, idx) => (
            <Link key={idx} href={`/article/${article.slug}`} className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover group-hover:opacity-80 transition" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition">{article.title}</h3>
                <p className="text-gray-400">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-gray-950">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2">
          Trending Categories
        </h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat, idx) => (
            <span key={idx} className="px-6 py-3 bg-gray-800 rounded-full text-cyan-400 font-semibold hover:bg-cyan-600 hover:text-black transition cursor-pointer">
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Get the latest AI-generated articles & trend insights directly to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input type="email" placeholder="Your email" className="px-6 py-3 rounded-full w-full sm:w-auto bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold hover:scale-105 transition">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
