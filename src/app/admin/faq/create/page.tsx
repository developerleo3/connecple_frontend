"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import  AdminSidebar  from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FormData {
    category: string
    status: string
    question: string
    answer: string
}

interface FormErrors {
    category?: string
    question?: string
    answer?: string
}

export default function CreateFAQPage() {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        category: "",
        status: "활성",
        question: "",
        answer: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.category) {
            newErrors.category = "카테고리를 선택해주세요"
        }
        if (!formData.question.trim()) {
            newErrors.question = "질문을 작성해주세요"
        }
        if (!formData.answer.trim()) {
            newErrors.answer = "답변을 작성해주세요"
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
            // API 호출
            // const response = await fetch('/api/faqs', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(formData),
            // })

            // if (!response.ok) {
            //   throw new Error('FAQ 생성에 실패했습니다')
            // }

            // Mock API 호출 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            router.push("/faq")
        } catch (error) {
            console.error("FAQ 생성 실패:", error)
            alert("FAQ 생성에 실패했습니다. 다시 시도해주세요.")
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">FAQ 생성</h1>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                        카테고리
                                    </Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                        <SelectTrigger className={`mt-1 ${errors.category ? "border-red-500" : ""}`}>
                                            <SelectValue placeholder="카테고리를 선택하세요" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="위드프로젝트">위드프로젝트</SelectItem>
                                            <SelectItem value="위드카데미">위드카데미</SelectItem>
                                            <SelectItem value="위드뉴스레터">위드뉴스레터</SelectItem>
                                            <SelectItem value="위드GIG">위드GIG</SelectItem>
                                            <SelectItem value="기타">기타</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
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
                                <Label htmlFor="question" className="text-sm font-medium text-gray-700">
                                    FAQ 질문 <span className="text-red-500">*</span>
                                </Label>
                                <div className="mt-1 relative">
                                    <Input
                                        id="question"
                                        placeholder="질문을 작성해주세요"
                                        value={formData.question}
                                        onChange={(e) => handleInputChange("question", e.target.value)}
                                        className={errors.question ? "border-red-500" : ""}
                                        maxLength={200}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                        {formData.question.length}/200
                                    </div>
                                </div>
                                {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
                            </div>

                            <div>
                                <Label htmlFor="answer" className="text-sm font-medium text-gray-700">
                                    FAQ 답변 <span className="text-red-500">*</span>
                                </Label>
                                <div className="mt-1 relative">
                                    <Textarea
                                        id="answer"
                                        placeholder="질문에 대한 답변을 작성해주세요"
                                        value={formData.answer}
                                        onChange={(e) => handleInputChange("answer", e.target.value)}
                                        className={`min-h-[200px] ${errors.answer ? "border-red-500" : ""}`}
                                        maxLength={1000}
                                    />
                                    <div className="absolute right-3 bottom-3 text-xs text-gray-400">{formData.answer.length}/1000</div>
                                </div>
                                {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
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
