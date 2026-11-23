export interface Project {
  num: string;
  category: string;
  name: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
  stars?: string;
}

export const projects: Project[] = [
  {
    num: '01',
    category: 'AI AGENT · LAB AUTOMATION',
    name: 'MOSS-Lab',
    description:
      'Simulation-gated web agent for Opentrons Flex with 3D digital-twin previews and hardware MCP integration.',
    tags: ['Three.js', 'MuJoCo', 'MCP', 'WebSocket'],
    url: 'https://github.com/SmartisanNaive/MOSS-Lab',
    image: '/images/projects/moss-lab.svg',
  },
  {
    num: '02',
    category: 'SYNTHETIC BIOLOGY · CLI AGENT',
    name: 'BioFoundry',
    description:
      'Terminal-first agent for automated bio-manufacturing, Sanger sequence alignment, and modular MCP skills.',
    tags: ['Python', 'uv', 'OpenAI SDK', 'MCP'],
    url: 'https://github.com/SmartisanNaive/BioFoundry',
    image: '/images/projects/biofoundry.svg',
  },
  {
    num: '03',
    category: 'AI4SCIENCE · EDGE COMPUTING',
    name: 'SpatialBridge',
    description:
      'Browser-based MALDI mass spectrometry imaging pipeline using WebAssembly lazy slicing for multi-gigabyte HDF5 datasets.',
    tags: ['TypeScript', 'WebAssembly', 'h5wasm', 'Web Workers'],
    url: 'https://github.com/SmartisanNaive/SpatialBridge',
    image: '/images/projects/spatialbridge.svg',
  },
  {
    num: '04',
    category: 'NLP · DEVELOPER TOOLING',
    name: 'AI-Cleaner',
    description:
      'Fast, AST-aware text sanitization utility that strips formulaic LLM conversational signatures.',
    tags: ['Python', 'TypeScript', 'NLP', 'AST'],
    url: 'https://github.com/SmartisanNaive/AI-Cleaner',
    image: '/images/projects/ai-cleaner.svg',
    stars: '119+ ★',
  },
  {
    num: '05',
    category: 'BIO FOUNDATION MODELS',
    name: 'LLM_for_EVO2',
    description:
      'Tooling and workflows connecting large language models with Evo 2 genomic foundation models.',
    tags: ['Bio-LM', 'Evo 2', 'Python'],
    url: 'https://github.com/SmartisanNaive/LLM_for_EVO2',
    image: '/images/projects/llm-evo2.svg',
  },
  {
    num: '06',
    category: 'LAB AUTOMATION · NLP',
    name: 'LabScript-AI',
    description:
      'Natural-language-to-Opentrons compiler generating verified liquid handling protocols.',
    tags: ['Opentrons', 'NLP', 'Python'],
    url: 'https://github.com/SmartisanNaive/LabScript-AI',
    image: '/images/projects/labscript-ai.svg',
  },
];
