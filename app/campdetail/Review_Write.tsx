import { useState } from "react";
import { signIn } from "next-auth/react";

interface Review {
  _id: string;
  userId: string;
  contentId: string;
  review: string;
  email: string;
  createdAt: string;
}

interface Session {
  user: {
    name: string;
    email: string;
  };
}

interface ReviewWriteProps {
  session: Session | null;
  contentId: string;
  onReviewSubmitted: (newReview: Review) => void;
}

export default function Review_Write({
  session,
  contentId,
  onReviewSubmitted,
}: ReviewWriteProps) {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      signIn();
      return;
    }

    try {
      const response = await fetch("/api/post/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId,
          userId: session.user.name,
          review: reviewText,
          email: session.user.email,
          createdAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const newReview: Review = {
          _id: result.review._id,
          userId: session.user.name,
          contentId: contentId,
          review: reviewText,
          email: session.user.email,
          createdAt: new Date().toISOString(),
        };
        onReviewSubmitted(newReview); // 새로운 리뷰를 부모 컴포넌트로 전달
        setReviewText("");
      } else {
        alert(result.message || "오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류가 발생했습니다.", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center my-4">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6">리뷰</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <textarea
              id="review"
              name="review"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className={`mt-1 block w-full h-32 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                session
                  ? "focus:ring-blue-500 focus:border-blue-500"
                  : "focus:ring-gray-300 focus:border-gray-300 cursor-not-allowed"
              } sm:text-sm`}
              disabled={!session}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-medium text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                session
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  : "bg-gray-300 cursor-not-allowed focus:ring-gray-300"
              }`}
              disabled={!session}
            >
              리뷰 쓰기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}