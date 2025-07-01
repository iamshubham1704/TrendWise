import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("trendwise");
  const collection = db.collection("articles");

  const articles = await collection.find({}, { projection: { slug: 1 } }).toArray();

  const baseUrl = "https://yourdomain.com"; // replace with your actual domain

  const urls = articles.map(article => `
    <url>
      <loc>${baseUrl}/article/${article.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
