
import { GoogleGenAI } from "@google/genai";
import { LightStatus, AIPersonality } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const personalityInstructions = {
  [AIPersonality.SASSY]: "Give a witty, short (under 7 words) comment about this action as a sassy home AI.",
  [AIPersonality.ZEN]: "Give a peaceful, meditative, and very short (under 7 words) observation about the transition of light.",
  [AIPersonality.SCIENTIFIC]: "Give a precise, factual, and extremely brief (under 7 words) statement about photons or electricity."
};

export const getSmartResponse = async (status: LightStatus, personality: AIPersonality = AIPersonality.SASSY): Promise<string> => {
  try {
    const instruction = personalityInstructions[personality] || personalityInstructions[AIPersonality.SASSY];
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user just turned the smart light ${status.toLowerCase()}. ${instruction}`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text.trim() || `Light is now ${status.toLowerCase()}.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Behold, ${status.toLowerCase()}!`;
  }
};
