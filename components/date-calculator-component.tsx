"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

export function DateCalculatorComponent() {
  const [calculationType, setCalculationType] = useState("dday")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateDate = () => {
    const today = new Date()

    if (calculationType === "dday" && endDate) {
      const targetDate = new Date(endDate)
      const diffTime = targetDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      setResult({
        type: "dday",
        days: diffDays,
        targetDate: targetDate.toLocaleDateString("ko-KR"),
        isPast: diffDays < 0,
      })
    } else if (calculationType === "difference" && startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const diffWeeks = Math.floor(diffDays / 7)
      const diffMonths = Math.floor(diffDays / 30.44)
      const diffYears = Math.floor(diffDays / 365.25)

      setResult({
        type: "difference",
        days: diffDays,
        weeks: diffWeeks,
        months: diffMonths,
        years: diffYears,
        startDate: start.toLocaleDateString("ko-KR"),
        endDate: end.toLocaleDateString("ko-KR"),
      })
    } else if (calculationType === "age" && birthDate) {
      const birth = new Date(birthDate)
      const ageInMs = today.getTime() - birth.getTime()
      const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24))
      const ageInYears = Math.floor(ageInDays / 365.25)
      const ageInMonths = Math.floor(ageInDays / 30.44)

      // 정확한 만 나이 계산
      let exactAge = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        exactAge--
      }

      setResult({
        type: "age",
        exactAge,
        totalDays: ageInDays,
        totalMonths: ageInMonths,
        birthDate: birth.toLocaleDateString("ko-KR"),
        nextBirthday: getNextBirthday(birth),
      })
    }
  }

  const getNextBirthday = (birthDate: Date) => {
    const today = new Date()
    const thisYear = today.getFullYear()
    let nextBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate())

    if (nextBirthday < today) {
      nextBirthday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate())
    }

    const diffTime = nextBirthday.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return {
      date: nextBirthday.toLocaleDateString("ko-KR"),
      daysLeft: diffDays,
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            날짜 계산기
          </CardTitle>
          <CardDescription>D-day, 날짜 차이, 만 나이 등을 계산합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>계산 유형</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dday">D-day 계산</SelectItem>
                <SelectItem value="difference">날짜 차이 계산</SelectItem>
                <SelectItem value="age">만 나이 계산</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {calculationType === "dday" && (
            <div className="space-y-2">
              <Label>목표 날짜</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          )}

          {calculationType === "difference" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>시작 날짜</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>종료 날짜</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          )}

          {calculationType === "age" && (
            <div className="space-y-2">
              <Label>생년월일</Label>
              <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
          )}

          <Button onClick={calculateDate} className="w-full">
            계산하기
          </Button>

          {result && (
            <div className="space-y-4">
              {result.type === "dday" && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold">
                        {result.isPast ? "D+" : "D-"}
                        {Math.abs(result.days)}
                      </div>
                      <div className="text-muted-foreground">
                        {result.targetDate} {result.isPast ? "로부터" : "까지"}
                      </div>
                      <div className="text-sm">
                        {result.isPast ? `${Math.abs(result.days)}일이 지났습니다` : `${result.days}일 남았습니다`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.type === "difference" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{result.days}</div>
                      <div className="text-sm text-muted-foreground">일</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{result.weeks}</div>
                      <div className="text-sm text-muted-foreground">주</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{result.months}</div>
                      <div className="text-sm text-muted-foreground">개월</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 text-center">
                      <div className="text-2xl font-bold">{result.years}</div>
                      <div className="text-sm text-muted-foreground">년</div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {result.type === "age" && (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-bold">만 {result.exactAge}세</div>
                        <div className="text-muted-foreground">생일: {result.birthDate}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <div className="text-xl font-bold">{result.totalDays.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">총 일수</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <div className="text-xl font-bold">{result.totalMonths.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">총 개월수</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4 text-center">
                        <div className="text-xl font-bold">{result.nextBirthday.daysLeft}</div>
                        <div className="text-sm text-muted-foreground">다음 생일까지</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="font-semibold">다음 생일</div>
                        <div className="text-muted-foreground">{result.nextBirthday.date}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
