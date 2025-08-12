# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the Next.js app without running ESLint
RUN npm run build -- --no-lint

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3000 || exit 1

