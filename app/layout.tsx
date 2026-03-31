import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rx Clinical Pet Blanket™ | Sleep Hygienics",
  description: "Clinical-grade antimicrobial dog blanket designed to reduce itching, allergens, and hot spots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* --- GOOGLE ANALYTICS --- */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-VRFKB1QQWC" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VRFKB1QQWC');
          `}
        </Script>
        {/* ------------------------ */}

        {children}
      </body>
    </html>
  );
}
