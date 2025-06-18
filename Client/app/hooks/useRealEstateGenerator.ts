"use client";
import { useState, useCallback } from "react";
import { RealEstateFormData } from "@/app/types";
import {
  generateRealEstateVideoScript,
  saveRealEstateData,
} from "@/app/services/geminiService"; 
import { REAL_ESTATE_PROPERTY_DETAILS } from "@/app/components/RealEstateForm";

export const useRealEstateGenerator = () => {
  const [form, setForm] = useState<RealEstateFormData>({
    tourStyle: "Luxury Showcase",
  });
  const [videoScript, setVideoScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setVideoScript(null);
    setLoadingMessage("Generating real estate video tour script...");

    let generatedScript = null; 

    try {
      generatedScript = await generateRealEstateVideoScript(
        REAL_ESTATE_PROPERTY_DETAILS,
        form.tourStyle
      );
      setVideoScript(generatedScript); 

      if (generatedScript) {
        setLoadingMessage("Saving real estate data to database...");
        const saveResult = await saveRealEstateData(
          REAL_ESTATE_PROPERTY_DETAILS,
          form.tourStyle,
          generatedScript
        );
        console.log(
          "Real estate data saved successfully to backend:",
          saveResult
        );
        setLoadingMessage("Script generated and saved successfully!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate real estate script.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setLoadingMessage(""), 3000);
    }
  }, [form]); 

  const reset = () => {
    setVideoScript(null);
    setError(null);
    setForm({
      tourStyle: "Luxury Showcase",
    });
  };

  return {
    form,
    setForm,
    videoScript,
    isLoading,
    loadingMessage,
    error,
    submit,
    reset,
  };
};
