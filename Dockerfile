# Stage 1: Build static website
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build application
RUN npm run build

# Stage 2: Serve with Nginx for aaPanel / Docker
FROM nginx:alpine

# Copy build output to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
