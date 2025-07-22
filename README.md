# 🛡️ Discord Moderation Bot

A TypeScript-based Discord bot that proactively **flags or rejects problematic content** using both rule-based filtering and the **Perspective API** by Google. Designed for moderation-first workflows with gated posting and post-screening support.

---

## ✨ Features

- 🔍 Screens user messages for profanity and toxicity
- ⚔️ Dual moderation modes:
  - **Gate-only**: Post via `/post` command, screened *before* posting
  - **Free-talk**: Messages are screened *after* posting
- 🤖 Slash command support (`/post`)
- 🧠 AI-powered content filtering via [Perspective API](https://www.perspectiveapi.com/)
- 🔐 Logs violations to private mod channel
- 📬 Notifies users via DM when messages are blocked
- 🧪 Extensible architecture with future support for local models

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- A Discord bot token and application
- [Perspective API key](https://developers.perspectiveapi.com/s/docs-get-started)

### Clone and setup

```bash
git clone https://github.com/yourusername/discord-moderator-bot.git
cd discord-moderator-bot
cp .env.example .env  # Then fill in your actual secrets
npm install
npm run dev
```
