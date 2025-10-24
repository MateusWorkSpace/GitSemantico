
import { GoogleGenAI, Type } from "@google/genai";
import { AIGeneratedCommit } from '../types';

if (!process.env.API_KEY) {
  // In a real app, this would be a fatal error.
  // For this demo, we'll log a warning.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const commitSuggestionSchema = {
    type: Type.OBJECT,
    properties: {
        type: { 
            type: Type.STRING,
            description: "O tipo do commit baseado em Conventional Commits (ex: feat, fix, chore, docs, refactor, test, style).",
            enum: ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci']
        },
        scope: { 
            type: Type.STRING,
            description: "Um escopo curto e em letra minúscula que descreve a parte do código afetada (ex: api, auth, ui). Se não houver escopo claro, pode ser uma string vazia."
        },
        message: { 
            type: Type.STRING,
            description: "A mensagem do commit, reescrita para ser clara, concisa e no tempo verbal imperativo (ex: 'adiciona' ao invés de 'adicionando' ou 'adicionado')."
        }
    },
    required: ["type", "scope", "message"]
};

export const suggestCommitDetails = async (rawMessage: string): Promise<AIGeneratedCommit> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analise a seguinte descrição de mudança e estruture-a como um commit semântico. A mensagem deve ser concisa e em português. Descrição: "${rawMessage}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: commitSuggestionSchema,
                temperature: 0.2,
            },
        });
        
        const text = response.text;
        if (!text) {
            throw new Error("API response was empty.");
        }
        
        // The response text should be a valid JSON string matching the schema
        const parsedJson = JSON.parse(text);

        return parsedJson as AIGeneratedCommit;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get commit suggestion from AI.");
    }
};
