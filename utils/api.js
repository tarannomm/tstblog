export const fetchPosts = async () => {
  const response = await fetch("/Api/posts");
  if (!response.ok) {
    const error = await response.json(); 
    throw new Error(response.status === 401 ? "Unauthorized" : error.message);
  }
  return response.json();
};

export const fetchPostDetails = async (id) => {
  const response = await fetch(`/Api/post/${id}`);
  if (!response.ok) {
    const error = await response.json(); 
    throw new Error(response.status === 401 ? "Unauthorized" : error.message);
  }
  return response.json();
};
