import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import fundo from "@/assets/bg.jpg";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `url(${fundo.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center`}
      > 
      <div className="flex flex-col items-center justify-center w-full max-w-screen-2xl py-10 px-4 h-full min-h-screen relative">
      <Header/>
      {children}
      </div>
      <Toaster />
      </body>
    </html>
  );
}
