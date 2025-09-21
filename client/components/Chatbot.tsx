import { useEffect, useMemo, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message { role: "user" | "assistant"; content: string }

function suggestReply(input: string): string {
  const text = input.toLowerCase();
  if (/(cramp|pain|ache)/.test(text)) {
    return "Cramps can be tough. Try gentle movement, hydration, a warm compress, and magnesium-rich foods. If pain is severe or unusual, consider talking to a healthcare professional.";
  }
  if (/(when|next).*period/.test(text) || /late/.test(text)) {
    return "Your next period timing depends on your cycle length and last start date. From your tracker, check the 'Next period' card. I can help you adjust your cycle length in settings if it's off.";
  }
  if (/(mood|tired|energy|sleep)/.test(text)) {
    return "Energy can ebb and flow across the cycle. Prioritize sleep, steady snacks, and gentle movement. You're doing great—be kind to yourself today.";
  }
  return "I'm here for cycle questions, cramps relief tips, and day-to-day support. Ask me anything—hydration, nutrition, workouts, or timing.";
}

export function ChatbotFloating() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hey! I'm Aura—your gentle cycle buddy. How can I support you today?",
  }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    const value = input.trim();
    if (!value) return;
    const reply = suggestReply(value);
    setMessages((m) => [...m, { role: "user", content: value }, { role: "assistant", content: reply }]);
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const hint = useMemo(() => (
    <div className="text-xs text-muted-foreground">Try: "cramps relief", "when is my next period?", "low energy today"</div>
  ), []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button id="chatbot" size="lg" className="fixed bottom-6 right-6 rounded-full shadow-lg bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-500 text-white hover:opacity-90">
          <MessageCircle className="mr-2" /> Chat
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500">Aura Chat</DrawerTitle>
          {hint}
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto max-h-[45vh]">
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}> 
                <div className={cn("rounded-2xl px-4 py-2 max-w-[85%] text-sm", m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary/60 text-foreground rounded-bl-sm")}>{m.content}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
        </div>
        <DrawerFooter>
          <div className="flex items-end gap-2">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="min-h-12 h-12 resize-none" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}} />
            <Button onClick={handleSend} className="h-12 px-4"><Send className="size-4" /></Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
