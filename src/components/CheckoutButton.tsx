"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CheckoutProps {
  bookingId: string;
  totalAmount: number;
}

export default function CheckoutButton({ bookingId, totalAmount }: CheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setIsLoading(true);
    // সরাসরি এনিমেশন পেজে আইডি পাঠিয়ে দিন
    router.push(`/payments?bookingId=${bookingId}`);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-black uppercase italic tracking-widest text-sm transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
    >
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><CreditCard size={20} /> Pay {totalAmount} BDT</>}
    </button>
  );
}