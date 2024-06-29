import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const { contentId } = req.query;
  console.log(contentId, "확인");

  try {
    const db = (await connectDB).db("campdata");
    const collection = db.collection("campings");
    const campData = await collection.findOne({
      contentId: contentId,
    });

    if (campData) {
      res.status(200).json(campData);
    } else {
      res.status(404).json({ message: "Camp not found" });
    }
  } catch (error) {
    console.error("Error fetching camp data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
