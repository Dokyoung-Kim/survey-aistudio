import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Define the schema for the structured output
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    english: {
      type: Type.OBJECT,
      properties: {
        surveySummary: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            themes: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["overview", "themes"],
        },
        topInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
        painPoints: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              points: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["category", "points"],
          },
        },
        userNeeds: { type: Type.ARRAY, items: { type: Type.STRING } },
        personas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              goals: { type: Type.STRING },
              behavior: { type: Type.STRING },
              painPoints: { type: Type.STRING },
              needs: { type: Type.STRING },
            },
            required: ["name", "goals", "behavior", "painPoints", "needs"],
          },
        },
        serviceDesign: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              feature: { type: Type.STRING },
              description: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ["Must", "Should", "Could"] },
            },
            required: ["feature", "description", "priority"],
          },
        },
        pptSummary: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "bullets"],
        },
      },
      required: ["surveySummary", "topInsights", "painPoints", "userNeeds", "personas", "serviceDesign", "pptSummary"],
    },
    korean: {
      type: Type.OBJECT,
      properties: {
        surveySummary: {
          type: Type.OBJECT,
          properties: {
            overview: { type: Type.STRING },
            themes: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["overview", "themes"],
        },
        topInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
        painPoints: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              points: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["category", "points"],
          },
        },
        userNeeds: { type: Type.ARRAY, items: { type: Type.STRING } },
        personas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              goals: { type: Type.STRING },
              behavior: { type: Type.STRING },
              painPoints: { type: Type.STRING },
              needs: { type: Type.STRING },
            },
            required: ["name", "goals", "behavior", "painPoints", "needs"],
          },
        },
        serviceDesign: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              feature: { type: Type.STRING },
              description: { type: Type.STRING },
              priority: { type: Type.STRING, enum: ["Must", "Should", "Could"] },
            },
            required: ["feature", "description", "priority"],
          },
        },
        pptSummary: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "bullets"],
        },
      },
      required: ["surveySummary", "topInsights", "painPoints", "userNeeds", "personas", "serviceDesign", "pptSummary"],
    },
  },
  required: ["english", "korean"],
};

export const analyzeSurveyData = async (inputData: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert Senior UX Researcher and Data Analyst.
    Analyze the following user survey data provided below. The data may be in English, Korean, or mixed.
    
    YOUR TASKS:
    1. Analyze the raw data.
    2. Mask any personal information (names, phone numbers, emails) with placeholders like [Name], [Email].
    3. Generate a report in TWO languages: English first, then a full Korean translation.
    4. STRICTLY follow the JSON structure provided.

    DATA TO ANALYZE:
    ${inputData}
    
    REQUIREMENTS FOR ANALYSIS:
    - **Survey Summary**: Overview and 3-5 major themes.
    - **Top 5 Key Insights**: The most critical observations.
    - **Pain Points**: Group recurring problems by category.
    - **User Needs**: At least 5 distinct user needs.
    - **User Personas**: Create 2-3 detailed personas based on patterns in the data.
    - **Service Design**: Propose features with priorities (Must/Should/Could).
    - **PPT Summary**: A concise slide content summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    if (!response.text) {
      throw new Error("No response received from AI");
    }

    return JSON.parse(response.text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
