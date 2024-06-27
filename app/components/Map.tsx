"use client";

import { useEffect, useState } from "react";

interface MapProps {
  location: { latitude: number; longitude: number };
}

const Map: React.FC<MapProps> = ({ location }) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
            location?.latitude,
            location?.longitude
          ),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
          location?.latitude,
          location?.longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

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
};

export default Map;
