import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "AVIORÉ Careers | External Relations & Intake",
  description: "Official intake portal for Fashion Designers, Fabric Vendors, Production Partners, and Brand Collaborations. Secure your place in the Avioré Archive.",
  keywords: ["Fashion Design", "Garment Manufacturing", "Nigeria Fashion", "Textile Sourcing"],
  openGraph: {
    title: "AVIORÉ | Careers",
    description: "Join Aviorè Team chain and creative network.",
    url: "https://aviore-careers.vercel.app", // Replace with your actual domain
    siteName: "Aviorè Careers",
    images: [
      {
        url: "/aviore-careers.jpg", // This should be the recruitment poster we designed
        width: 1200,
        height: 630,
        alt: "Avioré Recruitment Poster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVIORÉ | Careers & Partnerships",
    description: "Global sourcing and creative intake manifest.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F4F4F4] text-black`}
      >
        {/* You can add a global progress bar or smooth-scroll wrapper here */}
        <main>{children}</main>
      </body>
    </html>
  );
}