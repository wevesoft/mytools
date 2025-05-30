"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Type, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TextCounterComponent() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    bytes: 0,
  })

  useEffect(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0
    const bytes = new Blob([text]).size

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      bytes,
    })
  }, [text])

  const copyStats = () => {
    const statsText = `글자수: ${stats.characters}
공백 제외: ${stats.charactersNoSpaces}
단어수: ${stats.words}
문장수: ${stats.sentences}
문단수: ${stats.paragraphs}
바이트: ${stats.bytes}`
    navigator.clipboard.writeText(statsText)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="size-5" />
            글자수 세기
          </CardTitle>
          <CardDescription>텍스트의 글자수, 단어수, 문장수 등을 실시간으로 계산합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">텍스트 입력</Label>
            <Textarea
              id="text-input"
              placeholder="분석할 텍스트를 입력하세요..."
              className="min-h-[300px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.characters.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">전체 글자수</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.charactersNoSpaces.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">공백 제외</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.words.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">단어수</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.sentences.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">문장수</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.paragraphs.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">문단수</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{stats.bytes.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">바이트</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button onClick={copyStats} variant="outline" className="flex items-center gap-2">
            <Copy className="size-4" />
            통계 복사
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
