
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Crypto Confessions",
  description: "Share your crypto wins and losses, anonymously. Discover unfiltered stories.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://crypto-confessions.vercel.app/hero.png",
      button: {
        title: "Launch Crypto Confessions",
        action: {
          type: "launch_frame",
          name: "Crypto Confessions",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "https://crypto-confessions.vercel.app/splash.png",
          splashBackgroundColor: "#f8fafc",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
