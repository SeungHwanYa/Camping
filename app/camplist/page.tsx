"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Maps from "../components/Maps";

interface CampingSite {
  facltNm: string;
  addr1: string;
  tel: string;
  firstImageUrl: string;
  sigunguNm: string;
  doNm: string;
  mapX: number;
  mapY: number;
  [key: string]: any;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const region = searchParams?.get("region");
  const doNm = searchParams?.get("doNm");

  const [data, setData] = useState<CampingSite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (region || doNm) {
      const fetchData = () => {
        fetch(`/api/data/camplist?region=${region}&doNm=${doNm}`)
          .then((response) => response.json())
          .then((result) => {
            const items = result;
            console.log(items);

            let filteredData;
            if (region === "전체") {
              filteredData = items.filter(
                (item: CampingSite) => item.doNm === doNm
              );
            } else {
              filteredData = items.filter(
                (item: CampingSite) => item.sigunguNm === region
              );
            }

            setData(filteredData);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setError(error as Error);
            setLoading(false);
          });
      };

      fetchData();
    }
  }, [region, doNm]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg scale-200"></span>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const location = data
    ? data.map((item) => ({
        latitude: item.mapY,
        longitude: item.mapX,
        name: item.facltNm,
        address: item.addr1,
        contentId: item.contentId,
      }))
    : [];

  return (
    <div className="pt-4 px-8">
      {location && <Maps location={location} />}
      {data && (
        <div className="pt-4">
          {data.map((item, index) => (
            <Link href={`/campdetail/${item.contentId}`} key={index}>
              <div className="border-b border-gray-300 pt-4 pb-4" key={index}>
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
                  <p className="text-gray-500 font-bold">
                    전화번호: {item.tel}
                  </p>
                ) : (
                  <p className="hidden">전화번호: 데이터가 없습니다. </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
