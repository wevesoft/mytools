"use client"

import { useEffect } from "react"

interface AdInArticleProps {
  dataAdSlot: string
  className?: string
}

export function AdInArticle({ dataAdSlot, className = "" }: AdInArticleProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [])

  if (process.env.NODE_ENV !== "production") {
    return (
      <div className={`bg-gray-200 p-4 text-center text-gray-500 my-4 ${className}`}>
        <p>인-아티클 광고 (개발 모드에서는 표시되지 않음)</p>
      </div>
    )
  }

  return (
    <div className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={dataAdSlot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
    </div>
  )
}
