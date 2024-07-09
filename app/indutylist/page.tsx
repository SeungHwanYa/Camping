"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Maps from "../components/Maps";
import Campinglist from "../campdetail/Campinglist";

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
const PAGE_SIZE = 5;

export default function IndutyListPage() {
  const searchParams = useSearchParams();
  const induty = searchParams.get("induty");

  const [data, setData] = useState<CampingSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const URL = `/api/data/camplist?induty=${induty}&page=${page}&pageSize=${PAGE_SIZE}`;

  useEffect(() => {
    const fetchData = () => {
      fetch(URL)
        .then((response) => response.json())
        .then((result) => {
          const items = Array.isArray(result) ? result : [];
          console.log(items);

          setData((prevData) => (page === 1 ? items : [...prevData, ...items]));

          if (items.length < PAGE_SIZE) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error as Error);
          setLoading(false);
        });
    };

    fetchData();
  }, [page, induty]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg scale-200"></span>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const location = data.map((item) => ({
    latitude: item.mapY,
    longitude: item.mapX,
    name: item.facltNm,
    address: item.addr1,
    contentId: item.contentId,
  }));

  return (
    <div className="pt-4 px-8">
      {data.length > 0 ? (
        <>
          {location && <Maps location={location} />}
          <Campinglist data={data} />
          <div className="flex justify-center mt-4">
            {hasMore && (
              <button onClick={loadMore} className="btn btn-block mb-6">
                더보기
              </button>
            )}
          </div>
        </>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}
