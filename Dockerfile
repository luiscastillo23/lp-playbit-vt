FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS dev
WORKDIR /app
COPY package.json .npmrc ./
RUN pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev"]

FROM base AS builder
WORKDIR /app
COPY package.json .npmrc ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM base AS preview
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4173
CMD ["pnpm", "run", "preview"]
