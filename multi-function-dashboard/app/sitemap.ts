import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://multi-tools.vercel.app"

  const tools = [
    "salary-calculator",
    "text-counter",
    "unit-converter",
    "color-palette",
    "qr-generator",
    "image-converter",
    "password-generator",
    "string-encoder",
    "number-converter",
    "bmi-calculator",
    "date-calculator",
    "todo-list",
    "expense-tracker",
    "text-tools",
    "timer-tools",
    "random-tools",
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
