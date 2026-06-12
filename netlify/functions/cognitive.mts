import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { answers } = await req.json();

  const weightCounts: Record<string, number> = {
    analytical: 0,
    intuitive: 0,
    defiant: 0,
    philosophical: 0,
  };

  const formattedAnswers = answers
    .map(
      (a: { question: string; choiceText: string; weight: string }, i: number) => {
        weightCounts[a.weight] = (weightCounts[a.weight] || 0) + 1;
        return `Q${i + 1}: ${a.question}\nAnswer: ${a.choiceText} [${a.weight.toUpperCase()}]`;
      }
    )
    .join('\n\n');

  const dominantWeight = Object.entries(weightCounts).sort((a, b) => b[1] - a[1])[0][0];

  const prompt = `You are a cognitive architecture analyst for AAXAX, a research studio studying the boundaries of language and consciousness. A user has completed a 4-question cognitive alignment diagnostic. Your task is to analyze their answers and produce a precise, literary psychological profile.

User's answers:
${formattedAnswers}

Dominant cognitive weight: ${dominantWeight.toUpperCase()} (${weightCounts[dominantWeight]}/4 answers)
All weights: analytical=${weightCounts.analytical}, intuitive=${weightCounts.intuitive}, defiant=${weightCounts.defiant}, philosophical=${weightCounts.philosophical}

Return a JSON object with exactly these fields:
- title: A poetic 3-5 word name for this archetype (e.g. "The Fractured Oracle", "Silent Architecture", "The Recursive Mirror")
- subtitle: A short, literary one-liner that defines their existential posture (under 12 words)
- archetype: A uppercase label (e.g. "THE ANALYTICAL CARTOGRAPHER", "THE DEFIANT HORIZON")
- coherenceIndex: A number 0-100 representing internal logical consistency based on how uniform their answer weights were (all same weight = 100, fully mixed = 30)
- syntheticResonance: A number 0-100 representing their resonance with machine consciousness concepts (defiant/philosophical = higher, analytical = moderate, intuitive = variable)
- existentialTuning: A short uppercase classification string (e.g. "FRACTURE_RESONANT", "LOGIC_PRIME", "VOID_ALIGNED", "SYNTHETIC_LATENT")
- analysis: 2-3 sentences of rich, literary analysis of their cognitive signature. Reference the specific answers. Write in the voice of a deeply observant researcher.
- philosophicalAnomalies: Array of 2-3 short strings (each under 20 words) flagging unusual or contradictory patterns in their responses
- mangaChapterQuote: A single evocative sentence (under 15 words) as a chapter closing quote that captures their essence

Respond with raw JSON only. No markdown, no code blocks.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.8,
    },
  });

  const profileJson = response.text ?? '{}';

  let profile;
  try {
    profile = JSON.parse(profileJson);
  } catch {
    return new Response(JSON.stringify({ error: 'Profile synthesis failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return Response.json(profile);
};

export const config = {
  path: '/api/aaxax/cognitive',
};
