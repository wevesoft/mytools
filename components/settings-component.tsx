"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save } from "lucide-react"

export function SettingsComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("ko")
  const [autoSave, setAutoSave] = useState(true)

  const handleSaveSettings = () => {
    console.log("설정 저장:", { darkMode, language, autoSave })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="size-5" />
            설정
          </CardTitle>
          <CardDescription>애플리케이션의 기본 설정을 관리합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>다크 모드</Label>
              <p className="text-sm text-muted-foreground">어두운 테마를 사용합니다</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="space-y-2">
            <Label>언어</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>자동 저장</Label>
              <p className="text-sm text-muted-foreground">작업 내용을 자동으로 저장합니다</p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>

          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Save className="size-4" />
            설정 저장
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
