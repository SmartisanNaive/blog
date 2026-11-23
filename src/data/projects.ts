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
      'Web AI agent with local Opentrons Flex liquid-handling protocol simulation, MuJoCo/Three.js 3D keyframe previews, dual Agent/Research modes, read-only robot telemetry, and Xiaozhi MCP hardware delegation.',
    tags: ['Node.js', 'Python', 'Three.js', 'MuJoCo', 'MCP', 'WebSocket'],
    url: 'https://github.com/SmartisanNaive/MOSS-Lab',
    image: '/images/projects/moss-lab.svg',
  },
  {
    num: '02',
    category: 'SYNTHETIC BIOLOGY · CLI AGENT',
    name: 'BioFoundry',
    description:
      'Terminal-first software engineering and bio-manufacturing agent ("Make bioengineering as efficient as software development"). Features shell/print/ACP/wire modes, Sanger sequencing alignment (SangerAlign), and a unified SynPan/CIAI MCP server.',
    tags: ['Python', 'uv', 'OpenAI SDK', 'MCP', 'ACP'],
    url: 'https://github.com/SmartisanNaive/BioFoundry',
    image: '/images/projects/biofoundry.svg',
  },
  {
    num: '03',
    category: 'AI4SCIENCE · EDGE COMPUTING',
    name: 'SpatialBridge',
    description:
      'Browser-based edge-computing pipeline for MALDI mass spectrometry imaging (MSI) SBD/HDF5 data extraction and spatial registration using Web Workers and h5wasm WORKERFS lazy slicing.',
    tags: ['TypeScript', 'WebAssembly', 'h5wasm', 'Web Workers'],
    url: 'https://github.com/SmartisanNaive/SpatialBridge',
    image: '/images/projects/spatialbridge.svg',
  },
  {
    num: '04',
    category: 'NLP · DEVELOPER TOOLING',
    name: 'AI-Cleaner',
    description:
      'Open-source text analysis and signature-cleaning utility ("404: AI signature not found"), adopted by the developer community with 119+ stars and 17 forks.',
    tags: ['Python', 'TypeScript', 'NLP'],
    url: 'https://github.com/SmartisanNaive/AI-Cleaner',
    image: '/images/projects/ai-cleaner.svg',
    stars: '119+ ★',
  },
  {
    num: '05',
    category: 'BIO FOUNDATION MODELS',
    name: 'LLM_for_EVO2',
    description:
      'Tooling and experimental workflows bridging large language models with Evo 2 biological sequence foundation models for genomic and synthetic biology tasks.',
    tags: ['Python', 'Bio-LM', 'Evo 2'],
    url: 'https://github.com/SmartisanNaive/LLM_for_EVO2',
    image: '/images/projects/llm-evo2.svg',
  },
  {
    num: '06',
    category: 'LAB AUTOMATION · NLP',
    name: 'LabScript-AI',
    description:
      'Natural-language-to-Opentrons protocol generation workflow exploring reliable LLM scripting for automated wet-lab liquid handling.',
    tags: ['Python', 'Opentrons', 'NLP'],
    url: 'https://github.com/SmartisanNaive/LabScript-AI',
    image: '/images/projects/labscript-ai.svg',
  },
];
