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

    let generatedScript = null; // Variable to hold the script for saving

    try {
      // 1. Generate the video script
      generatedScript = await generateRealEstateVideoScript(
        REAL_ESTATE_PROPERTY_DETAILS,
        form.tourStyle
      );
      setVideoScript(generatedScript); // Update UI state with the generated script

      // 2. Save the generated data to the backend (NEW STEP)
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
      // Briefly show the success message before clearing
      setTimeout(() => setLoadingMessage(""), 3000);
    }
  }, [form]); // Dependency array: re-run submit if form changes

  const reset = () => {
    setVideoScript(null);
    setError(null);
    // Reset form to its initial default state
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
