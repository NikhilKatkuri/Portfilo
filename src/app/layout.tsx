import type { Metadata } from "next";
import "./globals.css";
import { SuperContextProvider } from "@/Context/SuperContext";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Nikhil Katkuri | Full-Stack Developer  ",
  description: "Portfolio of Nikhil Katkuri, a Full-Stack Developer & AI Engineer skilled in React, Next.js, Python, and more.",
  keywords: [
    "Full-Stack Developer",
    "AI Engineer",
    "Web Development",
    "Next.js",
    "React",
    "Python",
    "JavaScript",
    "Portfolio",
  ],
  authors: [{ name: "Nikhil Katkuri", url:  "https://portfilo-livid.vercel.app" }],
  metadataBase: new URL( "https://portfilo-livid.vercel.app"),
  openGraph: {
    title: "Nikhil Katkuri | Full-Stack Developer",
    description: "Check out my portfolio of web & AI projects.",
    url:  "https://portfilo-livid.vercel.app",
    siteName: "Nikhil Katkuri Portfolio",
    images: [
      {
        url: "https://yourportfolio.com/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Nikhil Katkuri Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Katkuri Portfolio",
    description: "Explore my portfolio of web development & AI projects.",
    images: ["https://portfilo-livid.vercel.app/og-image.jpg"]
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        <title>Nikhil Katkuri | Full-Stack Developer & AI Engineer</title>
        <meta name="description" content="Full-Stack Developer & AI Engineer skilled in Next.js, React, and Python." />
        <meta name="keywords" content="Full-Stack Developer, AI Engineer, Next.js, React, Python, Web Development" />
        <meta name="author" content="Nikhil Katkuri" />
        <meta property="og:title" content="Nikhil Katkuri Portfolio" />
        <meta property="og:description" content="Check out my portfolio of web & AI projects." />
        <meta property="og:image" content="https://yourportfolio.com/og-image.jpg" />
        <meta property="og:url" content= "https://portfilo-livid.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nikhil Katkuri Portfolio" />
        <meta name="twitter:description" content="Explore my portfolio of web development & AI projects." />
        <meta name="twitter:image" content="https://yourportfolio.com/twitter-image.jpg" />
      </Head>
      <body className={`antialiased`}>
        <SuperContextProvider>{children}</SuperContextProvider>
      </body>
    </html>
  );
}
