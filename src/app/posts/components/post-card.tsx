import type { Post } from "../types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          User {post.userId}
        </span>

        <span className="text-sm text-zinc-500">
          Post #{post.id}
        </span>
      </div>

      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {post.title}
      </h2>

      <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
        {post.body}
      </p>
    </article>
  );
}