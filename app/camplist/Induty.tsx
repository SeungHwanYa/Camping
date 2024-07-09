export default function Induty({ setInduty, setData, setPage, induty }) {
  const filterHandler = (filterType) => {
    setInduty(induty === filterType ? null : filterType);
    setData([]);
    setPage(1);
  };

  return (
    <>
      <div className="gap-8 flex px-4 ">
        <button
          className={`badge flex-1 font-bold  hover:bg-orange-300 hover:text-white duration-500
            ${
              induty === ""
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
          onClick={() => {
            filterHandler("");
          }}
        >
          전체
        </button>
        <button
          onClick={() => {
            filterHandler("카라반");
          }}
          className={`badge flex-1 font-bold  hover:bg-orange-300 hover:text-white duration-500
            ${
              induty === "카라반"
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
        >
          카라반
        </button>
        <button
          onClick={() => {
            filterHandler("글램핑");
          }}
          className={`badge flex-1 font-bold  hover:bg-orange-300 hover:text-white duration-500
            ${
              induty === "글램핑"
                ? "bg-orange-300 text-gray-100"
                : "text-gray-500 badge-ghost"
            }`}
        >
          글램핑
        </button>
        <button
          onClick={() => {
            filterHandler("자동차야영장");
          }}
          className={`badge flex-1 font-bold  hover:bg-orange-300 hover:text-white duration-500
        ${
          induty === "자동차야영장"
            ? "bg-orange-300 text-gray-100"
            : "text-gray-500 badge-ghost"
        }`}
        >
          오토캠핑
        </button>
        <button
          onClick={() => {
            filterHandler("일반야영장");
          }}
          className={`badge flex-1 font-bold  hover:bg-orange-300 hover:text-white duration-500
            ${
              induty === "일반야영장"
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
