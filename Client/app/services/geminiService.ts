// Client/app/services/geminiService.ts
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
      data: { ...propertyDetails, tourStyle }, // Ensure all details are passed here
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
    type: 'suplimax', // Specify type for Generations model
    inputs: formData,
    imagePrompt: imagePrompt, // This field is on SuplimaxGeneration, but not Generations schema directly
    image: {
      mimeType: mimeTypePart,
      dataBase64: dataBase64
    },
    imageDescription: imageDescription, // This field is on SuplimaxGeneration, but not Generations schema directly
    videoScript: videoScript, // This field is on SuplimaxGeneration, but not Generations schema directly
    script: { text: videoScript } // For the generic Generations schema
  };

  const response = await fetch('http://localhost:3002/api/suplimax', { // Still sending to suplimax route
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

// NEW FUNCTION: To save the generated Real Estate data to the Generations collection
export const saveRealEstateData = async (
  propertyDetails: PropertyDetails,
  tourStyle: string,
  videoScript: string
): Promise<any> => {
  const payload = {
    type: 'realestate', // Required by the Generations schema
    inputs: { ...propertyDetails, tourStyle }, // Combine propertyDetails and tourStyle into one object for 'inputs'
    script: { text: videoScript }, // Place the script text in the 'script.text' field
    // No 'image' or 'video' fields are typically generated for Real Estate scripts
    // so they can be omitted or sent as null/empty if the schema allows (which it does)
  };

  // Send to the /api/generations endpoint
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
