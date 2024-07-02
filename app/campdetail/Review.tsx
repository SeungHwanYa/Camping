import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Delete_btn from "../components/Delete_btn";
import Edit_btn from "../components/Edit_btn";
import Link from "next/link";
import Review_Write from "./Review_Write";

interface ReviewProps {
  contentId: string;
}
interface Review {
  _id: string;
  userId: string;
  contentId: string;
  review: string;
  email: string;
  createdAt: string;
}

export default function Review({ contentId }: ReviewProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/post/write?contentId=${contentId}`);
        const data = await response.json();
        setReviews(
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (error) {
        console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchReviews();
  }, [contentId]);

  const handleNewReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review._id !== reviewId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Review_Write
        session={session}
        contentId={contentId}
        onReviewSubmitted={handleNewReview}
      />
      <div className="py-6 px-8">
        <h3 className="text-xl font-bold pb-4">작성 리뷰</h3>
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 p-6 shadow mb-4">
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <p className="text-gray-800 font-bold">{review.userId}</p>
              <div>
                <div className="text-gray-400 px-2 pb-2">
                  {formatDate(review.createdAt)}
                </div>
                <div className="flex gap-2">
                  <Delete_btn
                    reviewId={review._id}
                    canDelete={session?.user?.name === review.userId}
                    onDelete={handleDeleteReview}
                  />
                  <Link href={`/edit_review/${review._id}`}>
                    <Edit_btn canEdit={session?.user?.name === review.userId} />
                  </Link>
                </div>
              </div>
            </div>

            <p className="py-8 text-lg text-gray-500">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
