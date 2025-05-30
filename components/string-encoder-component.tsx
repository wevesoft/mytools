"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Copy, ArrowUpDown } from "lucide-react"

export function StringEncoderComponent() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [encodingType, setEncodingType] = useState("base64")
  const [isEncoding, setIsEncoding] = useState(true)

  const encodingTypes = [
    { value: "base64", label: "Base64" },
    { value: "uri", label: "URI 인코딩" },
    { value: "html", label: "HTML 엔티티" },
    { value: "url", label: "URL 인코딩" },
    { value: "hex", label: "16진수" },
    { value: "binary", label: "2진수" },
  ]

  const processText = () => {
    if (!inputText) return

    try {
      let result = ""

      if (isEncoding) {
        // 인코딩
        switch (encodingType) {
          case "base64":
            result = btoa(unescape(encodeURIComponent(inputText)))
            break
          case "uri":
            result = encodeURIComponent(inputText)
            break
          case "html":
            result = inputText
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;")
            break
          case "url":
            result = encodeURI(inputText)
            break
          case "hex":
            result = Array.from(inputText)
              .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
              .join(" ")
            break
          case "binary":
            result = Array.from(inputText)
              .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
              .join(" ")
            break
        }
      } else {
        // 디코딩
        switch (encodingType) {
          case "base64":
            result = decodeURIComponent(escape(atob(inputText)))
            break
          case "uri":
            result = decodeURIComponent(inputText)
            break
          case "html":
            result = inputText
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
            break
          case "url":
            result = decodeURI(inputText)
            break
          case "hex":
            result = inputText
              .split(" ")
              .map((hex) => String.fromCharCode(Number.parseInt(hex, 16)))
              .join("")
            break
          case "binary":
            result = inputText
              .split(" ")
              .map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
              .join("")
            break
        }
      }

      setOutputText(result)
    } catch (error) {
      setOutputText("오류: 올바르지 않은 형식입니다.")
    }
  }

  const swapTexts = () => {
    setInputText(outputText)
    setOutputText(inputText)
    setIsEncoding(!isEncoding)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5" />
            문자열 인코딩/디코딩
          </CardTitle>
          <CardDescription>다양한 형식으로 문자열을 인코딩하거나 디코딩합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>인코딩 타입</Label>
              <Select value={encodingType} onValueChange={setEncodingType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {encodingTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={swapTexts} variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="size-4" />
                {isEncoding ? "인코딩" : "디코딩"} 모드
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{isEncoding ? "원본 텍스트" : "인코딩된 텍스트"}</Label>
            <Textarea
              placeholder={isEncoding ? "인코딩할 텍스트를 입력하세요" : "디코딩할 텍스트를 입력하세요"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button onClick={processText} disabled={!inputText} className="w-full">
            {isEncoding ? "인코딩" : "디코딩"} 실행
          </Button>

          {outputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{isEncoding ? "인코딩 결과" : "디코딩 결과"}</Label>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(outputText)}>
                  <Copy className="size-4" />
                </Button>
              </div>
              <Textarea value={outputText} readOnly className="min-h-[120px] bg-muted" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
