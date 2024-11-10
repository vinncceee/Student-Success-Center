
# Student Success Center Web Application

This repository contains the code for the Student Success Center web app, a MERN stack application designed to support tutors and students at the University of Texas at Arlington.

## Prerequisites

Ensure you have the following tools installed: Docker and Docker Compose.

## Getting Started

Clone the project to your local machine:
```bash
git clone <repository-url>
cd Student-Success-Center
```

Create an `.env` file in the root directory to specify any environment variables the app may require, such as database credentials, API keys, and other configurations. Here’s an example:
```plaintext
# .env example
PORT=5000
MONGODB_URI=<your-mongodb-uri>
```

Use Docker Compose to build and start the app. This will set up the backend server and any other services defined in `docker-compose.yml`.
```bash
docker compose up --build
```

Once the container is up and running, you can access the backend server at: http://localhost:5000

To stop the container, press `Ctrl + C` in the terminal where Docker is running, or run:
```bash
docker compose down
```

To apply any changes to the Docker configuration or dependencies, rebuild the containers with:
```bash
docker compose up --build
```

## Folder Structure

The main folders are organized as follows:
```
Student-Success-Center/
├── client/          # Frontend code (React)
├── server.js        # Entry point for the backend server
├── Dockerfile       # Docker configuration for the backend
├── docker-compose.yml # Docker Compose setup
└── README.md        # Project setup and information
```

## Troubleshooting

- Port Conflicts: Ensure no other application is running on port 5000.
- Environment Variables: Double-check the `.env` file for required variables.
- Docker Issues: If Docker fails to start, try running `docker compose down` and then `docker compose up --build`.

## Contributing

For any changes or enhancements: create a new branch from `main`, make your changes, test them locally, and submit a pull request for review.

## Contact

If you have questions or encounter issues, please reach out to the project maintainer.
