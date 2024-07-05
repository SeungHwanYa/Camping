import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import View_Review from "./View_Reaview";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
  likes: number;
  dislikes: number;
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="flex px-10 pt-4 justify-between items-center">
        <h3 className="text-2xl font-bold">리뷰</h3>
        <div className="flex flex-col items-center">
          <Link href={`/board?contentId=${contentId}`}>
            <div className="font-bold text-gray-500 text-center hover:text-orange-400 duration-500">
              더보기 <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
        </div>
      </div>
      <View_Review
        reviews={reviews.slice(0, 3)}
        formatDate={formatDate}
        session={session}
      />
    </div>
  );
}
