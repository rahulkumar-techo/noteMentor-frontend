# -------------------------------------------------
# 1️⃣ Base Builder Image
# -------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cached)
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Build Next.js (creates .next/standalone)
RUN npm run build


# -------------------------------------------------
# 2️⃣ Production Runner Image
# -------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Set env flags for optimized Next.js runtime
ENV NODE_ENV=production
ENV PORT=3000

# Copy only the standalone production build
COPY --from=builder /app/.next/standalone ./

# Copy Next.js static assets
COPY --from=builder /app/.next/static ./.next/static

# Copy public folder
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["node", "server.js"]
