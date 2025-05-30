"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { QrCode, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QrGeneratorComponent() {
  const [text, setText] = useState("")
  const [qrType, setQrType] = useState("text")
  const [qrSize, setQrSize] = useState("200")
  const [qrGenerated, setQrGenerated] = useState(false)

  const generateQR = () => {
    if (!text.trim()) return
    setQrGenerated(true)
  }

  const downloadQR = () => {
    // QR 코드 다운로드 로직 (실제로는 QR 라이브러리 사용)
    console.log("QR 코드 다운로드")
  }

  const getPlaceholder = () => {
    switch (qrType) {
      case "url":
        return "https://example.com"
      case "email":
        return "example@email.com"
      case "phone":
        return "+82-10-1234-5678"
      case "wifi":
        return "WIFI:T:WPA;S:네트워크명;P:비밀번호;;"
      default:
        return "QR코드로 변환할 텍스트를 입력하세요"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="size-5" />
            QR코드 생성기
          </CardTitle>
          <CardDescription>텍스트, URL, 연락처 등을 QR코드로 변환합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>QR코드 유형</Label>
              <Select value={qrType} onValueChange={setQrType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">일반 텍스트</SelectItem>
                  <SelectItem value="url">웹사이트 URL</SelectItem>
                  <SelectItem value="email">이메일</SelectItem>
                  <SelectItem value="phone">전화번호</SelectItem>
                  <SelectItem value="wifi">WiFi 정보</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>QR코드 크기</Label>
              <Select value={qrSize} onValueChange={setQrSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150x150</SelectItem>
                  <SelectItem value="200">200x200</SelectItem>
                  <SelectItem value="300">300x300</SelectItem>
                  <SelectItem value="400">400x400</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>내용</Label>
            {qrType === "wifi" ? (
              <Textarea
                placeholder={getPlaceholder()}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <Input placeholder={getPlaceholder()} value={text} onChange={(e) => setText(e.target.value)} />
            )}
          </div>

          <Button onClick={generateQR} disabled={!text.trim()} className="w-full">
            QR코드 생성
          </Button>

          {qrGenerated && text && (
            <div className="space-y-4">
              <Label>생성된 QR코드</Label>
              <div className="flex flex-col items-center space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}`}
                    alt="Generated QR Code"
                    className="rounded"
                  />
                </div>
                <Button onClick={downloadQR} variant="outline" className="flex items-center gap-2">
                  <Download className="size-4" />
                  QR코드 다운로드
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
