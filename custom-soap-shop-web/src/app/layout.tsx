import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Soap Shop",
  description: "Handmade ready and custom soaps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}

        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            duration: 2500,
            classNames: {
              toast:
                "!w-[min(420px,calc(100vw-32px))] !rounded-3xl !border !border-[#E7D8C4] !bg-[#FFFDF8] !p-5 !pr-12 !text-[#2F261F] !shadow-2xl",
              title: "!text-base !font-bold !text-[#2F261F]",
              description: "!text-sm !text-[#7A6655]",
              actionButton:
                "!rounded-full !bg-[#5B3A29] !px-4 !py-2 !text-sm !font-semibold !text-white hover:!bg-[#3F281D]",
              closeButton: "!bg-[#FFFDF8] !text-[#5B3A29]",
            },
          }}
        />
      </body>
    </html>
  );
}
