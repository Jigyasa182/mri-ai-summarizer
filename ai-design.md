# AI Design & Integration Overview

## 1. Purpose of the AI System

The AI component is designed to **simplify complex MRI reports** into structured, easy-to-understand clinical summaries.  
The system is strictly **assistive** and does not provide diagnoses or medical advice.

The goal is to reduce cognitive load while preserving clinical accuracy.

---

## 2. AI Architecture

The AI is implemented as a **backend-controlled single-purpose AI agent**, not a direct chatbot.

### High-Level Flow

User MRI Report (Text)
→ Prompt Engineering (Rules + Structure)
→ LLM Inference
→ Output Validation (Regex Parsing)
→ Safe, Structured Response

The frontend never communicates directly with the AI model.

---

## 3. Model Selection

- **Model Used:** Llama-3.2-3B-Instruct  
- **Access Method:** OpenAI-compatible API via :contentReference[oaicite:0]{index=0} Router  
- **Reasoning:**
  - Strong instruction-following capability
  - Low latency suitable for real-time summarization
  - Cost-efficient and production-friendly

Medical safety is enforced at the **system level** rather than relying solely on a domain-fine-tuned model.

---

## 4. Prompt Engineering Strategy

The prompt enforces:
- Non-diagnostic language
- Clear output structure (Summary, Observations, Terminology)
- Simplification of medical jargon
- Mandatory safety disclaimers

This reduces hallucination risk and ensures predictable output.

---

## 5. Output Validation & Reliability

LLM output is probabilistic and may vary in format.

To ensure reliability:
- Backend regex-based parsing extracts only expected sections
- Unexpected text is ignored
- Frontend receives deterministic structured data

This prevents UI breakage and unsafe output exposure.

---

## 6. Ethical & Safety Guardrails

- No diagnosis or prescriptive medical advice
- Text-only report processing (no DICOM/image handling)
- Backend-enforced disclaimers (cannot be bypassed)
- Minimal personal data storage

---

## 7. Limitations & Future Scope

### Current Limitations
- Text-based MRI reports only
- No confidence scoring on AI output

### Future Improvements
- Domain-specific medical model integration (e.g., Med-Llama)
- Confidence estimation for summaries
- Medical terminology tool validation

---
