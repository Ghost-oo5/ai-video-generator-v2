import axios from "axios";
import type { SuplimaxFormData } from "../types";
import type { PropertyDetails } from "../types";

export const generateImageFromApi = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post("/api/generate-image", { prompt });
    return response.data.image;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Failed to generate image via API."
    );
  }
};

export const generateSuplimaxVideoScript = async (
  formData: SuplimaxFormData,
  imageDescription: string
): Promise<string> => {
  try {
    const response = await axios.post("/api/generate-script", {
      type: "suplimax",
      data: { ...formData, imageDescription },
    });
    return response.data.script;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Failed to generate Suplimax video script."
    );
  }
};

export const generateRealEstateVideoScript = async (
  propertyDetails: PropertyDetails,
  tourStyle: string
): Promise<string> => {
  try {
    const response = await axios.post("/api/generate-script", {
      type: "realestate",
      data: { ...propertyDetails, tourStyle },
    });
    return response.data.script;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Failed to generate real estate video script."
    );
  }
};

export const saveSuplimaxData = async (
  formData: SuplimaxFormData,
  imagePrompt: string,
  fullImageUrl: string,
  imageDescription: string,
  videoScript: string
): Promise<any> => {
  const [_, mimeTypePart, dataBase64] =
    fullImageUrl.match(/^data:(.*?);base64,(.*)$/) || [];

  if (!mimeTypePart || !dataBase64) {
    throw new Error("Invalid image URL format for saving.");
  }

  const payload = {
    type: "suplimax",
    inputs: formData,
    imagePrompt: imagePrompt,
    image: {
      mimeType: mimeTypePart,
      dataBase64: dataBase64,
    },
    imageDescription: imageDescription,
    videoScript: videoScript,
    script: { text: videoScript },
  };

  try {
    const response = await axios.post(
      "http://localhost:3002/api/suplimax",
      payload,
      {}
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to save Suplimax data.");
  }
};

export const saveRealEstateData = async (
  propertyDetails: PropertyDetails,
  tourStyle: string,
  videoScript: string
): Promise<any> => {
  const payload = {
    type: "realestate",
    inputs: { ...propertyDetails, tourStyle },
    script: { text: videoScript },
  };

  try {
    const response = await axios.post(
      "http://localhost:3002/api/generations",
      payload,
      {}
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to save Real Estate data.");
  }
};
