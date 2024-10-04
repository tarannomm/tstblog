"use client";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import Link from "next/link";
import { useQuery } from "react-query";
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
      <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
        <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-5.jpeg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src="https://nextui.org/images/breathing-app-icon.jpeg"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Breathing App</p>
            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
          </div>
        </div>
        <Button radius="full" size="sm">Get App</Button>
      </CardFooter>
    </Card>
    </div>
  );
}
