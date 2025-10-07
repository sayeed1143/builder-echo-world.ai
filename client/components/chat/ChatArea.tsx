import React, { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  text: string;
  from: "user" | "bot";
};

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to bottom when messages change
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg: Message = { id: Date.now(), text: trimmed, from: "user" };
    setMessages((m) => [...m, msg]);
    setText("");

    // simple echo bot reply (placeholder for real AI integration)
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, text: `Bot: I received \"${trimmed}\"`, from: "bot" },
      ]);
    }, 600);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div
        ref={listRef}
        className="flex-1 overflow-auto rounded-xl border border-white/10 bg-white/5 p-4"
      >
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet. Say hello!</p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${{
                  user: "self-end bg-cyan-500/20 text-white",
                  bot: "bg-slate-900/10 text-white/90",
                }[m.from]}`}
                style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start" }}
              >
                {m.text}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-300/60"
        />
        <button
          onClick={send}
          className="rounded-full bg-cyan-500/80 px-4 py-2 text-sm font-semibold text-white"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
