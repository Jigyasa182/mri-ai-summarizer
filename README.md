# AI-Assisted MRI Report Simplification & Clinical Summary Generator

A production-quality full-stack (MERN) application that uses Generative AI (**Llama-3.2-3B via Hugging Face Router**) to simplify technical MRI radiology reports into structured clinical documentation summaries.

## 🌟 Key Features
- **Secure Authentication**: JWT-based signup and login system for personalized report history.
- **Premium Dark UI**: High-fidelity medical dashboard with glassmorphism effects and cyan/purple accents.
- **AI-Driven Simplification**: Converts technical spinal, brain, and general MRI jargon into plain language.
- **Structured Output**: Automatically parses findings into Observations, Summary, and Terminology.
- **Ethical Multi-Layer Guardrails**: Rigid prompt engineering and hardcoded clinical disclaimers.
- **Responsive History**: Manage and review past analyses with ease.

## 🛠️ Tech Stack
- **Frontend**: React.js 18, Tailwind CSS, Lucide-React, Axios, React Router 6.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose).
- **AI Layer**: Llama-3.2-3B-Instruct via Hugging Face **Router API** (OpenAI-compatible).

## ⚖️ Ethical AI Compliance
1. **No Diagnosis**: Identifies findings but does not diagnose diseases.
2. **Text-Only**: Processes written reports, not medical images (DICOM).
3. **Safety First**: Mandatory clinical disclaimers on every summary.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas account
- Hugging Face API Token

### Installation & Run

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env with MONGO_URI, HF_API_KEY, JWT_SECRET, PORT=5000
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:3000`

## 🏗️ System Architecture
The app follows a **Clean Architecture** approach:
- **Client**: Auth-guarded context-driven React application.
- **Server**: JWT-protected Express routes with controller-service separation.
- **AI Infrastructure**: Modern Router-based inference with resilient parsing logic to handle LLM format variability.

---
*Built for the Nebula9.ai GenAI Internship Evaluation.*
