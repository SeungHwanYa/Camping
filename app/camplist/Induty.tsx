import React from "react";

export default function Induty({ setInduty, setData, setPage, induty }) {
  const filterHandler = (filterType) => {
    if (induty.includes(filterType)) {
      setInduty(induty.filter((item) => item !== filterType));
    } else {
      setInduty([...induty, filterType]);
    }
    setData([]);
    setPage(1);
  };

  const isSelected = (filterType) => induty.includes(filterType);

  return (
    <>
      <div className="gap-8 flex px-4">
        <button
          className={`badge flex-1 font-bold hover:bg-orange-300 hover:text-white duration-500
            ${
              induty.length === 0
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
          onClick={() => {
            setInduty([]);
            setData([]);
            setPage(1);
          }}
        >
          전체
        </button>
        <button
          onClick={() => filterHandler("카라반")}
          className={`badge flex-1 font-bold hover:bg-orange-300 hover:text-white duration-500
            ${
              isSelected("카라반")
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
        >
          카라반
        </button>
        <button
          onClick={() => filterHandler("글램핑")}
          className={`badge flex-1 font-bold hover:bg-orange-300 hover:text-white duration-500
            ${
              isSelected("글램핑")
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
        >
          글램핑
        </button>
        <button
          onClick={() => filterHandler("자동차야영장")}
          className={`badge flex-1 font-bold hover:bg-orange-300 hover:text-white duration-500
            ${
              isSelected("자동차야영장")
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
        >
          오토캠핑
        </button>
        <button
          onClick={() => filterHandler("일반야영장")}
          className={`badge flex-1 font-bold hover:bg-orange-300 hover:text-white duration-500
            ${
              isSelected("일반야영장")
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
        >
          캠핑장
        </button>
      </div>
    </>
  );
}
