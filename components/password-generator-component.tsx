"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Key, Copy, RefreshCw } from "lucide-react"

export function PasswordGeneratorComponent() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!charset) return

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
  }

  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: "없음", color: "gray" }

    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { level: 1, text: "약함", color: "red" }
    if (score <= 4) return { level: 2, text: "보통", color: "yellow" }
    return { level: 3, text: "강함", color: "green" }
  }

  const strength = getPasswordStrength()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="size-5" />
            비밀번호 생성기
          </CardTitle>
          <CardDescription>안전하고 강력한 비밀번호를 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>비밀번호 길이: {length[0]}자</Label>
              <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>대문자 포함 (A-Z)</Label>
                <Switch checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
              </div>

              <div className="flex items-center justify-between">
                <Label>소문자 포함 (a-z)</Label>
                <Switch checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
              </div>

              <div className="flex items-center justify-between">
                <Label>숫자 포함 (0-9)</Label>
                <Switch checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
              </div>

              <div className="flex items-center justify-between">
                <Label>특수문자 포함</Label>
                <Switch checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
              </div>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full flex items-center gap-2">
            <RefreshCw className="size-4" />
            비밀번호 생성
          </Button>

          {password && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>생성된 비밀번호</Label>
                <div className="flex gap-2">
                  <Input value={password} readOnly className="font-mono bg-muted" />
                  <Button onClick={copyPassword} variant="outline" size="icon">
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>비밀번호 강도</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength.color === "red"
                          ? "bg-red-500 w-1/3"
                          : strength.color === "yellow"
                            ? "bg-yellow-500 w-2/3"
                            : "bg-green-500 w-full"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      strength.color === "red"
                        ? "text-red-600"
                        : strength.color === "yellow"
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {strength.text}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
