import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "One Minute Bio - Learn a Lifetime in 60 Seconds",
  description: "Discover the most fascinating stories of remarkable people, condensed into powerful one-minute experiences.",
  keywords: "biography, one minute, short bio, life stories, history, education",
  authors: [{ name: "One Minute Bio Team" }],
  openGraph: {
    title: "One Minute Bio - Learn a Lifetime in 60 Seconds",
    description: "Discover the most fascinating stories of remarkable people, condensed into powerful one-minute experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Minute Bio - Learn a Lifetime in 60 Seconds",
    description: "Discover the most fascinating stories of remarkable people, condensed into powerful one-minute experiences.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
