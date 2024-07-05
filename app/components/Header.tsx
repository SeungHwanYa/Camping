import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import LoginBtn from "../components/LoginBtn";
import LogoutBtn from "../components/LogoutBtn";
import Register_btn from "../components/Register_btn";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function Header() {
    let session = getServerSession(authOptions);
  return (
      <header className="mx-auto  inset-x-0 top-0 z-50 bg-white text-gray-700 body-font border-b border-gray-200 w-700px">
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
  );
}
