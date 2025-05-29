"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImageIcon, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ImageGenerationComponent() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("realistic")
  const [generatedImage, setGeneratedImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    // 이미지 생성 API 호출 시뮬레이션
    setTimeout(() => {
      setGeneratedImage("/placeholder.svg?height=400&width=400")
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="size-5" />
            이미지 생성
          </CardTitle>
          <CardDescription>AI를 사용하여 텍스트 설명으로부터 이미지를 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">이미지 설명 (프롬프트)</Label>
            <Input
              id="prompt"
              placeholder="생성하고 싶은 이미지를 설명하세요"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">스타일</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue placeholder="이미지 스타일 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">사실적</SelectItem>
                <SelectItem value="cartoon">만화</SelectItem>
                <SelectItem value="abstract">추상적</SelectItem>
                <SelectItem value="oil-painting">유화</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerate} disabled={!prompt.trim() || isLoading} className="flex items-center gap-2">
            <ImageIcon className="size-4" />
            {isLoading ? "생성 중..." : "이미지 생성"}
          </Button>

          {generatedImage && (
            <div className="space-y-4">
              <Label>생성된 이미지</Label>
              <div className="border rounded-lg p-4">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt="Generated"
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="size-4" />
                다운로드
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
