import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "شركة التسهيلات التجارية - CFC",
  description: "شركة التسهيلات التجارية الكويتية",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta
          property="og:image"
          content="https://www.cfc-kw.com/assets/CFC-Logo.jpg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
