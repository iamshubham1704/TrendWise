import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("trendwise");
    const collection = db.collection("articles");
    const categories = await collection.aggregate([
      {
        $group: {
          _id: "$category",
          articles: { $push: {
            title: "$title",
            slug: "$slug",
            meta: "$meta",
            media: "$media",
            content: "$content"
          }}
        }
      },
      {
        $project: {
          category: "$_id",
          articles: { $slice: ["$articles", 5] },
          _id: 0
        }
      }
    ]).toArray();

    return new Response(JSON.stringify({ categories }), {
      headers: { "Content-Type": "application/json" }
    });
   

  } catch (err) {
    console.error("Failed fetching articles:", err);
    

    return Response.json(
      { error: "Failed fetching articles", details: err.message },
      { status: 500 }
    );
  }
}
