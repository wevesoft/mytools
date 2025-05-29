"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Clock, Play, Pause, Square, RotateCcw } from "lucide-react"

export function TimerToolsComponent() {
  const [activeTab, setActiveTab] = useState<"clock" | "timer" | "stopwatch">("clock")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Timer states
  const [timerMinutes, setTimerMinutes] = useState("5")
  const [timerSeconds, setTimerSeconds] = useState("0")
  const [timerRemaining, setTimerRemaining] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)

  // Stopwatch states
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [stopwatchRunning, setStopwatchRunning] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null)

  // Clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Timer logic
  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false)
            alert("타이머가 완료되었습니다!")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timerRunning, timerRemaining])

  // Stopwatch logic
  useEffect(() => {
    if (stopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10)
      }, 10)
    } else {
      if (stopwatchRef.current) {
        clearInterval(stopwatchRef.current)
        stopwatchRef.current = null
      }
    }

    return () => {
      if (stopwatchRef.current) {
        clearInterval(stopwatchRef.current)
      }
    }
  }, [stopwatchRunning])

  const startTimer = () => {
    const totalSeconds = Number.parseInt(timerMinutes) * 60 + Number.parseInt(timerSeconds)
    if (totalSeconds > 0) {
      setTimerRemaining(totalSeconds)
      setTimerRunning(true)
    }
  }

  const pauseTimer = () => {
    setTimerRunning(false)
  }

  const resetTimer = () => {
    setTimerRunning(false)
    setTimerRemaining(0)
  }

  const startStopwatch = () => {
    setStopwatchRunning(true)
  }

  const pauseStopwatch = () => {
    setStopwatchRunning(false)
  }

  const resetStopwatch = () => {
    setStopwatchRunning(false)
    setStopwatchTime(0)
  }

  const formatTime = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)
    const ms = Math.floor((totalMs % 1000) / 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
  }

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            시간 도구
          </CardTitle>
          <CardDescription>디지털 시계, 타이머, 스톱워치 기능을 제공합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant={activeTab === "clock" ? "default" : "outline"} onClick={() => setActiveTab("clock")}>
              디지털 시계
            </Button>
            <Button variant={activeTab === "timer" ? "default" : "outline"} onClick={() => setActiveTab("timer")}>
              타이머
            </Button>
            <Button
              variant={activeTab === "stopwatch" ? "default" : "outline"}
              onClick={() => setActiveTab("stopwatch")}
            >
              스톱워치
            </Button>
          </div>

          {activeTab === "clock" && (
            <div className="text-center space-y-4">
              <div className="text-6xl font-mono font-bold">{currentTime.toLocaleTimeString("ko-KR")}</div>
              <div className="text-xl text-muted-foreground">
                {currentTime.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </div>
            </div>
          )}

          {activeTab === "timer" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold mb-4">{formatTimerDisplay(timerRemaining)}</div>
              </div>

              {!timerRunning && timerRemaining === 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>분</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>초</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                {!timerRunning && timerRemaining === 0 && (
                  <Button onClick={startTimer}>
                    <Play className="size-4 mr-2" />
                    시작
                  </Button>
                )}

                {timerRunning && (
                  <Button onClick={pauseTimer}>
                    <Pause className="size-4 mr-2" />
                    일시정지
                  </Button>
                )}

                {!timerRunning && timerRemaining > 0 && (
                  <Button onClick={() => setTimerRunning(true)}>
                    <Play className="size-4 mr-2" />
                    재개
                  </Button>
                )}

                {timerRemaining > 0 && (
                  <Button variant="outline" onClick={resetTimer}>
                    <Square className="size-4 mr-2" />
                    정지
                  </Button>
                )}
              </div>
            </div>
          )}

          {activeTab === "stopwatch" && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold">{formatTime(stopwatchTime)}</div>
              </div>

              <div className="flex gap-2 justify-center">
                {!stopwatchRunning ? (
                  <Button onClick={startStopwatch}>
                    <Play className="size-4 mr-2" />
                    시작
                  </Button>
                ) : (
                  <Button onClick={pauseStopwatch}>
                    <Pause className="size-4 mr-2" />
                    일시정지
                  </Button>
                )}

                <Button variant="outline" onClick={resetStopwatch}>
                  <RotateCcw className="size-4 mr-2" />
                  리셋
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
