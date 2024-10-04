"use client";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchPostDetails } from "../../../utils/api";

export default function PostDetailsPage({ params }) {
  const { id } = params;

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading post details.</p>;

  return (
    <div className="container mx-auto p-4">
      <img
        src={data.featured_media_object.source_url}
        alt={data.title.rendered}
        style={{ width: "300px", height: "auto" }}
      />
      <h1 className="text-3xl mb-4">{data.title.rendered}</h1>
      <p>{data.content.rendered}</p>
    </div>
  );
}
