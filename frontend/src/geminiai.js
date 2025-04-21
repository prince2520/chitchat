import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_KEY });

export const getAIAnswer = async (question) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question,
    });
    return response;
}

