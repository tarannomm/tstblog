"use client";

import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import PostsPage from "./posts/page";
import { useEffect, useState } from "react";
import LoginPage from "./login/page";
 
export default function Home() {
  const [token,setToken]=useState("token");

  useEffect(()=>{
    const token=getCookie("token");
    console.log(token);
    
   setToken(token as string);
  console.log(token);
  },[])

  if(token){
    return(
      <PostsPage/>
    )
  }
 else{
  return(
  <LoginPage/>  
  )
   
 }
  

}
