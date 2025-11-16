
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateContent = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};

export const generateCaptions = async (category: string): Promise<string[]> => {
    const prompt = `
        You are an AI Caption Generator for social media.
        Your task is to generate 5 short, catchy, viral-style, and aesthetic captions based on the user's provided category.
        The category is: "${category}".
        The tone should be ${category}.
        Keep the language natural and modern. Do NOT repeat captions.
        Provide only the captions, each on a new line. Do not add numbers, dashes, or any other text before each caption.
    `;
    const responseText = await generateContent(prompt);
    return responseText.split('\n').map(c => c.trim()).filter(c => c);
};

export const generateHashtags = async (category: string): Promise<string[]> => {
    const prompt = `
        You are an AI Hashtag Generator for social media.
        Your task is to generate between 8 and 15 relevant, trend-ready hashtags based on the user's provided category.
        The category is: "${category}".
        Provide only the hashtags, separated by spaces. Start each with a '#'. Do not add any other text.
        Example: #TravelDiaries #Wanderlust #AdventureTime
    `;
    const responseText = await generateContent(prompt);
    return responseText.split(' ').map(h => h.trim()).filter(h => h.startsWith('#'));
};
