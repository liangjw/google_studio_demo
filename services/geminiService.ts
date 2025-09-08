
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const editImageWithPose = async (
  base64Image: string,
  mimeType: string,
  posePrompt: string
): Promise<string> => {
  try {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    const textPart = {
      text: `Please change the pose of the main person in the image to '${posePrompt}'. At the same time, please switch to a close-up shot.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image was generated in the response.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to transform image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image transformation.");
  }
};
