export default function Induty({ setInduty, setData, setPage, induty }) {
  const filterHandler = (filterType) => {
    setInduty(induty === filterType ? null : filterType);
    setData([]);
    setPage(1); // Reset page to 1 when changing filter
  };

  return (
    <>
      <button
        className="btn"
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
        className="btn"
      >
        카라반
      </button>
      <button
        onClick={() => {
          filterHandler("글램핑");
        }}
        className="btn"
      >
        글램핑
      </button>
      <button
        onClick={() => {
          filterHandler("자동차야영장");
        }}
        className="btn"
      >
        오토캠핑
      </button>
      <button
        onClick={() => {
          filterHandler("일반야영장");
        }}
        className="btn"
      >
        캠핑장
      </button>
    </>
  );
}
