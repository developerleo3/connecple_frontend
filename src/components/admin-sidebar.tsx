"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

const menuItems = [
  { href: "/admin/home", label: "홈 관리" },
  { href: "/admin/link", label: "메인 링크 관리" },
  { href: "/admin/history", label: "소개 관리" },
  { href: "/admin/faq", label: "FAQ 관리" },
  { href: "/admin/notice", label: "공지사항 관리" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-[200px] min-h-screen bg-gray-50 border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-xl font-bold">
            <img alt="CONNECPLE 로고" className="h-10 w-40" src="/logo_header.svg"/>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-6 py-3 text-lg hover:bg-gray-100${
              pathname === item.href ? "bg-gray-100 font-medium" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-200">
        <Link href="/logout" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <LogOut size={20} />
          <span>로그아웃</span>
        </Link>
      </div>
    </div>
  )
}
