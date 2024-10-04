"use client"
import {NextUIProvider, } from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import PostsPage from "./posts/page";
 
export default function Home() {
 
  return (
    <NextUIProvider>
       <PostsPage />
    </NextUIProvider>
  );
}
