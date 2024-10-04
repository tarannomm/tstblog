"use client";
import { useQuery } from "react-query";
import { fetchPostDetails } from "../../../utils/api";
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export default function PostDetailsPage({ params }) {
  const { id } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading post details.</p>;

  return (
    <div className=" lg:p-20 px-10 h-[90vh] relative ">
          <div class="absolute left-0 top-[-150px] lg:top-[30px]  w-[55%] max-w-[320px] lg:max-w-none h-[170px]   lg:!w-[480px] lg:h-[85%]  bg-gray-300 rounded-r-full overflow-hidden m-1 p-1 pl-0 ml-0">
        <Image
        src={data.featured_media_object.source_url}
        alt="post image"
        width={500}
        height={500}
        quality={100}
        className='!w-full !h-full rounded-r-full'
      />
      </div>
    
   
      <div className="lg:w-[55%] mt-[150px] lg:mt-0 h-full bg-gray-600  text-justify overflow-y-auto">  
       <h1 className="text-[25px] lg:text-[40px] mb-4 text-teal-800 font-bold">{data.title.rendered}</h1>
      <p className="text-gray-400 text-[13px] uppercase font-bold my-4">  تاریخ انتشار  : {new Date(data.date).toLocaleDateString("fa",{
        month:"long",
        day:"numeric",
        year:"numeric"
        })}
      </p> 
      <div className="w-[175px] flex justify-between my-10">
       {data.categories?.map(cat => <Chip color="primary" >{cat.name}</Chip>)}
       {data.status==="publish" && <Chip color="warning">منتشر شده</Chip>} 
      </div>
      <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.content.rendered)}} ></p>
      <Link className="bg-teal-700 rounded-md text-teal-100 px-4 py-1 mt-[40px]" href="/posts" >بازگشت به صفحه اصلی</Link>
        </div>
    
    </div>
  );
}
