import { useState } from "react";

export default function Duplicate_Id({ name, onCheck }) {
  const [duid, setDuid] = useState(null);

  const handleCheckId = async () => {
    if (name) {
      const res = await fetch(`/api/auth/duplicate_nick?name=${name}`);
      const data = await res.json();
      setDuid(data.duid);

      if (data.duid) {
        alert("사용 가능한 닉네임입니다.");
        onCheck(true);
      } else {
        alert("중복된 닉네임입니다.");
        onCheck(false);
      }
    }
  };
  return (
    <div
      onClick={handleCheckId}
      className="w-32 flex justify-center items-center bg-blue-500 rounded-xl cursor-pointer text-white font-bold hover:bg-blue-600 duration-500"
    >
      중복확인
    </div>
  );
}
