import type { Metadata } from "next";
import localFont from "next/font/local";
import ReactQueryProvider from "../utils/queryProvider";
import "./globals.css";
import ToastProvider from "@/utils/toastProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

 
export const metadata: Metadata = {
  title: "blog test",
  description: "blog text project-tAzimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
      >
        <ReactQueryProvider>
        <ToastProvider>
          <Header/>
          {children}
          <Footer/>
        </ToastProvider>
          
        </ReactQueryProvider>
       
      </body>
    </html>
  );
}
