# Project Assumptions

This document records the assumptions made during the development of the application. It will be updated as new technical and functional decisions are made.

## Project setup

- The application uses Next.js with the App Router.
- TypeScript is used for both frontend and backend code.
- npm is used as the package manager.
- Tailwind CSS is used for styling.
- The source code is located inside the `src` directory.
- The GitHub repository will be public.

## Deployment

- The `main` branch represents the production version of the application.
- Vercel will be used as the deployment platform.
- Every push to the `main` branch triggers a production deployment in Vercel.
- Pull requests targeting `main` may generate preview deployments.