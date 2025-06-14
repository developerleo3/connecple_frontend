"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ConfirmModal } from "@/components/confirm-modal"
import AlertModal from "@/components/alert-modal"
import { Trash2, Edit } from "lucide-react"

// Types for this page
interface Faq {
    id: number
    category: string
    question: string
    answer: string
    isActive: boolean
    isDeleted: boolean
    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

interface FaqUpdateRequest {
    category?: string
    question?: string
    answer?: string
    isActive?: boolean
}

interface ApiResponse<T> {
    message: string
    data: T
}

// API functions for this page
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message)
        this.name = "ApiError"
    }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    })

    if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    return response.json()
}

const getFaq = async (id: number): Promise<ApiResponse<Faq>> => {
    return fetchApi<Faq>(`/admin/faqs/${id}`)
}

const updateFaq = async (id: number, data: FaqUpdateRequest): Promise<ApiResponse<null>> => {
    return fetchApi<null>(`/admin/faqs/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    })
}

const deleteFaq = async (id: number): Promise<ApiResponse<null>> => {
    return fetchApi<null>(`/admin/faqs/${id}`, {
        method: "DELETE",
    })
}

const CATEGORIES = ["워드프로젝트", "워드커네디어", "워드뉴스리터", "워드GIG", "기타"]

export default function FaqDetailPage() {
    const router = useRouter()
    const params = useParams()
    const faqId = Number(params.id)

    const [faq, setFaq] = useState<Faq | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<FaqUpdateRequest>({})
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Modal states
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        action: "" as "update" | "delete",
    })

    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "success" as "success" | "error" | "warning",
    })

    useEffect(() => {
        if (faqId) {
            fetchFaq()
        }
    }, [faqId])

    const fetchFaq = async () => {
        try {
            setLoading(true)
            const response = await getFaq(faqId)

            if (response.data) {
                setFaq(response.data)
                setFormData({
                    category: response.data.category,
                    question: response.data.question,
                    answer: response.data.answer,
                    isActive: response.data.isActive,
                })
            }
        } catch (error) {
            console.error("Failed to fetch FAQ:", error)
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: "FAQ를 불러오는데 실패했습니다.",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        // Validate form
        const newErrors: Record<string, string> = {}
        if (!formData.category) {
            newErrors.category = "카테고리를 선택해주세요"
        }
        if (!formData.question?.trim()) {
            newErrors.question = "질문을 작성해주세요"
        }
        if (!formData.answer?.trim()) {
            newErrors.answer = "답변을 작성해주세요"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setConfirmModal({
            isOpen: true,
            title: "FAQ 수정",
            message: "FAQ를 수정하시겠습니까?",
            action: "update",
        })
    }

    const handleDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: "FAQ 삭제",
            message: "FAQ를 삭제하시겠습니까?",
            action: "delete",
        })
    }

    const handleConfirm = async () => {
        if (!faq) return

        try {
            if (confirmModal.action === "update") {
                const response = await updateFaq(faq.id, formData)
                if (response.data === null) {
                    setAlertModal({
                        isOpen: true,
                        title: "성공",
                        message: "FAQ가 수정되었습니다.",
                        type: "success",
                    })
                    setIsEditing(false)
                    fetchFaq()
                }
            } else if (confirmModal.action === "delete") {
                const response = await deleteFaq(faq.id)
                if (response.data === null) {
                    setAlertModal({
                        isOpen: true,
                        title: "성공",
                        message: "FAQ가 삭제되었습니다.",
                        type: "success",
                    })
                    router.push("/admin/faq")
                }
            }
        } catch (error) {
            console.error("Failed to process FAQ:", error)
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: confirmModal.action === "update" ? "FAQ 수정에 실패했습니다." : "FAQ 삭제에 실패했습니다.",
                type: "error",
            })
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading && !faq) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">로딩 중...</div>
                </div>
            </div>
        )
    }

    if (!faq) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">FAQ를 찾을 수 없습니다</h1>
                    <Button onClick={() => router.push("/admin/faq")}>목록으로 돌아가기</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">{isEditing ? "FAQ 수정" : "FAQ 상세"}</h1>
                {!isEditing && (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            삭제하기
                        </Button>
                        <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                            <Edit className="h-4 w-4 mr-2" />
                            수정하기
                        </Button>
                    </div>
                )}
            </div>

            {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>카테고리</Label>
                            <div className="mt-1 p-2 border rounded-md bg-gray-50">{faq.category}</div>
                        </div>
                        <div>
                            <Label>상태</Label>
                            <div className="mt-1 p-2 border rounded-md bg-gray-50">{faq.isActive ? "활성" : "비활성"}</div>
                        </div>
                    </div>

                    <div>
                        <Label>질문</Label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">{faq.question}</div>
                    </div>

                    <div>
                        <Label>답변</Label>
                        <div
                            className="mt-1 p-4 border rounded-md bg-gray-50 min-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: faq.answer || "" }}
                        />
                    </div>

                    <div>
                        <Label>작성일시</Label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">{formatDate(faq.createdAt)}</div>
                    </div>
                </div>
            ) : (
                // Edit Mode
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="category">
                                카테고리 <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                >
                                    <SelectTrigger className={`mt-1 ${errors.category ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="카테고리를 선택하세요" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                        {CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="status">상태</Label>
                            <div className="relative">
                                <Select
                                    value={formData.isActive ? "활성" : "비활성"}
                                    onValueChange={(value) => setFormData({ ...formData, isActive: value === "활성" })}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                        <SelectItem value="활성">활성</SelectItem>
                                        <SelectItem value="비활성">비활성</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="question">
                            질문 <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="question"
                            value={formData.question || ""}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            className={`mt-1 ${errors.question ? "border-red-500" : ""}`}
                            maxLength={200}
                        />
                        {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
                    </div>

                    <div>
                        <Label htmlFor="answer">
                            답변 <span className="text-red-500">*</span>
                        </Label>
                        <RichTextEditor
                            content={formData.answer || ""}
                            onChange={(value) => setFormData({ ...formData, answer: value })}
                            placeholder="답변을 작성해주세요"
                        />
                        {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditing(false)
                                setFormData({
                                    category: faq.category,
                                    question: faq.question,
                                    answer: faq.answer,
                                    isActive: faq.isActive,
                                })
                                setErrors({})
                            }}
                        >
                            취소
                        </Button>
                        <Button onClick={handleUpdate} className="bg-purple-600 hover:bg-purple-700">
                            수정하기
                        </Button>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                onConfirm={handleConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
            />

            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />
        </div>
    )
} 