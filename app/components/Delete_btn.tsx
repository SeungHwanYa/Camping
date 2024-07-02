export default function Delete_btn({ reviewId, canDelete, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId }),
      });

      if (response.ok) {
        alert("삭제되었습니다");
        onDelete(reviewId);
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <>
      <button
        onClick={handleDelete}
        className={`${
          canDelete
            ? "bg-orange-300 hover:bg-orange-400 text-white duration-300"
            : "hidden"
        } py-1 px-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm`}
      >
        삭제
      </button>
    </>
  );
}
