import type { Metadata } from "next";
import Layout from "@/components/layout";

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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
