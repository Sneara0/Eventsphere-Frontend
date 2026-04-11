"use client";

import React, { Suspense } from "react";
import ReviewForm from "@/components/modules/reviews/ReviewForm"; // আপনার দেওয়া পাথ অনুযায়ী আপডেট করা
import { authClient } from "@/lib/auth-client";
import { Loader2, MessageSquare, Ticket, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ReviewContent() {
  const { data: session, isPending } = authClient.useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL থেকে ডাটা নেওয়া
  const eventId = searchParams.get("eventId");
  const eventName = searchParams.get("eventName") || "the selected event";

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
          Syncing Orbit Data...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6">
        <h2 className="text-2xl font-black uppercase italic text-white">Access Denied</h2>
        <Link 
          href={`/login?callbackURL=/dashboard/review?eventId=${eventId}`}
          className="bg-primary text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
        >
          Login to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="flex flex-col gap-3 mb-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-4"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
        
        <div className="flex items-center gap-3 text-primary">
          <MessageSquare size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Feedback Terminal</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black uppercase italic text-white tracking-tighter leading-none">
          Post Your <span className="text-primary">Review</span>
        </h1>
        
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-2">
          Event: <span className="text-white underline decoration-primary/30 underline-offset-4">{eventName}</span>
        </p>
      </div>

      {/* Review Form Component */}
      {eventId ? (
        <div className="relative group">
           <ReviewForm 
            eventId={eventId} 
            onSuccess={() => {
              router.push("/dashboard");
              router.refresh();
            }} 
          />
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-dashed border-white/10 p-20 rounded-[3rem] flex flex-col items-center text-center gap-6">
          <Ticket size={40} className="text-slate-800" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 max-w-[250px]">
            No valid event ID detected. Please return to dashboard.
          </p>
        </div>
      )}
    </div>
  );
}

// Next.js এ useSearchParams ব্যবহার করলে Suspense দিয়ে র‍্যাপ করা জরুরি
export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}