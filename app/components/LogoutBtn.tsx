"use client";

import { signOut } from "next-auth/react";

export default function LoginBtn() {
  return (
    <>
      <button
        className="font-bold"
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </>
  );
}
