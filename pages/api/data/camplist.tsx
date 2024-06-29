import { connectDB } from "@/util/database";

interface Query {
  sigunguNm?: string;
  doNm?: string;
}

export default async function handler(req, res) {
  const { region, doNm } = req.query;

  try {
    const db = (await connectDB).db("campdata");
    const collection = db.collection("campings");
    let query: Query = {};
    if (region !== "전체") {
      query.sigunguNm = region;
    }
    if (doNm) {
      query.doNm = doNm;
    }

    const campData = await collection.find(query).toArray();

    if (campData.length > 0) {
      res.status(200).json(campData);
    } else {
      res.status(404).json({ message: "Camp not found" });
    }
  } catch (error) {
    console.error("Error fetching camp data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
