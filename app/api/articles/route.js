import clientPromise from "../../../lib/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  try {
    const prompt = `
      Respond ONLY with valid JSON like:
      {
        "categories": [
          {
            "category": "Tech",
            "articles": [
              {
                "title": "Example title",
                "slug": "example-title",
                "meta": { "description": "..." },
                "media": { "images": ["https://..."] },
                "content": "..." 
              }
            ]
          }
        ]
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("RAW RESPONSE FROM GEMINI:\n", text);
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON object found in Gemini response");
    }
    const json = JSON.parse(jsonMatch[0]);
    console.log("PARSED JSON:\n", JSON.stringify(json, null, 2));

    const client = await clientPromise;
    const db = client.db("trendwise");
    const collection = db.collection("articles");

    for (const category of json.categories) {
      for (const article of category.articles) {
        await collection.updateOne(
          { slug: article.slug },
          {
            $set: {
              ...article,
              category: category.category,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
    }

    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Gemini failed:", err);
    return Response.json(
      { error: "Gemini failed", details: err.message },
      { status: 500 }
    );
  }
}
