import { useState } from "react";
import { generatePBM_P4 } from "../imageToPBM";

export function useUploader() {
  const [progress, setProgress] = useState(null); // {percent, error} | null

  const sendBlob = async (blob) => {
    setProgress({ percent: 0, error: false });
    try {
      const pbmBlob = await generatePBM_P4(blob);
      const formData = new FormData();
      formData.append("image", new File([pbmBlob], "image.pbm"));

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.4.1/upload");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const p = Math.round((e.loaded / e.total) * 100);
            setProgress({ percent: p, error: false });
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setProgress({ percent: 100, error: false });
            setTimeout(() => setProgress(null), 1500);
            resolve();
          } else {
            setProgress({ error: true });
            reject(new Error("Upload error"));
          }
        };

        xhr.onerror = () => {
          setProgress({ error: true });
          reject(new Error("Network error"));
        };

        xhr.send(formData);
      });
    } catch (e) {
      console.error(e);
      setProgress({ error: true });
    }
  };

  return { progress, sendBlob, close: () => setProgress(null) };
}
