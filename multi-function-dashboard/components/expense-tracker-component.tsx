"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

export function ExpenseTrackerComponent() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  const expenseCategories = ["식비", "교통비", "쇼핑", "의료", "교육", "오락", "기타"]
  const incomeCategories = ["급여", "부업", "투자", "기타"]

  useEffect(() => {
    const saved = localStorage.getItem("transactions")
    if (saved) {
      setTransactions(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = () => {
    if (!amount || !category || !description) return

    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: Number.parseFloat(amount),
      category,
      description,
      date,
    }

    setTransactions([transaction, ...transactions])
    setAmount("")
    setCategory("")
    setDescription("")
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount) + "원"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="size-5" />
            지출 추적기
          </CardTitle>
          <CardDescription>수입과 지출을 기록하고 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-green-600" />
                  <div>
                    <div className="text-sm text-muted-foreground">총 수입</div>
                    <div className="text-lg font-semibold text-green-600">{formatCurrency(totalIncome)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="size-4 text-red-600" />
                  <div>
                    <div className="text-sm text-muted-foreground">총 지출</div>
                    <div className="text-lg font-semibold text-red-600">{formatCurrency(totalExpense)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div>
                  <div className="text-sm text-muted-foreground">잔액</div>
                  <div className={`text-lg font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatCurrency(balance)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>유형</Label>
              <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">수입</SelectItem>
                  <SelectItem value="expense">지출</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>금액</Label>
              <Input type="number" placeholder="금액 입력" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {(type === "income" ? incomeCategories : expenseCategories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>날짜</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>설명</Label>
            <Input placeholder="내용 설명" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <Button onClick={addTransaction} disabled={!amount || !category || !description} className="w-full">
            <Plus className="size-4 mr-2" />
            거래 추가
          </Button>

          <div className="space-y-2">
            <Label>최근 거래 내역</Label>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type === "income" ? "수입" : "지출"}
                      </span>
                      <span className="font-medium">{transaction.category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">{transaction.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => deleteTransaction(transaction.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {transactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  아직 거래 내역이 없습니다. 첫 번째 거래를 추가해보세요!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
