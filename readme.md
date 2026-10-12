# Chat Application — Client

## Overview

The client is the frontend of the Chat Application. It provides the user interface for account registration, authentication, conversations, friend management, group messaging, and real-time communication.

The frontend communicates with the backend REST API for application data and uses WebSockets for real-time messaging and events.

## Technology Stack

* **React** — User interface
* **Vite** — Development server and production build tool
* **JavaScript (ES Modules)** — Application logic
* **CSS** — Styling and responsive layouts
* **Fetch API** — HTTP requests to the backend
* **WebSockets** — Real-time communication with the server
* **Git and GitHub** — Version control

## Project Structure

```text
client/
├── public/              # Static assets
├── src/
│   ├── api/             # API requests and data access
│   ├── components/      # Reusable UI components
│   ├── pages/            # Application pages
│   ├── websocket/       # WebSocket connection and events
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── .env.example         # Development environment template
├── .env.production.example
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── package-lock.json    # Dependency lockfile
└── vite.config.js       # Vite configuration
```

*Note: The directory listing is a general reference. Actual files and folders may vary by project version.*

## Prerequisites

* Node.js and npm
* A running Chat Application backend
* Git, if cloning the repository

## Installation

From the project root, navigate to the client directory:

```bash
cd client
npm ci
```

If you are installing dependencies for the first time without a lockfile, use `npm install`.

## Environment Configuration

Create a `.env` file in the client directory for local development:

```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
```

For production deployment over HTTP, configure `.env.production`:

```env
VITE_API_URL=http://YOUR_SERVER_IP
VITE_WS_URL=ws://YOUR_SERVER_IP
```

Replace `YOUR_SERVER_IP` with the public IP address or domain serving the application.

**Important:** Vite embeds `VITE_` variables into the frontend during the build. Rebuild the application after changing these values. Never place passwords, private keys, database credentials, or other secrets in frontend environment variables.

## Running the Application

Start the development server:

```bash
npm run dev
```

Vite normally serves the development client at:

```text
http://localhost:5173
```

Ensure the backend is running and its CORS configuration permits the development origin.

## Production Build

Generate an optimized production build:

```bash
npm run build
```

The compiled frontend is written to:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

The preview server is for testing the build, not a replacement for a production web server.

## Backend Communication

The client communicates with the backend through:

* **REST API:** HTTP requests to the configured API base URL.
* **WebSockets:** A persistent connection for real-time messaging and events.

In production, Nginx can serve the frontend and proxy API requests and WebSocket connections to the backend. This allows both components to share the same public host.

## Deployment

For deployment on an Amazon EC2 instance:

1. Install the required Node.js and npm versions.
2. Configure the production environment variables.
3. Install client dependencies using `npm ci`.
4. Run `npm run build`.
5. Configure Nginx to serve the generated `dist/` directory.
6. Configure Nginx to proxy API and WebSocket requests to the backend.
7. Verify the application and backend health endpoint.

For the current HTTP deployment, the frontend uses `http://YOUR_SERVER_IP` and `ws://YOUR_SERVER_IP`. HTTPS deployment should use HTTPS and secure WebSockets (`wss://`).

## Security Considerations

* Never expose backend secrets in client-side code.
* Validate and handle API errors appropriately.
* Use secure authentication and authorization on the backend.
* Use HTTPS and secure WebSockets for production accounts and private messages.
* Keep dependencies updated and review security advisories.

## Development Workflow

1. Create a feature branch.
2. Make and test changes locally.
3. Run the production build to identify build errors.
4. Commit and push changes to GitHub.
5. Deploy through the configured deployment workflow when ready.

