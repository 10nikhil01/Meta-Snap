import { getSiteUrl } from "@/utils/getSiteURL";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const siteUrl = getSiteUrl();

export const metadata = {
  title: "Meta Snap - Instant SEO Insights",
  description:
    "Enter any website URL and get instant SEO analysis including meta tags, meta properties and other SEO insights.",
  keywords: [
    "SEO",
    "Meta Snap",
    "Website Analysis",
    "Meta Tags",
    "Structured Data",
    "SEO Checker",
  ],
  authors: [
    {
      name: "Nikhil Kumar",
      url: "https://www.linkedin.com/in/reachnik",
    },
  ],
  openGraph: {
    title: "Meta Snap - Instant SEO Insights",
    description:
      "Fetch SEO data and meta information for any website instantly using MetaSnap.",
    url: siteUrl,
    siteName: "MetaSnap",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MetaSnap SEO Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Snap - Instant SEO Insights",
    description:
      "Fetch SEO data and meta information for any website instantly using MetaSnap.",
    images: [`${siteUrl}/og-image.png`],
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
