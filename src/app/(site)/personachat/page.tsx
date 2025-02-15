"use client";
import Options from "@/components/AiTools/Options";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../integrations.config";
import PersonaAnimation from "@/components/PersonaToolAnimation";

const ArticleTitleGeneratorSchema = z.object({
  numberOfWord: z.string(),
});

const optionData = [
  "Marie Curie",
  "Albert Einstein",
  "Ada Lovelace",
  "Leonardo da Vinci",
  "Rosa Parks",
  "Nelson Mandela",
  "Frida Kahlo",
  "Wolfgang Amadeus Mozart",
  "Amelia Earhart",
  "Isaac Newton"
];

const ArticleTitleGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    numberOfWord: "",
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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
          "You will be provided with the number of words needed, and your task is to generate multiple article titles.",
      },
      {
        role: "user",
        content: `Number of words: ${data.numberOfWord}`,
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
    });
  };

  return (
    <>
      <title>Personachat</title>
      <meta name="description" content="Personachat" />
      <div className="flex items-center justify-center gap-4 mt-2">
        <PersonaAnimation />
        <Breadcrumb pageTitle="Persona-Chat" />
      </div>

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            <h2 className="pb-2 text-2xl font-bold text-white">Personachat</h2>
            <p className="pb-6">Wähle eine fiktive oder historische Person für eine Unterhaltung aus
            </p>
            <form onSubmit={handleSubmit}>
              <Options
                values={optionData}
                title={"Hier auswählen:"}
                name={"numberOfWord"}
                handleChange={handleChange}
                selected={data.numberOfWord}
              />

              <button className="hero-button-gradient mt-5 w-full rounded-lg px-7 py-3 text-center font-medium text-white duration-300 ease-in hover:opacity-80 ">
                Generate
              </button>
            </form>
          </div>
          <PreviewGeneratedText
            generatedContent={generatedContent}
            height={262}
          />
        </div>
      </section>
    </>
  );
};

export default ArticleTitleGeneratorPage;
