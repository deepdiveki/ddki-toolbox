"use client";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../integrations.config";
import AbstractBoxAnimation from "@/components/WorksheetGeneratorAnimation";

const dataSchema = z.object({
  fach: z.string(),
  schoolType: z.string(),
  ageGroup: z.string(),
  language: z.string(),
  topic: z.string().min(3, "Das Thema muss mindestens 3 Zeichen lang sein."),
});

const ProductNameGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    fach: "",
    schoolType: "",
    ageGroup: "",
    language: "",
    topic: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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

    const prompt = [
      {
        role: "system",
        content: "Du bekommst Informationen zu einem Arbeitsblatt. Mit diesen Informationen erstellst du das Arbeitsblatt \n",
      },
      {
        role: "user",
        content: `Thema des Arbeitsblattes: ${data.topic} \n Fach: ${data.fach} \n Schulform: ${data.schoolType} \n Altersstufe: ${data.ageGroup} \n Sprache: ${data.language}`,
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
      setGeneratedContent(response.data);
    } catch (error) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }

    setData({
      fach: "",
      schoolType: "",
      ageGroup: "",
      language: "",
      topic: "",
    });
  };

  return (
    <>
      <title>Arbeitsblatt Generator</title>
      <meta name="description" content="Arbeitsblatt Generator" />
      
      <div className="flex items-center justify-center gap-4 mt-2">
        <AbstractBoxAnimation />
        <Breadcrumb pageTitle="Arbeitsblatt Generator" />
      </div>

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            

            <h2 className="pb-2 text-2xl font-bold text-white">
              Arbeitsblatt Generator
            </h2>
            
            <form onSubmit={handleSubmit}>
              
              {/* Eingabefeld für das Thema */}
              <div className="flex flex-col">
                <label htmlFor="topic" className="pb-4">Thema des Arbeitsblattes:</label>
                <input
                  type="text"
                  name="topic"
                  value={data.topic}
                  onChange={handleChange}
                  className="rounded-lg border border-white/[0.12] bg-dark-7 px-5 py-3 text-white outline-none focus:border-purple"
                  placeholder="z. B. Photosynthese, Weimarer Republik, Shakespeare"
                  required
                />
              </div>
              
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
                  <option value="Deutsch">Deutsch</option>
<option value="Mathematik">Mathematik</option>
<option value="Englisch">Englisch</option>
<option value="Französisch">Französisch</option>
<option value="Spanisch">Spanisch</option>
<option value="Latein">Latein</option>
<option value="Italienisch">Italienisch</option>
<option value="Russisch">Russisch</option>
<option value="Geschichte">Geschichte</option>
<option value="Politik/Wirtschaft">Politik/Wirtschaft</option>
<option value="Sozialkunde">Sozialkunde</option>
<option value="Erdkunde">Erdkunde</option>
<option value="Biologie">Biologie</option>
<option value="Chemie">Chemie</option>
<option value="Physik">Physik</option>
<option value="Informatik">Informatik</option>
<option value="Musik">Musik</option>
<option value="Kunst">Kunst</option>
<option value="Darstellendes Spiel">Darstellendes Spiel</option>
<option value="Sport">Sport</option>
<option value="Religion">Religion</option>
<option value="Ethik">Ethik</option>
<option value="Philosophie">Philosophie</option>
<option value="Technik">Technik</option>
<option value="Naturwissenschaft und Technik (NwT)">Naturwissenschaft und Technik (NwT)</option>
<option value="Wirtschaft">Wirtschaft</option>
<option value="Betriebswirtschaftslehre (BWL)">Betriebswirtschaftslehre (BWL)</option>
<option value="Volkswirtschaftslehre (VWL)">Volkswirtschaftslehre (VWL)</option>
<option value="Recht">Recht</option>
<option value="Pädagogik">Pädagogik</option>
<option value="Psychologie">Psychologie</option>
<option value="Hauswirtschaft">Hauswirtschaft</option>
<option value="Gesundheit">Gesundheit</option>
<option value="Medienbildung">Medienbildung</option>
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
                  <option value="Grundschule">Grundschule</option>
<option value="Hauptschule">Hauptschule</option>
<option value="Realschule">Realschule</option>
<option value="Gymnasium">Gymnasium</option>
<option value="Gesamtschule">Gesamtschule</option>
<option value="Förderschule">Förderschule</option>
<option value="Berufsschule">Berufsschule</option>
<option value="Berufsfachschule">Berufsfachschule</option>
<option value="Stadtteilschule">Stadtteilschule</option>
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
                  <option value="Grundschule">Grundschule</option>
                  <option value="Unterstufe">Unterstufe</option>
                  <option value="Mittelstufe">Mittelstufe</option>
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
                Arbeitsblatt erstellen
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