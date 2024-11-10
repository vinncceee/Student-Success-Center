# Use a Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server with nodemon
CMD ["nodemon", "server.js"]
