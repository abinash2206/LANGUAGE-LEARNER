# 🇮🇳 தமிழ் வழி பலமொழி கற்றல் (Tamil-Based Multilingual Language Learning App)

> **100% Offline Mobile & Web Application focused on helping Tamil speakers learn 5 target languages through Tamil as the permanent explanation language.**

---

## 🌟 Supported Language Pairs

| Language Pair ID | Source Language | Target Language | Native Name |
| :--- | :--- | :--- | :--- |
| `ta_en` | தமிழ் | **English** | English |
| `ta_ml` | தமிழ் | **Malayalam** | മലയാളം |
| `ta_hi` | தமிழ் | **Hindi** | हिन्दी |
| `ta_te` | தமிழ் | **Telugu** | తెలుగు |
| `ta_kn` | தமிழ் | **Kannada** | ಕನ್ನಡ |

---

## 🔥 Key Features

1. **Tamil-First Source & Explanation**:
   - Source language is permanently fixed to Tamil (`ta`).
   - Simple Tamil explanations, grammar notes, "Why?" breakdowns (`❓ ஏன்?`), error feedback, mistaked notes, and quiz explanations.

2. **Natural Target Language Expressions**:
   - Replaced mechanical literal translation with natural, contextually accurate expressions.
   - Usage level tags & explanations in Tamil: **Formal**, **Normal**, **Casual**, **Modern Spoken**.

3. **Script, Learner-Friendly Romanization & Display**:
   - Displays target script in large, readable typography.
   - Learner-friendly **Romanization / Thanglish** directly underneath target script for Malayalam, Hindi, Telugu, and Kannada.

4. **Dual-Engine Native Voice AI & Speed Controls**:
   - Authentic Indian voice speech synthesis (`ml-IN`, `hi-IN`, `te-IN`, `kn-IN`, `en-IN`, `ta-IN`).
   - Speaks the **actual native target script** and **never speaks Thanglish**.
   - 3 Speech Speeds: **Slow (0.5x)**, **Normal (0.85x)**, **Deep (1.0x)**.

5. **Offline Multilingual Word & Sentence Search**:
   - Search across Tamil words, Tamil meanings, Target scripts, Romanization/Thanglish, Synonyms, Tags, and Categories.
   - Sentence search with interactive **Word Breakdown** cards.

6. **Interactive Modules**:
   - **Alphabet & Sounds**
   - **Vocabulary (20+ Categories)**
   - **Sentences & Word Breakdown**
   - **Grammar & "❓ ஏன்?" (Why?) Button Modal**
   - **Dialogues & Conversations**
   - **Pronunciation Coach & Microphone Practice**
   - **Self-Assessment Tests with Thanglish Option Display**
   - **Daily Learning & 7-Day Streak Tracker**
   - **Offline Mistake Notebook & Bookmarks**
   - **Data Backup & Restore (JSON)**

7. **Clean Architecture & Data Isolation**:
   - Every language pair maintains isolated progress, streak days, mistake notebook entries, bookmarks, and test history.

---

## 🛠️ Tech Stack & Architecture

- **Frontend / Web Mobile App**: React 18, TypeScript, Vite, Custom Glassmorphic Styling, Lucide Icons, Canvas Confetti.
- **Voice & Speech AI**: Web Speech Synthesis + Native TTS Stream Fallback + Web Speech Recognition STT.
- **Offline Persistence**: LocalStorage & IndexedDB.
- **Mobile App Codebase**: Flutter / Dart Clean Architecture (`flutter_app/`) with Drift SQLite, Riverpod, and Flutter TTS.

---

## 🚀 Running Locally

```bash
# Clone repository
git clone https://github.com/abinash2206/LANGUAGE-LEARNER.git
cd LANGUAGE-LEARNER

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT License. Built with ❤️ for Tamil learners.
