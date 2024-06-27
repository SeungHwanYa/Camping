import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.body.reviewId) });
      if (result.deletedCount === 1) {
        res.status(200).json("삭제 완료");
      } else {
        res.status(404).json("리뷰를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      res.status(500).json("서버 에러 발생");
    }
  } else {
    res.status(405).json("허용되지 않는 요청 방법입니다.");
  }
}
