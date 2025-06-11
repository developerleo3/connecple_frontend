import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "메인 링크 관리 - CONNECPLE Admin",
    description: "CONNECPLE 관리자 페이지 - 메인 링크 관리",
}

export default function AdminLinkLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
