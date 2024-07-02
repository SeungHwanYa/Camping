"use client";

import Password_Modal from "../components/Password_Modal";

interface MypageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Mypage({ user }: MypageProps) {
  return (
    <div className="flex items-center justify-center bg-white p-8 ">
      <div className="w-full px-8 bg-gray-50  pt-24 pb-52 rounded-3xl">
        <div className="flex justify-center font-bold text-3xl text-gray-800 pb-24">
          내정보
        </div>
        <div>
          <p className="pb-8 text-2xl text-gray-600 font-bold">
            아이디: {user.id}
          </p>
          <p className="pb-8 text-2xl text-gray-600 font-bold">
            닉네임: {user.name}
          </p>
          <p className="pb-8 text-2xl text-gray-600 font-bold">
            이메일: {user.email}
          </p>
          <div className="flex items-center pb-6 text-2xl font-bold text-gray-600 gap-4">
            <p>비밀번호 변경:</p>
            <button
              className="btn text-blue-600 font-bold cursor-pointer"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              비밀번호 변경하기
            </button>
            <Password_Modal />
          </div>
        </div>
      </div>
    </div>
  );
}
