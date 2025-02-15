"use client";
import PreviewGeneratedText from "@/components/AiTools/PreviewGeneratedText";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import PDFChatAnimation from "@/components/ChatMitPdfAnimation";

const ArticleTitleGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [data, setData] = useState({
    uploadedFile: null,
  });

  const handleChange = (e: any) => {
    const { name, files } = e.target;
    setData({
      ...data,
      [name]: files ? files[0] : null,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setGeneratedContent("Loading....");

    // API call simulation for file upload (adjust as needed)
    try {
      if (!data.uploadedFile) {
        toast.error("Bitte eine Datei hochladen!");
        return;
      }

      const formData = new FormData();
      formData.append("file", data.uploadedFile);

      const response = await axios.post("/api/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setGeneratedContent("Datei erfolgreich hochgeladen!");
    } catch (error: any) {
      setGeneratedContent("Fehler beim Hochladen der Datei!");
      console.error("Error:", error?.message);
    }
  };

  return (
    <>
      <title>Chat mit PDF</title>
      <meta name="description" content="KI-Assistent" />
      
      <div className="flex items-center justify-center gap-4 mt-2">
        <PDFChatAnimation />
        <Breadcrumb pageTitle="Chat mit PDF" />
      </div>

      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto grid max-w-[1170px] gap-8 px-4 sm:px-8 lg:grid-cols-12 xl:px-0">
          <div className="gradient-box rounded-lg bg-dark-8 p-8 lg:col-span-4">
            <h2 className="pb-2 text-2xl font-bold text-white">Chat mit PDF</h2>
            <p className="pb-6">Laden Sie hier Ihre Datei hoch:</p>
            <form onSubmit={handleSubmit}>
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
                Datei hochladen
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
