import type { Post } from "../types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          User {post.userId}
        </span>

        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Post #{post.id}
        </span>
      </div>

      <h2 className="text-xl font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
        {post.title}
      </h2>

      <p className="mt-3 border-t border-zinc-100 pt-4 leading-7 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
        {post.body}
      </p>
    </article>
  );
}
