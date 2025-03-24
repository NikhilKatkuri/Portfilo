import type { Metadata } from "next";
import "./globals.css";
import { SuperContextProvider } from "@/Context/SuperContext";
// import HighlightLoader from "@/components/HighlightLoader";

export const metadata: Metadata = {
  title: "Nikhil Katkuri | Full-Stack Developer & AI Engineer",
  description: "Portfolio of Nikhil Katkuri, showcasing web development, AI, and software engineering projects.",
  keywords: ["Nikhil Katkuri", "Full-Stack Developer", "AI Engineer", "Next.js", "React", "Portfolio", "Web Developer"],
  metadataBase: new URL("https://portfilo-livid.vercel.app"),
  openGraph: {
    title: "Nikhil Katkuri | Full-Stack Developer",
    description: "Check out my portfolio of web & AI projects.",
    url: "https://portfilo-livid.vercel.app",
    siteName: "Nikhil Katkuri Portfolio",
    images: [{ url: "https://portfilo-livid.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Nikhil Katkuri Portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Katkuri Portfolio",
    description: "Explore my portfolio of web development & AI projects.",
    images: ["https://portfilo-livid.vercel.app/twitter-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
        />
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
       
      </head>
      
      <body className={`antialiased`}>

        {/* <HighlightLoader /> */}
        <SuperContextProvider>{children}</SuperContextProvider>
      </body>
    </html>
  );
}
