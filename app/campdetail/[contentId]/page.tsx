"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Review from "../Review";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import Map from "@/app/components/Map";

import Detail_Camp from "@/app/campdetail/Detail_Camp";

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
      <Detail_Camp data={data} />
      {location && <Map location={location} />}
      <SessionProvider session={session}>
        <Review contentId={contentId} />
      </SessionProvider>
    </div>
  );
}
