"use client";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../../integrations.config";

const dataSchema = z.object({
  fach: z.string(),
  schoolType: z.string(),
  ageGroup: z.string(),
  language: z.string(),
});

const ProductNameGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    fach: "",
    schoolType: "",
    ageGroup: "",
    language: "",
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!integrations?.isOpenAIEnabled) {
      toast.error(messages.opanAi);
      return;
    }

    const validation = dataSchema.safeParse(data);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setGeneratedContent("Loading....");

    // the prompt
    const prompt = [
      {
        role: "system",
        content:
          "Du bekommst Informationen zu einem Arbeitsblatt. Mit diesen Infomrationen erstellst du das Arbeitsblatt \n",
      },
      {
        role: "user",
        content: `Thema des Arbeitsblattes: ${data.fach} für das ${data.schoolType} in der ${data.ageGroup}  \n Language: ${data.language}`,
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
        },
      );

      setGeneratedContent(response.data);
    } catch (error: any) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }

    setData({
      fach: "",
      schoolType: "",
      ageGroup: "",
      language: "",
    });
  };

  return (
    <>
      <title>
        Arbeitsblatt Generator
      </title>
      <meta name="description" content="Arbeitsblatt Generator" />
      <Breadcrumb pageTitle="Arbeitsblatt Generator" />

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            <h2 className="pb-2 text-2xl font-bold text-white">
              Arbeitsblatt Generator
            </h2>
            <p className="pb-6">Womit können wir helfen?</p>
            <form onSubmit={handleSubmit}>
              
              <div className="flex flex-col">
                <label htmlFor="description" className="pb-4">
                Fach auswählen:
                </label>
                <select
                  onChange={handleChange}
                  value={data.fach}
                  name="fach"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                  <option value="Geschichte">Geschichte</option>
                  <option value="Biologie">Biologie</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="pb-4">
                Schulform auswählen: 
                </label>
                <select
                  onChange={handleChange}
                  value={data.schoolType}
                  name="schoolType"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                  <option value="Gymnasium">Gymnasium</option>
                  <option value="Hauptschule">Hauptschule</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="pb-4">
                Altersstufe auswählen: 
                </label>
                <select
                  onChange={handleChange}
                  value={data.ageGroup}
                  name="ageGroup"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                  <option value="Unterstufe">Unterstufe</option>
                  <option value="Oberstufe">Oberstufe</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="pb-4">
                Sprache auswählen: 
                </label>
                <select
                  onChange={handleChange}
                  value={data.language}
                  name="language"
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                  <option value="Deutsch">Deutsch</option>
                  <option value="Englisch">Englisch</option>
                </select>
              </div>

              <button
                type="submit"
                className="hero-button-gradient mt-5 w-full rounded-lg px-7 py-3 text-center font-medium text-white duration-300 ease-in hover:opacity-80 "
              >
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

export default ProductNameGeneratorPage;