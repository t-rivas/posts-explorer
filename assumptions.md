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

## Data fetching

- The JSONPlaceholder API is consumed directly from the client because it is public and does not require credentials or sensitive configuration.
- No custom backend or API proxy is introduced because no server-side authentication, authorization, validation, or data transformation is required.

## Search

- The search input uses a 3000 ms debounce delay.
- This relatively long delay was intentionally selected to make the debouncing behavior clearly observable during evaluation.
- In a production application, a shorter delay could provide a more responsive user experience.