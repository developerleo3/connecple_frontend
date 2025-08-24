"use client"

import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import AdminSidebar from "@/components/admin-sidebar"
import AlertModal from "@/components/alert-modal"
import { ConfirmModal } from "@/components/confirm-modal"
import LoginRequiredModal from "@/components/login-required-modal"
import LoadingSpinner from "@/components/loading-spinner"

// API 응답 타입
interface NewsResponse {
    id: number
    imagePath: string
    sortOrder?: number
    title: string
    content: string
    newsUrl: string
}

// 컴포넌트 내부에서 사용할 타입
interface News {
    id: number
    imagePath: string
    imageFile?: File
    title: string
    content: string
    newsUrl: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// 안전 JSON 파서: 204/빈 본문 대응
const safeJson = async <T = never>(res: Response): Promise<T | null> => {
    if (res.status === 204) return null
    const text = await res.text()
    if (!text) return null
    try {
        return JSON.parse(text) as T
    } catch {
        return null
    }
}

export default function AdminNewsPage() {
    const [newsList, setNewsList] = useState<News[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 모달 상태
    const [alertModal, setAlertModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "info" as "info" | "warning" | "error" | "success",
    })
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        action: null as (() => void) | null,
    })
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const maxCount = 3
    const currentCount = newsList.length

    // 데이터 로드 (뉴스 리스트만)
    const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const newsResponse = await fetch(`${API_BASE_URL}/admin/news`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })

            if (newsResponse.ok) {
                const newsData = await safeJson<NewsResponse[] | null>(newsResponse)
                if (Array.isArray(newsData) && newsData.length > 0) {
                    const mappedNews = newsData.map((item) => ({
                        id: item.id,
                        imagePath: item.imagePath,
                        sortOrder: item.sortOrder,
                        title: item.title ?? "",
                        content: item.content ?? "",
                        newsUrl: item.newsUrl ?? "",
                    }))
                    mappedNews.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                    setNewsList(mappedNews)
                } else {
                    setNewsList([])
                }
            } else if (newsResponse.status !== 404) {
                setNewsList([])
            }
        } catch (e) {
            console.error("데이터 로딩 오류:", e)
            setError(e instanceof Error ? e.message : "데이터를 불러오는 중 오류가 발생했습니다.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (error) {
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: error,
                type: "error",
            })
        }
    }, [error])

    // 뉴스 추가 핸들
    const handleAddNews = () => {
        if (currentCount >= maxCount) {
            setAlertModal({
                isOpen: true,
                title: "뉴스 이미지",
                message: "뉴스 이미지는 최대 " + maxCount + "개까지 첨부 가능합니다.",
                type: "warning",
            })
            return
        }
        const newNews: News = {
            id: Date.now(),
            imagePath: "",
            title: "",
            content: "",
            newsUrl: "",
        }
        setNewsList((prev) => [...prev, newNews])
    }

    // 뉴스 삭제 핸들
    const handleRemoveNews = (id: number) => {
        setNewsList((prev) => prev.filter((slide) => slide.id !== id))
    }

    // 이미지 파일 검수
    const validateImageFile = (file: File): string | null => {
        if (file.size > 10 * 1024 * 1024) return "이미지 파일 크기는 10MB를 초과할 수 없습니다."
        const allowedExtensions = ["jpg", "jpeg", "png"]
        const fileName = file.name.toLowerCase()
        const ext = fileName.substring(fileName.lastIndexOf(".") + 1)
        if (!allowedExtensions.includes(ext)) return "이미지 파일만 업로드 가능합니다. (jpg, jpeg, png만 허용)"
        const allowedMime = ["image/jpeg", "image/jpg", "image/png"]
        if (!allowedMime.includes(file.type)) return "이미지 파일만 업로드 가능합니다. (jpg, jpeg, png만 허용)"
        return null
    }

    // 이미지 업로드 핸들
    const handleImageUpload = (id: number, file: File) => {
        const validationError = validateImageFile(file)
        if (validationError) {
            setAlertModal({
                isOpen: true,
                title: "파일 업로드 오류",
                message: validationError,
                type: "error",
            })
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            setNewsList((prev) =>
                prev.map((slide) => (slide.id === id ? { ...slide, imagePath: (e.target?.result as string) ?? "", imageFile: file } : slide)),
            )
        }
        reader.readAsDataURL(file)
    }

    // 뉴스 변경 핸들
    const handleNewsChange = (id: number, field: keyof News, value: string) => {
        setNewsList((prev) => prev.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)))
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const reordered = Array.from(newsList)
        const [moved] = reordered.splice(result.source.index, 1)
        reordered.splice(result.destination.index, 0, moved)
        setNewsList(reordered)
    }

    const handleSaveNews = () => {
        // 필수 필드 검증 (이미지/제목/내용/뉴스링크)
        if (newsList.length === 0) {
            setAlertModal({
                isOpen: true,
                title: "뉴스 정보",
                message: "뉴스는 최소 1개 이상 있어야 합니다.",
                type: "warning",
            })
            return
        }
        const hasEmpty = newsList.some((s) => !s.imagePath || !s.newsUrl.trim() || !s.title.trim() || !s.content.trim())
        if (hasEmpty) {
            setAlertModal({
                isOpen: true,
                title: "입력 오류",
                message: "모든 뉴스에 대해 이미지, 제목, 내용, 뉴스 링크를 입력해주세요.",
                type: "warning",
            })
            return
        }

        setConfirmModal({
            isOpen: true,
            title: "등록하기",
            message: "홈 화면에 이미지 슬라이드를 등록하시겠습니까?",
            action: async () => {
                setIsLoading(true)
                try {
                    const formData = new FormData()
                    // 순서를 보장하기 위해 순차적으로 처리
                    for (let index = 0; index < newsList.length; index++) {
                        const news = newsList[index]
                        let fileToUpload: File | undefined = news.imageFile

                        if (!fileToUpload && news.imagePath) {
                            try {
                                const cacheBustedUrl = `${news.imagePath}?t=${Date.now()}`
                                const res = await fetch(cacheBustedUrl, { cache: "no-store" })
                                if (!res.ok) throw new Error("뉴스 이미지 재업로드용 fetch 실패")
                                const blob = await res.blob()
                                const filename = news.imagePath.substring(news.imagePath.lastIndexOf("/") + 1) || "image.png"
                                fileToUpload = new File([blob], filename, { type: blob.type })
                            } catch (e) {
                                console.error("이미지 fetch 실패:", e)
                                throw new Error(`기존 이미지(${news.title || "이름 없음"})를 불러올 수 없습니다. 네트워크 설정을 확인해주세요.`)
                            }
                        }

                        if (fileToUpload) {
                            formData.append("images", fileToUpload)
                            formData.append("titles", news.title)
                            formData.append("contents", news.content)
                            formData.append("newsUrlList", news.newsUrl)
                            formData.append("sortOrders", index.toString())
                        }
                    }

                    const response = await fetch(`${API_BASE_URL}/admin/news/reset`, {
                        method: "POST",
                        credentials: "include",
                        body: formData,
                    })

                    if (response.ok) {
                        await response.json()
                        await fetchData()
                        setAlertModal({
                            isOpen: true,
                            title: "등록 완료",
                            message: "뉴스가 성공적으로 등록되었습니다.",
                            type: "success",
                        })
                    } else {
                        let errorMessage = "뉴스 저장에 실패했습니다."
                        try {
                            const errorData = await response.json()
                            if (errorData.message) errorMessage = errorData.message
                        } catch {
                            switch (response.status) {
                                case 400:
                                    errorMessage = "잘못된 요청입니다. 파일 형식과 크기를 확인해주세요."
                                    break
                                case 413:
                                    errorMessage = "파일 크기가 너무 큽니다. 10MB 이하 파일만 업로드 가능합니다."
                                    break
                                case 415:
                                    errorMessage = "지원하지 않는 파일 형식입니다. jpg, jpeg, png만 허용합니다."
                                    break
                                case 500:
                                    errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                                    break
                                default:
                                    errorMessage = `업로드 실패 (${response.status})`
                            }
                        }
                        throw new Error(errorMessage)
                    }
                } catch (err) {
                    setAlertModal({
                        isOpen: true,
                        title: "업로드 실패",
                        message: err instanceof Error ? err.message : "뉴스 저장에 실패했습니다.",
                        type: "error",
                    })
                } finally {
                    setIsLoading(false)
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }))
                }
            },
        })
    }

    if (isLoading) return <LoadingSpinner />
    if (error) return <div className="text-center text-red-500">{error}</div>

    const getImageUrl = (image: string) => (image.startsWith("data:") ? image : `${image}`)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <div className="bg-gray flex-1 p-6">
                <div className="bg-gray border-gray-200 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-black">뉴스 관리</h1>
                    </div>
                    <p className="text-gray-600 pt-4">뉴스레터의 뉴스 소식을 변경할 수 있습니다.</p>
                </div>

                <div className="p-8 pt-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-black">
                                    뉴스레터 최근 뉴스 <span className="text-red-500">*</span>
                                </h2>
                                <span className="text-base text-gray-500">{currentCount}/{maxCount}</span>
                            </div>

                            <div className="border-3 border-dashed border-gray-300 rounded-lg p-6 mb-6 hover:cursor-pointer hover:border-[#541E80]">
                                <button
                                    onClick={handleAddNews}
                                    className="w-full flex items-center justify-center gap-2 text-[#541E80] hover:text-[#541E80] hover:cursor-pointer"
                                    disabled={isLoading}
                                >
                                    <Plus size={20} />
                                    <span className="hover:cursor-pointer">뉴스 추가</span>
                                </button>
                            </div>

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="newsList">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {newsList.map((news, index) => (
                                                <Draggable key={news.id} draggableId={news.id.toString()} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`border border-gray-200 rounded-lg p-6 mb-4 ${snapshot.isDragging ? "bg-gray-100" : ""}`}
                                                        >
                                                            <div className="flex gap-4">
                                                                <div className="flex flex-col items-center">
                                                                    <div {...provided.dragHandleProps} className="text-gray-400 cursor-move">↕</div>
                                                                </div>

                                                                <div className="relative">
                                                                    <div className="w-[280px] h-[160px] bg-gray-100 rounded-lg overflow-hidden relative">
                                                                        {news.imagePath ? (
                                                                            <img src={getImageUrl(news.imagePath) || "/logo_header.svg"} alt="Preview" className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                                                <span className="text-gray-400">이미지 없음</span>
                                                                            </div>
                                                                        )}

                                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                            <label className="cursor-pointer">
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    className="hidden"
                                                                                    onChange={(e) => {
                                                                                        const file = e.target.files?.[0]
                                                                                        if (file) handleImageUpload(news.id, file)
                                                                                    }}
                                                                                    disabled={isLoading}
                                                                                />
                                                                                <div className="bg-white text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2">
                                                                                    <Plus size={16} />
                                                                                    <span>{isLoading ? "업로드중..." : "이미지 업로드"}</span>
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <button
                                                                        onClick={() => handleRemoveNews(news.id)}
                                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:cursor-pointer"
                                                                        disabled={isLoading}
                                                                    >
                                                                        <X size={14} />
                                                                    </button>
                                                                </div>

                                                                <div className="flex-1">
                                                                    <div className="mb-1">
                                                                        <p className="text-sm text-gray-500 mb-1">사이즈: 1250x720px 권장 치수입니다.</p>
                                                                        <p className="text-sm text-gray-500 mb-1">
                                                                            파일이 업로드되는 순서에 맞춰 슬라이드가 보여지며, 비율이 일정하지 않는 경우 잘리거나 찌그러질 수 있습니다.
                                                                        </p>
                                                                    </div>

                                                                    <div className="space-y-1">
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="제목 (최대 30자)"
                                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                                                value={news.title}
                                                                                onChange={(e) => handleNewsChange(news.id, "title", e.target.value)}
                                                                                maxLength={30}
                                                                                disabled={isLoading}
                                                                            />
                                                                        </div>

                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="내용 요약 (최대 100자)"
                                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                                                value={news.content}
                                                                                onChange={(e) => handleNewsChange(news.id, "content", e.target.value)}
                                                                                disabled={isLoading}
                                                                            />
                                                                        </div>

                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="뉴스 URL"
                                                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                                                value={news.newsUrl}
                                                                                onChange={(e) => handleNewsChange(news.id, "newsUrl", e.target.value)}
                                                                                disabled={isLoading}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveNews}
                                    disabled={isLoading}
                                    className="bg-[#541E80] font-bold text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 hover:cursor-pointer"
                                >
                                    {isLoading ? "저장중..." : "등록하기"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <AlertModal
                    isOpen={alertModal.isOpen}
                    onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
                    title={alertModal.title}
                    message={alertModal.message}
                    type={alertModal.type}
                />

                <ConfirmModal
                    isOpen={confirmModal.isOpen}
                    onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                    onConfirm={confirmModal.action || (() => {})}
                    title={confirmModal.title}
                    message={confirmModal.message}
                    isLoading={isLoading}
                />

                <LoginRequiredModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            </div>
        </div>
    )
}