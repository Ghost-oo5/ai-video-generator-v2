'use client';
import { useState, useCallback } from 'react';
import { SuplimaxFormData } from '@/app/types';
import { generateImageFromApi, generateSuplimaxVideoScript } from '@/app/services/geminiService';

export const useSuplimaxGenerator = () => {
  const [form, setForm] = useState<SuplimaxFormData>({
    features: '',
    tone: '',
    audience: '',
    videoStyle: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoScript, setVideoScript] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    if (!form.features.trim()) {
      setError('Product features cannot be empty for Suplimax video.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setVideoScript(null);

    const prompt = `A dynamic studio shot of an energy drink can named "Suplimax"... Style: ${form.videoStyle}, Target: ${form.audience}, Tone: ${form.tone}.`;
    setImagePrompt(prompt);

    try {
      setLoadingMessage('Generating Suplimax drink image...');
      const image = await generateImageFromApi(prompt);
      setImageUrl(image);

      setLoadingMessage('Generating Suplimax video script...');
      const description = `The video features a visually stunning shot of the 'Suplimax' energy drink. ...`;
      const script = await generateSuplimaxVideoScript(form, description);
      setVideoScript(script);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate Suplimax content.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [form]);

  const reset = () => {
    setImageUrl(null);
    setVideoScript(null);
    setError(null);
  };

  return {
    form, setForm, imageUrl, videoScript, imagePrompt,
    isLoading, loadingMessage, error,
    submit, reset,
  };
};
