export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface IEvent {
  id: string;
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
  organizerId: string;
  createdAt: string;
}