import { connectDB } from "@/util/database";

export default async function data() {
  try {
    const db = (await connectDB).db("campdata");
    const collection = db.collection("campings");

    const URL = `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${process.env.NEXT_PUBLIC_GOCAMPING}&numOfRows=5000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const apiResponse = await response.json();
    console.log(apiResponse, "이거 뭐임");

    const items = apiResponse.response.body.items.item;
    console.log(items, "이거 확인해바");

    await Promise.all(
      items.map(async (item) => {
        const result = await collection.insertOne({
          facltNm: item.facltNm,
          addr1: item.addr1,
          tel: item.tel,
          firstImageUrl: item.firstImageUrl,
          sigunguNm: item.sigunguNm,
          doNm: item.doNm,
          mapX: item.mapX,
          mapY: item.mapY,
          contentId: item.contentId,
          homepage: item.homepage,
          induty: item.induty,
          tooltip: item.tooltip,
        });
        console.log(`하나 저장: ${result.insertedId}`);
      })
    );

    console.log("모두 저장 완료");
  } catch (error) {
    console.error("저장 실패:", error);
  }
}
