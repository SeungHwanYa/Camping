"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import LoginBtn from "../components/LoginBtn";
import LogoutBtn from "../components/LogoutBtn";
import Register_btn from "../components/Register_btn";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "../components/Login_Modal";
import Signin from "../../pages/login/signin";
import Register_Modal from "./Register_Modal";
import Register from "./Register";

export default function Wrap() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <>
      <header className="mx-auto inset-x-0 top-0 z-50 bg-white text-gray-700 body-font border-b border-gray-200 w-700px">
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
                      <div className="flex items-center font-bold">내정보</div>
                    </div>
                  </Link>
                </div>
                <span className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500">
                  <LogoutBtn />
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-center font-bold items-center text-xl gap-2">
                <span
                  className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500"
                  onClick={() => setShowModal(true)}
                >
                  <LoginBtn />
                </span>
                <span
                  onClick={() => setRegister(true)}
                  className="text-gray-500 hover:text-orange-500 hover:font-bold transition duration-500"
                >
                  <Register_btn />
                </span>
              </div>
            )}
          </nav>
        </div>
      </header>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Signin onClose={() => setShowModal(false)} />
        </Modal>
      )}
      {register && (
        <Register_Modal onClose={() => setRegister(false)}>
          <Register onClose={() => setRegister(false)}/>
        </Register_Modal>
      )}
    </>
  );
}
