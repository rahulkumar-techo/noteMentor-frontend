"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export function useCloudinaryUpload() {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [eta, setEta] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortCtrl = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortCtrl.current?.abort();
  }, []);

  // ⬆️ Upload file → Cloudinary using signed credentials
  const upload = async (
    file: File,
    signatureData: {
      timestamp: number;
      signature: string;
      apiKey: string;
      cloudName: string;
      folder: string;
    }
  ) => {
    abortCtrl.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", String(signatureData.timestamp));
      formData.append("signature", signatureData.signature);
      formData.append("folder", signatureData.folder);

      const start = Date.now();
      let lastLoaded = 0;

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/auto/upload`,
        formData,
        {
          signal: abortCtrl.current.signal,
          onUploadProgress: (e) => {
            if (!e.total) return;
            const percent = Math.round((e.loaded / e.total) * 100);
            setProgress(percent);

            const elapsed = (Date.now() - start) / 1000;
            const currentSpeed = (e.loaded - lastLoaded) / elapsed / 1024;
            setSpeed(currentSpeed);
            lastLoaded = e.loaded;

            const remaining = e.total - e.loaded;
            const etaSec = remaining / (currentSpeed * 1024 || 1);
            setEta(etaSec);
          },
        }
      );

      return res.data; // Cloudinary JSON
    } catch (err: any) {
      setError(err?.message || "Upload failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // cancel upload
  const cancel = () => abortCtrl.current?.abort();

  return {
    upload,
    progress,
    speed,
    eta,
    loading,
    error,
    cancel,
  };
}
