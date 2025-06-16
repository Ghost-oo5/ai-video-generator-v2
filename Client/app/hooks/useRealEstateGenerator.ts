'use client';
import { useState, useCallback } from 'react';
import { RealEstateFormData } from '@/app/types';
import { generateRealEstateVideoScript } from '@/app/services/geminiService';
import { REAL_ESTATE_PROPERTY_DETAILS } from '@/app/components/RealEstateForm';

export const useRealEstateGenerator = () => {
  const [form, setForm] = useState<RealEstateFormData>({
    tourStyle: 'Luxury Showcase',
  });
  const [videoScript, setVideoScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setVideoScript(null);
    setLoadingMessage('Generating real estate video tour script...');

    try {
      const script = await generateRealEstateVideoScript(
        REAL_ESTATE_PROPERTY_DETAILS,
        form.tourStyle
      );
      setVideoScript(script);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate real estate script.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [form]);

  const reset = () => {
    setVideoScript(null);
    setError(null);
  };

  return {
    form, setForm, videoScript, isLoading, loadingMessage, error, submit, reset,
  };
};
