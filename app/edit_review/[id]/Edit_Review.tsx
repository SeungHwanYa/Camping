"use client";

import { useState } from "react";

export default function EditReview({ review, reviewId, contentId }) {
  const [newReview, setNewReview] = useState(review);

  const handleCancel = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/post/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: reviewId,
          review: newReview,
          contentId: contentId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("리뷰가 수정되었습니다.");
        window.location.href = `/campdetail/${contentId}`;
      } else {
        alert("수정에 실패했습니다. Error message: " + result.message);
      }
    } catch (error) {
      console.error("리뷰 수정 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-32">
      <div className="bg-white p-8 w-full">
        <h4 className="text-3xl font-bold mb-6 text-center">리뷰 수정</h4>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <textarea
              value={newReview}
              id="review"
              name="review"
              rows={4}
              className="mt-1 block w-full h-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
              onChange={(e) => setNewReview(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-8">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 px-4 text-white font-medium text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-medium text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
