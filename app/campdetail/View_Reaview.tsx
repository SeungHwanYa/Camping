
export default function View({ reviews, formatDate, session }) {
  return (
    <div className="py-6 px-8">
      {reviews.map((review, index) => (
        <div key={index} className="bg-gray-50 p-6 shadow mb-4">
          <div className="flex justify-between border-b border-gray-200 pb-4">
            <p className="text-gray-800 font-bold">{review.userId}</p>
            <div>
              <div className="text-gray-400 px-2 pb-2">
                {formatDate(review.createdAt)}
              </div>
            </div>
          </div>
          <p className="py-8 text-lg text-gray-500">{review.review}</p>
        </div>
      ))}
    </div>
  );
}
