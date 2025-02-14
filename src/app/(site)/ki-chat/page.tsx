"use client";

import type { Message } from "ai";
import { Chat } from "@/components/Chat/chat";

const DDKIKiChat = () => {

  const chatId = "chat-123"; // A unique identifier for the chat
  const initialMessages: Message[] = []; // An array of initial messages; can be empty if there are none
  const isReadonly = false; // Set to true if the chat should be read-only

  return (
    <Chat
      id={chatId}
      initialMessages={initialMessages}
      isReadonly={isReadonly}
    />
  );
};

export default DDKIKiChat;
