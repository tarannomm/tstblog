export const fetchPosts = async () => {
  const response = await fetch("/Api/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const fetchPostDetails = async (id) => {
  const response = await fetch(`/Api/post/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post details");
  }
  return response.json();
};
