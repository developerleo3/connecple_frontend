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
interface Notice {
    id: number
    category: string
    title: string
    content: string
    isActive: boolean
    isDeleted: boolean
    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

interface NoticeUpdateRequest {
    category?: string
    title?: string
    content?: string
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

const getNotice = async (id: number): Promise<ApiResponse<Notice>> => {
    return fetchApi<Notice>(`/admin/notice/${id}`)
}

const updateNotice = async (id: number, data: NoticeUpdateRequest): Promise<ApiResponse<null>> => {
    return fetchApi<null>(`/admin/notice/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    })
}

const deleteNotice = async (id: number): Promise<ApiResponse<null>> => {
    return fetchApi<null>(`/admin/notice/${id}`, {
        method: "DELETE",
    })
}

const CATEGORIES = ["워드프로젝트", "워드커네디어", "워드뉴스리터", "워드GIG", "기타"]

export default function NoticeDetailPage() {
    const router = useRouter()
    const params = useParams()
    const noticeId = Number(params.id)

    const [notice, setNotice] = useState<Notice | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<NoticeUpdateRequest>({})
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
        if (noticeId) {
            fetchNotice()
        }
    }, [noticeId])

    const fetchNotice = async () => {
        try {
            setLoading(true)
            const response = await getNotice(noticeId)

            if (response.data) {
                setNotice(response.data)
                setFormData({
                    category: response.data.category,
                    title: response.data.title,
                    content: response.data.content,
                    isActive: response.data.isActive,
                })
            }
        } catch (error) {
            console.error("Failed to fetch notice:", error)
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: "공지사항을 불러오는데 실패했습니다.",
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

        if (!formData.title?.trim()) {
            newErrors.title = "공지사항 제목을 작성해주세요."
        } else if (formData.title.length > 200) {
            newErrors.title = "제목은 200자 이내로 작성해주세요."
        }

        if (!formData.content?.trim()) {
            newErrors.content = "공지사항 내용을 작성해주세요."
        } else if (formData.content.replace(/<[^>]*>/g, "").length > 5000) {
            newErrors.content = "내용은 5000자 이내로 작성해주세요."
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
            message: "공지사항을 수정하시겠습니까?",
            action: "update",
        })
    }

    const handleDelete = () => {
        setConfirmModal({
            isOpen: true,
            title: "삭제하기",
            message: "정말로 이 공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
            action: "delete",
        })
    }

    const handleConfirmAction = async () => {
        try {
            setLoading(true)

            if (confirmModal.action === "update") {
                await updateNotice(noticeId, formData)

                setAlertModal({
                    isOpen: true,
                    title: "성공",
                    message: "공지사항이 성공적으로 수정되었습니다.",
                    type: "success",
                })
                setIsEditing(false)
                fetchNotice() // 데이터 새로고침

            } else if (confirmModal.action === "delete") {
                await deleteNotice(noticeId)

                setAlertModal({
                    isOpen: true,
                    title: "성공",
                    message: "공지사항이 성공적으로 삭제되었습니다.",
                    type: "success",
                })

                // 삭제 후 목록 페이지로 이동
                setTimeout(() => {
                    router.push("/admin/notice")
                }, 1500)
            }
        } catch (error) {
            console.error("Failed to perform action:", error)
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: `공지사항 ${confirmModal.action === "update" ? "수정" : "삭제"}에 실패했습니다.`,
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

    if (loading && !notice) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">로딩 중...</div>
                </div>
            </div>
        )
    }

    if (!notice) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">공지사항을 찾을 수 없습니다</h1>
                    <Button onClick={() => router.push("/admin/notice")}>목록으로 돌아가기</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">{isEditing ? "공지사항 수정" : "공지사항 상세"}</h1>
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
                            <div className="mt-1 p-2 border rounded-md bg-gray-50">{notice.category}</div>
                        </div>
                        <div>
                            <Label>상태</Label>
                            <div className="mt-1 p-2 border rounded-md bg-gray-50">{notice.isActive ? "활성" : "비활성"}</div>
                        </div>
                    </div>

                    <div>
                        <Label>공지사항 제목</Label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">{notice.title}</div>
                    </div>

                    <div>
                        <Label>공지사항 내용</Label>
                        <div
                            className="mt-1 p-4 border rounded-md bg-gray-50 min-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: notice.content || "" }}
                        />
                    </div>

                    <div>
                        <Label>작성일시</Label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50">{formatDate(notice.createdAt)}</div>
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
                                <SelectContent>
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
                                <SelectContent>
                                    <SelectItem value="active">활성</SelectItem>
                                    <SelectItem value="inactive">비활성</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="title">
                            공지사항 제목 <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="title"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                maxLength={200}
                                className={errors.title ? "border-red-500" : ""}
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                                {(formData.title || "").length}/200
                            </span>
                        </div>
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                            공지사항 내용 <span className="text-red-500">*</span>
                        </Label>
                        <div className="mt-1">
                            <RichTextEditor
                                content={formData.content}
                                onChange={(value) => setFormData({ ...formData, content: value })}
                                placeholder="공지사항 내용을 작성해주세요"
                            />
                        </div>
                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditing(false)
                                setFormData({
                                    category: notice.category,
                                    title: notice.title,
                                    content: notice.content,
                                    isActive: notice.isActive,
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
    )
} 