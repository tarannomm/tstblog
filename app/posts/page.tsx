"use client";

import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchPosts } from "../../utils/api";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import Head from "next/head";
import { useEffect } from "react";

interface Post {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  featured_media_object: {
    source_url: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  author?: {
    id: number;
    name: string;
  };
  categories?: number[];
}

export default function PostsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<Post[],Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <>
      <Head>
        <title>مقاله ها</title>
        <meta name="description" content="لیست مقالات منتشر شده اخیر" />
        <meta name="keywords" content="پست,مقاله,صنعت,تولید" />
        <link rel="canonical" href="https://yourwebsite.com/posts" />
      </Head>
      <div className="max-w-5xl mx-auto p-4 ">
        {isLoading ? (
          <div className="mx-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className={`col-span-12 ${
                  index === 5
                    ? "lg:col-span-12 md:col-span-12 sm:col-span-12"
                    : index === 0
                    ? "lg:col-span-8 md:col-span-6 sm:col-span-6"
                    : "lg:col-span-4 md:col-span-6 sm:col-span-6"
                }`}
              >
                <Card className="h-[300px] relative">
                  <Skeleton className="w-full h-[300px]" />
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <Skeleton className="w-32 h-4 mb-2 rounded-full" />
                    <Skeleton className="w-48 h-6 rounded-full" />
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        )  : error?  error.message==="Unauthorized" ?
        redirect("/login") : (
       <div className="min-h-[69vh] flex justify-center items-center h-screen">
         <p className="text-red-500 text-xl">
           Error loading post details: {error.message}
         </p>
       </div>
     ) : (
          <div className="mx-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4">
            {data?.map((post, index) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className={`col-span-12 ${
                  index === 0
                    ? "lg:col-span-8 md:col-span-2 sm:col-span-12"
                    : index === data.length - 1
                    ? "lg:col-span-12 md:col-span-3 sm:col-span-12"
                    : "lg:col-span-4 md:col-span-1 sm:col-span-12"
                }`}
              >
                <Card isFooterBlurred className="h-[300px] relative">
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      {new Date(post.date).toLocaleDateString("fa", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {post.title.rendered}
                    </h4>
                  </CardHeader>
                  <Image
                    // removeWrapper
                    width={400}
                    height={400}
                    alt={`Image for post titled "${post.title.rendered}"`}
                    className="z-0 w-full h-full object-cover"
                    src={post.featured_media_object.source_url}
                    priority
                  />
                  <CardFooter className="absolute bg-black/40 bottom-0 z-10 flex justify-between">
                    <div
                      className="text-tiny text-white/60 whitespace-nowrap overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt?.rendered || post.content.rendered,
                      }}
                    />
                    {post.author && (
                      <span className="text-tiny text-white/60">
                        {post.author.name}
                      </span>
                    )}
                    <Button
                      onClick={() => router.push(`/posts/${post.id}`)}
                      radius="full"
                      size="sm"
                      className="mr-2 h-[25px] px-5 bg-slate-200"
                      aria-label={`Read more about ${post.title.rendered}`}
                    >
                      ادامه مطلب
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
