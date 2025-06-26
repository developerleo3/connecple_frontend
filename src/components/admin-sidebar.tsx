"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AlertModal from "@/components/alert-modal"

interface AdminSidebarProps {
  className?: string
  onNavigate?: (path: string) => Promise<boolean> | boolean // 페이지 이동 전 확인 콜백
}

export default function AdminSidebar({ className, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "error" | "success",
    onConfirm: undefined as (() => void) | undefined,
  })

  const handleNavigation = async (path: string) => {
    if (pathname === path) return // 현재 페이지면 이동하지 않음
    
    if (onNavigate) {
      const canNavigate = await onNavigate(path)
      if (!canNavigate) return
    }
    
    router.push(path)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // 로그아웃 성공 시 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push("/admin")
        }, 1500)
      } else {
        setAlertModal({
          isOpen: true,
          title: "오류",
          message: "로그아웃에 실패했습니다.",
          type: "error",
          onConfirm: undefined,
        })
      }
    } catch (error) {
      console.error("로그아웃 오류:", error)
      setAlertModal({
        isOpen: true,
        title: "오류",
        message: "로그아웃 중 오류가 발생했습니다.",
        type: "error",
        onConfirm: undefined,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const showLogoutConfirm = () => {
    setAlertModal({
      isOpen: true,
      title: "로그아웃",
      message: "정말 로그아웃 하시겠습니까?",
      type: "warning",
      onConfirm: handleLogout,
    })
  }

  return (
    <>
      <div className={cn("pb-12 w-64 bg-white border-r border-gray-200", className)}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Image
            src="/logo_header.svg"
            alt="CONNECPLE 로고"
            width={160}
            height={40}
            className="h-10 w-auto"
            onClick={() => router.push("/admin/home")}
          />
        </div>

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/admin/home")}
                className={cn(
                  "flex items-center px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-100 mb-2 text-gray-600 w-full text-left",
                  pathname === "/admin/home" ? "bg-gray-100" : "transparent"
                )}
              >
                홈 관리
              </button>
              <button
                onClick={() => handleNavigation("/admin/link")}
                className={cn(
                  "flex items-center px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-100 mb-2 text-gray-600 w-full text-left",
                  pathname === "/admin/link" ? "bg-gray-100" : "transparent"
                )}
              >
                메인 링크 관리
              </button>
              <button
                onClick={() => handleNavigation("/admin/history")}
                className={cn(
                  "flex items-center px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-100 mb-2 text-gray-600 w-full text-left",
                  pathname === "/admin/history" ? "bg-gray-100" : "transparent"
                )}
              >
                소개 관리
              </button>
              <button
                onClick={() => handleNavigation("/admin/faq")}
                className={cn(
                  "flex items-center px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-100 mb-2 text-gray-600 w-full text-left",
                  pathname === "/admin/faq" ? "bg-gray-100" : "transparent"
                )}
              >
                FAQ 관리
              </button>
              <button
                onClick={() => handleNavigation("/admin/notice")}
                className={cn(
                  "flex items-center px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-100 mb-2 text-gray-600 w-full text-left",
                  pathname === "/admin/notice" ? "bg-gray-100" : "transparent"
                )}
              >
                공지사항 관리
              </button>
              <button
                onClick={showLogoutConfirm}
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-lg font-medium rounded-lg hover:bg-gray-100 w-full text-left text-red-600 disabled:opacity-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoading ? "로그아웃 중..." : "로그아웃"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        onConfirm={alertModal.onConfirm}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        showCancel={alertModal.type === "warning"}
      />
    </>
  )
}
