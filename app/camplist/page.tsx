"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Maps from "../components/Maps";
import Campinglist from "../campdetail/Campinglist";
import Induty from "./Induty";

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
export default function SearchPage() {
  const searchParams = useSearchParams();
  const region = searchParams?.get("region");
  const doNm = searchParams?.get("doNm");

  const [data, setData] = useState<CampingSite[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [induty, setInduty] = useState<string | null>("");
  const [hasMore, setHasMore] = useState(true);

  const URL = `/api/data/camplist?region=${region}&doNm=${doNm}&page=${page}&pageSize=${PAGE_SIZE}&induty=${
    induty || ""
  }`;

  useEffect(() => {
    if (region || doNm) {
      const fetchData = () => {
        fetch(URL)
          .then((response) => response.json())
          .then((result) => {
            const items = Array.isArray(result) ? result : [];
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

            setData((prevData) =>
              page === 1 ? filteredData : [...prevData, ...filteredData]
            );

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
    }
  }, [region, doNm, page, induty]);

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

  const location = data
    ? data.map((item) => ({
        latitude: item.mapY,
        longitude: item.mapX,
        name: item.facltNm,
        address: item.addr1,
        contentId: item.contentId,
      }))
    : [];
  console.log(induty, "이거 확인해바");

  return (
    <div className="pt-4 px-8">
      <Induty
        induty={induty}
        setPage={setPage}
        setData={setData}
        setInduty={setInduty}
      />
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
