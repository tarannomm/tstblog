import type { Metadata } from "next";
import localFont from "next/font/local";
import ReactQueryProvider from "./utils/queryProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/IRANSans.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/IRANSans.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
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
    <html lang="en" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
           {children}
        </ReactQueryProvider>
       
      </body>
    </html>
  );
}
