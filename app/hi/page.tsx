"use client";

import React, { useEffect, useState } from "react";

function Test() {
  // 상태 초기화
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${process.env.NEXT_PUBLIC_GOCAMPING}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId={10}`
      );
      const result = await response.json();
      if (result.response.body.items.item) {
        setData(result.response.body.items.item); // 데이터를 가져와서 상태 업데이트
      } else {
        setError("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 실행되는 부분
  useEffect(() => {
    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data && (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <img src={item.firstImageUrl} alt={item.facltNm} />
              <h1>{item.facltNm}</h1>
              <p>주소: {item.addr1}</p>
              <p>전화번호: {item.tel}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Test;
