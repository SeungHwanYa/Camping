import Link from "next/link";
import { useSession } from "next-auth/react";
import Delete_btn from "../components/Delete_btn";
import Edit_btn from "../components/Edit_btn";
import Clean from "./Clean";
import Service from "./Service";
import Convenience from "./Convenience";
import Total from "./Total";
import { useState } from "react";

export default function List({ reviews, formatDate, onDelete }) {
  const { data: session } = useSession();
  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const total = (
    clean: number,
    service: number,
    convenience: number
  ): number => {
    return parseFloat(((clean + service + convenience) / 3).toFixed(1));
  };

  return (
    <div className="py-4  px-8">
      {reviews.slice(0, visibleReviews).map((review, index) => (
        <div key={index} className="bg-gray-50 p-6 shadow mb-4">
          <div className="flex justify-between pb-4">
            <p className="text-gray-800 font-bold">{review.userId}</p>
            <div>
              <div className="text-gray-400 px-2 pb-2">
                {formatDate(review.createdAt)}
              </div>
              <div className="flex gap-2">
                <Delete_btn
                  reviewId={review._id}
                  canDelete={session?.user?.name === review.userId}
                  onDelete={onDelete}
                />
                <Link href={`/edit_review/${review._id}`}>
                  <Edit_btn canEdit={session?.user?.name === review.userId} />
                </Link>
              </div>
            </div>
          </div>
          <Total
            total={total(review.clean, review.service, review.convenience)}
          />
          <Clean clean={review.clean} />
          <Service service={review.service} />
          <Convenience convenience={review.convenience} />
          <p className="py-8 px-8 text-lg text-gray-500 rounded-xl bg-white border-gray-300">
            {review.review}
          </p>
        </div>
      ))}
      {visibleReviews < reviews.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreReviews}
            className="bg-gray-50 w-full text-gray-500 font-bold py-2 px-4 rounded-xl hover:bg-gray-300 hover:text-gray-50 duration-500"
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
}
