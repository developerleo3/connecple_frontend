import Link from "next/link"
import { LogOut } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-[200px] min-h-screen bg-gray-50 flex flex-col">
      <div className="p-6">
        <Link href="/admin/home">
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-purple-700">CO</span>
              <span className="text-purple-300">NN</span>
              <span className="text-purple-700">ECPLE</span>
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col">
        <Link href="/admin/home" className="py-4 px-6 hover:bg-gray-100">
          <span className="text-lg">홈 관리</span>
        </Link>
        <Link href="/admin/main-links" className="py-4 px-6 hover:bg-gray-100">
          <span className="text-lg">메인 링크 관리</span>
        </Link>
        <Link href="/admin/intro" className="py-4 px-6 hover:bg-gray-100">
          <span className="text-lg">소개 관리</span>
        </Link>
        <Link href="/admin/faq" className="py-4 px-6 hover:bg-gray-100">
          <span className="text-lg">FAQ 관리</span>
        </Link>
        <Link href="/admin/notice" className="py-4 px-6 hover:bg-gray-100">
          <span className="text-lg">공지사항 관리</span>
        </Link>
      </nav>

      <div className="p-6 mt-auto">
        <Link href="/logout" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md">
          <LogOut size={20} />
          <span>로그아웃</span>
        </Link>
      </div>
    </div>
  )
}
