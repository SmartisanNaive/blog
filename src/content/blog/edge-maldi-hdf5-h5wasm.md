---
title: "Slicing Multi-Gigabyte MALDI HDF5 Files in the Browser with h5wasm & Web Workers"
description: "How SpatialBridge uses WebAssembly, Emscripten WORKERFS lazy slicing, and zero-upload client computing for high-throughput spatial mass spectrometry imaging."
pubDate: 2026-10-18
tags: ["AI4Science", "WebAssembly"]
draft: false
---

Matrix-Assisted Laser Desorption/Ionization (MALDI) Mass Spectrometry Imaging (MSI) captures the spatial distribution of hundreds of biomolecules directly from tissue sections. However, modern MSI datasets are massive: a single slide scan routinely generates a **10 GB to 80 GB HDF5 or imzML file**.

Traditionally, inspecting such datasets required either installing multi-gigabyte desktop software or uploading huge files to centralized cloud servers. In **SpatialBridge**, we solved this by running the entire extraction pipeline directly inside the user's browser via **WebAssembly (`h5wasm`) and Web Workers**.

## The Web Worker & WORKERFS Strategy

The Emscripten `WORKERFS` filesystem allows WebAssembly code running in a dedicated Web Worker to mount native browser `File` or `Blob` objects without reading their entire contents into JavaScript memory.

```typescript
// Inside worker.ts
import { FS, H5Wasm } from 'h5wasm';

self.onmessage = async (e: MessageEvent) => {
  const { file, mzTarget, tolerance } = e.data;
  
  // Mount the native File handle into WORKERFS
  FS.mkdir('/work');
  FS.mount(FS.filesystems.WORKERFS, { files: [file] }, '/work');

  // Open HDF5 handle with lazy random access
  const h5file = new H5Wasm.File(`/work/${file.name}`, 'r');
  const intensities = h5file.get('SpatialBridge/Intensities');
  
  // Extract ion image slices on the fly
  const ionImage = extractSlice(intensities, mzTarget, tolerance);
  self.postMessage({ ionImage }, [ionImage.buffer]);
};
```

## Ion Intensity Formulation

For an array of spatial pixels $p \in \mathbb{R}^2$ and mass-to-charge ratios $m/z$, the extracted ion intensity map $I(x, y)$ within mass tolerance $\Delta m$ is given by:

$$I(x, y) = \int_{m_0 - \Delta m}^{m_0 + \Delta m} S(x, y, m) \, dm$$

Where $S(x, y, m)$ is the continuous ion current detected at coordinate $(x, y)$.

## Performance Benchmarks

| Operation | Server Upload Approach | SpatialBridge (h5wasm) |
| :--- | :--- | :--- |
| **Data Ingestion** | 5–15 min (Upload 12 GB) | **Instant (0 ms mount)** |
| **Slice Random Access** | 200 ms (Server round-trip) | **18 ms (Local memory)** |
| **Privacy / Compliance** | HIPAA / IRB risk | **100% Client-Side** |

By keeping sensitive biological datasets local, researchers can preview high-resolution ion distribution maps immediately without compliance roadblocks.
