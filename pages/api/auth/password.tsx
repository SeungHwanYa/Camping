import { connectDB } from "@/util/database";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { currentPassword, newPassword } = req.body;
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
      }

      const db = (await connectDB).db("forum");
      const user = await db
        .collection("user_cred")
        .findOne({ email: session?.user?.email });

      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(403)
          .json({ message: "현재 비밀번호가 올바르지 않습니다." });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await db
        .collection("user_cred")
        .updateOne(
          { email: session?.user?.email },
          { $set: { password: hashedNewPassword } }
        );

      return res.status(200).json({ message: "비밀번호가 변경되었습니다." });
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않는 요청 방법입니다." });
  }
}
