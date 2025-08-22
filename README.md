# 🩺🌍 Healthcare Translator Prototype

## 📌 Project Overview
This project is a prototype web application designed to enable **real-time multilingual communication** between patients and healthcare providers.  

It addresses the challenge of **language barriers in healthcare** by providing a seamless speech-to-speech translation pipeline:

- 🎤 **Speech-to-Text (STT)** → Captures spoken input from patients or doctors.  
- 🌍 **AI Translation** → Translates the transcript into the target language while preserving **medical terminology**.  
- 🔊 **Text-to-Speech (TTS)** → Reads out the translated text for real-time communication.  
- 🖥 **Dual Transcript Display** → Shows both the original and translated text for clarity.  

⚠ **Disclaimer:** This is a prototype built for demonstration purposes only. **Do not enter personal health information.**

---

## 🎯 Objectives
- Build a working prototype in **48 hours** for demo purposes.  
- Demonstrate **real-time speech translation** using AI models + browser APIs.  
- Deliver a **mobile-first responsive app** that works on any device.  
- Ensure **security and privacy**: hidden API keys, disclaimer, HTTPS enabled.  

---

## 🚀 Tech Stack

### 🖥 Frontend
- **Next.js 15** → React-based, Vercel-native deployment.  
- **TailwindCSS** → Modern utility-first styling.  
- **shadcn/ui** → Professional UI components (Card, Button, Select, Textarea).  

### 🎤 Speech-to-Text (STT)
- **Primary**: Web Speech API (real-time, browser-native).  
- **Fallback (optional)**: OpenAI Whisper API (better medical accuracy).  

### 🌍 Translation
- **OpenAI GPT-4o-mini API** → Context-aware, accurate translations.  
- Integrated securely via **Next.js API route** (`app/api/translate/route.js`).  

### 🔊 Text-to-Speech (TTS)
- **Primary**: SpeechSynthesis API (instant playback).  
- **Fallback (optional)**: ElevenLabs API (natural voice).  

### 📦 Deployment
- **Vercel** → Zero-config deployment with free HTTPS and instant demo links.  

---

## 🛠 Features
✅ Real-time speech capture (microphone → transcript).  
✅ AI-powered medical translation.  
✅ Dual transcript display (original vs translated).  
✅ One-click playback of translated text (TTS).  
✅ Mobile-first responsive UI (desktop: side-by-side, mobile: stacked).  
✅ Secure API key handling via `.env.local` and Vercel env vars.  
✅ Disclaimer banner for compliance.  

---

## 🏗 System Architecture
```text
🎤 User Speech
   ↓ (Web Speech API - STT)
📝 Original Transcript
   ↓ (API Route → OpenAI GPT-4o-mini)
🌍 Translated Transcript
   ↓ (SpeechSynthesis API - TTS)
🔊 Spoken Output in Target Language
```
---
# ⚙️ Setup & Installation

## 🛠 Clone Repository
```bash
git clone https://github.com/<your-username>/healthcare-translator.git
cd healthcare-translator
```
## 📦 Install Dependencies
```bash
npm install
```
## 🔑 Add Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key_here
```
⚠️ Note: This file is ignored by Git (.gitignore).
## ▶️ Run Development Server
```bash
npm run dev
```
Open the app at 👉 http://localhost:3000
## 🔐 Security & Privacy
- API key is never exposed to the frontend.
- .env.local is ignored by Git (safe for local dev).
- On Vercel, set OPENAI_API_KEY via Project → Settings → Environment Variables.
- Disclaimer warns users not to enter PHI (Protected Health Information).
- HTTPS auto-enabled on Vercel.
## 📦 Deployment on Vercel
- Push code to GitHub or import project from local.
- Import repo into Vercel Dashboard.
- Add environment variable:
```text
KEY: OPENAI_API_KEY  
VALUE: your_openai_api_key_here
```
- Deploy → Get live demo link.
## 📹 Deliverables
- Live Prototype Link → Vercel demo URL.
- GitHub Repository → Full code with documentation.
- Documentation → README.md + optional USER_GUIDE.md + PDF.
- Demo Recording → OBS/Loom video of usage.
## 📖 Usage Guide
- Click 🎤 Start → Speak into the microphone.
- Transcript appears in Original Transcript panel.
- Select Target Language from dropdown.
- Click 🌍 Translate → Translation appears in the second panel.
- Click 🔊 Speak → Browser reads translated text aloud.
## ⚠ Limitations
- Web Speech API may have limited medical vocabulary recognition.
- Accuracy depends on internet connection + browser support.
- Prototype only — not production-ready for clinical use.
- Tested on Chrome/Edge desktop + Chrome mobile.
## 👨‍💻 Author
Haseeb Amjad
Pre-interview Assignment — NAO Medical (2025)
