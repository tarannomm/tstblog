"use client";
import { useQuery } from "react-query";
import { fetchPostDetails } from "../../../utils/api";
import Image from 'next/image';

export default function PostDetailsPage({ params }) {
  const { id } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading post details.</p>;

  return (
    <div className="container h-screen bg-teal-600 p-20">
      <div class="absolute left-10 bottom-0 w-[350px] h-[530px] bg-teal-100 rounded-t-full overflow-hidden p-2">
        <Image
        src={data.featured_media_object.source_url}
        alt="post image"
        width={500}
        height={500}
        quality={90}
        className='!w-[520px] !h-[530px] rounded-t-full'
      /></div>

      <h1 className="text-[40px] mb-4 text-white font-bold">{data.title.rendered}</h1>
      <p>{data.content.rendered}</p>
    </div>
  );
}
