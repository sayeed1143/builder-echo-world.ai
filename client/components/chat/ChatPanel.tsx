import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAppStore, type Message } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ChatPanel() {
  const { messages, addMessage, addNode } = useAppStore();
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const send = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      text: trimmed,
      from: "user",
    };
    addMessage(userMessage);
    addNode({ title: trimmed, tag: "User Input" });
    setText("");

    // Placeholder for AI reply
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: `Bot: I've added "${trimmed}" to the canvas.`,
        from: "bot",
      };
      addMessage(botMessage);
    }, 600);
  }, [text, addMessage, addNode]);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex h-full flex-col bg-card text-card-foreground">
      <div className="border-b p-4">
        <h3 className="font-semibold text-foreground">Chat & Input</h3>
      </div>
      <div
        ref={listRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No messages yet. Ask anything to add a node to the canvas.
          </p>
        ) : (
          messages.map((m, index) => (
            <React.Fragment key={m.id}>
              <div
                className={`flex flex-col text-sm ${
                  m.from === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    m.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
              {index < messages.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything..."
            className="flex-1"
          />
          <Button onClick={send} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
