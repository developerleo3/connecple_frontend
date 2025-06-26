"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"
import LoadingSpinner from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Upload } from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ConfirmModal } from "@/components/confirm-modal"

interface FileAttachment {
    id: number
    originalFileName: string
    storedFileName: string
    filePath: string
    fileSize: number
    fileType: string
    file: File
}

interface FormData {
    category: string
    status: string
    question: string
    answer: string
    files?: string[]
}

interface FormErrors {
    category?: string
    question?: string
    answer?: string
}

export default function CreateFaqPage() {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState<FormData>({
        category: "",
        status: "활성",
        question: "",
        answer: "",
        files: [],
    })
    const [filePreviews, setFilePreviews] = useState<FileAttachment[]>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    // 페이지 이동 확인 모달 상태
    const [confirmLeaveModal, setConfirmLeaveModal] = useState({
        isOpen: false,
        title: "페이지 이동 확인",
        message: (
            <>
                <span style={{ color: 'red' }}>작성중인 FAQ가 사라집니다.</span><br />
                <span style={{ color: 'red' }}>정말로 페이지를 이동하시겠습니까?</span>
            </>
        ),
    })

    // 페이지 이동 감지 및 확인
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!isSubmitting) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        // 브라우저 새로고침/닫기 감지
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isSubmitting])

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
        setIsSubmitting(true)
        try {
            const formDataToSend = new FormData()
            formDataToSend.append("category", formData.category)
            formDataToSend.append("question", formData.question)
            formDataToSend.append("answer", formData.answer)
            formDataToSend.append("isActive", formData.status === "활성" ? "true" : "false")

            filePreviews.forEach((fileObj) => {
                formDataToSend.append("files", fileObj.file)
            })

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/faqs`, {
                method: "POST",
                credentials: "include",
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error("FAQ 생성에 실패했습니다")
            }

            router.push("/admin/faq")
        } catch (error) {
            console.error("FAQ 생성 실패:", error)
            alert("FAQ 생성에 실패했습니다. 다시 시도해주세요.")
            setIsSubmitting(false)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
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
        setFilePreviews(prev => prev.filter(file => file.id !== id))
        setFormData(prev => ({
            ...prev,
            files: prev.files?.filter(fileName => !filePreviews.find(f => f.id === id)?.originalFileName === fileName),
        }))
    }

    const handleCancelClick = () => {
        setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: true })
    }

    const handleConfirmLeave = () => {
        setIsSubmitting(true)
        setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: false })
        router.push("/admin/faq")
    }

    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)

    const handleNavigationRequest = (path: string): boolean => {
        if (isSubmitting) return true
        
        setPendingNavigation(path)
        setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: true })
        return false // 일단 이동을 막음
    }

    const handleConfirmNavigation = () => {
        setIsSubmitting(true)
        setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: false })
        if (pendingNavigation) {
            router.push(pendingNavigation)
        }
        setPendingNavigation(null)
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar onNavigate={handleNavigationRequest} />
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
                                    <div className="relative">
                                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                            <SelectTrigger className={`mt-1 ${errors.category ? "border-red-500 hover:cursor-pointer" : "shadow-sm border border-gray-200 text-gray-600 hover:cursor-pointer"}`}>
                                                <SelectValue placeholder="카테고리를 선택하세요" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                                <SelectItem value="워드프로젝트" className="hover:bg-gray-50 hover:cursor-pointer">워드프로젝트</SelectItem>
                                                <SelectItem value="워드커네이어" className="hover:bg-gray-50 hover:cursor-pointer">워드커네이어</SelectItem>
                                                <SelectItem value="워드뉴스리터" className="hover:bg-gray-50 hover:cursor-pointer">워드뉴스리터</SelectItem>
                                                <SelectItem value="워드GIG" className="hover:bg-gray-50 hover:cursor-pointer">워드GIG</SelectItem>
                                                <SelectItem value="기타" className="hover:bg-gray-50 hover:cursor-pointer">기타</SelectItem>
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
                                        <SelectTrigger className="mt-1 shadow-sm border border-gray-200 text-gray-600 hover:cursor-pointer">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                                            <SelectItem value="활성" className="hover:bg-gray-50 hover:cursor-pointer">활성</SelectItem>
                                            <SelectItem value="비활성" className="hover:bg-gray-50 hover:cursor-pointer">비활성</SelectItem>
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
                                        className={errors.question ? "border-red-500" : "shadow-sm border border-gray-200 text-gray-600"}
                                        maxLength={200}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                        {formData.question.length}/200
                                    </div>
                                </div>
                                {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
                            </div>

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

                            {filePreviews.length > 0 && (
                                <div>
                                    {/* <Label className="text-gray-600 mb-2">첨부 파일</Label> */}
                                    <ul className="space-y-2">
                                        {filePreviews.map((file) => (
                                            <li key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                <span className="text-sm text-gray-600">{file.originalFileName}</span>
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
                                <Label htmlFor="answer" className="text-sm font-medium text-gray-700">
                                    FAQ 답변 <span className="text-red-500">*</span>
                                </Label>
                                <div className="mt-1">
                                    <RichTextEditor
                                        content={formData.answer}
                                        onChange={(value) => handleInputChange("answer", value)}
                                        placeholder="답변을 작성해주세요"
                                    />
                                </div>
                                {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={handleCancelClick}>
                                    취소
                                </Button>
                                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8 text-white font-semi hover:cursor-pointer" disabled={loading}>
                                  <Edit className="h-4 w-4 mr-1" />  
                                  {loading ? "생성 중..." : "생성하기"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={confirmLeaveModal.isOpen}
                onClose={() => {
                    setConfirmLeaveModal({ ...confirmLeaveModal, isOpen: false })
                    setPendingNavigation(null)
                }}
                onConfirm={pendingNavigation ? handleConfirmNavigation : handleConfirmLeave}
                title={confirmLeaveModal.title}
                message={confirmLeaveModal.message}
                confirmText="이동하기"
                cancelText="취소"
            />
        </div>
    )
}