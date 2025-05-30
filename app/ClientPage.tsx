"use client"

import { useState } from "react"
import {
  Calculator,
  Type,
  Shuffle,
  Palette,
  QrCode,
  Key,
  Settings,
  ImageIcon,
  Code,
  Binary,
  Activity,
  Calendar,
  CheckSquare,
  DollarSign,
  FileText,
  Clock,
  Dice6,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AdBanner } from "@/components/AdBanner"
import { AdSidebar } from "@/components/AdSidebar"
import { SalaryCalculatorComponent } from "@/components/salary-calculator-component"
import { TextCounterComponent } from "@/components/text-counter-component"
import { UnitConverterComponent } from "@/components/unit-converter-component"
import { ColorPaletteComponent } from "@/components/color-palette-component"
import { QrGeneratorComponent } from "@/components/qr-generator-component"
import { PasswordGeneratorComponent } from "@/components/password-generator-component"
import { SettingsComponent } from "@/components/settings-component"
import { ImageConverterComponent } from "@/components/image-converter-component"
import { StringEncoderComponent } from "@/components/string-encoder-component"
import { NumberConverterComponent } from "@/components/number-converter-component"
import { BmiCalculatorComponent } from "@/components/bmi-calculator-component"
import { DateCalculatorComponent } from "@/components/date-calculator-component"
import { TodoListComponent } from "@/components/todo-list-component"
import { ExpenseTrackerComponent } from "@/components/expense-tracker-component"
import { TextToolsComponent } from "@/components/text-tools-component"
import { TimerToolsComponent } from "@/components/timer-tools-component"
import { RandomToolsComponent } from "@/components/random-tools-component"

// 기능 목록 데이터 - 쉽게 추가/수정 가능
const features = [
  {
    id: "salary-calculator",
    title: "연봉계산기",
    icon: Calculator,
    description: "연봉, 월급, 세후소득 계산",
  },
  {
    id: "text-counter",
    title: "글자수 세기",
    icon: Type,
    description: "텍스트 글자수, 단어수 계산",
  },
  {
    id: "unit-converter",
    title: "단위 변환기",
    icon: Shuffle,
    description: "길이, 무게, 온도 등 변환",
  },
  {
    id: "color-palette",
    title: "색상 도구",
    icon: Palette,
    description: "색상 코드 변환 및 팔레트",
  },
  {
    id: "qr-generator",
    title: "QR코드 생성",
    icon: QrCode,
    description: "텍스트를 QR코드로 변환",
  },
  {
    id: "image-converter",
    title: "이미지 확장자 변경",
    icon: ImageIcon,
    description: "이미지 형식 변환 및 압축",
  },
  {
    id: "password-generator",
    title: "비밀번호 생성",
    icon: Key,
    description: "안전한 비밀번호 생성",
  },
  {
    id: "string-encoder",
    title: "문자열 인코딩",
    icon: Code,
    description: "Base64, URI, HTML 인코딩",
  },
  {
    id: "number-converter",
    title: "진법 변환기",
    icon: Binary,
    description: "2진수, 8진수, 16진수 변환",
  },
  {
    id: "bmi-calculator",
    title: "BMI 계산기",
    icon: Activity,
    description: "체질량지수 및 건강 상태",
  },
  {
    id: "date-calculator",
    title: "날짜 계산기",
    icon: Calendar,
    description: "D-day, 날짜 차이, 만 나이",
  },
  {
    id: "todo-list",
    title: "할 일 목록",
    icon: CheckSquare,
    description: "Todo List 및 메모장",
  },
  {
    id: "expense-tracker",
    title: "지출 추적기",
    icon: DollarSign,
    description: "가계부 및 비용 관리",
  },
  {
    id: "text-tools",
    title: "텍스트 도구",
    icon: FileText,
    description: "텍스트 정렬, 변환, 비교",
  },
  {
    id: "timer-tools",
    title: "시간 도구",
    icon: Clock,
    description: "타이머, 스톱워치, 시계",
  },
  {
    id: "random-tools",
    title: "랜덤 도구",
    icon: Dice6,
    description: "추첨, 명언, 게임",
  },
  {
    id: "settings",
    title: "설정",
    icon: Settings,
    description: "애플리케이션 설정",
  },
]

export default function Dashboard() {
  const [activeFeature, setActiveFeature] = useState("salary-calculator")

  // 현재 활성화된 기능의 컴포넌트 렌더링
  const renderActiveComponent = () => {
    switch (activeFeature) {
      case "salary-calculator":
        return <SalaryCalculatorComponent />
      case "text-counter":
        return <TextCounterComponent />
      case "unit-converter":
        return <UnitConverterComponent />
      case "color-palette":
        return <ColorPaletteComponent />
      case "qr-generator":
        return <QrGeneratorComponent />
      case "image-converter":
        return <ImageConverterComponent />
      case "password-generator":
        return <PasswordGeneratorComponent />
      case "string-encoder":
        return <StringEncoderComponent />
      case "number-converter":
        return <NumberConverterComponent />
      case "bmi-calculator":
        return <BmiCalculatorComponent />
      case "date-calculator":
        return <DateCalculatorComponent />
      case "todo-list":
        return <TodoListComponent />
      case "expense-tracker":
        return <ExpenseTrackerComponent />
      case "text-tools":
        return <TextToolsComponent />
      case "timer-tools":
        return <TimerToolsComponent />
      case "random-tools":
        return <RandomToolsComponent />
      case "settings":
        return <SettingsComponent />
      default:
        return <SalaryCalculatorComponent />
    }
  }

  const activeFeatureData = features.find((f) => f.id === activeFeature)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "다기능 도구",
            description: "연봉계산기, 글자수세기, 단위변환기 등 16가지 유용한 온라인 도구",
            url: "https://multi-tools.vercel.app",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KRW",
            },
            featureList: [
              "연봉계산기",
              "글자수세기",
              "단위변환기",
              "BMI계산기",
              "QR코드생성기",
              "비밀번호생성기",
              "진법변환기",
              "날짜계산기",
              "할일목록",
              "지출추적기",
              "텍스트도구",
              "시간도구",
              "랜덤도구",
              "이미지변환기",
              "색상도구",
              "문자열인코딩",
            ],
          }),
        }}
      />

      {/* 상단 배너 광고 */}
      <AdBanner dataAdSlot="1234567890" className="w-full mb-4" />

      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calculator className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">다기능 도구</span>
                <span className="text-xs text-muted-foreground">v1.0.0</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>기능 목록</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <SidebarMenuItem key={feature.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveFeature(feature.id)}
                          isActive={activeFeature === feature.id}
                          className="w-full"
                        >
                          <Icon className="size-4" />
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{feature.title}</span>
                            <span className="text-xs text-muted-foreground">{feature.description}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 사이드바 광고 */}
            <div className="mt-4 px-4">
              <AdSidebar dataAdSlot="0987654321" className="w-full" />
            </div>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              {activeFeatureData && (
                <>
                  <activeFeatureData.icon className="size-4" />
                  <h1 className="font-semibold">{activeFeatureData.title}</h1>
                </>
              )}
            </div>
          </header>

          <main className="flex-1 p-4">
            <div className="max-w-6xl mx-auto">
              {renderActiveComponent()}

              {/* 하단 광고 */}
              <AdBanner dataAdSlot="1122334455" className="w-full mt-8" />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
