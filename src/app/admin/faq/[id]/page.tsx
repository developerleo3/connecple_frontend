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
import { Trash2, Edit, List } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.category) {
            newErrors.category = "카테고리를 선택해주세요."
        }

        if (!formData.question?.trim()) {
            newErrors.question = "질문을 작성해주세요."
        } else if (formData.question.length > 200) {
            newErrors.question = "질문은 200자 이내로 작성해주세요."
        }

        if (!formData.answer?.trim()) {
            newErrors.answer = "답변을 작성해주세요."
        } else if (formData.answer.replace(/<[^>]*>/g, "").length > 5000) {
            newErrors.answer = "답변은 5000자 이내로 작성해주세요."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleUpdate = () => {
        if (!validateForm()) {
            return
        }

        setConfirmModal({
            isOpen: true,
            title: "수정하기",
            message: "FAQ를 수정하시겠습니까?",
            action: "update",
        })
    }

    const handleDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: "삭제하기",
            message: "정말로 이 FAQ를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
            action: "delete",
        })
    }

    const handleConfirmAction = async () => {
        try {
            setLoading(true)

            if (confirmModal.action === "update") {
                await updateFaq(faqId, formData)
                setIsEditing(false)
                fetchFaq()
                router.push("/admin/faq")
            } else if (confirmModal.action === "delete") {
                await deleteFaq(faqId)
                router.push("/admin/faq")
            }
        } catch (error) {
            console.error("Failed to perform action:", error)
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: `FAQ ${confirmModal.action === "update" ? "수정" : "삭제"}에 실패했습니다.`,
                type: "error",
            })
        } finally {
            setLoading(false)
            setConfirmModal({ ...confirmModal, isOpen: false })
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
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 p-6">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">로딩 중...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (!faq) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">FAQ를 찾을 수 없습니다</h1>
                        <Button onClick={() => router.push("/admin/faq")}>목록으로 돌아가기</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">{isEditing ? "FAQ 수정" : "FAQ 상세"}</h1>
                    </div>

                    {!isEditing ? (
                        // View Mode
                        <div className="space-y-6 relative pb-12">
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

                            {/* Buttons at bottom-right */}
                            <div className="absolute bottom-0 right-0 flex gap-2">
                                <Button variant="outline" onClick={() => router.push("/admin/faq")} className="text-gray-600 border-gray-600 hover:bg-gray-50">
                                    <List className="h-4 w-4 mr-2" />
                                    목록으로
                                </Button>
                                <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    삭제하기
                                </Button>
                                <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                                    <Edit className="h-4 w-4 mr-2" />
                                    수정하기
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // Edit Mode
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category">카테고리</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
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

                                <div>
                                    <Label htmlFor="status">상태</Label>
                                    <Select
                                        value={formData.isActive ? "active" : "inactive"}
                                        onValueChange={(value) => setFormData({ ...formData, isActive: value === "active" })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                            <SelectItem value="active">활성</SelectItem>
                                            <SelectItem value="inactive">비활성</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="question">
                                    질문 <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="question"
                                        value={formData.question || ""}
                                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                        maxLength={200}
                                        className={errors.question ? "border-red-500" : ""}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                                        {(formData.question || "").length}/200
                                    </span>
                                </div>
                                {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
                            </div>

                            <div>
                                <Label htmlFor="answer" className="text-sm font-medium text-gray-700">
                                    답변 <span className="text-red-500">*</span>
                                </Label>
                                <div className="mt-1">
                                    <RichTextEditor
                                        content={formData.answer}
                                        onChange={(value) => setFormData({ ...formData, answer: value })}
                                        placeholder="답변을 작성해주세요"
                                    />
                                </div>
                                {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
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
                                <Button onClick={handleUpdate} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                                    {loading ? "수정 중..." : "수정하기"}
                                </Button>
                            </div>
                        </div>
                    )}

                    <ConfirmModal
                        isOpen={confirmModal.isOpen}
                        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                        onConfirm={handleConfirmAction}
                        title={confirmModal.title}
                        message={confirmModal.message}
                        confirmText={confirmModal.action === "delete" ? "삭제하기" : "수정하기"}
                        cancelText="취소하기"
                        isLoading={loading}
                    />

                    <AlertModal
                        isOpen={alertModal.isOpen}
                        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
                        title={alertModal.title}
                        message={alertModal.message}
                        type={alertModal.type}
                    />
                </div>
            </div>
        </div>
    )
}