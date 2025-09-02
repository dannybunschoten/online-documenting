This is a next.js project created for Aboma.

## Getting Started

To get started with development, run `docker compose up -d` to spin up a mongodb instance.
This mongodb instance will be automatically populated with some initial data to help you get started.
Then run `npm install` to install all dependencies required for this project.
Run `npm run dev` to boot up the development server.

## Deploying

Pull the repo
Then run `npm install` to install all dependencies required for this project.
Run `npm run build` to build sources.
Ensure that `MONGODB_URI` env variable it set to connect to the mondo db server
Run `npm run start` to boot up the production server.
