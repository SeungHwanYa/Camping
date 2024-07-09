import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Campinglist({ data }) {
  return (
    <div className="pt-4">
      {data.map((item, index) => (
        <Link href={`/campdetail/${item.contentId}`} key={index}>
          <div className="border-t border-gray-300 pt-4 pb-4" key={index}>
            {item.firstImageUrl ? (
              <div className="w-full border-8 border-orange-500 rounded-3xl overflow-hidden">
                <img src={item.firstImageUrl} alt={item.facltNm} />
              </div>
            ) : (
              <div className="w-full h-full">
                <FontAwesomeIcon
                  className="w-full h-auto text-current text-gray-300"
                  icon={faImage}
                />
              </div>
            )}
            <h1 className="text-gray-800 text-xl font-bold pt-4 pb-2">
              {item.facltNm}
            </h1>
            <p className="text-gray-500 font-bold">주소: {item.addr1}</p>
            {item.tel ? (
              <p className="text-gray-500 font-bold">전화번호: {item.tel}</p>
            ) : (
              <p className="hidden">전화번호: 데이터가 없습니다. </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
