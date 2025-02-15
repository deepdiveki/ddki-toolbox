"use client";
import APIkeyModal from "@/components/AiTools/APIkeyModal";
import AiToolExample from "@/components/AiTools/AiToolExample";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import Inhalte_teilen from "@/components/AiTools/Inhalte_teilen";
import Material_erstellen from "@/components/AiTools/Material_erstellen";
import KI_Tools_für_Leistungsbewertung_und_kriterienbasiertes_Feedback from "@/components/AiTools/KI_Tools_für_Leistungsbewertung_und_kriterienbasiertes_Feedback";
import KI_Tools_und_Assistenten from "@/components/AiTools/KI_Tools_und_Assistenten";
import Features from "@/components/DDKI-Toolbox/Tools"




const AiToolPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyAvailable, setIsKeyAvailable] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("apiKey");
    setIsKeyAvailable(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    const key = localStorage.getItem("apiKey");
    if (key) {
      setIsKeyAvailable(true);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <title>DeepDive KI ToolBox und KI Fortbildungens</title>
      <meta name="description" content="This is AI Examples page for AI Tool" />

      <Features />
      

      <section className="pb-25 pt-3">
        
          

        {isOpen && <APIkeyModal handleModal={handleModal} />}
      </section>
    </>
  );
};

export default AiToolPage;