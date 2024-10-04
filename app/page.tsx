"use client"
import {
   Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter ,
  NextUIProvider,
  Button,
  useDisclosure,} from "@nextui-org/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import PostsPage from "./posts/page";
import Link from "next/link";
 
export default function Home() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [logined, setLogined] = useState(false);
  useEffect(() => {
    const token = getCookie("token");
    console.log(token);
    
    if (!token) {
      onOpen()
      setLogined(false)
    } else {
      setLogined(true);
    }
  }, []);
  return (
    <NextUIProvider>
      <Modal 
        size="sm" 
        isOpen={isOpen} 
        onClose={onClose} 
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">ورود به حساب کاربری</ModalHeader>
              <ModalBody>
                <p> نشست شما منقضی شده است !</p>
                <p> 
                 جهت ادامه ، مجدد وارد حساب کاربری خود شوید
                </p>
              </ModalBody>
              <ModalFooter>
               <Link className="bg-red-700 rounded-lg p-2  text-white" href="/login"> ورود به حساب کاربری</Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {logined && <PostsPage />}
    </NextUIProvider>
  );
}
