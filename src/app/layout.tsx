import type { Metadata } from "next";
import './globals.css'
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import ThemeUpdater from "@/components/themeUpdater";

export const metadata: Metadata = {
  title: "online shop",
  description: "Gener ated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar/>
        <ThemeUpdater/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
