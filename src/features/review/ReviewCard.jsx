import { Star } from "lucide-react";

const ReviewCard = ({ review }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-black border border-accent/20 uppercase text-sm">
        {review.user?.name?.charAt(0) || "U"}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white leading-tight capitalize text-sm">
          {review.user?.name}
        </h4>
        <div className="flex gap-0.5 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              className={
                i < review.rating
                  ? "fill-accent text-accent"
                  : "text-light-700 dark:text-white/10"
              }
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light italic text-sm">
      "{review.body}"
    </p>
  </div>
);
export default ReviewCard;
