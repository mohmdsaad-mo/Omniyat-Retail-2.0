
import { GoogleGenAI, Type } from "@google/genai";
import { Unit, Category, UnitStatus } from '../types';

// Fix: Strictly follow Google GenAI SDK initialization guidelines using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractLeaseDataFromText = async (text: string) => {
  // Fix: Removed explicit check as guidelines state to assume API_KEY is pre-configured and valid.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract retail lease terms from the following text extracted from a PDF. 
    Focus on finding: Asset Name, Unit Number, Trading Name, Category (Retail or F&B), Area details (Indoor, Terrace, Mezzanine, etc.), Permitted Use, Tenant Name, Dates (Commencement, RCD, RED), Term Duration, and Deposits.
    
    TEXT:
    ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          assetName: { type: Type.STRING },
          unitNumber: { type: Type.STRING },
          tradingName: { type: Type.STRING },
          category: { type: Type.STRING, description: 'Must be "Retail" or "F&B"' },
          permittedUse: { type: Type.STRING },
          tenantName: { type: Type.STRING },
          areas: {
            type: Type.OBJECT,
            properties: {
              indoor: { type: Type.NUMBER },
              terrace: { type: Type.NUMBER },
              mezzanine: { type: Type.NUMBER },
              outdoor: { type: Type.NUMBER },
              total: { type: Type.NUMBER }
            }
          },
          commercialTerms: {
            type: Type.OBJECT,
            properties: {
              rcd: { type: Type.STRING },
              red: { type: Type.STRING },
              commencementDate: { type: Type.STRING },
              termDuration: { type: Type.STRING },
              securityDeposit: { type: Type.NUMBER }
            }
          }
        }
      }
    }
  });

  try {
    // Fix: Using the direct .text property from GenerateContentResponse as per latest guidelines.
    const data = JSON.parse(response.text || '{}');
    return data;
  } catch (err) {
    console.error("Failed to parse AI response", err);
    return null;
  }
};
