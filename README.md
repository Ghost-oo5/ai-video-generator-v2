# 🧠 ghost-oo5-ai-video-generator

A full-stack application to generate marketing videos using Google Generative AI (Gemini) – supporting multiple domains like Real Estate and Supplement Products.

---

## 📌 Overview

This project enables users to generate:
- AI-written video scripts
- AI-generated images
- Video metadata and structure (possibly for video rendering)

It features a **Next.js frontend** and a **Node.js + MongoDB backend**, integrated via REST APIs. Users can choose between different use cases such as **real estate ads** or **energy drink promotions (Suplimax)**.

---

## 📁 Directory Structure

```
ghost-oo5-ai-video-generator/
├── Client/        # Frontend (Next.js 15 + Tailwind + React 19)
└── Server/        # Backend (Express + MongoDB + Mongoose)
```

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-username/ghost-oo5-ai-video-generator.git
cd ghost-oo5-ai-video-generator
```

### 2. Start the Backend

```bash
cd Server
npm install
npm start
```

### 3. Start the Frontend

```bash
cd Client
npm install
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🧩 Major Features

### ✅ Multi-Use Case Support
- Real Estate marketing
- Suplimax (supplement brand) promotions

### ✅ AI Integration
- Uses **Google GenAI (Gemini API)** to generate:
  - Product descriptions
  - Marketing scripts
  - Matching image content

### ✅ Reusable UI Design
- Built using **shadcn/ui** + **lucide-react**
- Tailwind-based theming

### ✅ API and State Handling
- Next.js API routes in `Client/app/api/`
- Backend Express routes in `Server/routes/`
- Zustand state management in frontend
- RESTful structure for scalability

---

## 🔗 API Architecture

### Frontend APIs (Edge Functions)

| Endpoint | Description |
|----------|-------------|
| `/api/generate-image` | Uses GenAI to create relevant images |
| `/api/generate-script` | Generates marketing script from form data |
| `/api/video` | Reserved for video operations |

### Backend APIs

| Endpoint | Description |
|----------|-------------|
| `/api/generations` | Store/retrieve real estate & suplimax videos |
| `/api/suplimax` | Handles only Suplimax form submissions |

---

## 🧠 Folder Highlights

### `Client/`
- **VideoGenerator.tsx**: main page logic
- **hooks/**: abstracted logic per use case
- **services/geminiService.ts**: GenAI logic
- **components/**: modular UI (forms, inputs, etc.)

### `Server/`
- **routes/generation.js**: real estate logic
- **routes/suplimax.js**: supplement-focused logic
- **Model/**: Mongoose schemas
- **startup/db.js**: MongoDB connection

---

## 📄 License

MIT © ghost-oo5-ai-video-generator

> Built with ❤️ using Google GenAI & Next.js
