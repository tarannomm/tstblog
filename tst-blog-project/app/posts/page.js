"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../utils/api";

export default function PostsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              <img
                src={post.featured_media_object.source_url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="text-xl font-semibold my-2">{post.title.rendered}</h2>
                <p className="text-gray-700">{post.content.rendered}</p>
                <Link href={`/posts/${post.id}`} className="text-red-500 font-bold mt-2 inline-block">
                  Read Post →
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
