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
        console.log(post, "좋아요 순위");

        res
          .status(200)
          .json({ likes: post.likes || 0, dislikes: post.dislikes || 0 });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Invalid ID format" });
    }
  } else if (req.method === "POST") {
    try {
      const postId = new ObjectId(req.body.id);
      const type = req.body.type;
      console.log(type, "포스트 확인");
      console.log(req.body, "바디화인");

      let update;
      if (type === "like") {
        update = { $inc: { likes: 1 } };
      } else if (type === "unlike") {
        update = { $inc: { likes: -1 } };
      } else if (type === "dislike") {
        update = { $inc: { dislikes: 1 } };
      } else if (type === "undislike") {
        update = { $inc: { dislikes: -1 } };
      } else {
        return res.status(400).json({ error: "Invalid type" });
      }

      const result = await db
        .collection("post")
        .findOneAndUpdate({ _id: postId }, update, {
          upsert: false,
          returnDocument: "after",
        });

      if (result.value) {
        res
          .status(200)
          .json({ likes: result.value.likes, dislikes: result.value.dislikes });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Invalid ID format" });
    }
  } else {
    res.status(405).end();
  }
}
