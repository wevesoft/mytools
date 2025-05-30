"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Binary, Copy } from "lucide-react"

export function NumberConverterComponent() {
  const [inputValue, setInputValue] = useState("")
  const [fromBase, setFromBase] = useState("10")
  const [results, setResults] = useState<Record<string, string>>({})

  const bases = [
    { value: "2", label: "2진수 (Binary)", chars: "01" },
    { value: "8", label: "8진수 (Octal)", chars: "01234567" },
    { value: "10", label: "10진수 (Decimal)", chars: "0123456789" },
    { value: "16", label: "16진수 (Hexadecimal)", chars: "0123456789ABCDEF" },
    { value: "32", label: "32진수", chars: "0123456789ABCDEFGHIJKLMNOPQRSTUV" },
  ]

  const convertNumber = () => {
    if (!inputValue.trim()) return

    try {
      // 입력값을 10진수로 변환
      const decimalValue = Number.parseInt(inputValue.toUpperCase(), Number.parseInt(fromBase))

      if (isNaN(decimalValue)) {
        setResults({ error: "올바르지 않은 숫자 형식입니다." })
        return
      }

      const newResults: Record<string, string> = {}

      // 각 진법으로 변환
      bases.forEach((base) => {
        if (base.value !== fromBase) {
          newResults[base.value] = decimalValue.toString(Number.parseInt(base.value)).toUpperCase()
        }
      })

      // 추가 정보
      newResults.decimal = decimalValue.toString()
      newResults.binary_formatted = decimalValue
        .toString(2)
        .replace(/(.{4})/g, "$1 ")
        .trim()
      newResults.hex_formatted = "0x" + decimalValue.toString(16).toUpperCase()

      setResults(newResults)
    } catch (error) {
      setResults({ error: "변환 중 오류가 발생했습니다." })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const isValidInput = (value: string, base: string) => {
    const validChars = bases.find((b) => b.value === base)?.chars || ""
    return value
      .toUpperCase()
      .split("")
      .every((char) => validChars.includes(char))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Binary className="size-5" />
            진법 변환기
          </CardTitle>
          <CardDescription>2진수, 8진수, 10진수, 16진수 등 다양한 진법 간 변환을 수행합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>입력 진법</Label>
              <Select value={fromBase} onValueChange={setFromBase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bases.map((base) => (
                    <SelectItem key={base.value} value={base.value}>
                      {base.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>숫자 입력</Label>
              <Input
                placeholder={`${fromBase}진수 숫자를 입력하세요`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={!isValidInput(inputValue, fromBase) && inputValue ? "border-red-500" : ""}
              />
              {!isValidInput(inputValue, fromBase) && inputValue && (
                <p className="text-sm text-red-500">올바르지 않은 {fromBase}진수 형식입니다.</p>
              )}
            </div>
          </div>

          <Button
            onClick={convertNumber}
            disabled={!inputValue || !isValidInput(inputValue, fromBase)}
            className="w-full"
          >
            변환하기
          </Button>

          {Object.keys(results).length > 0 && !results.error && (
            <div className="space-y-4">
              <Label>변환 결과</Label>
              <div className="grid grid-cols-1 gap-3">
                {bases.map((base) => {
                  if (base.value === fromBase || !results[base.value]) return null
                  return (
                    <div key={base.value} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <span className="font-medium">{base.label}:</span>
                        <span className="ml-2 font-mono">{results[base.value]}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(results[base.value])}>
                        <Copy className="size-4" />
                      </Button>
                    </div>
                  )
                })}

                {results.binary_formatted && fromBase !== "2" && (
                  <div className="flex items-center justify-between p-3 border rounded bg-muted/50">
                    <div>
                      <span className="font-medium">2진수 (포맷):</span>
                      <span className="ml-2 font-mono">{results.binary_formatted}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(results.binary_formatted)}>
                      <Copy className="size-4" />
                    </Button>
                  </div>
                )}

                {results.hex_formatted && fromBase !== "16" && (
                  <div className="flex items-center justify-between p-3 border rounded bg-muted/50">
                    <div>
                      <span className="font-medium">16진수 (0x):</span>
                      <span className="ml-2 font-mono">{results.hex_formatted}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(results.hex_formatted)}>
                      <Copy className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {results.error && (
            <div className="p-3 border border-red-200 rounded bg-red-50 text-red-700">{results.error}</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
