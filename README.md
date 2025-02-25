# Student Success Center Web Application Setup

## Prerequisites

1. **Install Docker**: Download and install Docker from [here](https://www.docker.com/).
2. **Create Accounts**:
   - **Firebase**: Sign up at [Firebase Console](https://console.firebase.google.com/u/0/).
   - **MongoDB Atlas**: Create an account at [MongoDB Atlas](https://cloud.mongodb.com/).

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vinncceee/Student-Success-Center
   cd Student-Success-Center
   ```

2. **Start Docker Desktop**: Ensure Docker Desktop is running in the background before proceeding.

3. **Build and start the application**:

   ```bash
   docker compose up --build
   ```

4. **Access the application**:

   - The backend server will be available at: [http://localhost:5000](http://localhost:5000)
   - The frontend will be available at: [http://localhost:3000](http://localhost:3000)

5. **Stopping the application**:

   ```bash
   docker compose down
   ```

6. **Rebuilding the application** (if changes are made to configuration or dependencies):

   ```bash
   docker compose up --build
   ```

## Troubleshooting

- **Port Conflicts**: Ensure no other applications are running on port 5000 or 3000..

