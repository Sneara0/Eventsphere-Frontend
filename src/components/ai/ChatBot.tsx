"use client"
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { EventService } from '@/app/services/event.service';
// নিশ্চিত করুন এই পাথটি সঠিক, আগের এরর অনুযায়ী @/services/event.service হতে পারে


export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([{ role: 'ai', text: 'How can I help you today?' }]);
  
  // অটো স্ক্রল করার জন্য রেফারেন্স
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const handleChat = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // এপিআই কল
      const res = await EventService.askChatBot(userMessage);
      
      // আপনার ব্যাকএন্ড স্ট্রাকচার অনুযায়ী ডাটা নেওয়া
      const aiReply = res.data?.data?.reply || res.data?.reply || "I'm not sure how to answer that.";
      
      setChat(prev => [...prev, { role: 'ai', text: aiReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChat(prev => [...prev, { role: 'ai', text: 'Error connecting to AI server. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-card border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-5 bg-primary text-white font-bold flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>AI Assistant</span>
            </div>
            <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat Messages */}
          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 text-[13px] scroll-smooth bg-muted/20">
            {chat.map((c, i) => (
              <div key={i} className={`flex ${c.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 shadow-sm ${
                  c.role === 'ai' 
                  ? 'bg-card border rounded-2xl rounded-tl-none text-foreground' 
                  : 'bg-primary text-white rounded-2xl rounded-tr-none'
                }`}>
                  {c.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4 text-primary" />
                  <span className="opacity-50">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t bg-card flex gap-2">
            <input 
              value={input} 
              autoFocus
              className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 ring-primary/20 transition-all" 
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              onChange={(e) => setInput(e.target.value)} 
            />
            <button 
              disabled={loading || !input.trim()}
              onClick={handleChat} 
              className="p-2 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}