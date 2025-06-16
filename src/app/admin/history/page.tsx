"use client"

import { useState, useEffect } from "react"
import { Plus, X, ChevronDown } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"
import AlertModal from "@/components/alert-modal"
import { ConfirmModal } from "@/components/confirm-modal"


interface HistoryItem {
    historyYear: string
    content: string
}

interface ApiResponse {
    message: string
    data: any
}

export default function HistoryManagePage() {
    const [historyList, setHistoryList] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "info" as "info" | "warning" | "error" | "success",
    })
    const [errors, setErrors] = useState<{ [key: number]: string }>({})

    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        action: null as (() => void) | null,
    })

    // 페이지 로드 시 기존 연혁 데이터 가져오기
    useEffect(() => {
        fetchHistoryData()
    }, [])

    const fetchHistoryData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/intro/history`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const data: ApiResponse = await response.json()
                if (data.data && Array.isArray(data.data)) {
                    setHistoryList(data.data)
                }
            }
        } catch (error) {
            console.error("연혁 데이터 로드 실패:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const addHistoryItem = () => {
        const newItem: HistoryItem = {
            historyYear: new Date().getFullYear().toString(),
            content: "",
        }
        setHistoryList([...historyList, newItem])
    }

    const removeHistoryItem = (index: number) => {
        const newList = historyList.filter((_, i) => i !== index)
        setHistoryList(newList)
        // 해당 인덱스의 에러도 제거
        const newErrors = { ...errors }
        delete newErrors[index]
        setErrors(newErrors)
    }

    const updateHistoryItem = (index: number, field: keyof HistoryItem, value: string) => {
        const newList = [...historyList]
        newList[index] = { ...newList[index], [field]: value }
        setHistoryList(newList)

        // 입력 시 해당 필드의 에러 제거
        if (errors[index]) {
            const newErrors = { ...errors }
            delete newErrors[index]
            setErrors(newErrors)
        }
    }

    const validateForm = () => {
        const newErrors: { [key: number]: string } = {}

        historyList.forEach((item, index) => {
            if (!item.content.trim()) {
                newErrors[index] = "연혁 내용을 입력해주세요."
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        if (historyList.length === 0) {
            setModal({
                isOpen: true,
                title: "알림",
                message: "등록할 연혁이 없습니다.",
                type: "warning",
            })
            return
        }

        setConfirmModal({
            isOpen: true,
            title: "등록하기",
            message: "커넥플 소개의 연혁으로 등록하시겠습니까?",
            action: async () => {
                setIsLoading(true)
                try {
                    setIsLoading(true)
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/intro/history`, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ historyList }),
                    })
        
                    const data: ApiResponse = await response.json()
        
                    if (response.ok) {
                        setModal({
                            isOpen: true,
                            title: "등록 완료",
                            message: "연혁을 등록하였습니다.",
                            type: "success",
                        })
                    } else {
                        setModal({
                            isOpen: true,
                            title: "등록 실패",
                            message: data.message || "등록 중 오류가 발생했습니다.",
                            type: "error",
                        })
                    }
                } catch (error) {
                    setModal({
                        isOpen: true,
                        title: "등록 실패",
                        message: "네트워크 오류가 발생했습니다.",
                        type: "error",
                    })
                } finally {
                    setIsLoading(false)
                }
            },
        })
    }

    const closeModal = () => {
        setModal({ ...modal, isOpen: false })
    }

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let year = currentYear; year >= 2000; year--) {
            years.push(year.toString())
        }
        return years
    }

    const handleConfirm = async () => {
        if (!confirmModal.action) return

        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/intro/history`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ historyList }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "링크 등록에 실패했습니다")
            }

            const result = await response.json()
            console.log("링크 등록 성공:", result)

            // 성공 처리
            setModal({
                isOpen: true,
                title: "등록 완료",
                message: "연혁을 등록하였습니다.",
                type: "success",
            })
        } catch (error) {
            setModal({
                isOpen: true,
                title: "등록 실패",
                message: "링크 등록 중 오류가 발생하였습니다.",
                type: "error",
            })
        } finally {
            setIsLoading(false)
            setConfirmModal({
                isOpen: false,
                title: "",
                message: "",
                action: null,
            })
        }
    }

    const handleCancel = () => {
        setConfirmModal({
            isOpen: false,
            title: "",
            message: "",
            action: null,
        })
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-2">소개 관리</h1>
                    <p className="text-gray-600 mb-8">커넥플 소개 메뉴의 내용을 관리합니다.</p>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-lg font-semibold">연혁</h2>
                            <span className="text-red-500">*</span>
                        </div>

                        <button
                            onClick={addHistoryItem}
                            className="flex items-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-300 hover:text-purple-600 transition-colors mb-6 hover:cursor-pointer"
                        >
                            <Plus size={20} />
                            <span>연혁 추가</span>
                        </button>

                        <div className="space-y-4">
                            {historyList.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className={`border rounded-lg p-4 ${errors[index] ? "border-red-300" : "border-gray-200"}`}>
                                        <div className="flex items-start gap-4">
                                            <div className="relative">
                                                <select
                                                    value={item.historyYear}
                                                    onChange={(e) => updateHistoryItem(index, "historyYear", e.target.value)}
                                                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 focus:outline-none focus:border-purple-500 hover:cursor-pointer"
                                                >
                                                    {generateYearOptions().map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>

                                            <div className="flex-1">
                                                <textarea
                                                    value={item.content}
                                                    onChange={(e) => updateHistoryItem(index, "content", e.target.value)}
                                                    placeholder="연혁 내용을 작성해주세요.&#10;연혁 내용은 엔터를 기준으로 구분됩니다."
                                                    className={`w-full p-3 border rounded resize-none focus:outline-none focus:border-purple-500 ${errors[index] ? "border-red-300" : "border-gray-300"
                                                        }`}
                                                    rows={6}
                                                />
                                            </div>

                                            <button
                                                onClick={() => removeHistoryItem(index)}
                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors hover:cursor-pointer"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {errors[index] && <p className="text-red-500 text-sm mt-1">{errors[index]}</p>}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-8">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:cursor-pointer"
                            >
                                {isLoading ? "등록 중..." : "등록하기"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AlertModal
                isOpen={modal.isOpen}
                onClose={closeModal}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
            />
        </div>
    )
}
