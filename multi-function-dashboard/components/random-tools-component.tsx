"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dice6, RefreshCw, Star } from "lucide-react"

export function RandomToolsComponent() {
  const [activeTab, setActiveTab] = useState<"lottery" | "quote" | "game">("lottery")

  // Lottery states
  const [lotteryItems, setLotteryItems] = useState("")
  const [lotteryResult, setLotteryResult] = useState("")

  // Quote states
  const [currentQuote, setCurrentQuote] = useState("")

  // Game states
  const [targetNumber, setTargetNumber] = useState(0)
  const [playerGuess, setPlayerGuess] = useState("")
  const [gameResult, setGameResult] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const quotes = [
    "성공은 준비와 기회가 만났을 때 일어난다. - 세네카",
    "꿈을 꾸는 것은 계획의 시작이다. - 익명",
    "오늘 할 수 있는 일을 내일로 미루지 마라. - 벤자민 프랭클린",
    "실패는 성공의 어머니다. - 토마스 에디슨",
    "노력 없이는 아무것도 얻을 수 없다. - 소포클레스",
    "지금이 바로 시작할 때다. - 월트 디즈니",
    "변화를 원한다면 행동하라. - 간디",
    "작은 발걸음도 앞으로 나아가는 것이다. - 익명",
    "할 수 있다고 믿으면 이미 반은 성공한 것이다. - 시어도어 루즈벨트",
    "최고의 복수는 성공이다. - 프랭크 시나트라",
  ]

  const runLottery = () => {
    const items = lotteryItems.split("\n").filter((item) => item.trim() !== "")
    if (items.length === 0) return

    const randomIndex = Math.floor(Math.random() * items.length)
    setLotteryResult(items[randomIndex].trim())
  }

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
  }

  const startGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGameStarted(true)
    setAttempts(0)
    setGameResult("")
    setPlayerGuess("")
  }

  const makeGuess = () => {
    if (!playerGuess) return

    const guess = Number.parseInt(playerGuess)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (guess === targetNumber) {
      setGameResult(`정답입니다! ${newAttempts}번 만에 맞히셨네요! 🎉`)
      setGameStarted(false)
    } else if (guess < targetNumber) {
      setGameResult("더 큰 수를 입력해보세요! ⬆️")
    } else {
      setGameResult("더 작은 수를 입력해보세요! ⬇️")
    }

    setPlayerGuess("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dice6 className="size-5" />
            랜덤 도구
          </CardTitle>
          <CardDescription>추첨, 명언 생성기, 숫자 맞추기 게임을 즐겨보세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant={activeTab === "lottery" ? "default" : "outline"} onClick={() => setActiveTab("lottery")}>
              랜덤 추첨
            </Button>
            <Button variant={activeTab === "quote" ? "default" : "outline"} onClick={() => setActiveTab("quote")}>
              명언 생성기
            </Button>
            <Button variant={activeTab === "game" ? "default" : "outline"} onClick={() => setActiveTab("game")}>
              숫자 맞추기
            </Button>
          </div>

          {activeTab === "lottery" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>추첨 항목 (한 줄에 하나씩)</Label>
                <Textarea
                  placeholder="추첨할 항목들을 입력하세요&#10;예:&#10;김철수&#10;이영희&#10;박민수"
                  value={lotteryItems}
                  onChange={(e) => setLotteryItems(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button onClick={runLottery} disabled={!lotteryItems.trim()} className="w-full flex items-center gap-2">
                <Dice6 className="size-4" />
                추첨 실행
              </Button>

              {lotteryResult && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">🎉 당첨 결과 🎉</div>
                      <div className="text-xl bg-yellow-100 text-yellow-800 p-4 rounded-lg font-semibold">
                        {lotteryResult}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "quote" && (
            <div className="space-y-4">
              <Button onClick={generateQuote} className="w-full flex items-center gap-2">
                <Star className="size-4" />
                새로운 명언 생성
              </Button>

              {currentQuote && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="text-4xl">💡</div>
                      <blockquote className="text-lg italic border-l-4 border-blue-500 pl-4">{currentQuote}</blockquote>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!currentQuote && (
                <div className="text-center py-8 text-muted-foreground">
                  "새로운 명언 생성" 버튼을 클릭하여 오늘의 명언을 확인해보세요!
                </div>
              )}
            </div>
          )}

          {activeTab === "game" && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">숫자 맞추기 게임</h3>
                <p className="text-muted-foreground">1부터 100 사이의 숫자를 맞춰보세요!</p>
              </div>

              {!gameStarted ? (
                <Button onClick={startGame} className="w-full">
                  게임 시작
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">시도 횟수: {attempts}</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="숫자 입력"
                        value={playerGuess}
                        onChange={(e) => setPlayerGuess(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && makeGuess()}
                      />
                      <Button onClick={makeGuess} disabled={!playerGuess}>
                        추측
                      </Button>
                      <Button variant="outline" onClick={startGame}>
                        <RefreshCw className="size-4" />
                      </Button>
                    </div>
                  </div>

                  {gameResult && (
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-center text-lg">{gameResult}</div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
