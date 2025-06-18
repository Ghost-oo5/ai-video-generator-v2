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
      data: { ...propertyDetails, tourStyle }, 
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.script;
};

export const saveSuplimaxData = async (
  formData: SuplimaxFormData,
  imagePrompt: string,
  fullImageUrl: string,
  imageDescription: string,
  videoScript: string
): Promise<any> => {
  const [_, mimeTypePart, dataBase64] = fullImageUrl.match(/^data:(.*?);base64,(.*)$/) || [];

  if (!mimeTypePart || !dataBase64) {
    throw new Error("Invalid image URL format for saving.");
  }

  const payload = {
    type: 'suplimax', 
    inputs: formData,
    imagePrompt: imagePrompt, 
    image: {
      mimeType: mimeTypePart,
      dataBase64: dataBase64
    },
    imageDescription: imageDescription, 
    videoScript: videoScript, 
    script: { text: videoScript } 
  };

  const response = await fetch('http://localhost:3002/api/suplimax', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to save Suplimax data to backend.');
  }
  return data;
};

export const saveRealEstateData = async (
  propertyDetails: PropertyDetails,
  tourStyle: string,
  videoScript: string
): Promise<any> => {
  const payload = {
    type: 'realestate', 
    inputs: { ...propertyDetails, tourStyle }, 
    script: { text: videoScript }, 
      };

  const response = await fetch('http://localhost:3002/api/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to save real estate data to backend.');
  }
  return data;
};
