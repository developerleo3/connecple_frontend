"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmModal } from "@/components/confirm-modal"
import AdminSidebar from "@/components/admin-sidebar"

interface LinkData {
    wordProject: string
    wordConnecday: string
    wordNewsletter: string
    wordGig: string
}

interface ValidationErrors {
    wordProject?: string
    wordConnecday?: string
    wordNewsletter?: string
    wordGig?: string
}

export default function AdminLinkPage() {
    const [links, setLinks] = useState<LinkData>({
        wordProject: "",
        wordConnecday: "",
        wordNewsletter: "",
        wordGig: "",
    })

    const [errors, setErrors] = useState<ValidationErrors>({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentAction, setCurrentAction] = useState<{
        type: keyof LinkData
        label: string
    } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // API URL 설정 (환경변수로 관리 가능)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

    // 페이지 로드 시 데이터 조회
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/main-links`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (response.ok) {
                    const { data } = await response.json()
                    // API 응답 데이터를 links 상태에 매핑
                    const mappedLinks: LinkData = {
                        wordProject: data.find((item: any) => item.title === "위드프로젝트 메인 링크 설정")?.linkPath || "",
                        wordConnecday: data.find((item: any) => item.title === "위드커넥데이 메인 링크 설정")?.linkPath || "",
                        wordNewsletter: data.find((item: any) => item.title === "위드뉴스레터 메인 링크 설정")?.linkPath || "",
                        wordGig: data.find((item: any) => item.title === "위드GIG 메인 링크 설정")?.linkPath || "",
                    }
                    setLinks(mappedLinks)
                }
            } catch (error) {
                console.error("링크 데이터 조회 실패:", error)
            }
        }

        fetchLinks()
    }, [])

    const linkLabels = {
        wordProject: "위드프로젝트 메인 링크 설정",
        wordConnecday: "위드커넥데이 메인 링크 설정",
        wordNewsletter: "위드뉴스레터 메인 링크 설정",
        wordGig: "위드GIG 메인 링크 설정",
    }

    const validateUrl = (url: string): boolean => {
        if (!url.trim()) return false
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const handleInputChange = (field: keyof LinkData, value: string) => {
        setLinks((prev) => ({ ...prev, [field]: value }))

        // 실시간 유효성 검사
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = (type: keyof LinkData) => {
        const url = links[type]

        // 유효성 검사
        if (!url.trim()) {
            setErrors((prev) => ({ ...prev, [type]: "링크를 입력해주세요" }))
            return
        }

        if (!validateUrl(url)) {
            setErrors((prev) => ({ ...prev, [type]: "올바른 URL 형식을 입력해주세요" }))
            return
        }

        // 모달 열기
        setCurrentAction({ type, label: linkLabels[type] })
        setIsModalOpen(true)
    }

    const handleConfirm = async () => {
        if (!currentAction) return

        setIsLoading(true)

        try {
            const response = await fetch(`${API_BASE_URL}/admin/main-links`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: linkLabels[currentAction.type],
                    linkPath: links[currentAction.type],
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "링크 등록에 실패했습니다")
            }

            const result = await response.json()
            console.log("링크 등록 성공:", result)

            // 성공 처리
            alert("링크가 성공적으로 등록되었습니다!")
        } catch (error) {
            console.error("링크 등록 오류:", error)
            alert(error instanceof Error ? error.message : "링크 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
        } finally {
            setIsLoading(false)
            setIsModalOpen(false)
            setCurrentAction(null)
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setCurrentAction(null)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <main className="flex-1 p-8 ml-20">
                <div className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-black">메인 링크 관리</CardTitle>
                            <CardDescription className="text-black">매뉴별 메인 링크를 설정할 수 있습니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* 워드프로젝트 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="wordProject" className="text-base font-medium text-black">
                                    워드프로젝트 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4 w-full">
                                    <div className="flex-1">
                                        <Input
                                            id="wordProject"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.wordProject}
                                            onChange={(e) => handleInputChange("wordProject", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.wordProject && <p className="text-red-500 text-sm mt-1">{errors.wordProject}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("wordProject")}
                                        className="bg-purple-600 hover:bg-purple-700 px-8"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 워드커넥데이 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="wordConnecday" className="text-base font-medium text-black">
                                    워드커넥데이 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="wordConnecday"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.wordConnecday}
                                            onChange={(e) => handleInputChange("wordConnecday", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.wordConnecday && <p className="text-red-500 text-sm mt-1">{errors.wordConnecday}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("wordConnecday")}
                                        className="bg-purple-600 hover:bg-purple-700 px-8"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 워드뉴스레터 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="wordNewsletter" className="text-base font-medium text-black">
                                    워드뉴스레터 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="wordNewsletter"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.wordNewsletter}
                                            onChange={(e) => handleInputChange("wordNewsletter", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.wordNewsletter && <p className="text-red-500 text-sm mt-1">{errors.wordNewsletter}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("wordNewsletter")}
                                        className="bg-purple-600 hover:bg-purple-700 px-8"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 워드GIG 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="wordGig" className="text-base font-medium text-black">
                                    워드GIG 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="wordGig"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.wordGig}
                                            onChange={(e) => handleInputChange("wordGig", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.wordGig && <p className="text-red-500 text-sm mt-1">{errors.wordGig}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("wordGig")}
                                        className="bg-purple-600 hover:bg-purple-700 px-8"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* 확인 모달 */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                title="등록하기"
                message={currentAction ? `${currentAction.label}로 등록하시겠습니까?` : ""}
                confirmText="등록하기"
                cancelText="취소하기"
                isLoading={isLoading}
            />
        </div>
    )
}
