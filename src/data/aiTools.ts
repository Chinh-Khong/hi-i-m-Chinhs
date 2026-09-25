import { AiToolItem } from "@/types";

export const aiToolsData: AiToolItem[] = [
  {
    id: "antigravity",
    name: "Antigravity",
    tagline: "Autonomous Agentic IDE & Workflows",
    purpose: "Autonomous multi-step task execution, subagent orchestration, live terminal debugging, and browser-in-the-loop verification.",
    capabilities: [
      "Autonomous agentic workflows with subagent task delegation",
      "Multi-file refactoring, terminal execution & deep codebase reasoning",
      "Direct browser validation, live visual verification & artifact generation"
    ],
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
    glowColor: "rgba(217, 70, 239, 0.35)",
    isAgentic: true
  },
  {
    id: "cursor",
    name: "Cursor",
    tagline: "AI-Augmented Code Editor",
    purpose: "Rapid contextual implementation, multi-file codebase editing, and instant smart refactoring.",
    capabilities: [
      "In-line code generation with semantic codebase awareness",
      "Accelerated component scaffolding & TypeScript typing",
      "Instant unit testing and edge-case validation"
    ],
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.3)"
  },
  {
    id: "claude",
    name: "Claude",
    tagline: "Deep Architectural Reasoning",
    purpose: "Complex problem solving, architectural design reviews, algorithm optimization, and clean refactoring plans.",
    capabilities: [
      "Comprehensive system design and technical specification",
      "High-context debugging and root cause discovery",
      "Complex state machine and data flow modeling"
    ],
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.3)"
  },
  {
    id: "gemini",
    name: "Gemini",
    tagline: "Multimodal Intelligence & Research",
    purpose: "Multimodal design-to-code translation, performance analysis, and documentation synthesis.",
    capabilities: [
      "Figma UI layout interpretation into clean responsive structures",
      "Fast documentation search and modern library API integration",
      "Large context analysis for full project consistency"
    ],
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.3)"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: "Prototyping & Requirement Synthesis",
    purpose: "Rapid ideation, customer journey mapping, drafting SEO strategies, and utility script crafting.",
    capabilities: [
      "Translating client business requirements into technical user stories",
      "Drafting SEO content schemas and accessibility checklists",
      "Speeding up repetitive regex and utility helper functions"
    ],
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.3)"
  }
];
