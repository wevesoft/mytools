import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleAdsense } from "@/components/GoogleAdsense"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "다기능 도구 - 올인원 유틸리티 웹앱",
    template: "%s | 다기능 도구",
  },
  description:
    "연봉계산기, 글자수세기, 단위변환기, BMI계산기, QR코드생성, 비밀번호생성기 등 16가지 유용한 도구를 한 곳에서 무료로 이용하세요.",
  keywords: [
    "연봉계산기",
    "글자수세기",
    "단위변환기",
    "BMI계산기",
    "QR코드생성기",
    "비밀번호생성기",
    "진법변환기",
    "날짜계산기",
    "할일목록",
    "가계부",
    "텍스트도구",
    "타이머",
    "스톱워치",
    "이미지변환",
    "색상도구",
    "문자열인코딩",
    "온라인도구",
    "무료도구",
    "웹앱",
    "유틸리티",
  ],
  authors: [{ name: "다기능 도구" }],
  creator: "다기능 도구",
  publisher: "다기능 도구",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://multi-tools.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://multi-tools.vercel.app",
    title: "다기능 도구 - 올인원 유틸리티 웹앱",
    description: "연봉계산기, 글자수세기, 단위변환기, BMI계산기 등 16가지 유용한 도구를 한 곳에서 무료로 이용하세요.",
    siteName: "다기능 도구",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "다기능 도구 - 16가지 유틸리티 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "다기능 도구 - 올인원 유틸리티 웹앱",
    description: "연봉계산기, 글자수세기, 단위변환기 등 16가지 도구를 무료로 이용하세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google AdSense */}
        <GoogleAdsense pId="ca-pub-YOUR_PUBLISHER_ID" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
