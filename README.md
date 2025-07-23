# 🛡️ Discord Moderation Bot

A Discord moderation bot supporting both local and remote screening (via Perspective API). It supports two moderation workflows: **gated posting** and **real-time cleanup**. Dockerized, configurable, and blazing fast with local inference.

---

## ⚡ Performance Comparison

| Provider        | Avg Response Time | Requires Internet | API Rate Limits | Cost        |
|----------------|-------------------|-------------------|------------------|-------------|
| 🌐 Perspective  | ~350–400ms        | ✅ Yes             | ✅ Yes            | ✅ Free (w/ quota) |
| 🧱 Local (FastAPI) | ~20–30ms          | ❌ No              | ❌ No             | ✅ Free (self-hosted) |

## ✨ Features

- 🧼 Screens user messages for profanity, toxicity, and other violations
- ⚔️ Dual moderation modes per channel:
  - 🛡️ **Gate-only**: Users must use `/post` — messages are screened before posting
  - 💬 **Free-talk**: Messages post immediately, then get screened and deleted if necessary
- 🤖 Slash command support (`/post`) for gated channels
- 🧠 AI-powered moderation via:
  - 🌐 **Remote**: [Perspective API](https://www.perspectiveapi.com/)
  - 🧱 **Local**: Fast, Dockerized screening API (~20–30ms response time)
- 🧩 Modular provider system with per-channel config
- 📊 Built-in benchmarking logs per-message provider latency
- 🔐 Private moderation logs in a secure staff-only channel
- 📬 Users get DM notifications when their messages are blocked
- 📦 Fully Dockerized for local or Unraid deployment
- 🧪 Unit-tested, clean typings, coverage-ready architecture

---

## 🚀 Quick Start

### 🔧 Prerequisites

- Node.js v20+
- A registered Discord bot and token
- [Perspective API key](https://developers.perspectiveapi.com/s/docs-get-started)

### 🛠️ Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/discord-moderation-bot.git
cd discord-moderation-bot

# Copy and edit environment variables
cp .env.example .env
# Fill in your Discord bot token, Perspective API key, etc.

# Install dependencies
pnpm install     # or: npm install

# Run the bot locally
pnpm dev         # or: npm run dev
```

### 🐳 Or run with Docker

```
docker build -t discord-bot .
docker run --env-file .env discord-bot
```


## 🔐 Environment Variables

| Variable                     | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `DISCORD_TOKEN`             | Your bot’s token from the Discord developer portal                         |
| `CLIENT_ID`                 | The application’s client ID from the Discord developer portal              |
| `REGISTER_COMMANDS`         | Set to `true` to register slash commands on startup                        |
| `PERSPECTIVE_API_KEY`       | API key for Google's Perspective API                                        |
| `USE_LOCAL`                 | Set to `true` to use the local moderation provider instead of Perspective   |
| `LOCAL_MODERATION_URL`      | URL endpoint for the local moderation API (e.g., `http://localhost:8000/moderate`) |
| `CHANNEL_ID_LOCAL_GATED`    | Channel ID for local gated moderation (requires `/post` to submit)         |
| `CHANNEL_ID_PERSPECTIVE_GATED` | Channel ID for Perspective gated moderation                            |
| `CHANNEL_ID_LOCAL_FREE_CHAT`   | Channel ID for local provider with free-talk moderation                |
| `CHANNEL_ID_PERSPECTIVE_FREE_CHAT` | Channel ID for Perspective with free-talk moderation             |
