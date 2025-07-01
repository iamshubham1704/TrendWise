import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  try {
    const client = await clientPromise;
    const db = client.db("trendwise");
    const comments = await db.collection("comments").find({ slug }).toArray();

    return new Response(JSON.stringify({ comments }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return Response.json({ error: "Failed fetching comments" }, { status: 500 });
  }
}

export async function POST(req) {
  const { slug, user, comment } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db("trendwise");
    await db.collection("comments").insertOne({ slug, user, comment, createdAt: new Date() });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error adding comment:", err);
    return Response.json({ error: "Failed adding comment" }, { status: 500 });
  }
}
