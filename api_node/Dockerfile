# Use the official Node.js image as the base image
FROM node:18-slim

# Update and install security patches
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]