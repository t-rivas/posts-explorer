"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import PostCard from "./post-card";

const POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts(url: string): Promise<Post[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default function PostsExplorer() {
  const [userId, setUserId] = useState("");
  const [debouncedUserId, setDebouncedUserId] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(true);
  const [slowRequestKey, setSlowRequestKey] = useState<string | null>(null);

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
  
  const { data, error, isLoading, isValidating } = useSWR<Post[]>(
    postsUrl,
    fetchPosts,
    {
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      keepPreviousData: true,
      loadingTimeout: 1500,

      onLoadingSlow: (key) => {
        setSlowRequestKey(key);
      },

      onSuccess: (_, key) => {
        setSlowRequestKey((currentKey) =>
          currentKey === key ? null : currentKey,
        );
      },

      onError: (_, key) => {
        setSlowRequestKey((currentKey) =>
          currentKey === key ? null : currentKey,
        );
      },
    },
  );

  const isLoadingSlow = slowRequestKey === postsUrl;

  if (isLoading && !data) {
    return <p>Loading posts...</p>;
  }

  if (error && !data) {
    return <p>Unable to load posts.</p>;
  }

  if (!data || data.length === 0) {
    return <p>No posts found.</p>;
  }

return (
  <section className="mx-auto w-full max-w-3xl px-4 py-8">
    <div className="mb-6">
        <label
            htmlFor="userId"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
            Filter by user ID
        </label>
        <input
            id="userId"
            name="userId"
            type="number"
            min="1"
            placeholder="Enter a user ID"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
    </div>
    {isLoadingSlow && (
      <p
        role="status"
        className="mb-4 rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-sm text-blue-800"
      >
        This request is taking longer than expected. Please check your connection.
      </p>
    )}
    {error && data && showErrorMessage && (
      <p
        role="alert"
        className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
      >
        <span>Unable to update the posts.</span>
        <button
          type="button"
          aria-label="Close error message"
          onClick={() => setShowErrorMessage(false)}
          className="text-xl leading-none text-amber-700 hover:text-amber-950"
        >
          &times;
        </button>
      </p>
    )}
    <p className="mb-4 text-sm text-zinc-500">
      {isValidating ? "Updating posts..." : `${data.length} posts`}
    </p>
    <ul className="space-y-4">
      {data.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  </section>
);}
