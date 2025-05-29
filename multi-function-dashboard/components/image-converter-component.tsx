"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ImageIcon, Upload, Download, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImageFile {
  file: File
  preview: string
  name: string
  size: string
  type: string
}

export function ImageConverterComponent() {
  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null)
  const [outputFormat, setOutputFormat] = useState("png")
  const [quality, setQuality] = useState([90])
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const supportedFormats = [
    { value: "png", label: "PNG", description: "무손실 압축, 투명도 지원" },
    { value: "jpeg", label: "JPEG", description: "손실 압축, 작은 파일 크기" },
    { value: "webp", label: "WebP", description: "최신 형식, 우수한 압축률" },
    { value: "bmp", label: "BMP", description: "비압축, 큰 파일 크기" },
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 이미지 파일인지 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      setUploadedImage({
        file,
        preview,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
      })
      setConvertedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const convertImage = async () => {
    if (!uploadedImage || !canvasRef.current) return

    setIsConverting(true)

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        // 캔버스 크기를 이미지 크기에 맞춤
        canvas.width = img.width
        canvas.height = img.height

        // 이미지를 캔버스에 그리기
        ctx.drawImage(img, 0, 0)

        // 선택된 형식으로 변환
        let mimeType = `image/${outputFormat}`
        let qualityValue = quality[0] / 100

        // BMP는 브라우저에서 직접 지원하지 않으므로 PNG로 대체
        if (outputFormat === "bmp") {
          mimeType = "image/png"
          qualityValue = 1
        }

        const convertedDataUrl = canvas.toDataURL(mimeType, qualityValue)
        setConvertedImage(convertedDataUrl)
        setIsConverting(false)
      }

      img.onerror = () => {
        alert("이미지 로드 중 오류가 발생했습니다.")
        setIsConverting(false)
      }

      img.src = uploadedImage.preview
    } catch (error) {
      console.error("변환 중 오류:", error)
      alert("이미지 변환 중 오류가 발생했습니다.")
      setIsConverting(false)
    }
  }

  const downloadImage = () => {
    if (!convertedImage || !uploadedImage) return

    const link = document.createElement("a")
    link.download = `${uploadedImage.name.split(".")[0]}.${outputFormat}`
    link.href = convertedImage
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const removeImage = () => {
    setUploadedImage(null)
    setConvertedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getEstimatedSize = () => {
    if (!convertedImage) return null

    // Base64 데이터에서 대략적인 파일 크기 계산
    const base64Length = convertedImage.split(",")[1]?.length || 0
    const sizeInBytes = (base64Length * 3) / 4
    return formatFileSize(sizeInBytes)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="size-5" />
            이미지 확장자 변경
          </CardTitle>
          <CardDescription>이미지를 다양한 형식으로 변환하고 압축할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 파일 업로드 영역 */}
          <div className="space-y-4">
            <Label>이미지 업로드</Label>
            {!uploadedImage ? (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">이미지를 업로드하세요</p>
                <p className="text-sm text-muted-foreground">JPG, PNG, WebP, BMP 등 다양한 형식 지원</p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <img
                    src={uploadedImage.preview || "/placeholder.svg"}
                    alt="업로드된 이미지"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{uploadedImage.name}</p>
                    <p className="text-sm text-muted-foreground">크기: {uploadedImage.size}</p>
                    <p className="text-sm text-muted-foreground">형식: {uploadedImage.type}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={removeImage}>
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {uploadedImage && (
            <>
              {/* 변환 설정 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>출력 형식</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          <div>
                            <div className="font-medium">{format.label}</div>
                            <div className="text-xs text-muted-foreground">{format.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(outputFormat === "jpeg" || outputFormat === "webp") && (
                  <div className="space-y-2">
                    <Label>품질: {quality[0]}%</Label>
                    <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="w-full" />
                  </div>
                )}
              </div>

              <Button onClick={convertImage} disabled={isConverting} className="w-full">
                {isConverting ? "변환 중..." : "이미지 변환"}
              </Button>

              {/* 변환 결과 */}
              {convertedImage && (
                <div className="space-y-4">
                  <Label>변환 결과</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">변환된 이미지</p>
                      <img
                        src={convertedImage || "/placeholder.svg"}
                        alt="변환된 이미지"
                        className="w-full max-w-sm rounded border"
                      />
                    </div>
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          <div className="space-y-1">
                            <p>
                              <strong>형식:</strong> {outputFormat.toUpperCase()}
                            </p>
                            <p>
                              <strong>예상 크기:</strong> {getEstimatedSize()}
                            </p>
                            {(outputFormat === "jpeg" || outputFormat === "webp") && (
                              <p>
                                <strong>품질:</strong> {quality[0]}%
                              </p>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                      <Button onClick={downloadImage} className="w-full flex items-center gap-2">
                        <Download className="size-4" />
                        이미지 다운로드
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* 숨겨진 캔버스 */}
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  )
}
