
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ApiMessageProps {
  isSuccess: boolean;
  isError?: boolean;
  error?: unknown;
  successMessage?: string;
  redirectPath?: string;
}

const useApiMessage = ({
  isSuccess,
  isError,
  error,
  successMessage = "Operation successful!",
  redirectPath,
}: ApiMessageProps): void => {
  const router = useRouter();

  useEffect(() => {
    // ✅ Handle Success
    if (isSuccess) {
      toast.success(successMessage);
      if (redirectPath) router.push(redirectPath);
    }

    // ❌ Handle Error
    if (isError && error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (typeof error === "string") {
        errorMessage = error;
      } else if (typeof error === "object" && error !== null) {
        const e = error as any;
        errorMessage = e?.data?.message || e?.message || e?.error || errorMessage;
      }

      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, successMessage, redirectPath, router]);
};

export default useApiMessage;
