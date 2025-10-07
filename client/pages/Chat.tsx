import React from "react";
import ChatArea from "@/components/chat/ChatArea";

export default function Chat() {
  return (
    <div className="flex h-full flex-col gap-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-bold text-white">Chat</h2>
        <p className="text-sm text-cyan-100/80">Ask Shunya anything — instant AI chat placeholder.</p>
      </header>
      <main className="flex h-full">
        <ChatArea />
      </main>
    </div>
  );
}
