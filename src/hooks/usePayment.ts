// 📂 src/hooks/usePayment.ts

import { PaymentService } from "@/app/services/payment.service";
import { useState } from "react";

export const usePayment = (token: string) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (bookingData: any) => {
    setLoading(true);
    try {
      const session = await PaymentService.createPaymentSession(bookingData, token);
      
      // ইউজারকে সরাসরি Stripe-এর পেমেন্ট পেজে নিয়ে যাবে
      if (session?.url) {
        window.location.href = session.url;
      }
    } catch (error: any) {
      alert(error.message || "Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading };
};