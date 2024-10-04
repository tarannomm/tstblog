"use client";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchPosts } from "../../utils/api";
import Image from "next/image";
import DOMPurify from 'dompurify';
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl m-4 mb-10 text-teal-800">مقالات منتشر شده اخیر</h1>
      <div className="mx-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="h-[350px] mb-3 flex flex-col">
              <Card isFooterBlurred className="w-[390px] h-[230px] col-span-12 sm:col-span-7 rounded-none">
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  width={500}
                  height={500}
                  className="z-0 w-full h-full object-cover"
                  src={post.featured_media_object.source_url}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 flex justify-between">
                  <p className="text-tiny text-white/60 uppercase font-bold">{new Date(post.date).toLocaleDateString("fa", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}</p>
                  <Button onClick={() => router.push(`/posts/${post.id}`)} radius="full" size="sm" className="mx-3 h-[25px] p-0 bg-slate-200">مشاهده</Button>
                </CardFooter>
              </Card>
              <h4 className="text-teal-800 font-medium text-xl mt-2">{post.title.rendered}</h4>
              <p
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt.rendered) }}
                className="text-tiny max-h-[3.6em] overflow-hidden leading-[1.8em]"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
