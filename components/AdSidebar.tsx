"use client"

import { useEffect } from "react"

interface AdSidebarProps {
  dataAdSlot: string
  className?: string
}

export function AdSidebar({ dataAdSlot, className = "" }: AdSidebarProps) {
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
      <div className={`bg-gray-200 p-4 text-center text-gray-500 ${className}`}>
        <p>사이드바 광고</p>
        <p>(개발 모드)</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={dataAdSlot}
        data-ad-format="vertical"
      />
    </div>
  )
}
