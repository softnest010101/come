import { useState } from "react";
import axios from "axios";
import type { PlacedTool } from "@/components/builder/types/PlacedTool";

export function useSaveCanvas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveCanvas = async (tools: PlacedTool[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/canvas", { tools });
      setSuccess(true);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    saveCanvas,
    loading,
    error,
    success,
  };
}
