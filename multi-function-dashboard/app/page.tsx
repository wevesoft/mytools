import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "다기능 도구 - 연봉계산기, 글자수세기, 단위변환기 등 16가지 무료 도구",
  description:
    "연봉계산기, 글자수세기, 단위변환기, BMI계산기, QR코드생성기, 비밀번호생성기 등 일상에서 유용한 16가지 도구를 한 곳에서 무료로 이용하세요. 별도 설치 없이 웹브라우저에서 바로 사용 가능합니다.",
  keywords:
    "연봉계산기, 글자수세기, 단위변환기, BMI계산기, QR코드생성기, 비밀번호생성기, 진법변환기, 날짜계산기, 할일목록, 가계부, 온라인도구, 무료도구",
  openGraph: {
    title: "다기능 도구 - 16가지 유용한 온라인 도구",
    description: "연봉계산기부터 QR코드생성기까지, 일상에서 필요한 모든 도구를 한 곳에서!",
    type: "website",
    url: "https://multi-tools.vercel.app",
  },
}

export default function Dashboard() {
  return <ClientPage />
}
