// app/api/video/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

  let op = await ai.models.generateVideos({
    model: "veo-2.0-generate-001",
    prompt,
    config: { personGeneration: "dont_allow", aspectRatio: "16:9" },
  });

  while (!op.done) {
    await new Promise(r => setTimeout(r, 5000));
    op = await ai.operations.getVideosOperation({ operation: op });
  }

  const video = op.response?.generatedVideos?.[0].video;
  if (!video?.uri) return NextResponse.json({ error: "No video" }, { status: 500 });

  return NextResponse.json({ uri: video.uri });
}
