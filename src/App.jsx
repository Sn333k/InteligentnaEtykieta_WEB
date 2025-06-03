import React from "react";
import "./App.css";
import { useUploader } from "./hooks/useUploader";
import ProgressModal from "./components/ProgressModal";
import UploadCard from "./components/UploadCard";
import PaintEditor from "./components/PaintEditor";
import TextEditor from "./components/TextEditor";

export default function App() {
  const { progress, sendBlob, close } = useUploader();

  return (
    <div className="container">
      <ProgressModal progress={progress} onClose={close} />

      <h1>Inteligentna Etykieta</h1>

      <UploadCard onSend={sendBlob} />
      <PaintEditor onSend={sendBlob} />
      <TextEditor onSend={sendBlob} />
    </div>
  );
}
