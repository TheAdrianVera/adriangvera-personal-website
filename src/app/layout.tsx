import type { Metadata } from "next"
import "./globals.css"
import AnimateBody from "@components/motion/AnimateBody"
import Navbar from "@components/Navbar"
import { Analytics } from "@vercel/analytics/next"

//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Adrian Vera Software Enginer | Web Developer",
  description: "Adrian Vera Chicago based Software Engineer & Web Developer",
  // Basic SEO
  keywords: ["Software Engineer", "Web Developer", "Chicago", "React", "TypeScript", "Next.js"],
  authors: [{ name: "Adrian Vera" }],
  creator: "Adrian Vera",
  publisher: "Adrian Vera",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`antialiased bg-background`}
      >
      <Navbar />
      <AnimateBody>
        <div>{children}</div>
      </AnimateBody>
      </body>
      <Analytics />
    </html>
  )
}
