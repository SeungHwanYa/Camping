"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && (
        <div>
          {data.map((item, index) => (
            <Link href={`/campdetail/${item.contentId}`} key={index}>
              <div key={index}>
                {item.firstImageUrl ? (
                  <div className="w-full">
                    <img src={item.firstImageUrl} alt={item.facltNm} />
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <FontAwesomeIcon
                      className="w-full h-auto text-current"
                      icon={faImage}
                    />
                  </div>
                )}
                <h1>{item.facltNm}</h1>
                <p>주소: {item.addr1}</p>
                {item.tel ? (
                  <p>전화번호: {item.tel}</p>
                ) : (
                  <p>전화번호: 데이터가 없습니다. </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
