export const login=async(username,password)=>{
  const res=await axios.post("/Api/login",{username,password})
  return res

}
export const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  };
  
  export const fetchPostDetails = async (id) => {
    const response = await fetch(`/api/post/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post details');
    }
    return response.json();
  };
  