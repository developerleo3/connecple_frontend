"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ConfirmModal } from "@/components/confirm-modal"
import AlertModal from "@/components/alert-modal"
import { Trash2, Edit, List, Download, Upload } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"
import LoadingSpinner from "@/components/loading-spinner"

// Types for this page
interface FileAttachment {
    id: number
    originalFileName: string
    storedFileName: string
    filePath: string
    fileSize: number
    fileType: string
    file?: File // 새 파일을 위한 File 객체 추가
}

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
    files: FileAttachment[]
}

interface NoticeUpdateRequest {
    category?: string
    title?: string
    content?: string
    isActive?: boolean
    files?: string[] // 파일 이름 배열 추가
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

const updateNotice = async (id: number, data: FormData): Promise<ApiResponse<null>> => {
    return fetchApi<null>(`/admin/notice/${id}`, {
        method: "PATCH",
        body: data,
    })
}

const deleteNotice = async (id: number): Promise<ApiResponse<null>> => {
    return fetchApi<null>(`/admin/notice/${id}`, {
        method: "DELETE",
    })
}

const CATEGORIES = ["워드프로젝트", "워드커네이어", "워드뉴스리터", "워드GIG", "기타"]

// 함수 추가
const formatContentForView = (content: string) => {
    return content.replace(/<p><\/p>/g, '<p><br/></p>');
}

export default function NoticeDetailPage() {
    const router = useRouter()
    const params = useParams()
    const noticeId = Number(params.id)
    const inputRef = useRef<HTMLInputElement>(null)

    const [notice, setNotice] = useState<Notice | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<NoticeUpdateRequest>({
        category: "",
        title: "",
        content: "",
        isActive: true,
        files: [],
    })
    const [filePreviews, setFilePreviews] = useState<FileAttachment[]>([])
    const [deletedFileIds, setDeletedFileIds] = useState<number[]>([]) // 삭제된 파일 ID 저장
    const [errors, setErrors] = useState<Record<string, string>>({})

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

    // 페이지 이동 확인 모달 상태
    const [confirmLeaveModal, setConfirmLeaveModal] = useState({
        isOpen: false,
        title: "페이지 이동 확인",
        message: (
            <>
            <span style={{ color: 'red' }}>수정중인 공지사항이 사라집니다.</span><br />
            <span style={{ color: 'red' }}>정말로 페이지를 이동하시겠습니까?</span>
            </>
        ),
    })

    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)

    useEffect(() => {
        if (noticeId) {
            fetchNotice()
        }
    }, [noticeId])

    // 페이지 이동 감지 및 확인
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isEditing && !isSubmitting) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        // 브라우저 새로고침/닫기 감지
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isEditing, isSubmitting])

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
                    files: response.data.files.map(file => file.originalFileName),
                })
                setFilePreviews(response.data.files)
                setDeletedFileIds([]) // 공지사항 로드 시 삭제된 파일 ID 초기화
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
            message: (
                <>
                    <span style={{ color: 'red' }}>정말로 이 공지사항을 삭제하시겠습니까?</span><br />
                    <span style={{ color: 'red' }}>이 작업은 되돌릴 수 없습니다.</span>
                </>
            ),
            action: "delete",
        })
    }

    const handleConfirmAction = async () => {
        try {
            setLoading(true)
            setIsSubmitting(true)

            if (confirmModal.action === "update") {
                const formDataToSend = new FormData()
                formDataToSend.append("category", formData.category || "")
                formDataToSend.append("title", formData.title || "")
                formDataToSend.append("content", formData.content || "")
                formDataToSend.append("isActive", String(formData.isActive || false))

                // 기존 파일 중 삭제되지 않은 파일만 포함
                if (notice?.files) {
                    notice.files.forEach((file) => {
                        if (!deletedFileIds.includes(file.id) && filePreviews.some(f => f.id === file.id)) {
                            formDataToSend.append("files", file.originalFileName)
                        }
                    })
                }

                // 새로 추가된 파일 (File 객체 전송)
                filePreviews.forEach((fileObj) => {
                    if (fileObj.file && !notice?.files.find(f => f.id === fileObj.id)) {
                        formDataToSend.append("files", fileObj.file)
                    }
                })

                // 삭제된 파일 ID 전송
                const uniqueDeletedFileIds = [...new Set(deletedFileIds)]
                if (uniqueDeletedFileIds.length > 0) {
                    console.log("Sending deleted file IDs:", uniqueDeletedFileIds)
                    uniqueDeletedFileIds.forEach((id) => {
                        formDataToSend.append("deleteFileIds", String(id))
                    })
                }

                await updateNotice(noticeId, formDataToSend)
                setIsEditing(false)
                fetchNotice()
                router.push("/admin/notice")
            } else if (confirmModal.action === "delete") {
                await deleteNotice(noticeId)
                router.push("/admin/notice")
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
            setIsSubmitting(false)
            setConfirmModal({ ...confirmModal, isOpen: false })
        }
    }

    const handleNavigationRequest = (path: string): boolean => {
        if (isEditing && !isSubmitting) {
            setPendingNavigation(path)
            setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: true })
            return false // 일단 이동을 막음
        }
        return true
    }

    const handleConfirmNavigation = () => {
        setIsSubmitting(true)
        setIsEditing(false)
        setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: false })
        if (pendingNavigation) {
            router.push(pendingNavigation)
        }
        setPendingNavigation(null)
    }

    const handleCancelEdit = () => {
        if (isEditing) {
            setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: true })
        } else {
            router.push("/admin/notice")
        }
    }

    const handleDownload = (file: FileAttachment) => {
        const link = document.createElement('a')
        link.href = `${file.filePath}`
        link.download = encodeURIComponent(file.originalFileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map(file => ({
                id: Date.now() + Math.random(),
                originalFileName: file.name,
                storedFileName: file.name,
                filePath: URL.createObjectURL(file),
                fileSize: file.size,
                fileType: file.type,
                file: file,
            }))
            setFilePreviews(prev => [...prev, ...newFiles])
            setFormData(prev => ({
                ...prev,
                files: [...(prev.files || []), ...newFiles.map(f => f.originalFileName)],
            }))
        }
    }

    const removeFile = (id: number) => {
        const fileToRemove = filePreviews.find(file => file.id === id)
        if (fileToRemove && fileToRemove.id !== undefined) {
            setFilePreviews(prev => prev.filter(file => file.id !== id))
            setFormData(prev => ({
                ...prev,
                files: prev.files?.filter(fileName => fileName !== fileToRemove.originalFileName) || [],
            }))
            if (notice?.files.some(file => file.id === id)) {
                setDeletedFileIds(prev => [...new Set([...prev, id])])
            }
            console.log("Removed file ID:", id, "Deleted IDs:", [...new Set([...deletedFileIds, id])])
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

    if (!notice) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">공지사항을 찾을 수 없습니다</h1>
                        <Button onClick={() => router.push("/admin/notice")}>목록으로 돌아가기</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar onNavigate={handleNavigationRequest} />
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-2">{isEditing ? "공지사항 수정" : "공지사항 상세"}</h1>
                    </div>
                    <p className="text-gray-600 mb-8">{isEditing ? "공지사항 수정 페이지 입니다." : "공지사항 상세 페이지 입니다."}</p>

                    {!isEditing ? (
                        <div className="p-6 space-y-10 relative pb-12 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-600 mb-2">카테고리</Label>
                                    <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">{notice.category}</div>
                                </div>
                                <div>
                                    <Label className="text-gray-600 mb-2">상태</Label>
                                    <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">{notice.isActive ? "활성" : "비활성"}</div>
                                </div>
                            </div>

                            <div>
                                <Label className="text-gray-600 mb-2">공지사항 제목</Label>
                                <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">{notice.title}</div>
                            </div>

                            <div>
                                <Label className="text-gray-600 mb-2">공지사항 내용</Label>
                                <div
                                    className="mt-1 p-4 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[300px] max-h-[300px]"
                                    style={{ maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap' }} // 스크롤 및 빈 줄 표시
                                    dangerouslySetInnerHTML={{ __html: formatContentForView(notice.content || "") }}
                                />
                            </div>

                            {notice.files && notice.files.length > 0 && (
                                <div>
                                    <Label className="text-gray-600 mb-2">첨부 파일</Label>
                                    <ul className="space-y-2">
                                        {notice.files.map((file) => (
                                            <li key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                <span className="text-sm text-gray-600 truncate max-w-[500px]" title={file.originalFileName}>{file.originalFileName}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDownload(file)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <Label className="text-gray-600 mb-2">작성일시</Label>
                                <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">{formatDate(notice.createdAt)}</div>
                            </div>

                            <div className="absolute bottom-6 right-6 flex gap-2">
                                <Button variant="outline" onClick={() => router.push("/admin/notice")} className="text-gray-600 border-gray-600 hover:bg-gray-50 hover:cursor-pointer">
                                    <List className="h-4 w-4 mr-1" />
                                    목록으로
                                </Button>
                                <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-600 hover:bg-red-50 hover:cursor-pointer">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    삭제하기
                                </Button>
                                <Button onClick={() => setIsEditing(true)} className="text-white bg-purple-600 hover:bg-purple-700 hover:cursor-pointer">
                                    <Edit className="h-4 w-4 mr-1" />
                                    수정하기
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 space-y-6 relative pb-12 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category" className="text-gray-600 mb-2">카테고리</Label>
                                    <Select
                                        value={formData.category || ""}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger className="bg-white shadow-sm border border-gray-200 hover:cursor-pointer">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                            {CATEGORIES.map((category) => (
                                                <SelectItem key={category} value={category} className="hover:bg-gray-50 hover:cursor-pointer">
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="status" className="text-gray-600 mb-2">상태</Label>
                                    <Select
                                        value={formData.isActive ? "active" : "inactive"}
                                        onValueChange={(value) => setFormData({ ...formData, isActive: value === "active" })}
                                    >
                                        <SelectTrigger className="bg-white shadow-sm border border-gray-200 hover:cursor-pointer">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                            <SelectItem value="active" className="hover:bg-gray-50 hover:cursor-pointer">활성</SelectItem>
                                            <SelectItem value="inactive" className="hover:bg-gray-50 hover:cursor-pointer">비활성</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="title" className="text-gray-600 mb-2">
                                    공지사항 제목 <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="title"
                                        value={formData.title || ""}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        maxLength={200}
                                        className={errors.title ? "border-red-500 bg-white shadow-sm border border-gray-200" : "bg-white shadow-sm border border-gray-200"}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                                        {(formData.title || "").length}/200
                                    </span>
                                </div>
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="content" className="text-sm font-medium text-gray-600 mb-2">
                                    공지사항 내용 <span className="text-red-500">*</span>
                                </Label>
                                <div className="mt-1">
                                    <RichTextEditor
                                        content={formData.content || ""}
                                        onChange={(value) => setFormData({ ...formData, content: value })}
                                        placeholder="공지사항 내용을 작성해주세요"
                                    />
                                </div>
                                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                            </div>

                            {filePreviews.length > 0 && (
                                <div>
                                    <Label className="text-gray-600 mb-2">첨부 파일</Label>
                                    <ul className="space-y-2">
                                        {filePreviews.map((file) => (
                                            <li key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                <span className="text-sm text-gray-600 truncate max-w-[500px]" title={file.originalFileName}>{file.originalFileName}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFile(file.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="files" className="text-sm font-medium text-gray-700">
                                        파일 첨부
                                    </Label>
                                    <input
                                        id="files"
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                        ref={inputRef}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => inputRef.current?.click()}
                                        className="border border-gray-600 text-gray-600 hover:bg-gray-50"
                                    >
                                        <Upload className="h-4 w-4 mr-1" />
                                        파일 선택
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                    className="border border-gray-600 hover:bg-gray-50 text-gray-600 hover:cursor-pointer"
                                >
                                    취소
                                </Button>
                                <Button onClick={handleUpdate} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white hover:cursor-pointer">
                                    <Edit className="h-4 w-4 mr-1" />
                                    {loading ? "수정 중..." : "수정완료"}
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

                    <ConfirmModal
                        isOpen={confirmLeaveModal.isOpen}
                        onClose={() => {
                            setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: false })
                            setPendingNavigation(null)
                        }}
                        onConfirm={pendingNavigation ? handleConfirmNavigation : () => {
                            setIsEditing(false)
                            setFormData({
                                category: notice.category,
                                title: notice.title,
                                content: notice.content,
                                isActive: notice.isActive,
                                files: notice.files.map(file => file.originalFileName),
                            })
                            setFilePreviews(notice.files)
                            setDeletedFileIds([])
                            setErrors({})
                            setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: false })
                        }}
                        title={confirmLeaveModal.title}
                        message={confirmLeaveModal.message}
                        confirmText="이동하기"
                        cancelText="취소"
                    />
                </div>
            </div>
        </div>
    )
}