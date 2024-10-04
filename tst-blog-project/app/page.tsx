import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";
const client=new QueryClient();
export default function Home() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={client}>
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   dddd
    </div>
      </QueryClientProvider>
  
    
    </NextUIProvider>

  );
}
