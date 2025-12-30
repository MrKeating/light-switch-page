
import { GoogleGenAI, Type } from "@google/genai";
import { LightStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartResponse = async (status: LightStatus): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user just turned the smart light ${status.toLowerCase()}. Give a witty, short (under 7 words) comment about this action as a sassy home AI.`,
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
