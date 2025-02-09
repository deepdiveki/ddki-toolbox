"use client";

import axios from "axios";
import { useState } from "react";
import { Chat } from "@/components/Chat/chat";

const DDKIKiChat = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage) {
      alert("Please enter a message.");
      return;
    }

    // Add user's message to state
    setMessages((prev) => [...prev, { sender: "user", text: inputMessage }]);
    setGeneratedContent("Generating response...");

    const prompt = [
      {
        role: "system",
        content: "You are an AI chatbot. Respond to the user's message.",
      },
      {
        role: "user",
        content: inputMessage,
      },
    ];

    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await axios.post(
        "/api/generate-content",
        { prompt, apiKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const botMessage = response.data || "No response generated.";
      setGeneratedContent(botMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error: any) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }

    setInputMessage("");
  };

  return (
    <Chat
      messages={messages}
      inputMessage={inputMessage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default DDKIKiChat;
