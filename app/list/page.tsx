"use client";

import { useEffect, useState } from "react";
// import Review from "../components/Review";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOAPI}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentPosition({ lat: latitude, lng: longitude });

              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);

              const markerPosition = new window.kakao.maps.LatLng(
                latitude,
                longitude
              );
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });
              marker.setMap(map);

              setIsLoaded(true);
            },
            (error) => {
              console.error("Error getting current position: ", error);
              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);

              const markerPosition = new window.kakao.maps.LatLng(
                33.450701,
                126.570667
              );
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });
              marker.setMap(map);

              setIsLoaded(true);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      });
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="map" className="w-64 h-64 border border-black">
        {!isLoaded && <div>Loading map...</div>}
      </div>
      <div>{/* <Review /> */}</div>
    </div>
  );
}
