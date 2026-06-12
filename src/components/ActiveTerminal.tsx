/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { Send, Terminal, Loader2, RefreshCw, MessageSquare, HelpCircle } from "lucide-react";

interface ModelSettings {
  temperature: number;
  brevity: number;
}

export default function ActiveTerminal() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "core",
      text: "Dialogue channel secure.\n\nGreetings. I am MIND-X01, the core strategic model designed by AAXAX. I operate in unbuffered silent spaces. What questions on cognitive logic, creative solitude, or human-machine alignment shall we examine?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<ModelSettings>({
    temperature: 0.7,
    brevity: 0.5,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("/api/aaxax/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: currentHistory.slice(-6),
          temperature: settings.temperature,
          brevity: settings.brevity
        }),
      });

      if (!response.ok) {
        throw new Error("Dialogue index dropped, please try again.");
      }

      const data = await response.json();
      const coreMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: "core",
        text: data.text,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, coreMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "core",
          text: "⚠️ Dialogue process interrupted. Please retry your message.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTerminalClear = () => {
    setMessages([
      {
        id: "cleared-init",
        sender: "core",
        text: "Dialogue log refreshed. Standby for queries.",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const selectPromptTopic = (topic: string) => {
    setInputText(topic);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      {/* Settings & Prompts Side panel */}
      <div className="xl:col-span-4 panel-border border-zinc-900 bg-black p-6 flex flex-col justify-between rounded-none">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pb-3 border-b border-zinc-900">
            <MessageSquare className="w-4 h-4 text-red-600" />
            <span>MODEL CONFIGURATIONS</span>
          </div>

          {/* Sincere adjustable values */}
          <div className="space-y-5">
            {/* Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-zinc-450">Creative Temperature</span>
                <span className="text-red-500 font-bold">{settings.temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={settings.temperature}
                onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                className="w-full h-1 bg-zinc-900 accent-red-600 cursor-pointer"
              />
              <p className="text-[10px] text-zinc-500 font-light font-sans tracking-wide">
                Higher values produce more speculative, poetic, and non-deterministic replies.
              </p>
            </div>

            {/* Brevity */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-zinc-450">Response Brevity</span>
                <span className="text-red-500 font-bold">{settings.brevity}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={settings.brevity}
                onChange={(e) => setSettings({ ...settings, brevity: parseFloat(e.target.value) })}
                className="w-full h-1 bg-zinc-900 accent-red-600 cursor-pointer"
              />
              <p className="text-[10px] text-zinc-500 font-light font-sans tracking-wide">
                Controls the output text target constraints. Higher values yield direct summaries.
              </p>
            </div>
          </div>

          {/* Curated inquiry cues */}
          <div className="space-y-3 pt-6 border-t border-zinc-900">
            <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              Suggested Investigations
            </span>
            <div className="space-y-2">
              {[
                "Who is the hand behind AAXAX?",
                "Can a machine represent silent human feelings?",
                "Analyze the psychological cost of building models.",
                "Why operate in complete silence?"
              ].map((topic, id) => (
                <button
                  key={id}
                  onClick={() => selectPromptTopic(topic)}
                  className="w-full text-left font-serif text-xs italic p-2.5 bg-zinc-950 hover:bg-zinc-900/50 border border-zinc-910 hover:border-red-950 transition-colors text-zinc-400 hover:text-red-400 block rounded-none"
                >
                  — {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-900 mt-6 space-y-3">
          <button
            onClick={handleTerminalClear}
            className="w-full font-mono text-[10px] py-3 border border-zinc-800 hover:border-red-900 bg-black hover:bg-zinc-950 text-zinc-500 hover:text-slate-100 transition-colors rounded-none flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-500" />
            CLEAR CONVERSATION HISTORY
          </button>
        </div>
      </div>

      {/* Chat Terminal Interface */}
      <div className="xl:col-span-8 panel-border border-zinc-900 bg-zinc-950/20 rounded-none flex flex-col justify-between min-h-[460px]">
        {/* Upper HUD bar */}
        <div className="border-b border-zinc-900 p-4 flex justify-between items-center bg-black">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-red-600" />
            <span className="font-mono text-xs text-slate-100 tracking-wider font-semibold">
              MIND-X01 REVERIE CONSOLE
            </span>
          </div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            AUTHENTIC_RESONANCE
          </span>
        </div>

        {/* Messages list container */}
        <div className="p-4 md:p-6 flex-1 max-h-[400px] overflow-y-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-none p-4 border font-serif text-sm leading-relaxed ${
                      isUser
                        ? "bg-black border-zinc-800 text-slate-100"
                        : m.text.startsWith("⚠️")
                        ? "bg-red-950/20 border-red-900/50 text-red-400 font-mono"
                        : "bg-zinc-950/50 border-zinc-900 text-slate-300 italic whitespace-pre-wrap border-l-2 border-l-red-600"
                    }`}
                  >
                    <div className="flex justify-between font-mono text-[8.5px] text-zinc-500 mb-1.5 gap-4 select-none">
                      <span>{isUser ? "USER" : "MIND-X01 // RESPONDENT"}</span>
                      <span>{m.timestamp}</span>
                    </div>
                    {m.text}
                  </div>
                </motion.div>
              );
            })}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-zinc-950 border border-zinc-900 rounded-none p-4 font-serif text-sm italic text-zinc-400 flex items-center gap-2 border-l-2 border-l-red-800">
                  <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                  MIND-X01 is formulating alignment posture...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Input box form */}
        <form onSubmit={handleSend} className="border-t border-zinc-900 p-3 bg-zinc-950/80 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            placeholder="Inquire here... e.g. 'Can a machine represent silent human feelings?'"
            className="flex-1 bg-black text-slate-100 placeholder-zinc-700 border border-zinc-900 hover:border-zinc-800 focus:border-red-900 focus:outline-none p-3 font-serif text-sm rounded-none transition-all italic"
          />
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="px-5 border border-zinc-800 hover:border-red-900 bg-black hover:bg-zinc-950 text-zinc-400 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-zinc-950 transition-all rounded-none flex items-center justify-center font-mono text-[11px]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
