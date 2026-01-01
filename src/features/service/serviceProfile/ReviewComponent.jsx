import { MessageSquare, Star } from "lucide-react";

const ReviewsSection = ({ reviews = [], totalReviews = 0, rating = 0 }) => {
  // If there are no reviews, show a clean empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="border-t border-gray-100 pt-12 mt-12">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <MessageSquare size={24} /> Reviews
        </h3>
        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">
            No reviews yet for this service.
          </p>
          <p className="text-sm text-gray-400">
            Be the first to share your experience!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 pt-12 mt-12">
      {/* Reviews Header Summary */}
      <div className="flex items-center gap-6 mb-10">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Star size={24} className="fill-current" />{" "}
          {rating > 0 ? rating : "New"}
        </h3>
        <span className="text-2xl text-gray-300">|</span>
        <h3 className="text-2xl font-semibold">{totalReviews} Reviews</h3>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, idx) => (
          <div key={review.id || idx} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
                {review.user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 leading-tight capitalize">
                  {review.user?.name}
                </h4>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < review.rating
                          ? "fill-current text-gray-900"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed italic">
              "{review.body}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
