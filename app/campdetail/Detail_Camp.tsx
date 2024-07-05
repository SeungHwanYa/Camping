import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Detail_Camp({ data }) {
  return (
    <div className="px-8 py-4">
      {data.firstImageUrl ? (
        <div className="w-full border-8 border-orange-500 rounded-3xl overflow-hidden">
          <img src={data.firstImageUrl} alt={data.facltNm} />
        </div>
      ) : (
        <div className="w-full h-full">
          <FontAwesomeIcon
            className="w-full h-auto text-current"
            icon={faImage}
          />
        </div>
      )}
      <div className="py-4">
        <h1 className="text-gray-800 text-xl font-bold pt-4 pb-2">
          {data.facltNm}
        </h1>
        <p className="pb-1 text-gray-500 font-bold">주소: {data.addr1}</p>
        <p className="pb-1 text-gray-500 font-bold">전화번호: {data.tel}</p>
        <p className="pb-1 text-gray-500 font-bold">
          홈페이지:
          <Link href={data.homepage} className="text-blue-500">
            {data.homepage}
          </Link>
        </p>
        <p className="pb-1 text-gray-500 font-bold">구분: {data.induty}</p>
        {data.tooltip ? (
          <p className="pb-1">설명: {data.tooltip}</p>
        ) : (
          <p className="hidden">설명이 없습니다</p>
        )}
      </div>
    </div>
  );
}
