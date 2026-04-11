import { Star, User } from "lucide-react";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (reviews.length === 0) return (
    <div className="text-center py-10 border border-dashed border-white/10 rounded-[2rem] text-slate-500 text-[10px] uppercase font-black">
      No reviews yet for this event.
    </div>
  );

  return (
    <div className="space-y-4">
      {reviews.map((rev) => (
        <div key={rev.id} className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                {rev.user.image ? <img src={rev.user.image} className="rounded-lg" /> : <User size={16} />}
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase italic">{rev.user.name}</h4>
                <div className="flex gap-0.5 text-primary mt-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                </div>
              </div>
            </div>
            <span className="text-[9px] text-slate-600 font-bold">{new Date(rev.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
}