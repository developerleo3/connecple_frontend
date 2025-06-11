"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: username,
          password: password,
        }),
      })

      const data = await response.text()

      if (data === "success") {
        // 로그인 성공 시 처리
        router.push("/admin/home")
      } else if (data === "fail") {
        setError("아이디 혹은 비밀번호가 일치하지 않습니다.")
      } else {
        setError("알 수 없는 오류가 발생했습니다.")
      }

    } catch (err) {
      setError("서버 연결이 원활하지 않습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-4">
        {/* 헤더 영역 */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-2">
            <img alt="CONNECPLE 로고" className="h-10 w-auto mr-4" src="/logo_header.svg"/>
          </div>
          <h1 className="text-lg font-medium text-gray-700">관리자 페이지</h1>
        </div>

        {/* 로그인 폼 */}
        <div className="w-full border border-gray-200 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 아이디 입력 필드 */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-black">
                아이디
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력해주세요."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                disabled={isLoading}
              />
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                isLoading || (username && password)
                  ? "bg-purple-700 hover:bg-purple-800 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
              disabled={isLoading || !username || !password}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
