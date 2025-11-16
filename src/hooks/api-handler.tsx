"use client";

import axiosInstance from "@/feature/axiosInstance";
import { useState, useRef, useEffect, useCallback } from "react";

export type UploadConfig<TExtra extends Record<string, any> = {}> = {
  path: string;
  method?: "post" | "put" | "patch";
  extraData?: TExtra;
  retries?: number;
};

export type FileUploadResult<T = any> = {
  message: string;
  data: T;
};

export function useFileUpload<
  TResponse = any,
  TExtra extends Record<string, any> = {}
>({
  path,
  method = "post",
  extraData = {} as TExtra,
  retries = 1,
}: UploadConfig<TExtra>) {
  const [progress, setProgress] = useState(0);
  const [fileProgress] = useState<number[]>([]);
  const [speed, setSpeed] = useState(0);
  const [eta, setEta] = useState(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] =
    useState<FileUploadResult<TResponse> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortCtrl = useRef<AbortController | null>(null);

  /** Auto-cancel upload on unmount (page change) */
  useEffect(() => {
    return () => abortCtrl.current?.abort();
  }, []);

  /** Main upload executor */
  const upload = useCallback(
    async (formData: FormData) => {
      abortCtrl.current = new AbortController();
      let attempt = 0;

      const executeUpload = async (): Promise<FileUploadResult<TResponse>> => {
        attempt++;

        const startTime = Date.now();
        let lastLoaded = 0;

        try {
          setLoading(true);
          setError(null);
          setResponse(null);
          setProgress(0);
          setSpeed(0);
          setEta(0);

          /** Append extraData to formData */
          for (const key in extraData) {
            if (Object.prototype.hasOwnProperty.call(extraData, key)) {
              formData.append(key, String(extraData[key]));
            }
          }

          const res = await axiosInstance.request<FileUploadResult<TResponse>>({
            url: path,
            method,
            data: formData,
            signal: abortCtrl.current!.signal,
            headers: { "Content-Type": "multipart/form-data" },

            onUploadProgress: (e) => {
              if (!e.total) return;

              /** Total progress */
              const percent = Math.round((e.loaded / e.total) * 100);
              setProgress(percent);

              /** Upload speed (KB/s) */
              const elapsedSec = (Date.now() - startTime) / 1000;
              const currentSpeed = (e.loaded - lastLoaded) / elapsedSec / 1024;
              setSpeed(currentSpeed);

              /** ETA */
              const remaining = e.total - e.loaded;
              const etaSec =
                remaining / (currentSpeed * 1024 || 1);
              setEta(etaSec);

              lastLoaded = e.loaded;
            },
          });

          setResponse(res.data);
          return res.data;
        } catch (err: any) {
          if (attempt <= retries) {
            console.warn(`Retrying upload… (attempt ${attempt})`);
            return executeUpload();
          }

          setError(err?.message || "Upload failed");
          throw err;
        } finally {
          setLoading(false);
        }
      };

      return executeUpload();
    },
    [path, method, extraData, retries]
  );

  /** Cancel upload */
  const cancelUpload = () => {
    abortCtrl.current?.abort();
  };

  return {
    upload,
    progress,
    fileProgress,
    speed,
    eta,
    loading,
    response,
    error,
    cancelUpload,
  };
}
