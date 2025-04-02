# AI TypeScript

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

This project demonstrates various AI capabilities implemented with TypeScript in a local development environment.

## Features

This repository includes implementations of:

- **Linear Regression** - Basic machine learning algorithms
- **Image Classification** - Using the MobileNet model
- **Text Generation** - Powered by the Gemma3 model
- **Image Generation** - Using Stable Diffusion
- **Audio Transcription** - Using Whisper by Open AI
- **Text to Audio** - Using text2wav (no AI here)

## Requirements

### Text Generation
- [Ollama](https://ollama.ai/) - Local LLM runtime
- Gemma3 model (can be pulled via Ollama)

### Image Generation
Navigate to the Python directory and install dependencies:

```bash
cd python
pip install -r requirements.txt
```

### Audio Transcription
- ffmpeg.