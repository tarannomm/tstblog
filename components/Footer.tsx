"use client";
import { usePathname } from "next/navigation";
import React from "react";
const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  } else {
    return (
      <footer className=" border-t-1 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center ">
            <div dir="ltr" className="text-sm ">
              © {new Date().getFullYear()} tarannomm . All rights reserved
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
