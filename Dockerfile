FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and data
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the app using Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
