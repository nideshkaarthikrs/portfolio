import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nideshkaarthikrs.github.io"),
  title: {
    default: "Nidesh Kaarthik | AI & Software Portfolio",
    template: "%s | Nidesh Kaarthik",
  },
  description:
    "Premium portfolio of Nidesh Kaarthik R S featuring software engineering projects, AI builds, and technical writing.",
  keywords: [
    "Nidesh Kaarthik",
    "Portfolio",
    "AI Engineer",
    "Software Developer",
    "Next.js",
    "Tailwind CSS",
    "Bangalore",
  ],
  openGraph: {
    title: "Nidesh Kaarthik | AI & Software Portfolio",
    description:
      "Explore projects, writing, and product-focused engineering work by Nidesh Kaarthik R S.",
    type: "website",
    url: "https://nideshkaarthikrs.github.io",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nidesh Kaarthik portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nidesh Kaarthik | AI & Software Portfolio",
    description:
      "Projects, writing, and AI engineering work by Nidesh Kaarthik R S.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
      <body className="min-h-full bg-slate-950 text-slate-100">
        <SiteNav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
