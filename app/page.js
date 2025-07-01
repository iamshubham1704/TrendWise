"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/all-articles");
      const json = await res.json();
      setData(json.categories || []);
    }
    fetchArticles();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen px-4 py-20 sm:px-10 md:px-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-6 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
        TrendWise
      </h1>

      {session && (
        <p className="text-center mb-10 text-base sm:text-lg text-gray-300">
          Welcome <span className="font-bold text-cyan-400">{session.user.name}</span>! 
          Ready to explore the trending Market Articles
        </p>
      )}

      {data.map((category, idx) => (
        <section key={idx} className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 border-l-4 pl-4 border-cyan-500">
            {category.category}
          </h2>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {category.articles.map((article, aidx) => (
              <div
                key={aidx}
                className="group bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-cyan-500/50 transform hover:scale-[1.02] transition duration-300"
              >
                <Link href={`/article/${article.slug}`}>
                  <img
                    src={
                      (article.media?.images && article.media.images.length > 0 && article.media.images[0])
                      || `https://source.unsplash.com/400x300?${encodeURIComponent(category.category || "technology")}`
                    }
                    alt={article.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:opacity-80 transition"
                  />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-400 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {article.meta?.description || article.excerpt}
                    </p>
                  </div>
                </Link>

                {session ? (
                  <div className="p-4 border-t border-gray-700">
                    <Comments slug={article.slug} user={session.user} />
                  </div>
                ) : (
                  <p className="p-4 text-gray-500 text-sm italic border-t border-gray-700">
                    Login to view & add comments.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function Comments({ slug, user }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function loadComments() {
      const res = await fetch(`/api/comments?slug=${slug}`);
      const json = await res.json();
      setComments(json.comments || []);
    }
    loadComments();
  }, [slug]);

  async function handlePost() {
    if (!input.trim()) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, user: user.name, comment: input })
    });
    const json = await res.json();
    if (json.success) {
      setComments(prev => [...prev, { user: user.name, comment: input }]);
      setInput("");
    }
  }

  return (
    <>
      <div className="space-y-2 mb-2">
        {comments.map((c, idx) => (
          <div key={idx} className="text-sm text-gray-300">
            <span className="font-semibold text-cyan-400">{c.user}:</span> {c.comment}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
        />
        <button
          onClick={handlePost}
          className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-black font-semibold text-sm"
        >
          Post
        </button>
      </div>
    </>
  );
}
