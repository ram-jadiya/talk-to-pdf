import React, { useEffect, useRef } from "react";
import { Chats } from "@/types/doc";
import { ChatMessage } from "./chatMessage";

interface ChatContainerProps {
  chats: Chats;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ chats }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div ref={chatContainerRef} className="overflow-y-auto hide-scrollbar">
      {chats.reverse().map((it) => (
        <ChatMessage key={it.id} query={it.query} response={it.response} />
      ))}
    </div>
  );
};
