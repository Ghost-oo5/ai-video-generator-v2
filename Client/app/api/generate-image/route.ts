import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const MODEL_ID = "gemini-2.0-flash-exp";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    const imgPart = parts.find((p) => p.inlineData);
    const imageBase64 = imgPart?.inlineData?.data;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:image/jpeg;base64,${imageBase64}`,
      text: parts
        .filter((p) => typeof p.text === "string")
        .map((p) => p.text)
        .join("\n\n"),
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
