"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface FAQ {
    id: number
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

export default function FAQDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [faq, setFaq] = useState<FAQ | null>(null)
    const [formData, setFormData] = useState<FAQ>({
        id: 0,
        category: "",
        status: "활성",
        question: "",
        answer: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                // API 호출
                // const response = await fetch(`/api/faqs/${params.id}`)
                // const data = await response.json()
                // setFaq(data)
                // setFormData(data)

                // Mock data
                const mockFAQ: FAQ = {
                    id: Number(params.id),
                    category: "위드프로젝트",
                    status: "활성",
                    question: "위드프로젝트는 누가 참여할 수 있나요?",
                    answer:
                        "이 시대 경력부족(단절)여성을 위한 ICT 융합 분야 커리어 재도약 프로그램인 위드프로젝트는 멋진 재도약을 꿈꾸는 여성이라면 경력이 단절되었거나 취업, 미취업 상태인 분을 모두 신청가능합니다.",
                }

                setTimeout(() => {
                    setFaq(mockFAQ)
                    setFormData(mockFAQ)
                }, 500)
            } catch (error) {
                console.error("FAQ를 불러오는데 실패했습니다:", error)
            }
        }

        fetchFAQ()
    }, [params.id])

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

    const handleUpdate = async () => {
        if (!validateForm()) {
            setShowUpdateModal(false)
            return
        }

        setLoading(true)
        try {
            // API 호출
            // const response = await fetch(`/api/faqs/${params.id}`, {
            //   method: 'PUT',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(formData),
            // })

            // if (!response.ok) {
            //   throw new Error('FAQ 수정에 실패했습니다')
            // }

            // Mock API 호출 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setShowUpdateModal(false)
            router.push("/faq")
        } catch (error) {
            console.error("FAQ 수정 실패:", error)
            alert("FAQ 수정에 실패했습니다. 다시 시도해주세요.")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        setLoading(true)
        try {
            // API 호출
            // const response = await fetch(`/api/faqs/${params.id}`, {
            //   method: 'DELETE',
            // })

            // if (!response.ok) {
            //   throw new Error('FAQ 삭제에 실패했습니다')
            // }

            // Mock API 호출 시뮬레이션
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setShowDeleteModal(false)
            router.push("/faq")
        } catch (error) {
            console.error("FAQ 삭제 실패:", error)
            alert("FAQ 삭제에 실패했습니다. 다시 시도해주세요.")
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field: keyof FAQ, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // 에러 메시지 제거
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    if (!faq) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 p-6 flex items-center justify-center">
                    <div>로딩 중...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">FAQ 상세</h1>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                                        카테고리
                                    </Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                        <SelectTrigger className={`mt-1 ${errors.category ? "border-red-500" : ""}`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="전체">전체</SelectItem>
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
                                        value={formData.question}
                                        onChange={(e) => handleInputChange("question", e.target.value)}
                                        className={errors.question ? "border-red-500" : ""}
                                        maxLength={100}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                        {formData.question.length}/100
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
                                        value={formData.answer}
                                        onChange={(e) => handleInputChange("answer", e.target.value)}
                                        className={`min-h-[200px] ${errors.answer ? "border-red-500" : ""}`}
                                        maxLength={1000}
                                    />
                                    <div className="absolute right-3 bottom-3 text-xs text-gray-400">{formData.answer.length}/1000</div>
                                </div>
                                {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteModal(true)}
                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                >
                                    삭제하기
                                </Button>
                                <Button onClick={() => setShowUpdateModal(true)} className="bg-purple-600 hover:bg-purple-700">
                                    수정하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 수정 확인 모달 */}
            <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-lg font-medium">수정하기</DialogTitle>
                        <DialogDescription className="text-center text-gray-600">
                            작성하신 내용으로 FAQ를 수정하시겠습니까?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 sm:justify-center">
                        <Button
                            variant="outline"
                            onClick={() => setShowUpdateModal(false)}
                            className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                        >
                            취소하기
                        </Button>
                        <Button onClick={handleUpdate} disabled={loading} className="flex-1 bg-purple-600 hover:bg-purple-700">
                            {loading ? "수정 중..." : "수정하기"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 삭제 확인 모달 */}
            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-lg font-medium">삭제하기</DialogTitle>
                        <DialogDescription className="text-center text-gray-600">이 FAQ를 삭제하시겠습니까?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 sm:justify-center">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        >
                            취소하기
                        </Button>
                        <Button onClick={handleDelete} disabled={loading} className="flex-1 bg-red-500 hover:bg-red-600">
                            {loading ? "삭제 중..." : "삭제하기"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
