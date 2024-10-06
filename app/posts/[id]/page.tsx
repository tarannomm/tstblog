"use client";

import { useQuery } from "react-query";
import { fetchPostDetails } from "../../../utils/api";
import Image from "next/image";
import { Chip, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import Head from "next/head";
import {redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface PostData {
  id: number;
  title: { rendered: string };
  date: string;
  content: { rendered: string };
  categories?: Category[];
  status?: string;
  featured_media_object?: {
    source_url: string;
  };
}

export default function PostDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const { data, isLoading, error } = useQuery<PostData, Error>({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
  });

  const formattedDate = data?.date 
    ? new Date(data.date).toLocaleDateString("fa", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    :  new Date("2024-05-15").toLocaleDateString("fa", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-[80vh]  py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{data?.title?.rendered} - مقالات</title>
        <meta
          name="description"
          content={data?.content?.rendered.substring(0, 150)}
        />
        <link rel="canonical" href={`https://example.com/posts/${id}`} />
      </Head>
      {isLoading ? (
        <div className="max-w-7xl m-auto min-h-[69vh] flex justify-center items-center ">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full mx-auto">
            <Skeleton className="h-48 w-full md:h-full md:w-48 rounded-lg" />
            <div className="p-4 w-full">
              <Skeleton className="h-6 w-2/3 mb-4 rounded-md" />
              <Skeleton className="h-4 w-1/3 mb-4 rounded-md" />
              <Skeleton className="h-32 w-full mb-4 rounded-md" />
              <Skeleton className="h-10 w-1/4 rounded-md" />
            </div>
          </div>
        </div>)
         : error?  error.message==="Unauthorized" ?
         redirect("/login") : (
        <div className="min-h-[69vh] flex justify-center items-center h-screen">
          <p className="text-red-500 text-xl">
            Error loading post details: {error.message}
          </p>
        </div>
      ) : (
        <div className="min-h-[69vh] flex justify-center items-center  py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src={data?.featured_media_object?.source_url || ""}
                    alt={`Image for post titled "${data?.title?.rendered}"`}
                    width={500}
                    height={500}
                    priority
                    className="h-48 w-full object-cover md:h-full md:w-[300px]"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-[#49516E] font-semibold">
                    {formattedDate}
                  </div>
                  <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {data?.title?.rendered}
                  </h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data?.categories?.map((cat) => (
                      <Chip key={cat.id} color="primary">
                        {cat.name}
                      </Chip>
                    ))}
                    {data?.status === "publish" && (
                      <Chip color="warning">منتشر شده</Chip>
                    )}
                  </div>
                  <div
                    className="mt-6 prose prose-lg text-gray-500 mx-auto text-justify"
                    dangerouslySetInnerHTML={{
                      __html: data?.content?.rendered || <p>kk</p>,
                    }}
                  />
                  <div className="mt-8">
                    <Link
                      href="/posts"
                      className="transition ease-in-out inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#49516E] hover:bg-[#313649] focus:outline-none"
                    >
                      بازگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
