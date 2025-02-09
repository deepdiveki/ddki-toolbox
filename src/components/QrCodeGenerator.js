import React, { useRef } from "react";
import QRCode from "qrcode-generator";

const QrCodeGenerator = ({ text, size = 200 }) => {
  const qrCodeRef = useRef();

  // QR-Code generieren
  const generateQrCode = () => {
    const qr = QRCode(0, "L"); // Level 0, Fehlerkorrektur-Level L
    qr.addData(text);
    qr.make();

    // Render den QR-Code als HTML
    qrCodeRef.current.innerHTML = qr.createImgTag(size, size); // HTML `<img>` generieren
  };

  return (
    <div>
      <h3>QR Code Generator</h3>
      <button
        onClick={generateQrCode}
        style={{
          padding: "10px 20px",
          margin: "10px 0",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate QR Code
      </button>
      <div ref={qrCodeRef} style={{ margin: "20px 0" }}></div>
    </div>
  );
};

export default QrCodeGenerator;