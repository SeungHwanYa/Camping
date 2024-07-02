"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Password_Modal() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [session, setSession] = useState(null);
  // const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      console.log(session);
    };

    fetchSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      alert("로그인이 필요합니다.");
      signIn();
      return;
    }

    const res = await fetch("/api/auth/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      alert("비밀번호가 변경되었습니다.");
      if (modalRef.current) {
        modalRef.current.close();
      }
    } else {
      const errorData = await res.json();
      alert(errorData.message || "비밀번호 변경에 실패했습니다.");
    }
  };
  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box">
        <div className="flex items-center justify-center">
          <div className="w-full p-6 bg-white ">
            <div className="flex justify-center text-2xl font-bold text-gray-800 mb-10">
              비밀번호 변경
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="block text-sm font-medium text-gray-700">
                현재 비밀번호:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                새 비밀번호:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                비밀번호 변경
              </button>
            </form>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">취소</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
