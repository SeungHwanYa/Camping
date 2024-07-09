import React from "react";

export default function LoginBtn({ onClick }: any) {
  return (
    <button className="font-bold" onClick={onClick}>
      로그인
    </button>
  );
}
