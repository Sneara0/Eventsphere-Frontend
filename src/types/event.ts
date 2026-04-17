// types/event.ts

export type EventStatus = 
  | "UPCOMING" 
  | "ON_BOARDING" 
  | "DEPARTED" 
  | "ARRIVED" 
  | "DELAYED" 
  | "CANCELLED";

export interface IEvent {

  _id: string;          
  id: string;           // '?' সরিয়ে দিন, কারণ এপিআই থেকে আসার সময় আমরা এটি ম্যাপ করে নিব
  title: string;
  description: string;
  category: string;     
  dateTime: string;     
  time: string;         
  location: string;     
  venue: string;        
  thumbnail?: string;   
  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;
  status: EventStatus;
  
  // --- এয়ার টিকিট স্পেসিফিক ফিল্ডস ---
  airlineName?: string;
  flightNumber?: string;
  flightClass?: string;     
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