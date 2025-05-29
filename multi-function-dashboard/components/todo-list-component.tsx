"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckSquare, Plus, Trash2, Edit } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: Date
}

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export function TodoListComponent() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [newTodoPriority, setNewTodoPriority] = useState<"low" | "medium" | "high">("medium")
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"todos" | "notes">("todos")

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    const savedNotes = localStorage.getItem("notes")

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // 데이터 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addTodo = () => {
    if (!newTodo.trim()) return

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      priority: newTodoPriority,
      createdAt: new Date(),
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setNotes([...notes, note])
    setNewNoteTitle("")
    setNewNoteContent("")
  }

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content, updatedAt: new Date() } : note)))
    setEditingNote(null)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const completedTodos = todos.filter((todo) => todo.completed).length
  const totalTodos = todos.length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="size-5" />할 일 목록 & 메모장
          </CardTitle>
          <CardDescription>할 일을 관리하고 메모를 작성하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant={activeTab === "todos" ? "default" : "outline"} onClick={() => setActiveTab("todos")}>
              할 일 목록 ({totalTodos})
            </Button>
            <Button variant={activeTab === "notes" ? "default" : "outline"} onClick={() => setActiveTab("notes")}>
              메모장 ({notes.length})
            </Button>
          </div>

          {activeTab === "todos" && (
            <div className="space-y-4">
              {totalTodos > 0 && (
                <div className="text-sm text-muted-foreground">
                  진행률: {completedTodos}/{totalTodos} ({Math.round((completedTodos / totalTodos) * 100)}%)
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="새 할 일을 입력하세요"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTodo()}
                  className="flex-1"
                />
                <Select
                  value={newTodoPriority}
                  onValueChange={(value: "low" | "medium" | "high") => setNewTodoPriority(value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">높음</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="low">낮음</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={addTodo}>
                  <Plus className="size-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 border-l-4 rounded ${getPriorityColor(todo.priority)} ${
                      todo.completed ? "bg-muted/50" : "bg-background"
                    }`}
                  >
                    <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                    <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                      {todo.text}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {todo.priority === "high" ? "높음" : todo.priority === "medium" ? "보통" : "낮음"}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => deleteTodo(todo.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}

                {todos.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    아직 할 일이 없습니다. 새로운 할 일을 추가해보세요!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="메모 제목" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
                <Textarea
                  placeholder="메모 내용을 입력하세요"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={addNote} className="w-full">
                  <Plus className="size-4 mr-2" />
                  메모 추가
                </Button>
              </div>

              <div className="space-y-3">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="pt-4">
                      {editingNote === note.id ? (
                        <div className="space-y-2">
                          <Input
                            defaultValue={note.title}
                            onBlur={(e) => updateNote(note.id, e.target.value, note.content)}
                          />
                          <Textarea
                            defaultValue={note.content}
                            onBlur={(e) => updateNote(note.id, note.title, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{note.title}</h4>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => setEditingNote(note.id)}>
                                <Edit className="size-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => deleteNote(note.id)}>
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                          <div className="text-xs text-muted-foreground">
                            작성: {new Date(note.createdAt).toLocaleString("ko-KR")}
                            {note.updatedAt !== note.createdAt && (
                              <span> • 수정: {new Date(note.updatedAt).toLocaleString("ko-KR")}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {notes.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    아직 메모가 없습니다. 새로운 메모를 작성해보세요!
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
