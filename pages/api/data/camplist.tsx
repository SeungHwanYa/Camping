import { connectDB } from "@/util/database";

interface Query {
  sigunguNm?: string;
  doNm?: string;
  induty?: { $in: string[] };
}

export default async function handler(req, res) {
  const { region, doNm, page = "1", pageSize = "5", induty } = req.query;
  const pageNum = parseInt(page as string, 10);
  const pageSizeNum = parseInt(pageSize as string, 10);
  console.log(induty, "dasdasd");

  try {
    const db = (await connectDB).db("campdata");
    const collection = db.collection("campings");
    let query: Query = {};
    if (region && region !== "전체") {
      query.sigunguNm = region;
    }
    if (doNm) {
      query.doNm = doNm;
    }
    if (induty) {
      const indutyArray = (induty as string).split(",");
      query.induty = { $in: indutyArray };
    }

    const campData = await collection
      .find(query)
      .skip((pageNum - 1) * pageSizeNum)
      .limit(pageSizeNum)
      .toArray();
    console.log(campData, "safasfasfasf");

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
