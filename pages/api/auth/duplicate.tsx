import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const { id } = req.query;
  const db = (await connectDB).db("forum");
  try {
    const user = await db.collection("user_cred").findOne({ id: id });

    if (user) {
      res.status(200).json({ duid: false });
    } else {
      res.status(200).json({ duid: true });
    }
  } catch (error) {
    res.status(500).json({ message: "아이디중복 서버 에러" });
  }
}
