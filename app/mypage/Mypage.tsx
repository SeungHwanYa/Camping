"use client";

interface MypageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Mypage({ user }: MypageProps) {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg my-44">
        <div className="flex justify-center text-2xl text-orange-500 mb-10">
          내정보
        </div>
        <div>
          <p className="pb-6 text-xl text-gray-600">아이디: {user.id}</p>
          <p className="pb-6 text-xl text-gray-600">닉네임: {user.name}</p>
          <p className="pb-6 text-xl text-gray-600">이메일: {user.email}</p>
          <div className="flex pb-6 text-xl text-gray-600 gap-4">
            <p>비밀번호 변경:</p>
            <p
              onClick={() =>
                (window.location.href = `/change_password/${user.name}`)
              }
              className="text-blue-500 cursor-pointer hover:font-bold transition duration-500"
            >
              비밀번호 변경하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
