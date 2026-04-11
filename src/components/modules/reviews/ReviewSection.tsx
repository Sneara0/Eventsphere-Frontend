"use client";

import { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { MessageSquare, Sparkles } from "lucide-react";

export default function ReviewSection({ eventId }: { eventId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/event/${eventId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setReviews(data.data);
        setLoading(false);
      });
  }, [eventId]);

  const handleNewReview = (newReview: any) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <section className="py-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg text-primary"><MessageSquare size={20} /></div>
        <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">
          Event <span className="text-primary">Feedback</span>
        </h3>
      </div>

      <ReviewForm eventId={eventId} onSuccess={handleNewReview} />
      
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 to-transparent opacity-20" />
        <ReviewList reviews={reviews} />
      </div>
    </section>
  );
}