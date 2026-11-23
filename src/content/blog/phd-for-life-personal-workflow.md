---
title: "PhD for Life: My Personal AI Stack, Reading System, and Daily Automation Workflow"
description: "A deep dive into how I structure personal research, agent delegation, paper ingestion, and reproducible code pipelines."
pubDate: 2026-07-12
tags: ["Workflows", "Notes"]
draft: false
---

The name **"phd for life"** (`phd4life.com`) is not about accumulating academic credentials. It reflects an enduring personal philosophy: approaching software engineering, machine learning research, and synthetic biology with the relentless rigor, curiosity, and disciplined habit of lifelong scholarly exploration.

Over the past three years, my daily engineering setup has evolved into an interconnected autonomous workflow. Here is the operational blueprint.

## 1. Terminal-First Knowledge Ingestion

My research ingestion system is built on local Markdown notes, vector embeddings, and command-line automation:

- **ArXiv & BioRxiv Watcher**: A cron job fetches new preprints matching keywords (e.g. `Bio-LM`, `Opentrons`, `Flow Cytometry`, `Agentic Systems`).
- **Semantic Extraction**: Summaries are ingested into a local sqlite-vec database.
- **MCP Linking**: My terminal agent can search my entire literature corpus using Model Context Protocol without switching applications.

## 2. The Spec-Driven Development Loop

Whenever I start a new library or tool (such as MOSS-Lab or BioFoundry):

1. **RFC First**: I draft a concise specification file defining types, public interfaces, and security constraints.
2. **Subagent Delegation**: I delegate mechanical tasks (e.g. typing tests, fixture generation, mock hardware servers) to focused subagents.
3. **Deterministic Verification**: Every agent proposal must pass local tests and linting before human review.

```
+--------------------+      +--------------------+      +--------------------+
|  Problem / Idea    | ---> |  Spec RFC (.md)    | ---> |  Agent Synthesis   |
+--------------------+      +--------------------+      +--------------------+
                                                                  |
                                                                  v
+--------------------+      +--------------------+      +--------------------+
|  Production Ship   | <--- |  Human Sign-off    | <--- |  Deterministic CI  |
+--------------------+      +--------------------+      +--------------------+
```

## 3. The 80/20 Rule of Scientific Tooling

The biggest pitfall in computational biology is over-engineering centralized web portals that nobody maintains. 

I follow three non-negotiables:
- **Local-First Always**: Data stays on the machine or runs in the browser via WebAssembly (SpatialBridge).
- **Zero Heavy Infrastructure**: Prefer static sites (like Astro SSG on EdgeOne Pages) over stateful node clusters whenever possible.
- **Reproducible Environments**: Strictly pinned `uv` virtual environments and Docker images.

Lifelong learning is not about passively consuming information; it is about building the autonomous tools that allow you to experiment, fail fast, and build repeatedly.
