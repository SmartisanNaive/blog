---
title: "Designing Terminal-First Agents for Biofoundries: Architecture Notes on Biofoundry_CLI"
description: "Why we abandoned bloated web dashboards in favor of a spec-driven CLI agent for automated synthetic biology engineering."
pubDate: 2026-09-25
tags: ["Agents", "SynBio"]
draft: false
---

Graphical dashboards look impressive in venture capital pitch decks, but in actual biofoundry environments, computational biologists and automation engineers live in the shell. 

When building **Biofoundry_CLI**, our guiding thesis was simple: **Make bioengineering as composable and reproducible as modern software engineering.**

## The Three Pillars of Biofoundry_CLI

1. **Spec-Driven Declarations**: Plasmids, assemblies, and liquid handling schedules are specified in declarative YAML or typed Python Pydantic specs rather than arbitrary conversational chats.
2. **Deterministic Delegation**: The CLI provides execution subagents with isolated context windows for DNA alignment (SangerAlign), PCR reaction calculations, and vendor dispatch.
3. **Pluggable Protocol Bridges**: Seamless integration with Model Context Protocol (MCP) and Agent Communication Protocol (ACP).

```bash
# Example Biofoundry_CLI invocation
$ biofoundry plan --constructs designs/car-t-panel.yaml \
    --chassis pichia-pastoris \
    --protocol golden-gate \
    --out build/
```

## Modular Subagent Specialization

Instead of maintaining a gigantic monolithic system prompt with hundreds of biological rules, Biofoundry_CLI splits the responsibility across focused agents:

- **SangerAlign Agent**: Handles chromatogram trace decoding, peak deconvolution, and sequencing verification against reference maps.
- **PrimerDesign Agent**: Calculates melting temperature ($T_m$), hairpins, and primer dimers.
- **DeckCompiler Agent**: Translates construct assembly sequences into robotic liquid transfer actions.

```
                  +-------------------------+
                  |  Biofoundry_CLI Core    |
                  +-------------------------+
                    /          |          \
                   v           v           v
           +-------------+ +-------------+ +-------------+
           | SangerAlign | | PrimerDesign| | DeckCompiler|
           | Subagent    | | Subagent    | | Subagent    |
           +-------------+ +-------------+ +-------------+
```

## Primer Melting Temperature Formula

The nearest-neighbor thermodynamic calculation implemented in our agent tool calculates duplex stability via:

$$T_m = \frac{\Delta H^\circ}{\Delta S^\circ + R \ln(C_T / 4)} + 16.6 \log_{10}[\text{Na}^+] - 273.15$$

Where $\Delta H^\circ$ is enthalpy, $\Delta S^\circ$ is entropy, $R$ is the universal gas constant, and $C_T$ is primer concentration.

## Takeaways

By treating bioengineering constructs as software dependencies and using CLI-native agent loops, we cut design-to-build turnaround times from days to minutes.
