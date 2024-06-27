import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./components/LoginBtn";
import LogoutBtn from "./components/LogoutBtn";
import Register_btn from "./components/Register_btn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBookOpen, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Logo from "../public/logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="mx-auto  inset-x-0 top-0 z-50 bg-white text-gray-700 body-font border-b border-gray-200 w-640px">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <div className="w-24 h-24">
              <Link href="/">
                <Image className="w-full h-full" src={Logo} alt="로고" />
              </Link>
            </div>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              {session ? (
                <div className="flex flex-col justify-center items-center text-xl gap-2">
                  <div className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500">
                    <Link href={"/mypage"}>
                      <div className="flex flex-rows item-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <FontAwesomeIcon
                            className="text-3xl"
                            icon={faCircleUser}
                          />
                        </div>
                        <div className="flex items-center">내정보</div>
                      </div>
                    </Link>
                  </div>

                  <span className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500">
                    <LogoutBtn />
                  </span>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center text-xl gap-2">
                  <span className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500">
                    <LoginBtn />
                  </span>
                  <span className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500">
                    <Register_btn />
                  </span>
                </div>
              )}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-640px">{children}</main>
        <footer className="text-gray-700 mx-auto w-640px bg-gray-200 p-10">
          <div className="flex items-center justify-center gap-10">
            <div>이용약관</div>
            <div>서비스 약관</div>
          </div>
          <div className="flex items-center justify-center gap-10 pt-5">
            <FontAwesomeIcon icon={faGithub} className="w-8 h-8" />
            <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8" />
          </div>
          <div className="flex flex-col items-center justify-center pt-5">
            <div>대표자: 양승환</div>
            <div>전화번호: 010-4366-6640</div>
            <div>이메일: didtmdghkssl@naver.com</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
