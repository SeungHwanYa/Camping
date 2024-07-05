"use client";

import { SessionProvider } from "next-auth/react";
import Boardlist from "./Boardlist";
import Review_Btn from "./Review_Btn";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Review {
  _id: string;
  userId: string;
  contentId: string;
  review: string;
  email: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export default function home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const searchParams = useSearchParams();
  const contentId = searchParams.get("contentId");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/post/write?contentId=${contentId}`);
        const data = await response.json();
        console.log(data, "확인");

        setReviews(
          data.sort(
            (a: Review, b: Review) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (error) {
        console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [contentId]);

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review._id !== reviewId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <SessionProvider>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg scale-200"></span>
        </div>
      ) : (
        <>
          <Review_Btn contentId={contentId} />
          <Boardlist
            reviews={reviews}
            formatDate={formatDate}
            onDelete={handleDeleteReview}
          />
        </>
      )}
    </SessionProvider>
  );
}
