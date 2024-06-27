"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const URL = `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${process.env.NEXT_PUBLIC_GOCAMPING}`;

  useEffect(() => {
    if (region || doNm) {
      const fetchData = () => {
        fetch(
          `${URL}&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&`
        )
          .then((response) => response.json())
          .then((result) => {
            const items = result.response.body.items.item;
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
                <img src={item.firstImageUrl} alt={item.facltNm} />
                <h1>{item.facltNm}</h1>
                <p>주소: {item.addr1}</p>
                <p>전화번호: {item.tel}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
