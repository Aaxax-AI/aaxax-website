/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScenarioChoice {
  id: string;
  text: string;
  weight: "analytical" | "intuitive" | "defiant" | "philosophical";
}

export interface Scenario {
  id: string;
  chapter: string;
  title: string;
  question: string;
  choices: ScenarioChoice[];
}

export interface CognitiveProfile {
  title: string;
  subtitle: string;
  archetype: string;
  coherenceIndex: number;
  syntheticResonance: number;
  existentialTuning: string;
  analysis: string;
  philosophicalAnomalies: string[];
  mangaChapterQuote: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "core";
  text: string;
  timestamp: string;
}

export interface ConsoleState {
  quantumCoherence: number;
  cognitiveCoupling: number;
  entropyIndex: number;
  systemStatus: "STABLE" | "RESONATING" | "DIVERGING" | "DECAYING";
  activeNodes: number;
}
