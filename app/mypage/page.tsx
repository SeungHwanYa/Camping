import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Mypage from "./Mypage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session, "확인");

  const db = (await connectDB).db("forum");
  const user = await db
    .collection("user_cred")
    .findOne({ email: session?.user?.email });
  console.log(user, "이거확인");

  if (!user) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }

  return (
    <Mypage
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
      }}
    />
  );
}
