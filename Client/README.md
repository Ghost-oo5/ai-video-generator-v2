# 📦 Client - AI Video Generator Frontend

This is the **frontend** of the `ghost-oo5-ai-video-generator` project. It's a Next.js 15 application using modern tools like Tailwind CSS, TypeScript, Zustand, and Google GenAI.

---

## ⚙️ Tech Stack

- **Next.js 15**
- **React 19**
- **Tailwind CSS**
- **TypeScript**
- **Zustand (State Management)**
- **shadcn/ui & lucide-react (UI Libraries)**
- **Google Generative AI APIs**

---

## 📁 Project Structure (Client)

```
Client/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── VideoGenerator.tsx
│   ├── types.ts
│   ├── api/
│   │   ├── generate-image/route.ts
│   │   ├── generate-script/route.ts
│   │   └── video/route.ts
│   ├── components/
│   │   ├── RealEstateForm.tsx
│   │   ├── SuplimaxForm.tsx
│   │   ├── UseCaseSwitcher.tsx
│   │   ├── MediaDisplay.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── RealEstateSection.tsx
│   │   └── SuplimaxSection.tsx
│   ├── hooks/
│   │   ├── useRealEstateGenerator.ts
│   │   └── useSuplimaxGenerator.ts
│   └── services/
│       └── geminiService.ts
├── components/ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── textarea.tsx
│   └── LoadingSpinner.tsx
├── lib/utils.ts
├── public/
└── config + meta files (tsconfig, tailwind.config, etc.)
```

---

## ✨ Features

- **Use Case Switcher:** Toggle between Suplimax and Real Estate workflows.
- **Dynamic Forms:** Collect product/property data.
- **Loading Feedback:** Spinner + text during async ops.
- **Google GenAI API integration:** Script & image generation.

---

## 🧩 Core Components

- `VideoGenerator.tsx`  
  Main orchestrator component for both use cases.

- `RealEstateForm.tsx` / `SuplimaxForm.tsx`  
  Form UI to capture user inputs.

- `UseCaseSwitcher.tsx`  
  Toggles between real estate and suplimax modes.

- `MediaDisplay.tsx`  
  Displays generated image or script results.

---

## 🪝 Custom Hooks

- `useRealEstateGenerator.ts`  
  Handles form state, loading, and Google GenAI API logic for real estate.

- `useSuplimaxGenerator.ts`  
  Handles state, prompts, and script/image generation logic for energy drink ads.

---

## 📡 API Integration

All GenAI-related functionality is abstracted in:

- `services/geminiService.ts`

```ts
generateImageFromApi(prompt)
generateSuplimaxVideoScript(formData, description)
generateRealEstateVideoScript(propertyDetails, tourStyle)
```

Next.js API Routes:
- `/api/generate-image` – POST for image generation
- `/api/generate-script` – POST for video script generation
- `/api/video` – POST for final video trigger (optional)

---

## 🎨 UI Elements

Inside `components/ui/`, you’ll find:

- `button.tsx`, `input.tsx`, `select.tsx`, `label.tsx`, `textarea.tsx`
- Styled with Tailwind + Radix + shadcn/ui
- Reusable across both forms

---

## 🚀 Getting Started

```bash
cd Client
npm install
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 📌 Notes

- Ensure backend APIs are up (`Server/` must be running).
- Environment variables (e.g., Google API keys) must be configured if deployed.
- Optimized for Vercel hosting.

---

## 📄 License

MIT © ghost-oo5-ai-video-generator
