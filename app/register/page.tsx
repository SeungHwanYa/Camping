"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("가입성공");
      router.push(data.redirectUrl);
    } else {
      alert(data.message || "오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg my-28">
        <div className="flex justify-center text-2xl text-orange-500 mb-10">
          회원가입
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-gray-700">
            아이디:
            <input
              name="id"
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            닉네임:
            <input
              name="name"
              type="text"
              placeholder="닉네임"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            비밀번호:
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            이메일:
            <input
              name="email"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
