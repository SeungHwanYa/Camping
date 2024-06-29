"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Review from "../Review";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import Map from "@/app/components/Map";

interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    id?: string | null;
  };
  expires: string;
}

interface CampingSite {
  contentId: string;
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

export default function CampingSiteDetail() {
  const pathname = usePathname();
  const contentId = decodeURIComponent(pathname?.split("/").pop() || "");

  const [data, setData] = useState<CampingSite | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log(session, "확인하자");

      setSession(session);
    };
    fetchSession();

    const fetchData = () => {
      fetch(`/api/data/load?contentId=${contentId}`)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            const items: CampingSite = result;
            console.log(items, "확인");

            if (items) {
              setData(items);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [contentId]);

  const location = data
    ? {
        latitude: data.mapY,
        longitude: data.mapX,
      }
    : null;

  if (!data) return <div>No data found.</div>;

  return (
    <div>
      <div>
        <img src={data.firstImageUrl} alt={data.facltNm} />
        <h1 className="text-xl py-2 font-bold">{data.facltNm}</h1>
        <p className="pb-1">주소: {data.addr1}</p>
        <p className="pb-1">전화번호: {data.tel}</p>
        <p className="pb-1">
          홈페이지:
          <Link href={data.homepage} className="text-blue-500">
            {data.homepage}
          </Link>
        </p>
        <p className="pb-1">구분: {data.induty}</p>
        <p className="pb-1">설명: {data.tooltip}</p>
        {location && <Map location={location} />}
      </div>
      <div className="">
        <SessionProvider session={session}>
          <Review contentId={contentId} />
        </SessionProvider>
      </div>
    </div>
  );
}
