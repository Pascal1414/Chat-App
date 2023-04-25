# Use the official Node.js image as the base image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application source code
COPY . .

# Build the application for production
RUN npm run build

# Expose the application port
EXPOSE 8080

# Start the application using the locally installed Vite
CMD ["npx", "vite", "preview", "--port", "8080", "--host"]
