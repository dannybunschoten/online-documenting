# Aboma Online Reporting

A modern, fast, and responsive web app for viewing historical inspection data. Built with Next.js and MongoDB, optimized for desktop and tablet.

## Architecture & Data Flow

1. A user clicks a button in the Smartflow application.
2. Smartflow sends the inspection payload to this app's ingestion endpoint, which:
   - Validates the payload against the expected model.
   - Writes/updates documents in MongoDB (shared model across many inspections is supported).
3. The user is redirected to `{BASE_PATH}/{GUID}`, which fetches and renders the inspection by its GUID.

## Prerequisites

- **Git**
- **Docker** (for local development)
- **Node.js** **v24.x**

## Getting Started

Follow these steps carefully:

1. Start a MongoDB instance using Docker:

   ```bash
   docker compose up -d
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. (Optional) Change the port:
   - Open the `package.json` file.
   - In the `scripts.dev` entry, update the `-p` flag to the port you want.

4. Start the development server:
   ```bash
   npm run dev
   ```

The app should now be running locally.

## Deploying

1. Pull the repo from [Azure DevOps](https://dev.azure.com/smartflowcloud/smartflow-ops-projects/_git/app-web-reports?path=%2F&version=GBmain&_a=contents)
2. Ensure you are on the main branch using:
   ```bash
   git switch main
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Build the sources:
   ```bash
   npm run build
   ```
5. Configure the application:
   - Set the basepath in `./next.config.ts`. This basepath is the path under which the whole application is served.
   - Copy the `.env.example` file to `.env`, and ensure that every variable is filled in.
   - Optionally change the port in the `package.json` file by replacing the `-p` flag in the `scripts.start` entry with the port of your choice.

6. Start the production server:
   ```bash
   npm run start
   ```
