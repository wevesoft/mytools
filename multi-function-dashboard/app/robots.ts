import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/private/", "/_next/", "/api/"],
    },
    sitemap: "https://multi-tools.vercel.app/sitemap.xml",
  }
}
