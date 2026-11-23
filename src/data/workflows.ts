export interface Workflow {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const workflows: Workflow[] = [
  {
    num: '01',
    title: 'ZERO-HARDWARE LAB LOOP',
    subtitle: 'Simulation-Gated Automation',
    description:
      'Natural-language protocol intent → LLM code synthesis → local opentrons.cli analyze --check safety gate → MuJoCo / Three.js 3D deck preview → read-only telemetry & Xiaozhi MCP dispatch.',
    tags: ['MOSS-Lab', 'Opentrons Flex', 'MCP', 'MuJoCo'],
  },
  {
    num: '02',
    title: 'TERMINAL-FIRST ENGINEERING',
    subtitle: 'Agentic Coding & Biofoundry CLI',
    description:
      'Spec-driven workflows powered by terminal agents (Biofoundry_CLI), modular domain skills, subagent delegation, custom MCP tool servers, and reproducible Docker / uv environments.',
    tags: ['Biofoundry_CLI', 'ACP / MCP', 'uv', 'Docker'],
  },
  {
    num: '03',
    title: 'EDGE SCIENTIFIC PIPELINES',
    subtitle: 'Local-First Data & ML Processing',
    description:
      'Zero-upload scientific data inspection directly in the browser using WebAssembly (h5wasm) and Web Workers, paired with Python ML/NLP notebooks for downstream analysis.',
    tags: ['SpatialBridge', 'TypeScript', 'WebAssembly', 'Python'],
  },
];
