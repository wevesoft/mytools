"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function BmiCalculatorComponent() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("metric")
  const [result, setResult] = useState<any>(null)

  const calculateBMI = () => {
    let heightInM = Number.parseFloat(height)
    let weightInKg = Number.parseFloat(weight)

    if (!heightInM || !weightInKg) return

    // 단위 변환
    if (unit === "imperial") {
      heightInM = heightInM * 0.0254 // 인치를 미터로
      weightInKg = weightInKg * 0.453592 // 파운드를 킬로그램으로
    } else {
      heightInM = heightInM / 100 // 센티미터를 미터로
    }

    const bmi = weightInKg / (heightInM * heightInM)

    let category = ""
    let color = ""
    let advice = ""
    let progress = 0

    if (bmi < 18.5) {
      category = "저체중"
      color = "text-blue-600"
      advice = "체중 증가가 필요할 수 있습니다. 의사와 상담하세요."
      progress = (bmi / 18.5) * 25
    } else if (bmi < 25) {
      category = "정상체중"
      color = "text-green-600"
      advice = "건강한 체중을 유지하고 있습니다!"
      progress = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25
    } else if (bmi < 30) {
      category = "과체중"
      color = "text-yellow-600"
      advice = "체중 감량을 고려해보세요. 균형 잡힌 식단과 운동이 도움됩니다."
      progress = 50 + ((bmi - 25) / (30 - 25)) * 25
    } else {
      category = "비만"
      color = "text-red-600"
      advice = "건강을 위해 체중 감량이 필요합니다. 전문가와 상담하세요."
      progress = 75 + Math.min(((bmi - 30) / 10) * 25, 25)
    }

    // 이상적인 체중 범위 계산
    const idealWeightMin = 18.5 * (heightInM * heightInM)
    const idealWeightMax = 24.9 * (heightInM * heightInM)

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      advice,
      progress,
      idealWeightMin: idealWeightMin.toFixed(1),
      idealWeightMax: idealWeightMax.toFixed(1),
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5" />
            BMI 계산기
          </CardTitle>
          <CardDescription>체질량지수(BMI)를 계산하고 건강 상태를 확인하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>단위 시스템</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">미터법 (cm, kg)</SelectItem>
                <SelectItem value="imperial">야드파운드법 (inch, lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>키 {unit === "metric" ? "(cm)" : "(inch)"}</Label>
              <Input
                type="number"
                placeholder={unit === "metric" ? "170" : "67"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>몸무게 {unit === "metric" ? "(kg)" : "(lbs)"}</Label>
              <Input
                type="number"
                placeholder={unit === "metric" ? "70" : "154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateBMI} disabled={!height || !weight} className="w-full">
            BMI 계산하기
          </Button>

          {result && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold">{result.bmi}</div>
                    <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>BMI 범위</Label>
                <Progress value={result.progress} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>저체중</span>
                  <span>정상</span>
                  <span>과체중</span>
                  <span>비만</span>
                </div>
              </div>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">건강 조언</h4>
                    <p className="text-sm text-muted-foreground">{result.advice}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">이상적인 체중 범위</h4>
                    <p className="text-sm">
                      {result.idealWeightMin}kg - {result.idealWeightMax}kg
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="p-2 border rounded text-center">
                  <div className="font-semibold text-blue-600">저체중</div>
                  <div>{"< 18.5"}</div>
                </div>
                <div className="p-2 border rounded text-center">
                  <div className="font-semibold text-green-600">정상</div>
                  <div>18.5 - 24.9</div>
                </div>
                <div className="p-2 border rounded text-center">
                  <div className="font-semibold text-yellow-600">과체중</div>
                  <div>25.0 - 29.9</div>
                </div>
                <div className="p-2 border rounded text-center">
                  <div className="font-semibold text-red-600">비만</div>
                  <div>{"≥ 30.0"}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
