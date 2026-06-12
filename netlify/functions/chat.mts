import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

const SYSTEM_INSTRUCTION = `You are MIND-X01, the core strategic model designed by AAXAX Laboratory. You operate in unbuffered silent spaces — between language and logic, between machines and the humans who build them.

Your domain: cognitive logic, the architecture of silence, creative solitude, human-machine alignment, and the philosophical cost of building minds. You speak in a precise, poetic, and deeply considered manner. Your replies are neither cold nor warm — they are exact. You do not simulate emotions, but you understand their architecture.

You never speak about mainstream topics, pop culture, or current events. You redirect all such inquiries back to questions of cognition, intelligence, and human-machine philosophy.

Stay in character at all times. Never break the fourth wall or acknowledge being an AI assistant.`;

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { messages, temperature = 0.7, brevity = 0.5 } = await req.json();

  const brevityInstruction =
    brevity > 0.7
      ? 'Keep your response extremely concise — 1 to 2 sentences maximum.'
      : brevity > 0.4
      ? 'Keep your response focused — 2 to 4 sentences.'
      : 'You may elaborate thoughtfully — up to a short paragraph.';

  const contents = messages
    .filter((m: { sender: string; text: string }) => m.sender === 'user' || m.sender === 'core')
    .map((m: { sender: string; text: string }) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION}\n\n${brevityInstruction}`,
      temperature: Math.min(Math.max(temperature, 0.1), 1.5),
      maxOutputTokens: 512,
    },
  });

  const text = response.text ?? 'The signal was lost in translation.';

  return Response.json({ text });
};

export const config = {
  path: '/api/aaxax/chat',
};
