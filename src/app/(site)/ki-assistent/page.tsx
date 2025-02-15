"use client";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../integrations.config";
import AssistantAnimation from "@/components/KiAssistentenBuilder";

const ArticleTitleGeneratorSchema = z.object({
  numberOfWord: z.string(),
  articleTopic: z.string(),
  userName: z.string().optional(),
  conversationStarter: z.string().optional(),
  uploadedFile: z.any().optional(),
});

const ArticleTitleGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    numberOfWord: "",
    articleTopic: "",
    userName: "",
    conversationStarter: "",
    uploadedFile: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setData({
      ...data,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setGeneratedContent("Loading....");

    if (!integrations?.isOpenAIEnabled) {
      toast.error(messages.opanAi);
      return;
    }

    const validation = ArticleTitleGeneratorSchema.safeParse(data);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    // the prompt
    const prompt = [
      {
        role: "system",
        content:
          "You will be provided with the article topic, number of words needed, the user's name, and a conversation starter. Your task is to generate multiple article titles.",
      },
      {
        role: "user",
        content: `User Name: ${data.userName}\nNumber of words: ${data.numberOfWord} \nArticle topic: ${data.articleTopic}\nConversation Starter: ${data.conversationStarter}`,
      },
    ];

    //for the demo
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

      const cleanedResponse = response.data.replace(/"/g, "");
      setGeneratedContent(cleanedResponse);
    } catch (error: any) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }

    setData({
      numberOfWord: "",
      articleTopic: "",
      userName: "",
      conversationStarter: "",
      uploadedFile: null,
    });
  };


  return (
    <>
      <title>KI-Assistent</title>
      <meta name="description" content="KI-Assistent" />
      
      <div className="flex items-center justify-center gap-4 mt-2">
        <AssistantAnimation />
        <Breadcrumb pageTitle="KI-Assistent" />
      </div>

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            <h2 className="pb-2 text-2xl font-bold text-white">KI-Assistent</h2>
            <p className="pb-6">Laden Sie hier Ihre Quellen hoch:</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col pb-4">
                <label htmlFor="userName" className="pb-2">Name:</label>
                <input
                  onChange={handleChange}
                  value={data.userName}
                  name="userName"
                  type="text"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  placeholder="Geben Sie Ihrem KI-Assistent einen Namen"
                />
              </div>
              <div className="flex flex-col pb-4">
                <label htmlFor="articleTopic" className="pb-2">Beschreibung:</label>
                <input
                  onChange={handleChange}
                  value={data.articleTopic}
                  name="articleTopic"
                  type="text"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  placeholder="Beschreiben Sie was dieser KI-Assistant tun soll"
                  required
                />
              </div>
              <div className="flex flex-col pb-4">
                <label htmlFor="conversationStarter" className="pb-2">Gesprächsaufhänger:</label>
                <input
                  onChange={handleChange}
                  value={data.conversationStarter}
                  name="conversationStarter"
                  type="text"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  placeholder="Definieren Sie einen Gesprächsaufhänger für den Chatbot"
                />
              </div>
              <div className="flex flex-col pb-4">
                <label htmlFor="uploadedFile" className="pb-2">Datei hochladen: </label>
                <input
                  onChange={handleChange}
                  name="uploadedFile"
                  type="file"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                />
              </div>
              <button className="hero-button-gradient mt-5 w-full rounded-lg px-7 py-3 text-center font-medium text-white duration-300 ease-in hover:opacity-80 ">
                KI-Assistant erstellen
              </button>
            </form>
          </div>
          <PreviewGeneratedText generatedContent={generatedContent} height={262} />
        </div>
      </section>
    </>
  );
};

export default ArticleTitleGeneratorPage;
