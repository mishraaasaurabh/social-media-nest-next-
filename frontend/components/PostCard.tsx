export function PostCard({ post }: { post: any }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <h3 className="font-bold text-lg">{post.title}</h3>
      <p className="text-gray-600">{post.description}</p>
      <p className="text-xs text-right text-gray-400 mt-2">By {post.author?.username || "Unknown"}</p>
    </div>
  );
}
