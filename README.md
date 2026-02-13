# AI-Assisted MRI Report Simplification & Clinical Summary Generator

A production-quality **full-stack MERN application** that uses Generative AI to simplify technical MRI radiology reports into structured, easy-to-understand clinical summaries.

The system is designed as a **clinical support tool**, emphasizing safety, ethics, and reliability.

---

## 🌟 Key Features

- **Secure Authentication**  
  JWT-based signup and login with user-specific report history.

- **Premium Medical UI**  
  Dark-mode dashboard with high-contrast, clinician-friendly design.

- **AI-Driven Simplification**  
  Converts complex MRI terminology into clear, plain-language summaries.

- **Structured Output**  
  Automatically organizes findings into Summary, Observations, and Terminology sections.

- **Ethical AI Guardrails**  
  Prompt constraints, backend validation, and mandatory clinical disclaimers.

- **Report History Management**  
  Users can review and manage previously analyzed reports.

---

## 🛠️ Tech Stack

### Frontend
- React.js 18  
- Tailwind CSS  
- React Router 6  
- Axios  

### Backend
- Node.js  
- Express.js  
- JWT Authentication  
- bcrypt for password hashing  

### Database
- MongoDB Atlas (Mongoose)

### AI Layer
- Llama-3.2-3B-Instruct  
- Integrated via :contentReference[oaicite:1]{index=1} Router API (OpenAI-compatible)

---

## 🏗️ System Architecture

The application follows a **clean, production-ready architecture**:

- **Client:** Auth-guarded, context-driven React application  
- **Server:** JWT-protected Express API with controller–service separation  
- **AI Layer:** Backend-controlled inference with prompt constraints and resilient parsing  

AI access is restricted to the backend to ensure security and output control.

---

## ⚖️ Ethical AI Compliance

- **No Diagnosis:** The system identifies findings but does not diagnose diseases  
- **Text-Only Processing:** No medical images or DICOM files are handled  
- **Safety First:** Mandatory clinical disclaimers are injected at the backend level  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas account
- Hugging Face API token

---

### Backend Setup

```bash
cd backend
npm install
# Create a .env file with:
# MONGO_URI, HF_API_KEY, JWT_SECRET, PORT=5000
npm run dev

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📌 Assumptions

- Input consists of text-based MRI reports only.
- Output is informational and assistive, not diagnostic.
- Medical safety is enforced through system-level controls
- Users understand AI output does not replace professional medical judgment

## 🔍 Highlights of the Implementation

- AI integrated as a controlled single-purpose agent, not a raw chatbot.
- Backend validation ensures deterministic and safe output.
- Secure authentication and strict user-level data isolation.
- Designed with real-world GenAI production practices in mind.

## 🏁 Conclusion

- **This project demonstrates:**

- Full-stack MERN development
- Practical and ethical GenAI integration
- Secure authentication and data isolation
- Production-oriented architectural thinking