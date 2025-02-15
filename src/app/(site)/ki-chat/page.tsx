"use client";

import type { Message } from "ai";
import { Chat } from "@/components/Chat/chat";
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';

const generateUUID = () => crypto.randomUUID();

const DDKIKiChat = () => {

//   const selectedModelId =
//     models.find((model) => model.id === modelIdFromCookie)?.id ||
//     DEFAULT_MODEL_NAME;

  const chatId = generateUUID();

  return (
    <Chat
      id={chatId}
      initialMessages={[]}
      isReadonly={false}
    />
  );
};

export default DDKIKiChat;
