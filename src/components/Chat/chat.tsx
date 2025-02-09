"use client";

import Breadcrumb from "@/components/Breadcrumb";

type Message = {
  sender: string;
  text: string;
};

interface ChatProps {
  messages: Message[];
  inputMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Chat({ messages, inputMessage, handleChange, handleSubmit }: ChatProps) {
  return (
    <>
      <title>DDKI KI-Chat</title>
      <meta name="description" content="This is AI Examples page for AI Tool" />
      <Breadcrumb pageTitle="KI-Chat" />
      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto max-w-[800px] px-4 sm:px-8">

          {/* Chat Messages */}
          <div className="rounded-lg bg-transparent p-8 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                  } max-w-[70%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-800 rounded-lg p-2 mt-4 shadow-md"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={handleChange}
              placeholder="Sende eine Nachricht an den DDKI KI-Chat"
              className="flex-1 bg-transparent text-white px-3 py-2 outline-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-gray-700 text-white w-10 h-10 rounded-full hover:bg-gray-600"
            >
              ▲
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
