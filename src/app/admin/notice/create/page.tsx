"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"

interface FormData {
  category: string
  status: string
  title: string
  content: string
}

interface FormErrors {
  category?: string
  title?: string
  content?: string
}

export default function CreateNoticePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    category: "",
    status: "활성",
    title: "",
    content: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요"
    }
    if (!formData.title.trim()) {
      newErrors.title = "제목을 작성해주세요"
    }
    if (!formData.content.trim()) {
      newErrors.content = "내용을 작성해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/notice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          category: formData.category,
          title: formData.title,
          content: formData.content,
          isActive: formData.status === "활성",
        }),
      })

      if (!response.ok) {
        throw new Error("공지사항 생성에 실패했습니다")
      }

      router.push("/admin/notice")
    } catch (error) {
      console.error("공지사항 생성 실패:", error)
      alert("공지사항 생성에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 에러 메시지 제거
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">공지사항 생성</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    카테고리
                  </Label>
                  <div className="relative">
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={`mt-1 ${errors.category ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                        <SelectItem value="워드프로젝트">워드프로젝트</SelectItem>
                        <SelectItem value="워드커네디어">워드커네디어</SelectItem>
                        <SelectItem value="워드뉴스리터">워드뉴스리터</SelectItem>
                        <SelectItem value="워드GIG">워드GIG</SelectItem>
                        <SelectItem value="기타">기타</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                    상태
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="활성">활성</SelectItem>
                      <SelectItem value="비활성">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  공지사항 제목 <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="title"
                    placeholder="제목을 작성해주세요"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                    maxLength={200}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {formData.title.length}/200
                  </div>
                </div>
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                  공지사항 내용 <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange("content", value)}
                    placeholder="공지사항 내용을 작성해주세요"
                    maxLength={5000}
                    className={errors.content ? "border-red-500" : ""}
                  />
                </div>
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8" disabled={loading}>
                  {loading ? "생성 중..." : "생성하기"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
