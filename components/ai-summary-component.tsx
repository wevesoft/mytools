"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sparkles, Copy } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AiSummaryComponent() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSummarize = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    // AI 요약 API 호출 시뮬레이션
    setTimeout(() => {
      setSummary(`요약된 내용: ${inputText.slice(0, 100)}...`)
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5" />
            AI 요약
          </CardTitle>
          <CardDescription>긴 텍스트를 AI가 자동으로 요약해드립니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text">요약할 텍스트</Label>
            <Textarea
              id="input-text"
              placeholder="요약하고 싶은 텍스트를 입력하세요"
              className="min-h-[200px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSummarize}
            disabled={!inputText.trim() || isLoading}
            className="flex items-center gap-2"
          >
            <Sparkles className="size-4" />
            {isLoading ? "요약 중..." : "AI 요약 실행"}
          </Button>

          {summary && (
            <div className="space-y-2">
              <Label>요약 결과</Label>
              <Alert>
                <AlertDescription className="whitespace-pre-wrap">{summary}</AlertDescription>
              </Alert>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                <Copy className="size-4" />
                복사
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
