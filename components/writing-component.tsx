"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save, FileText } from "lucide-react"

export function WritingComponent() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSave = () => {
    // 저장 로직 구현
    console.log("저장:", { title, content })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            글쓰기
          </CardTitle>
          <CardDescription>새로운 게시글을 작성하거나 기존 글을 편집할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              placeholder="게시글 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              placeholder="게시글 내용을 입력하세요"
              className="min-h-[400px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="size-4" />
              저장
            </Button>
            <Button variant="outline">미리보기</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
