import type { Metadata } from "next"
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { FirebaseProvider } from "../src/lib/FirebaseProvider";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const nunitoSans = Nunito_Sans({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: {
    template: "%s | MYLINK",
    default: "MYLINK - 단 하나의 링크로 나를 표현하세요",
  },
  description: "모든 소셜 미디어, 포트폴리오, 작업물을 하나의 깔끔한 페이지에 담아 공유해보세요.",
  openGraph: {
    title: "MYLINK",
    description: "단 하나의 링크로 나를 표현하세요",
    url: "/",
    siteName: "MYLINK",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", nunitoSans.variable, geistHeading.variable)}
    >
      <body>
                <FirebaseProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </FirebaseProvider>
      </body>
    </html>
  )
}
