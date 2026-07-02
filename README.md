# Posts Explorer

Posts Explorer is a Next.js application built for the entry-level technical challenge. It lists posts from JSONPlaceholder and lets users filter them by author using the post `userId`.

## Features

- `/posts` page that lists posts as cards.
- Filter by user ID using `https://jsonplaceholder.typicode.com/posts?userId=1`.
- Debounced search input to avoid one request per keypress.
- SWR for data fetching, caching, retries, and reconnect handling.
- Cached filters are reused without unnecessary API calls.
- Previous results stay visible while a new request is loading.
- Compact status summary with current filter, result count, and request state.
- Slow connection feedback through SWR's `loadingTimeout` and `onLoadingSlow`.
- Error message when an update fails while previous data is still available.

## Tech Stack

- Next.js App Router
- TypeScript
- React
- SWR
- Tailwind CSS
- Vercel

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/posts](http://localhost:3000/posts) in your browser.

The root route redirects to `/posts`.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a build.

## Project Notes

- The app consumes JSONPlaceholder directly from the client because the API is public and does not require secrets.
- SWR is configured with `revalidateOnReconnect: true` and `shouldRetryOnError: true` to support unstable connections.
- SWR is also configured with `revalidateIfStale: false` so returning to an already cached filter does not trigger an unnecessary request.
- `keepPreviousData` keeps the previous list visible while the next filter is loading.
- The cached SWR response stores both `posts` and `filter` so the summary card always matches the currently displayed results.

## Challenge Files

- Main page: `src/app/posts/page.tsx`
- Main component: `src/app/posts/components/posts-explorer.tsx`
- Post card: `src/app/posts/components/post-card.tsx`
- Summary card: `src/app/posts/components/posts-summary-card.tsx`
- Assumptions: `assumptions.md`
