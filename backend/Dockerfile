# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies, including devDependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the remaining backend application code
COPY . .

# Expose the port the backend runs on
EXPOSE 8000

# Start the backend server with nodemon
CMD ["nodemon", "server.js"]