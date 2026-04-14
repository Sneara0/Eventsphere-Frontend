'use client';

import { usePayment } from "@/hooks/usePayment";
import { CreditCard, Loader2 } from "lucide-react";

export const PaymentButton = ({ booking, token }: { booking: any, token: string }) => {
  const { handlePayment, loading } = usePayment(token);

  const bookingData = {
    bookingId: booking.id,
    totalAmount: booking.totalAmount,
    userEmail: booking.user?.email,
    userId: booking.userId,
    eventName: booking.event?.title,
  };

  return (
    <button
      onClick={() => handlePayment(bookingData)}
      disabled={loading}
      className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-all font-bold text-[11px] uppercase tracking-widest"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <CreditCard className="w-4 h-4 mr-2" />
      )}
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};