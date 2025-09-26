# Aboma Online Reporting

A modern, fast, and responsive web app for viewing historical inspection data. Built with Next.js and MongoDB, optimized for desktop and tablet.

## Architecture & Data Flow

1. A user clicks a button in the Smartflow application.
2. Smartflow sends the inspection payload to this app’s ingestion endpoint, which:
   - Validates the payload against the expected model.
   - Writes/updates documents in MongoDB (shared model across many inspections is supported).
3. The user is redirected to `{BASE_PATH}/{GUID}`, which fetches and renders the inspection by its GUID.

## Prerequisites

- **Git**
- **Docker** (for local development)
- **Node.js** **v24.x**

## Getting Started

To get started with development, run `docker compose up -d` to spin up a mongodb instance.
This mongodb instance will be automatically populated with some initial data to help you get started.
Then run `npm install` to install all dependencies required for this project.
Optionally, you can change the port of the application in the package.json file, replace the p flag in the scripts.dev entry, with the port of your choice.
Run `npm run dev` to boot up the development server.

## Deploying

Pull the repo from https://dev.azure.com/smartflowcloud/smartflow-ops-projects/_git/app-web-reports?path=%2F&version=GBmain&_a=contents
Ensure you are on the main branch using `git switch main`
Then run `npm install` to install all dependencies required for this project.
Run `npm run build` to build sources.
Follow these steps to configure the application for your requirements:

- Set the basepath of the application in ./next.config.ts. This basepath is the path under which the whole application is served.
- Copy the .env.example file to .env, and ensure that every variable is filled in.
- Optionally change the port in the package.json file, replace the p flag in the scripts.start entry, with the port of your choice

Run `npm run start` to boot up the production server.
