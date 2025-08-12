import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/layout";
import ShopingCartContextProvider from "@/context/shopingCartContext";

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
      <body>
        <ShopingCartContextProvider>
          <Layout>{children}</Layout>
        </ShopingCartContextProvider>
      </body>
    </html>
  );
}
