// 📂 src/services/payment.service.ts

export const PaymentService = {
  /**
   * ১. Stripe Checkout Session তৈরি করা
   * এটি কল করলে ব্যাকেন্ড থেকে একটি URL আসবে যেখানে ইউজার পেমেন্ট করবে
   */
  createPaymentSession: async (bookingData: any, token: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/create-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create payment session');
    }

    // পেমেন্ট গেটওয়ে ইউআরএল (Stripe Checkout URL) রিটার্ন করবে
    return result.data; // { id: string, url: string }
  },

  /**
   * ২. ইনভয়েস ডাউনলোড করা
   */
  downloadInvoice: async (bookingId: string, token: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/download-invoice/${bookingId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error('Invoice download failed');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice-${bookingId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // মেমোরি ক্লিনআপ
  },
};