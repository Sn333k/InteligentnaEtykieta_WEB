import React, { useState } from "react";
import "./App.css";
import { useUploader } from "./hooks/useUploader";
import ProgressModal from "./components/ProgressModal";
import UploadCard from "./components/UploadCard";
import PaintEditor from "./components/PaintEditor";
import TextEditor from "./components/TextEditor";
import AccordionCard from "./components/AccordionCard";
import logo from "./logoDUZE.png";


export default function App() {
  const { progress, sendBlob, close } = useUploader();
  const [openPanel, setOpenPanel] = useState(null);

  const togglePanel = (name) => {
    setOpenPanel(openPanel === name ? null : name);
  };

  return (
    <div className="container">
      <ProgressModal progress={progress} onClose={close} />
      <img src={logo} alt="Logo" className="logo" />
      <h1>Inteligentna Etykieta</h1>

      <AccordionCard
        title="Prześlij swoje zdjęcie"
        isOpen={openPanel === "upload"}
        onToggle={() => togglePanel("upload")}
      >
        <UploadCard onSend={sendBlob} />
      </AccordionCard>

      <AccordionCard
        title="Narysuj"
        isOpen={openPanel === "paint"}
        onToggle={() => togglePanel("paint")}
      >
        <PaintEditor onSend={sendBlob} />
      </AccordionCard>

      <AccordionCard
        title="Edytor tekstowy"
        isOpen={openPanel === "text"}
        onToggle={() => togglePanel("text")}
      >
        <TextEditor onSend={sendBlob} />
      </AccordionCard>
    </div>
  );
}

