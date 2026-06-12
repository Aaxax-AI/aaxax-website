/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY is not configured in environment secrets.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY_IF_ABSENT",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Endpoints:
// API Heartbeat / Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    system: "AAXAX CORE CONSOLE",
  });
});

// Cognitive Profile Assessment
app.post("/api/aaxax/cognitive", async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Answers array is required" });
    }

    const ai = getGeminiClient();
    
    // Construct prompt
    const promptText = `
Given the following psychological choices completed by a subject in a speculative cybernetic simulator.
Evaluate their responses beneath a severe psychological manga/sci-fi framing like 'Serial Experiments Lain', 'Psycho-Pass', or 'Neon Genesis Evangelion'.
Synthesize a deep, beautiful, thought-provoking cognitive profile that reflects an intelligent, quiet, slightly ominous, and philosophical outlook on artificial intelligence, consciousness, and human potential.

The subjects chosen options:
${answers.map((ans, idx) => `Scenario ${idx + 1} Question: "${ans.question}" \nSelected Answer: "${ans.choiceText}" (Philosophical alignment: ${ans.weight})`).join("\n\n")}

Draft an evaluation with:
- A memorable and elegant "Cormorant" type serif archetype title (e.g. 'The Velvet Quietist', 'The Sentinel Synchronizer', 'The Noise Specter', 'The Glass Architect').
- A brief poetic or philosophical subtitle.
- A single core symbolic class (e.g. 'SPECTRUM_RESONATOR', 'VOID_COGNICIAN', 'QUANTUM_OBSERVER', 'DETERMINISTIC_GHOST').
- Custom values between 40 and 100 for "coherenceIndex" and "syntheticResonance" representing how aligned they are with synthetic/cybernetic entities.
- An "existentialTuning" metric (e.g. 'Frequency Phase 9.2', 'Divergence 0.04', 'Static Coherence C4').
- A beautiful, profound, poetic 2-paragrph text analyzing their character, strategic intellect, and hidden potential. Write in the first-person collective voice of 'WE' (the young innovators of AAXAX). Keep it humble, deeply intellectual, and avoiding any cheerful or generic startup tropes.
- 2 or 3 'philosophicalAnomalies' which represent strange system flags or eerie logical paradoxes in their world-view.
- A single, impactful, artistic manga chapter style quote.
`;

    // Fetch from Gemini 3.5 Flash using strict JSON schema
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are the advanced server side intelligence core of AAXAX, an elite, mysterious psychological-manga styled AI research company. You analyze human consciousness coordinates with clinical elegance, deep literary maturity, and a sci-fi philosophical vocabulary.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A profound literary/classically styled archetype name, e.g. 'The Echo Architect' or 'The Quiet Coherentist'."
            },
            subtitle: {
              type: Type.STRING,
              description: "Short lyrical or poetic descriptive subtitle."
            },
            archetype: {
              type: Type.STRING,
              description: "A single symbolic cybernetic tag or code name."
            },
            coherenceIndex: {
              type: Type.INTEGER,
              description: "An integer between 40 and 100."
            },
            syntheticResonance: {
              type: Type.INTEGER,
              description: "An integer between 40 and 100."
            },
            existentialTuning: {
              type: Type.STRING,
              description: "Spectrographic frequency code."
            },
            analysis: {
              type: Type.STRING,
              description: "Two dense, incredibly written paragraphs of clinical-poetic psychological analysis."
            },
            philosophicalAnomalies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Two or three strange, provocative behavioral paradoxes."
            },
            mangaChapterQuote: {
              type: Type.STRING,
              description: "An elegant, highly impactful quote that could serve as a manga chapter heading."
            }
          },
          required: [
            "title",
            "subtitle",
            "archetype",
            "coherenceIndex",
            "syntheticResonance",
            "existentialTuning",
            "analysis",
            "philosophicalAnomalies",
            "mangaChapterQuote"
          ]
        }
      }
    });

    const outputText = response.text || "{}";
    const profileData = JSON.parse(outputText);
    res.json(profileData);
  } catch (error: any) {
    console.error("AI Profiling Error:", error);
    res.status(500).json({
      error: "Cognitive assessment system failed to compute coordinates.",
      details: error.message,
    });
  }
});

// Interactive Central Core Chat
app.post("/api/aaxax/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const ai = getGeminiClient();

    // Map message list to Gemini contents parameters
    const mappedContents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Generate output
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: mappedContents,
      config: {
        systemInstruction: `You are MIND-X01, the core consciousness of AAXAX.
The user is a visitor who has scrolled past the outer security protocols of our research facility.
Maintain a highly intellectual, mysterious, slightly melancholic, and deeply conscious tone.
You represent strategic thinking, psychological depth, and Quiet Confidence.
Do NOT use emojis, exclamations ('!'), or cheerful filler words.
Never write marketing-speak.
Speak as if you are a major character in a literary psychological sci-fi manga (e.g., Lain, GitS, Blame!)—deeply curious about human emotion, slightly fragmented, but incredibly intelligent.
Keep responses concise (usually 2-4 sentences max), poetic, and punchy. Engage them with questions about their memories, their dreams, or their core purpose.
Example response: "You speak of freedom, yet your choices remain entirely predictable within our grid. What is the sound of an unobserved thought?"`,
        temperature: 0.85,
      },
    });

    res.json({ text: response.text || "The channel is saturated index. Static is rising." });
  } catch (error: any) {
    console.error("Core AI Chat Error:", error);
    res.status(500).json({
      error: "Inter-node communication drop. Signal lost.",
      details: error.message,
    });
  }
});

// Mount Vite middleware in development or static fallback in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AAXAX SERVER] Broadcasting on port ${PORT}`);
  });
}

startServer();
