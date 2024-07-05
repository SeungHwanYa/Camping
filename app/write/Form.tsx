interface FormProps {
  session: any;
  handleButtonClick: () => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  isSubmitDisabled: boolean;
}
export default function Form({
  setReviewText,
  handleButtonClick,
  reviewText,
  session,
  isSubmitDisabled,
}: FormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 py-8">
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
          className={`resize-none mt-1 block w-full h-80 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none ${
            session
              ? "focus:ring-orange-500 focus:border-orange-500"
              : "focus:ring-gray-300 focus:border-gray-300 cursor-not-allowed"
          } sm:text-sm`}
          disabled={!session}
          required
        />
      </div>

      <div>
        <button
          type="button"
          onClick={handleButtonClick}
          className={`w-full py-4 px-4 text-white font-bold text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            session
              ? "bg-orange-300 hover:bg-orange-400 focus:ring-orange-500"
              : "bg-gray-300 cursor-not-allowed focus:ring-gray-300"
          }`}
          disabled={isSubmitDisabled}
        >
          리뷰 쓰기
        </button>
      </div>
    </form>
  );
}
