import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import Edit_Review from "../Edit_Review";

export default async function EditPage({ params }) {
  let db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });
  console.log(result, "한번 확인해봅시다");

  return (
    <Edit_Review
      review={result.review}
      reviewId={params.id}
      contentId={result.contentId}
      clean={result.clean}
      service={result.service}
      convenience={result.convenience}
    />
  );
}
