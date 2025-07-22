# Use a lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build TypeScript
RUN pnpm build

# Run the bot
CMD ["node", "src/index.js"]
