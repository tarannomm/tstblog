import type { Metadata } from "next";
import localFont from "next/font/local";
import ReactQueryProvider from "../utils/queryProvider";
import "./globals.css";
import ToastProvider from "@/utils/toastProvider";

const iranSans = localFont({
  src: './fonts/IRANSans.ttf',
  variable: '--font-iran-sans',
  weight: '400',
  style: 'normal',
});
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
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body
      >
        <ReactQueryProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
          
        </ReactQueryProvider>
       
      </body>
    </html>
  );
}
