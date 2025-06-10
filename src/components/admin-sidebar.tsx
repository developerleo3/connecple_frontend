"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

const menuItems = [
  { href: "/admin/home", label: "홈 관리" },
  { href: "/admin/main-links", label: "메인 링크 관리" },
  { href: "/admin/intro", label: "소개 관리" },
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
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold">
            <span className="text-purple-600">CO</span>
            <span className="text-gray-400">NN</span>
            <span className="text-purple-600">ECPLE</span>
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-6 py-3 text-lg hover:bg-gray-100 ${
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
