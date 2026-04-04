"use client";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { BookingService } from "@/app/services/booking.service";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    BookingService.getMyBookings().then((res) => setBookings(res.data));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await BookingService.deleteBooking(id);
      setBookings(bookings.filter((b: any) => b.id !== id));
      toast.success("Deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 uppercase text-xs font-bold">
          <tr>
            <th className="p-4 text-left">Event</th>
            <th className="p-4">Qty</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {bookings.map((b: any) => (
            <tr key={b.id} className="text-center">
              <td className="p-4 text-left font-medium">{b.event.title}</td>
              <td className="p-4">{b.quantity}</td>
              <td className="p-4">
                <button onClick={() => handleDelete(b.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}