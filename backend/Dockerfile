# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Create persistent storage directory outside app folder
RUN mkdir -p /persistent/uploads/profile-images && \
    chown -R node:node /persistent/uploads && \
    chmod -R 775 /persistent/uploads

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (combine into single RUN for smaller image size)
RUN npm install -g nodemon && \
    npm install && \
    npm install multer express mongoose cors dotenv

# Copy the remaining backend application code
COPY . .

# Create symlink for backward compatibility
RUN ln -s /persistent/uploads /app/uploads

# Expose the port the backend runs on
EXPOSE 5000

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Start the backend server with nodemon
USER node
CMD ["nodemon", "server.js"]