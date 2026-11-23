export interface StackItem {
  name: string;
  level: 'Daily Driver' | 'Active' | 'Exploring';
  pct: number;
}

export interface StackColumn {
  title: string;
  items: StackItem[];
}

export const stackColumns: StackColumn[] = [
  {
    title: 'AI, AGENTS & NLP',
    items: [
      {
        name: 'LLM Agent Frameworks (MCP, ACP, Tool Use, Multi-Agent)',
        level: 'Daily Driver',
        pct: 95,
      },
      {
        name: 'Deep Learning & NLP (PyTorch, Transformers, OpenAI SDK)',
        level: 'Daily Driver',
        pct: 90,
      },
      {
        name: 'Machine Learning & High-Dim Data Pipelines',
        level: 'Active',
        pct: 82,
      },
      {
        name: 'Biological Foundation Models (Evo 2, Bio-LMs)',
        level: 'Exploring',
        pct: 68,
      },
    ],
  },
  {
    title: 'SYNBIO & AUTOMATION',
    items: [
      {
        name: 'Lab Automation & Protocol Simulation (Opentrons Flex, MuJoCo)',
        level: 'Daily Driver',
        pct: 94,
      },
      {
        name: 'Hardware & Process Bridges (SynPan / CIAI MCP, WebSocket)',
        level: 'Daily Driver',
        pct: 88,
      },
      {
        name: 'Synthetic Biology Tooling (Sanger Alignment, Sequence Pipelines)',
        level: 'Active',
        pct: 84,
      },
      {
        name: 'Scientific Imaging & Data Formats (MALDI MSI, HDF5 / SBD)',
        level: 'Active',
        pct: 78,
      },
    ],
  },
  {
    title: 'FULL-STACK & INFRA',
    items: [
      {
        name: 'Python Ecosystem (uv, CLI Tooling, FastAPI)',
        level: 'Daily Driver',
        pct: 96,
      },
      {
        name: 'TypeScript / JavaScript / React / Node.js / Vite',
        level: 'Daily Driver',
        pct: 92,
      },
      {
        name: '3D & Edge Web (Three.js, WebAssembly / h5wasm, Web Workers)',
        level: 'Active',
        pct: 82,
      },
      {
        name: 'DevOps & Tooling (Docker, Linux, Nginx, Git, Figma)',
        level: 'Active',
        pct: 86,
      },
    ],
  },
];
