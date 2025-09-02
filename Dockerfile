FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Accept API URL at build time
ARG VITE_ROBOT_API_URL
ENV VITE_ROBOT_API_URL=${VITE_ROBOT_API_URL}

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build (Vite will inline VITE_ROBOT_API_URL)
RUN npm run build

# Serve the static build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
