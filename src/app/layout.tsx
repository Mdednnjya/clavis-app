import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";


export const metadata: Metadata = {
  title: "Clavis AI",
  description: "Unlock the core insights from your research papers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={GeistSans.className}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
