import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");

  if (req.method === "POST") {
    if (!req.body.review) {
      return res.status(400).json({ message: "리뷰 내용을 입력해주세요." });
    }

    try {
      const result = await db.collection("post").insertOne(req.body);
      return res.status(200).json({ message: "성공", review: req.body });
    } catch (error) {
      console.log("에러 발생:", error);
      return res.status(500).json({ message: "서버 에러 발생" });
    }
  } else if (req.method === "GET") {
    try {
      const reviews = await db
        .collection("post")
        .find({ contentId: req.query.contentId })
        .toArray();
      return res.status(200).json(reviews);
    } catch (error) {
      console.log("에러 발생:", error);
      return res.status(500).json({ message: "서버 에러 발생" });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않는 요청 방법입니다." });
  }
}
