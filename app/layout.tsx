
import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/app/component/AuthContext";
import Header from "@/app/component/Header";
const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Violet WorkSpace",
  description: "My attempt for better productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comicNeue.variable} antialiased`}
      >
      <AuthProvider>
          <Header/>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}