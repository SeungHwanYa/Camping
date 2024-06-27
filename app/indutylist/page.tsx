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
  induty: string;
  [key: string]: any;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const induty = searchParams?.get("induty");

  const [data, setData] = useState<CampingSite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const URL = `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${process.env.NEXT_PUBLIC_GOCAMPING}`;

  useEffect(() => {
    if (induty) {
      const fetchData = () => {
        fetch(
          `${URL}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&`
        )
          .then((response) => response.json())
          .then((result) => {
            const items = result.response.body.items.item;
            console.log("Items:", items);
            console.log("Induty:", induty);

            let filteredData = items.filter(
              (item: CampingSite) => item.induty === induty
            );
            console.log("Filtered Data:", filteredData);

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
  }, [induty]);

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
