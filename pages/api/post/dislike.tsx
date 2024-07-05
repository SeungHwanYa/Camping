import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("forum");

  if (req.method === "GET") {
    try {
      const postId = new ObjectId(req.query.id);
      const post = await db.collection("post").findOne({ _id: postId });
      if (post) {
        res.status(200).json({ dislike: post.dislikes || 0 });
      } else {
        res.status(404).json({ error: "글을 찾을 수 없다" });
      }
    } catch (error) {
      res.status(500).json({ error: "유효한 아이디가 아니다" });
    }
  } else if (req.method === "POST") {
    try {
      const postId = new ObjectId(req.body.id);
      const result = await db
        .collection("post")
        .findOneAndUpdate(
          { _id: postId },
          { $inc: { dislikes: 1 } },
          { upsert: false, returnDocument: "after" }
        );
      if (result.value) {
        res.status(200).json({ dislikes: result.value.dislikes });
      } else {
        res.status(404).json({ error: "글을 찾을 수 없다" });
      }
    } catch (error) {
      res.status(500).json({ error: "유효한 아이디가 아니다" });
    }
  } else {
    res.status(405).end();
  }
}
