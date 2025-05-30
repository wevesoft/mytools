"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Copy } from "lucide-react"

export function TextToolsComponent() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [operation, setOperation] = useState("trim")
  const [compareText1, setCompareText1] = useState("")
  const [compareText2, setCompareText2] = useState("")
  const [activeTab, setActiveTab] = useState<"transform" | "compare">("transform")

  const operations = [
    { value: "trim", label: "공백 제거" },
    { value: "uppercase", label: "대문자 변환" },
    { value: "lowercase", label: "소문자 변환" },
    { value: "capitalize", label: "첫 글자 대문자" },
    { value: "reverse", label: "텍스트 뒤집기" },
    { value: "remove-linebreaks", label: "줄바꿈 제거" },
    { value: "add-commas", label: "숫자에 콤마 추가" },
    { value: "remove-duplicates", label: "중복 줄 제거" },
    { value: "sort-lines", label: "줄 정렬" },
  ]

  const processText = () => {
    let result = inputText

    switch (operation) {
      case "trim":
        result = inputText.trim().replace(/\s+/g, " ")
        break
      case "uppercase":
        result = inputText.toUpperCase()
        break
      case "lowercase":
        result = inputText.toLowerCase()
        break
      case "capitalize":
        result = inputText.replace(/\b\w/g, (l) => l.toUpperCase())
        break
      case "reverse":
        result = inputText.split("").reverse().join("")
        break
      case "remove-linebreaks":
        result = inputText.replace(/\n/g, " ").replace(/\s+/g, " ")
        break
      case "add-commas":
        result = inputText.replace(/\b\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")
        break
      case "remove-duplicates":
        const lines = inputText.split("\n")
        result = [...new Set(lines)].join("\n")
        break
      case "sort-lines":
        result = inputText.split("\n").sort().join("\n")
        break
    }

    setOutputText(result)
  }

  const findDifferences = () => {
    const lines1 = compareText1.split("\n")
    const lines2 = compareText2.split("\n")
    const maxLines = Math.max(lines1.length, lines2.length)

    const differences = []
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || ""
      const line2 = lines2[i] || ""
      if (line1 !== line2) {
        differences.push(`줄 ${i + 1}: "${line1}" ≠ "${line2}"`)
      }
    }

    if (differences.length === 0) {
      setOutputText("두 텍스트가 동일합니다.")
    } else {
      setOutputText(`발견된 차이점 (${differences.length}개):\n\n${differences.join("\n")}`)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            텍스트 도구
          </CardTitle>
          <CardDescription>텍스트 변환, 정렬, 비교 등 다양한 텍스트 처리 도구입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "transform" ? "default" : "outline"}
              onClick={() => setActiveTab("transform")}
            >
              텍스트 변환
            </Button>
            <Button variant={activeTab === "compare" ? "default" : "outline"} onClick={() => setActiveTab("compare")}>
              텍스트 비교
            </Button>
          </div>

          {activeTab === "transform" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>변환 유형</Label>
                <Select value={operation} onValueChange={setOperation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {operations.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>입력 텍스트</Label>
                <Textarea
                  placeholder="변환할 텍스트를 입력하세요"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button onClick={processText} disabled={!inputText} className="w-full">
                변환 실행
              </Button>

              {outputText && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>변환 결과</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(outputText)}>
                      <Copy className="size-4" />
                    </Button>
                  </div>
                  <Textarea value={outputText} readOnly className="min-h-[120px] bg-muted" />
                </div>
              )}
            </div>
          )}

          {activeTab === "compare" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>텍스트 1</Label>
                  <Textarea
                    placeholder="첫 번째 텍스트"
                    value={compareText1}
                    onChange={(e) => setCompareText1(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>텍스트 2</Label>
                  <Textarea
                    placeholder="두 번째 텍스트"
                    value={compareText2}
                    onChange={(e) => setCompareText2(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              <Button onClick={findDifferences} disabled={!compareText1 || !compareText2} className="w-full">
                차이점 찾기
              </Button>

              {outputText && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>비교 결과</Label>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(outputText)}>
                      <Copy className="size-4" />
                    </Button>
                  </div>
                  <Textarea value={outputText} readOnly className="min-h-[120px] bg-muted" />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
