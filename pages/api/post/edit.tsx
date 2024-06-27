import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { _id, review, contentId } = req.body;

      if (!_id || !review || !contentId) {
        return res
          .status(400)
          .json({ message: "ID, 리뷰 내용 및 contentId가 필요합니다." });
      }

      let edit = { review };
      console.log("Received edit request:", edit);

      let db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(_id) }, { $set: edit });
      console.log("Update result:", result);

      if (result.modifiedCount === 1) {
        res
          .status(200)
          .json({ message: "리뷰가 수정되었습니다.", review: edit });
      } else {
        res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });
      }
    } catch (error) {
      console.error("업데이트 중 오류 발생:", error);
      res.status(500).json({ message: "서버 에러 발생" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않는 요청 방법입니다." });
  }
}
