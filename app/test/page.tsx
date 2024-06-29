"use client";

import React from "react";

function App() {
  const saveData = async () => {
    try {
      const response = await fetch("/api/data/data");
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error calling server API:", error);
    }
  };

  return (
    <div>
      <h1>고캠핑 api 정보 저장 공간</h1>
      <button onClick={saveData}>저장</button>
    </div>
  );
}

export default App;
