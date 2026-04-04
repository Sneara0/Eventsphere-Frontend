import { EventStatus } from "@/types/event";

// utils/getStatusColor.ts
export const getStatusColor = (status: EventStatus) => {
  switch (status) {
    case "UPCOMING": return "blue";
    case "DEPARTED": return "purple";
    case "ARRIVED": return "green";
    case "DELAYED": return "orange";
    case "CANCELLED": return "red";
    default: return "gray";
  }
};