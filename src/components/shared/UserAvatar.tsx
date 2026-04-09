// components/shared/UserAvatar.tsx
import { User } from "lucide-react";

export default function UserAvatar({ imageUrl }: { imageUrl?: string }) {
  return (
    <div className="relative w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="User" 
          className="w-full h-full object-cover transition-transform hover:scale-110" 
        />
      ) : (
        <User size={20} className="text-gray-500" />
      )}
    </div>
  );
}