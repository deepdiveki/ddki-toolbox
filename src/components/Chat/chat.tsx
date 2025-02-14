'use client';

import Breadcrumb from "@/components/Breadcrumb";
import type { Message } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  });

const generateUUID = () => crypto.randomUUID();

export function Chat({
      id,
      initialMessages,
      //selectedModelId,
      isReadonly,
    }: {
      id: string;
      initialMessages: Array<Message>;
      //selectedModelId: string;
      isReadonly: boolean;
    }) {
      const { mutate } = useSWRConfig();
      const modelId = 'gpt-4';

      const {
        messages,
        setMessages,
        handleSubmit,
        input,
        setInput,
        append,
        isLoading,
        stop,
        reload,
      } = useChat({
        id,
        body: { id, modelId },
        initialMessages,
        experimental_throttle: 100,
        sendExtraMessageFields: true,
        generateId: generateUUID,
        onFinish: () => {
          mutate('/api/history');
        },
      });


  return (
    <>
    <Breadcrumb pageTitle="KI-Chat" />
      <div className="flex flex-col pt-[80px] pb-[120px]">

<div className="flex-grow flex flex-col ">
        <Messages
          chatId={id}
          isLoading={isLoading}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />
        </div>

        <form className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] ">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

    </>
  );
}