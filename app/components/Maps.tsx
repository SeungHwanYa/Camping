"use client";

import { useEffect, useRef, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

interface MapProps {
  locations: Location[];
}

export default function Map({ location }: MapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const currentInfoWindow = useRef<kakao.maps.InfoWindow | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOAPI}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            location[0]?.latitude,
            location[0]?.longitude
          ),
          level: 10,
        };
        const map = new window.kakao.maps.Map(container, options);

        location.forEach((loc) => {
          const markerPosition = new window.kakao.maps.LatLng(
            loc.latitude,
            loc.longitude
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div class="custom-info-window" style="width:300px; padding:10px; font-size:12px; border-radius:1rem; border:none;">
                        <b class="text-blue-500 text-base cursor-pointer" onclick="window.location.href='/campdetail/${loc.contentId}'">${loc.name}</b><br />
                        <p>${loc.address}</p>
                      </div>`,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (currentInfoWindow.current) {
              currentInfoWindow.current.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow.current = infoWindow;
          });
          marker.setMap(map);
        });

        setIsLoaded(true);
      });
    };
  }, [location]);

  return (
    <div className="flex justify-center items-center p-4">
      <div id="map" className="w-full h-96">
        {!isLoaded && <div>Loading map...</div>}
      </div>
    </div>
  );
}
