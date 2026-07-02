# Project Assumptions

This document records the assumptions and implementation decisions made during development.

## Project Setup

- The application uses Next.js with the App Router.
- TypeScript is used for the application code.
- npm is used as the package manager.
- Tailwind CSS is used for styling.
- The source code is located inside the `src` directory.
- The main user-facing page is `/posts`.
- The root route redirects to `/posts` so visitors do not land on the default Next.js starter page.

## Deployment

- Vercel is used as the deployment platform.
- The `main` branch represents the production version of the application.
- Pushes to `main` are expected to trigger production deployments.
- Pull requests targeting `main` may generate preview deployments depending on the repository settings.

## Data Fetching

- The JSONPlaceholder API is consumed directly from the client because it is public and does not require credentials or sensitive configuration.
- No custom backend or API proxy is introduced because no server-side authentication, authorization, validation, or data transformation is required.
- SWR is used for fetching, caching, retrying failed requests, and handling reconnect behavior.
- `revalidateOnReconnect` is enabled to refetch when the browser regains network access.
- `shouldRetryOnError` is enabled so failed requests can be retried by SWR.
- `revalidateIfStale` is disabled so navigating back to an already cached filter does not call the API unnecessarily.
- `revalidateOnFocus` is disabled to avoid refetching only because the user focuses the browser window again.
- `keepPreviousData` is enabled so the previous list remains visible while a new filter request is loading.
- The cached SWR value stores both the posts and the filter that produced them. This keeps the result summary synchronized with the list when previous data is being displayed.

## Search

- The search input filters by the `userId` field using the endpoint `https://jsonplaceholder.typicode.com/posts?userId=<value>`.
- The search input uses a `3000 ms` debounce delay.
- This relatively long delay was intentionally selected to make the debouncing behavior clearly observable during evaluation.
- In a production application, a shorter delay could provide a more responsive user experience.
- The input accepts only empty values or non-negative numbers.

## Slow Connections

- SWR's `loadingTimeout` and `onLoadingSlow` are used to detect slow requests.
- The UI first shows `Updating results...` if a request is still validating after `300 ms`.
- If SWR reports the request as slow after `1000 ms`, the summary card changes to `Connection is taking longer...`.
- Slow connection feedback is integrated into the compact summary card instead of using a separate alert.

## Error Handling

- If the first request fails and there is no cached or previous data, the page shows a simple load error.
- If a later request fails while previous data exists, the previous results remain visible.
- In that case, a dismissible warning message tells the user that posts could not be updated.

## UI Decisions

- Posts are displayed as reusable card components.
- The filter input and result summary are visually grouped because they describe the same data set.
- The summary card shows the current result filter and the number of displayed posts.
- A dedicated empty state is shown when a valid response returns no posts.
