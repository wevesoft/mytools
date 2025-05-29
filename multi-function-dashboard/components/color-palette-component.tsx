"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Palette, Copy, RefreshCw } from "lucide-react"

export function ColorPaletteComponent() {
  const [hexColor, setHexColor] = useState("#3b82f6")
  const [rgbColor, setRgbColor] = useState("")
  const [hslColor, setHslColor] = useState("")
  const [randomColors, setRandomColors] = useState<string[]>([])

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const updateColors = (hex: string) => {
    setHexColor(hex)
    const rgb = hexToRgb(hex)
    const hsl = hexToHsl(hex)

    if (rgb) {
      setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
    }

    if (hsl) {
      setHslColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
    }
  }

  const generateRandomColors = () => {
    const colors = []
    for (let i = 0; i < 8; i++) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      colors.push(randomColor)
    }
    setRandomColors(colors)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5" />
            색상 도구
          </CardTitle>
          <CardDescription>색상 코드 변환 및 팔레트 생성 도구입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>색상 선택</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={hexColor}
                    onChange={(e) => updateColors(e.target.value)}
                    className="w-16 h-10 rounded border"
                  />
                  <Input value={hexColor} onChange={(e) => updateColors(e.target.value)} placeholder="#000000" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label className="w-12">HEX:</Label>
                  <Input value={hexColor} readOnly className="bg-muted" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(hexColor)}>
                    <Copy className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="w-12">RGB:</Label>
                  <Input value={rgbColor} readOnly className="bg-muted" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(rgbColor)}>
                    <Copy className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="w-12">HSL:</Label>
                  <Input value={hslColor} readOnly className="bg-muted" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(hslColor)}>
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>색상 미리보기</Label>
              <div className="w-full h-32 rounded-lg border" style={{ backgroundColor: hexColor }} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>랜덤 색상 팔레트</Label>
              <Button onClick={generateRandomColors} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="size-4" />
                새로 생성
              </Button>
            </div>

            {randomColors.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {randomColors.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="w-full h-16 rounded cursor-pointer border"
                      style={{ backgroundColor: color }}
                      onClick={() => updateColors(color)}
                      title={`클릭하여 ${color} 선택`}
                    />
                    <div className="text-xs text-center font-mono">{color}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
