"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdInArticle } from "@/components/AdInArticle"

export function SalaryCalculatorComponent() {
  const [salary, setSalary] = useState("")
  const [salaryType, setSalaryType] = useState("annual")
  const [results, setResults] = useState<any>(null)

  const calculateSalary = () => {
    const amount = Number.parseFloat(salary)
    if (!amount) return

    let annualSalary = amount
    if (salaryType === "monthly") {
      annualSalary = amount * 12
    }

    // 간단한 세금 계산 (실제로는 더 복잡함)
    const taxRate = 0.22 // 22% 세율 가정
    const afterTax = annualSalary * (1 - taxRate)
    const monthlyGross = annualSalary / 12
    const monthlyNet = afterTax / 12
    const dailyNet = afterTax / 365
    const hourlyNet = afterTax / (365 * 8) // 8시간 근무 가정

    setResults({
      annualGross: annualSalary,
      annualNet: afterTax,
      monthlyGross,
      monthlyNet,
      dailyNet,
      hourlyNet,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(amount))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="size-5" />
            연봉계산기
          </CardTitle>
          <CardDescription>연봉, 월급을 입력하여 세후소득을 계산해보세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">급여</Label>
              <Input
                id="salary"
                type="number"
                placeholder="급여를 입력하세요"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>급여 유형</Label>
              <Select value={salaryType} onValueChange={setSalaryType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">연봉</SelectItem>
                  <SelectItem value="monthly">월급</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateSalary} disabled={!salary} className="w-full">
            계산하기
          </Button>

          {/* 중간 광고 */}
          <AdInArticle dataAdSlot="5566778899" />

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">세전 소득</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>연봉:</span>
                    <span className="font-semibold">{formatCurrency(results.annualGross)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월급:</span>
                    <span className="font-semibold">{formatCurrency(results.monthlyGross)}원</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-600">세후 소득</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>연봉:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.annualNet)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>월급:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(results.monthlyNet)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>일급:</span>
                    <span className="font-semibold">{formatCurrency(results.dailyNet)}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>시급:</span>
                    <span className="font-semibold">{formatCurrency(results.hourlyNet)}원</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
