import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const textModel = "gemini-2.5-flash-preview-04-17";

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();
    let prompt = "";

    if (type === "suplimax") {
      const { features, tone, audience, videoStyle, imageDescription } = data;
      prompt = `  You are a creative scriptwriter for engaging marketing videos.
    Generate a 30-45 second video script for a new energy drink called "Suplimax".

    Product Vision:
    - Name: Suplimax
    - Key Product Features: ${features}
    - Desired Tone: ${tone}
    - Target Audience: ${audience}
    - Video Style: ${videoStyle}

    Visual Element:
    The video script should incorporate the visual of the Suplimax energy drink.
    Description of the drink's appearance (based on a generated image): ${imageDescription}

    Task:
    Create a script that includes:
    1. Scene numbers (SCENE 1, SCENE 2, etc.).
    2. VISUAL descriptions for each scene (what the viewer sees).
    3. AUDIO descriptions for each scene (voiceover, sound effects, music cues).
    Ensure the script flows well, is persuasive, and aligns with the specified tone, audience, and style.
    The script should make the product "Suplimax" highly desirable.

    Example Snippet (adapt to Suplimax):
    SCENE 1:
    VISUAL: Dynamic close-up of the Suplimax can, perhaps with condensation, set against a backdrop that matches the video style (e.g., urban, nature, sports). The "Suplimax" name is clearly visible and looks appealing.
    AUDIO (Voiceover, ${tone}): "Tired of the ordinary? Need a boost that actually delivers?"

    SCENE 2:
    VISUAL: Quick cuts showcasing people from the ${audience} group engaging in activities relevant to the product features and ${videoStyle}. For example, if features include 'mental focus', show someone excelling at a task. If 'physical energy', show activity.
    AUDIO (Sound): Upbeat music matching the ${videoStyle}, subtle sound effects related to the visuals.
    AUDIO (Voiceover, ${tone}): "Introducing Suplimax. Packed with ${features
        .split(",")[0]
        .trim()} and crafted for those who demand more."

    Continue for a full 30-45 second script.`;
    } else if (type === "realestate") {
      const { address, price, bedrooms, bathrooms, squareFootage, features, tourStyle } = data;
      prompt = `You are a professional scriptwriter for high-end real estate video tours.
    Generate a virtual video tour script for the following property.

    Property Details:
    - Address: ${address}
    - Price: ${price}
    - Bedrooms: ${bedrooms}
    - Bathrooms: ${bathrooms}
    - Square Footage: ${squareFootage}
    - Key Features: ${features}

    Video Tour Style: ${tourStyle}

    Task:
    Create a compelling script that guides viewers through the property. The script should:
    1. Be divided into scenes (e.g., SCENE 1: EXTERIOR, SCENE 2: ENTRYWAY, SCENE 3: LIVING ROOM, etc.).
    2. For each scene, provide:
        - VISUAL cues: What should the camera focus on? What kind of shots (e.g., wide, panning, close-up on details)?
        - NARRATOR voiceover: Engaging, descriptive language that highlights the property's selling points and aligns with the chosen '${tourStyle}'.
    3. The script should create a sense of aspiration and desire for the property.
    4. Ensure the language used matches the '${tourStyle}'. For example, a "Luxury Showcase" would use more opulent language than a "Family-Friendly Walkthrough".

    Example Snippet (adapt to the property and style):
    SCENE 1: EXTERIOR - ARRIVAL
    VISUAL: Smooth, cinematic drone shot approaching the property, showcasing its grandeur and curb appeal. Sunlight glints off the windows. Manicured landscaping.
    NARRATOR (Voice, matching '${tourStyle}' style): "Welcome to ${address}, a statement of unparalleled [e.g., luxury/charm/sophistication] nestled in the prestigious [e.g., Beverly Hills area/neighborhood name]. Prepare to be captivated."

    SCENE 2: INTERIOR - GRAND FOYER
    VISUAL: Doors open to a breathtaking foyer. Camera pans up to a grand staircase or a stunning chandelier. Highlight architectural details like high ceilings or custom flooring.
    NARRATOR: "Step inside, and the immediate sense of [e.g., space and light/elegance/warmth] envelops you. This magnificent foyer sets the tone for a home where every detail has been meticulously curated."

    Continue the script, covering key areas like the kitchen, master suite, living areas, and any unique features mentioned.`;
    }

    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
    });

    return NextResponse.json({ script: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
