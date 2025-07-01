import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  meta: {
    description: String,
    keywords: [String]
  },
  media: {
    images: [String],
    tweets: [String],
    videos: [String]
  },
  content: String, 
  category: String, 
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model("Article", articleSchema);
