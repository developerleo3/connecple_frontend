"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmModal } from "@/components/confirm-modal"
import AlertModal from "@/components/alert-modal"
import AdminSidebar from "@/components/admin-sidebar"

interface LinkData {
    withProject: string
    withProject2: string
    withConnecday: string
    withNewsletter: string
    withNewsletter2: string
    withGig: string
    withGig2: string
}

interface ValidationErrors {
    withProject?: string
    withProject2?: string
    withConnecday?: string
    withNewsletter?: string
    withNewsletter2?: string
    withGig?: string
    withGig2?: string
}

export default function AdminLinkPage() {
    const [links, setLinks] = useState<LinkData>({
        withProject: "",
        withProject2: "",
        withConnecday: "",
        withNewsletter: "",
        withNewsletter2: "",
        withGig: "",
        withGig2: "",
    })

    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "info" as "info" | "warning" | "error" | "success",
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
                        withProject: data.find((item: { title: string }) => item.title === "위드프로젝트 메인 링크 설정")?.linkPath || "",
                        withProject2: data.find((item: { title: string }) => item.title === "위드프로젝트 무료 교육 링크 설정")?.linkPath || "",
                        withConnecday: data.find((item: { title: string }) => item.title === "위드커넥데이 메인 링크 설정")?.linkPath || "",
                        withNewsletter: data.find((item: { title: string }) => item.title === "위드뉴스레터 메인 링크 설정")?.linkPath || "",
                        withNewsletter2: data.find((item: { title: string }) => item.title === "위드뉴스레터 파트너 문의하기 링크 설정")?.linkPath || "",
                        withGig: data.find((item: { title: string }) => item.title === "위드GIG 참여자 링크 설정")?.linkPath || "",
                        withGig2: data.find((item: { title: string }) => item.title === "위드GIG 수요 기업 링크 설정")?.linkPath || "",
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
        withProject: "위드프로젝트 메인 링크 설정",
        withProject2: "위드프로젝트 무료 교육 링크 설정",
        withConnecday: "위드커넥데이 메인 링크 설정",
        withNewsletter: "위드뉴스레터 메인 링크 설정",
        withNewsletter2: "위드뉴스레터 파트너 문의하기 링크 설정",
        withGig: "위드GIG 참여자 링크 설정",
        withGig2: "위드GIG 수요 기업 링크 설정"
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
            setModal({
                isOpen: true,
                title: "등록 완료",
                message: "링크를 등록하였습니다.",
                type: "success",
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : "링크 등록 중 오류가 발생하였습니다."
            setModal({
                isOpen: true,
                title: "등록 실패",
                message: message,
                type: "error",
            })
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

            <main className="flex-1 p-8 ">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-bold text-black">메인 링크 관리</CardTitle>
                            <CardDescription className="text-black text-base">매뉴별 메인 링크를 설정할 수 있습니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            {/* 위드프로젝트 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withProject" className="text-base font-medium text-black">
                                    위드프로젝트 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4 w-full">
                                    <div className="flex-1">
                                        <Input
                                            id="withProject"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withProject}
                                            onChange={(e) => handleInputChange("withProject", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withProject && <p className="text-red-500 text-sm mt-1">{errors.withProject}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withProject")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>
                            {/* 위드프로젝트 무료 교육 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withProject2" className="text-base font-medium text-black">
                                    위드프로젝트 무료 교육 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4 w-full">
                                    <div className="flex-1">
                                        <Input
                                            id="withProject2"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withProject2}
                                            onChange={(e) => handleInputChange("withProject2", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withProject2 && <p className="text-red-500 text-sm mt-1">{errors.withProject2}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withProject2")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>
                            {/* 위드커넥데이 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withConnecday" className="text-base font-medium text-black">
                                    위드커넥데이 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="withConnecday"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withConnecday}
                                            onChange={(e) => handleInputChange("withConnecday", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withConnecday && <p className="text-red-500 text-sm mt-1">{errors.withConnecday}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withConnecday")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 위드뉴스레터 메인 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withNewsletter" className="text-base font-medium text-black">
                                    위드뉴스레터 메인 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="withNewsletter"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withNewsletter}
                                            onChange={(e) => handleInputChange("withNewsletter", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withNewsletter && <p className="text-red-500 text-sm mt-1">{errors.withNewsletter}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withNewsletter")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 위드뉴스레터 파트너 문의하기 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withNewsletter2" className="text-base font-medium text-black">
                                    위드뉴스레터 파트너 문의하기 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="withNewsletter2"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withNewsletter2}
                                            onChange={(e) => handleInputChange("withNewsletter2", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withNewsletter2 && <p className="text-red-500 text-sm mt-1">{errors.withNewsletter2}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withNewsletter2")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 위드GIG 참여자 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withGig" className="text-base font-medium text-black">
                                    위드GIG 참여자 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="withGig"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withGig}
                                            onChange={(e) => handleInputChange("withGig", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withGig && <p className="text-red-500 text-sm mt-1">{errors.withGig}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withGig")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        등록하기
                                    </Button>
                                </div>
                            </div>

                            {/* 위드GIG 수요 기업 링크 설정 */}
                            <div className="space-y-2">
                                <Label htmlFor="withGig2" className="text-base font-medium text-black">
                                    위드GIG 수요 기업 링크 설정 <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="withGig2"
                                            type="url"
                                            placeholder="링크를 입력해 넣어주세요"
                                            value={links.withGig2}
                                            onChange={(e) => handleInputChange("withGig2", e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
                                        />
                                        {errors.withGig2 && <p className="text-red-500 text-sm mt-1">{errors.withGig2}</p>}
                                    </div>
                                    <Button
                                        onClick={() => handleSubmit("withGig2")}
                                        className="bg-[#541E80] font-bold hover:bg-purple-700 px-8 text-white hover:cursor-pointer"
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

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                title="등록하기"
                message={`${currentAction?.label}을(를) 등록하시겠습니까?`}
            />

            <AlertModal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
        </div>
    )
}
