// types/event.ts

export type EventStatus = 
  | "UPCOMING" 
  | "ON_BOARDING" 
  | "DEPARTED" 
  | "ARRIVED" 
  | "DELAYED" 
  | "CANCELLED";

export interface IEvent {
  id: string;
  title: string;
  description: string;
  category: string;     // e.g., 'FLIGHT_ONLY', 'HOLIDAY_PACKAGE'
  dateTime: string;     // Departure ISO Date
  time: string;         // Departure Time
  location: string;     // Arrival City (e.g., Dubai)
  venue: string;        // Departure Airport (e.g., HSIA)
  thumbnail?: string;   // Cloudinary Image URL
  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;
  status: EventStatus;
  
  // --- এয়ার টিকিট স্পেসিফিক ফিল্ডস (নতুন) ---
  airlineName?: string;
  flightNumber?: string;
  flightClass?: string;     // Economy, Business, First Class
  baggageAllowance?: string;
  isRefundable?: boolean;

  // Relationships
  organizerId: string;
  organizer?: {
    user: {
      name: string;
      image?: string;
    };
  };

  createdAt: string;
  updatedAt?: string;
}