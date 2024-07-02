export default function edit_btn({ canEdit }) {
  return (
    <>
      <button
        className={`${
          canEdit
            ? "bg-orange-300 hover:bg-orange-400 text-white duration-300"
            : "hidden"
        } py-1 px-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm`}
      >
        수정
      </button>
    </>
  );
}
