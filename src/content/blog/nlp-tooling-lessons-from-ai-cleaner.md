---
title: "What Building AI-Cleaner Taught Me About Practical NLP Tooling"
description: "Insights from creating a viral text-cleaning tool with 119+ stars: why heuristic rules, token-level precision, and deterministic workflows often beat heavy LLMs."
pubDate: 2026-08-30
tags: ["NLP", "Open Source"]
draft: false
---

In mid-2024, I published **AI-Cleaner** with a tongue-in-cheek tagline: *"404: AI signature not found"*. It quickly gained 119+ GitHub stars and 17 community forks.

The premise was deceptively simple: automatically detect and remove formulaic conversational boilerplate inserted by LLMs—such as *"As an AI language model..."*, *"Certainly! Here is..."*, and patronizing summary sign-offs.

Building it yielded several counter-intuitive lessons about building practical developer tools in the age of generative models.

## Lesson 1: Don't Use an LLM to Fix an LLM's Flaws

The most frequent early feature request was: *"Can you call GPT-4o-mini to detect the conversational artifacts?"*

We tried it, and the results were abysmal:
1. **Latency Explosion**: A local text file that took 4 ms to clean suddenly took 1.8 seconds.
2. **Re-introduction of Hallucinations**: The secondary model rephrased intentional code or altered nuanced technical prose.
3. **API Cost**: Nobody wants to pay tokens to strip disclaimers.

Instead, we built a hybrid deterministic pipeline combining compiled regular expressions, token boundary analysis, and semantic fingerprinting:

```python
import re

PATTERNS = [
    re.compile(r"^(Certainly|Sure|Of course)[!,.]?\s*(Here\s+(is|are).*)?$", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^As\s+an\s+AI\s+(language\s+model|assistant).*?[.!?]", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^I\s+hope\s+this\s+(helps|information\s+was\s+useful).*?[.!?]$", re.IGNORECASE | re.MULTILINE)
]

def sanitize_ai_output(text: str) -> str:
    cleaned = text
    for pat in PATTERNS:
        cleaned = pat.sub("", cleaned)
    return cleaned.strip()
```

## Lesson 2: Preserve Markdown AST Integrity

A common failure mode in naive regex string replacement is mangling code blocks. If a user writes an explanation about how AI models output *"As an AI..."* inside a Markdown code snippet, stripping it destroys the author's work.

We transitioned from pure string manipulation to **AST-aware parsing**:
- Parse the document into a Markdown Abstract Syntax Tree.
- Traverse only root-level paragraph nodes and list items.
- Ignore code blocks, blockquotes, and inline backticks.

## Lesson 3: The Best Dev Tools Do One Thing Reliably

Developers loved AI-Cleaner not because it claimed to possess "artificial general intelligence", but because it integrated seamlessly into Git hooks and CI pipelines:

```bash
# In .git/hooks/pre-commit
git diff --cached --name-only | grep '\.md$' | xargs ai-cleaner --check
```

Small, deterministic, highly focused NLP utilities remain an indispensable foundation of modern engineering.
