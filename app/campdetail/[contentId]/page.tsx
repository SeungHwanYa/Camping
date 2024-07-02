"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Review from "../Review";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import Map from "@/app/components/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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
      setSession(session);
    };
    fetchSession();

    const fetchData = () => {
      fetch(`/api/data/load?contentId=${contentId}`)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            const items: CampingSite = result;
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

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg scale-200"></span>
      </div>
    );

  return (
    <div>
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
