"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shuffle, ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const conversions = {
  length: {
    name: "길이",
    units: {
      mm: { name: "밀리미터", factor: 1 },
      cm: { name: "센티미터", factor: 10 },
      m: { name: "미터", factor: 1000 },
      km: { name: "킬로미터", factor: 1000000 },
      inch: { name: "인치", factor: 25.4 },
      ft: { name: "피트", factor: 304.8 },
      yard: { name: "야드", factor: 914.4 },
    },
  },
  weight: {
    name: "무게",
    units: {
      mg: { name: "밀리그램", factor: 1 },
      g: { name: "그램", factor: 1000 },
      kg: { name: "킬로그램", factor: 1000000 },
      lb: { name: "파운드", factor: 453592 },
      oz: { name: "온스", factor: 28349.5 },
    },
  },
  temperature: {
    name: "온도",
    units: {
      celsius: { name: "섭씨", factor: 1 },
      fahrenheit: { name: "화씨", factor: 1 },
      kelvin: { name: "켈빈", factor: 1 },
    },
  },
}

export function UnitConverterComponent() {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("cm")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const convert = () => {
    const value = Number.parseFloat(fromValue)
    if (!value) return

    const categoryData = conversions[category as keyof typeof conversions]

    if (category === "temperature") {
      let result = value

      // Convert to Celsius first
      if (fromUnit === "fahrenheit") {
        result = ((value - 32) * 5) / 9
      } else if (fromUnit === "kelvin") {
        result = value - 273.15
      }

      // Convert from Celsius to target
      if (toUnit === "fahrenheit") {
        result = (result * 9) / 5 + 32
      } else if (toUnit === "kelvin") {
        result = result + 273.15
      }

      setToValue(result.toFixed(2))
    } else {
      const fromFactor = categoryData.units[fromUnit as keyof typeof categoryData.units].factor
      const toFactor = categoryData.units[toUnit as keyof typeof categoryData.units].factor
      const result = (value * fromFactor) / toFactor
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""))
    }
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="size-5" />
            단위 변환기
          </CardTitle>
          <CardDescription>다양한 단위 간 변환을 쉽게 계산할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>변환 카테고리</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value)
                const units = Object.keys(conversions[value as keyof typeof conversions].units)
                setFromUnit(units[0])
                setToUnit(units[1] || units[0])
                setFromValue("")
                setToValue("")
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions).map(([key, data]) => (
                  <SelectItem key={key} value={key}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <Label>변환할 값</Label>
              <Input
                type="number"
                placeholder="값 입력"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>단위 (From)</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={swapUnits}>
                <ArrowUpDown className="size-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>단위 (To)</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category as keyof typeof conversions].units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>변환 결과</Label>
              <Input value={toValue} readOnly placeholder="결과" className="bg-muted" />
            </div>
          </div>

          <Button onClick={convert} disabled={!fromValue} className="w-full">
            변환하기
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
