import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  generatedContent: string;
  height: number;
  showQrCode?: boolean; // Neue Prop für QR-Code-Anzeige
};

const PreviewGeneratedText = ({ generatedContent, height, showQrCode }: Props) => {
  const [copied, setcopied] = useState(false);

  const copyToClipboard = async () => {
    setcopied(true);

    try {
      await navigator.clipboard.writeText(generatedContent);
    } catch (error) {
      console.error("Fehler beim Kopieren:", error);
    }

    setTimeout(() => {
      setcopied(false);
    }, 800);
  };

  const downloadQrCode = () => {
    const canvas = document.querySelector("canvas"); // Findet das QR-Code-Canvas
    if (!canvas) return;

    const image = canvas.toDataURL("image/png"); // Konvertiert Canvas in Bild-URL
    const link = document.createElement("a"); // Erstellt einen Download-Link
    link.href = image;
    link.download = "qr-code.png"; // Dateiname
    link.click(); // Startet den Download
  };

  return (
    <div className="gradient-box rounded-lg bg-dark-8 px-8 pb-8 pt-5 lg:col-span-8">
      <div className="flex items-center justify-between">
        <h2 className="pb-2 text-2xl font-bold text-white">
          Generierter Inhalt:
        </h2>
        <button
          onClick={copyToClipboard}
          className="button-border-gradient hover:button-gradient-hover relative mt-9 inline-flex items-center gap-1.5 rounded-lg px-6 py-3 text-sm text-white shadow-button hover:shadow-none"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {showQrCode && generatedContent && (
        <>
          <div className="mt-6 flex justify-center">
            <QRCodeCanvas
              value={generatedContent}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={downloadQrCode}
              className="hero-button-gradient px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-80"
            >
              QR-Code herunterladen
            </button>
          </div>
        </>
      )}
      <textarea
        className={`mt-6 w-full rounded-lg border border-white/[0.12] bg-dark-7 p-5 outline-none focus:border-white/10 ${
          height === 442 ? "min-h-[442px]" : "min-h-[262px]"
        } ${generatedContent ? "text-white" : "cursor-no-drop"}`}
        value={generatedContent || "Kein Inhalt verfügbar."}
        readOnly
      ></textarea>
    </div>
  );
};

export default PreviewGeneratedText;