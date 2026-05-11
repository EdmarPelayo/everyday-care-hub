# Everyday Helper

A React + Vite prototype for an accessibility and assistive technology class.
The first feature is a smart medication reminder page with:

- Visual, audio, and vibration reminder alerts
- Photo confirmation for medication taken
- Auto-refill and pharmacy alert actions
- Caregiver notification action
- Manual add and delete controls for prescription reminders
- Fully customizable multiple reminder times for the same medication
- Camera capture with photo-upload fallback
- Caregiver tab with user medication updates, confirmation photos, and schedule
- Daily Life Reminders page for appointments, laundry, plants, pets, household tasks, hydration, and custom reminders
- Accessible Cooking Assistant powered by Gemini for recipe simplification, step guidance, timers, voice controls, and food photo identification
- Large-print dosage schedule
- Multi-language controls and screen-reader live updates

## Gemini API key

Paste your Gemini API key in:

```txt
src/geminiConfig.js
```

Replace:

```js
export const GEMINI_API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";
```

This is fine for a class prototype. In production, route Gemini requests through
a backend so the API key is not exposed in browser code.

## Run locally

Make sure Node is v20.19+ or v22.12+.

```bash
node -v
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

## Folder Structure

```txt
src/
├── main.jsx
├── App.jsx
└── index.css
```
