"use client";
import { useState, useCallback } from "react";
import { SuplimaxFormData } from "@/app/types";
import {
  generateImageFromApi,
  generateSuplimaxVideoScript,
  saveSuplimaxData,
} from "@/app/services/geminiService";

export const useSuplimaxGenerator = () => {
  const [form, setForm] = useState<SuplimaxFormData>({
    features: "",
    tone: "",
    audience: "",
    videoStyle: "",
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoScript, setVideoScript] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!form.features.trim()) return "Product features are required.";
    if (!form.tone.trim() || !form.audience.trim() || !form.videoStyle.trim()) {
      return "Please select tone, audience, and video style.";
    }
    return null;
  };

  const submit = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setVideoScript(null);

    const prompt = `A dynamic studio shot of an energy drink can named "Suplimax"... Style: ${form.videoStyle}, Target: ${form.audience}, Tone: ${form.tone}.`;
    setImagePrompt(prompt);

    let generatedImage = null;
    let generatedScript = null;
    let generatedImageDescription =
      "A visually stunning shot of the 'Suplimax' energy drink.";

    try {
      setLoadingMessage("Generating Suplimax drink image...");
      generatedImage = await generateImageFromApi(prompt);
      setImageUrl(generatedImage);

      setLoadingMessage("Generating Suplimax video script...");
      generatedScript = await generateSuplimaxVideoScript(
        form,
        generatedImageDescription
      );
      setVideoScript(generatedScript);

      if (generatedImage && generatedScript) {
        setLoadingMessage("Saving Suplimax data to database...");
        const saveResult = await saveSuplimaxData(
          form,
          prompt,
          generatedImage,
          generatedImageDescription,
          generatedScript
        );
        console.log("Data saved successfully to backend:", saveResult);
        setLoadingMessage("Content generated and saved successfully!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate Suplimax content.");
    } finally {
      setIsLoading(false);

      setTimeout(() => setLoadingMessage(""), 3000);
    }
  };

  const reset = () => {
    setImageUrl(null);
    setVideoScript(null);
    setError(null);
    setForm({
      features: "",
      tone: "",
      audience: "",
      videoStyle: "",
    });
  };

  return {
    form,
    setForm,
    imageUrl,
    videoScript,
    imagePrompt,
    isLoading,
    loadingMessage,
    error,
    submit,
    reset,
  };
};
