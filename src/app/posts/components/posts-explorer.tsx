"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import PostCard from "./post-card";
import PostsSummaryCard from "./posts-summary-card";

const POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

type PostsResult = {
  posts: Post[];
  filter: string;
};

function getUserIdFromUrl(url: string) {
  return new URL(url).searchParams.get("userId") ?? "";
}

async function fetchPosts(url: string): Promise<PostsResult> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await response.json();

  return {
    posts,
    filter: getUserIdFromUrl(url),
  };
}

export default function PostsExplorer() {
  const [userId, setUserId] = useState("");
  const [debouncedUserId, setDebouncedUserId] = useState("");
  const [dismissedErrorUrl, setDismissedErrorUrl] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<{
    url: string;
    status: "idle" | "updating" | "slow";
  }>({
    url: "",
    status: "idle",
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
        setDebouncedUserId(userId);
    }, 3000);

    return () => {
        window.clearTimeout(timeoutId);
    };
  }, [userId]);

  const postsUrl = debouncedUserId
  ? `${POSTS_ENDPOINT}?userId=${encodeURIComponent(debouncedUserId)}`
  : POSTS_ENDPOINT;
  
  const { data, error, isLoading, isValidating } = useSWR<PostsResult>(
    postsUrl,
    fetchPosts,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      keepPreviousData: true,
      shouldRetryOnError: true,
      loadingTimeout: 1000,
      onLoadingSlow: (key) => {
        setUpdatingStatus({
          url: key,
          status: "slow",
        });
      },
    },
  );

  useEffect(() => {
    const hideTimeoutId = window.setTimeout(() => {
      setUpdatingStatus({
        url: postsUrl,
        status: "idle",
      });
    }, 0);

    if (!isValidating) {
      return () => {
        window.clearTimeout(hideTimeoutId);
      };
    }

    const showTimeoutId = window.setTimeout(() => {
      setUpdatingStatus({
        url: postsUrl,
        status: "updating",
      });
    }, 300);

    return () => {
      window.clearTimeout(hideTimeoutId);
      window.clearTimeout(showTimeoutId);
    };
  }, [isValidating, postsUrl]);

  const posts = data?.posts ?? [];
  const currentResultsFilter = data?.filter ?? "";
  const hasNoPosts = data !== undefined && posts.length === 0;
  const requestStatus =
    isValidating && updatingStatus.url === postsUrl ? updatingStatus.status : "idle";
  const showUpdateError = Boolean(error && data && dismissedErrorUrl !== postsUrl);

  const clearFilter = () => {
    setUserId("");
    setDebouncedUserId("");
  };

  if (isLoading && !data) {
    return <p>Loading posts...</p>;
  }

  if (error && !data) {
    return <p>Unable to load posts.</p>;
  }

return (
  <section className="mx-auto w-full max-w-3xl px-4 py-8">
    <header className="mb-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Posts Explorer
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Browse all posts or filter them by author.
      </p>
    </header>

    <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label
            htmlFor="userId"
            className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
            Filter by user ID
        </label>
        {userId && (
          <button
            type="button"
            onClick={clearFilter}
            className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Clear
          </button>
        )}
      </div>
      <div className="rounded-lg border border-zinc-300 bg-white shadow-sm transition focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-800">
        <input
            id="userId"
            name="userId"
            type="number"
            min="1"
            placeholder="Enter a user ID"
            value={userId}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "" || Number(value) >= 0) {
                setUserId(value);
              }
            }}
            className="w-full bg-transparent px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
        />
      </div>
      <PostsSummaryCard
        currentFilter={currentResultsFilter}
        resultsCount={posts.length}
        status={requestStatus}
        hasUpdateError={showUpdateError}
        onDismissUpdateError={() => setDismissedErrorUrl(postsUrl)}
      />
    </div>
    {hasNoPosts ? (
      <div
        role="status"
        className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
      >

        <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          No posts found
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          No posts match user ID {currentResultsFilter}. Try another ID or clear the filter to see all posts.
        </p>
      </div>
    ) : (
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    )}
  </section>
);}
