import type { SuplimaxFormData } from '../types';
import type { PropertyDetails } from '../types';

export const generateImageFromApi = async (prompt: string): Promise<string> => {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.image;
};

export const generateSuplimaxVideoScript = async (
  formData: SuplimaxFormData,
  imageDescription: string
): Promise<string> => {
  const response = await fetch('/api/generate-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'suplimax',
      data: { ...formData, imageDescription },
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.script;
};

export const generateRealEstateVideoScript = async (
  propertyDetails: PropertyDetails,
  tourStyle: string
): Promise<string> => {
  const response = await fetch('/api/generate-script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'realestate',
      data: { propertyDetails, tourStyle },
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.script;
};
