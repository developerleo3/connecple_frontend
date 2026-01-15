"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import AlertModal from "@/components/alert-modal"
import {Download, List} from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner";

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
    files: FileAttachment[]
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

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

const getNotice = async (id: number): Promise<Notice> => {
    return fetchApi<Notice>(`/client/notices/${id}`)
}

const getFaq = async (id: number): Promise<Faq> => {
    return fetchApi<Faq>(`/client/faqs/${id}`)
}

// 줄바꿈 재배치
const formatContentForView = (content: string) => {
    return content.replace(/<p><\/p>/g, '<p><br/></p>');
}

export default function SupportDetailPage() {
    const router = useRouter()
    const params = useParams()
    const supportType = params.type as "notices" || "faqs";
    const isNotice = supportType === "notices";
    const id = Number(params.id);

    const [notice, setNotice] = useState<Notice | null>(null)
    const [faq, setFaq] = useState<Faq | null>(null)
    const [loading, setLoading] = useState(true)
    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "success" as "success" | "error" | "warning",
    })

    useEffect(() => {
        if (id) {
            if (supportType == 'notices') {
                fetchNotice();
            } else {
                fetchFaq();
            }
        }
    }, [id])

    const fetchNotice = async () => {
        try {
            setLoading(true)
            const response = await getNotice(id)

            if (response) {
                setNotice(response)
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

    const fetchFaq = async () => {
        try {
            setLoading(true)
            const response = await getFaq(id)

            if (response) {
                setFaq(response)
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

    const handleDownload = (file: FileAttachment) => {
        const link = document.createElement('a')
        link.href = `${file.filePath}`
        link.download = encodeURIComponent(file.originalFileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            // hour: "2-digit",
            // minute: "2-digit",
        })
            .replace(/\.$/, ""); // ← 마지막 점 제거
    }

    if ((loading && !notice) || (loading && !faq)) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <div className="flex-1 p-6">
                    <div className="flex justify-center items-center h-64">
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        )
    }

    // 데이터가 없을 경우
    if (isNotice && !notice) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <div className="flex-1 p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">데이터가 없습니다.</h1>
                        <Button onClick={() => router.push("/support")}>
                            목록으로 돌아가기
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    if (!isNotice && !faq) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <div className="flex-1 p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">데이터가 없습니다.</h1>
                        <Button onClick={() => router.push("/support")}>
                            목록으로 돌아가기
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const titleText = isNotice ? notice!.title : faq!.question;
    const categoryText = isNotice ? notice!.category : faq!.category;
    const html = isNotice ? (notice!.content ?? "") : (faq!.answer ?? "");
    const createdAtText = isNotice ? notice!.createdAt : faq!.createdAt;
    const files = isNotice ? notice!.files ?? [] : faq!.files ?? [];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="p-6 space-y-10 relative pb-12 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-gray-600 mb-2">카테고리</Label>
                                <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                                    {categoryText}</div>
                            </div>
                        </div>
                        <div>
                            <Label className="text-gray-600 mb-2">
                                {isNotice ? "공지사항 제목" : "질문"}
                            </Label>
                            <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                                {titleText}
                            </div>
                        </div>
                        <div>
                            <Label className="text-gray-600 mb-2">
                                {supportType === "notices" ? "공지사항 내용" : "답변"}
                            </Label>
                            <div
                                className="mt-1 p-4 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[300px] max-h-[300px]"
                                style={{ maxHeight: "300px", overflowY: "auto", whiteSpace: "pre-wrap" }}
                                dangerouslySetInnerHTML={{__html: formatContentForView(html)}}
                            />
                        </div>

                        {files && files.length > 0 && (
                            <div>
                                <Label className="text-gray-600 mb-2">첨부 파일</Label>
                                <ul className="space-y-2">
                                    {files.map((file) => (
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
                            <Label className="text-gray-600 mb-2">작성일</Label>
                            <div className="mt-1 p-2 bg-white rounded-lg shadow-sm border border-gray-200">{formatDate(createdAtText)}</div>
                        </div>

                        <div className="absolute bottom-6 right-6 flex gap-2">
                            <Button variant="outline" onClick={() => router.push("/support")} className="text-gray-600 font-medium border-gray-600 hover:bg-gray-50 hover:cursor-pointer">
                                <List className="h-4 w-4 mr-1" />
                                목록으로
                            </Button>
                        </div>
                    </div>
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