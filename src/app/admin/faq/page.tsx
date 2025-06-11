"use client"

import { useState, useEffect } from "react"
import  AdminSidebar  from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface FAQ {
    id: number
    category: string
    question: string
    author: string
    createdAt: string
    status: "활성" | "비활성"
}

export default function FAQListPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("전체")
    const [statusFilter, setStatusFilter] = useState("전체")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [loading, setLoading] = useState(false)

    // Mock data - 실제로는 API에서 데이터를 가져옵니다
    const mockFaqs: FAQ[] = [
        {
            id: 1,
            category: "위드프로젝트",
            question: "위드프로젝트는 어떻게 참여할 수 있나요?",
            author: "관리자",
            createdAt: "2024. 3. 24 18:20",
            status: "활성",
        },
        {
            id: 2,
            category: "위드프로젝트",
            question: "위드프로젝트는 어떻게 참여할 수 있나요?",
            author: "관리자",
            createdAt: "2024. 3. 24 18:20",
            status: "비활성",
        },
        {
            id: 3,
            category: "위드카데미",
            question: "위드프로젝트는 어떻게 참여할 수 있나요?",
            author: "관리자",
            createdAt: "2024. 3. 24 18:20",
            status: "활성",
        },
    ]

    useEffect(() => {
        // API 호출 시뮬레이션
        const fetchFAQs = async () => {
            setLoading(true)
            try {
                // 실제 API 호출
                // const response = await fetch('/api/faqs')
                // const data = await response.json()
                // setFaqs(data)

                // Mock data 사용
                setTimeout(() => {
                    setFaqs(mockFaqs)
                    setLoading(false)
                }, 500)
            } catch (error) {
                console.error("FAQ 목록을 불러오는데 실패했습니다:", error)
                setLoading(false)
            }
        }

        fetchFAQs()
    }, [])

    const filteredFaqs = faqs.filter((faq) => {
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "전체" || faq.category === categoryFilter
        const matchesStatus = statusFilter === "전체" || faq.status === statusFilter

        return matchesSearch && matchesCategory && matchesStatus
    })

    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">FAQ 관리</h1>
                        <div className="text-sm text-gray-600">화면정의</div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <p className="text-gray-600 mb-4">자주 묻는 질문과 답변을 관리할 수 있습니다.</p>

                            <div className="flex gap-4 items-center mb-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="제목, 카테고리, 내용으로 검색하세요"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Link href="/admin/faq/create">
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        FAQ 생성
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex gap-4 items-center">
                                <div className="text-sm text-gray-600">전체</div>
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="전체">전체</SelectItem>
                                        <SelectItem value="위드프로젝트">위드프로젝트</SelectItem>
                                        <SelectItem value="위드카데미">위드카데미</SelectItem>
                                        <SelectItem value="위드뉴스레터">위드뉴스레터</SelectItem>
                                        <SelectItem value="위드GIG">위드GIG</SelectItem>
                                        <SelectItem value="기타">기타</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="전체">전체</SelectItem>
                                        <SelectItem value="활성">활성</SelectItem>
                                        <SelectItem value="비활성">비활성</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="ml-auto flex items-center gap-2">
                                    <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                                        <SelectTrigger className="w-24">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10개씩</SelectItem>
                                            <SelectItem value="20">20개씩</SelectItem>
                                            <SelectItem value="50">50개씩</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="text-sm text-gray-600">보기</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mt-2">총 {filteredFaqs.length}건</div>
                        </div>

                        <Table>
                            <TableHeader className="bg-purple-600">
                                <TableRow>
                                    <TableHead className="text-white font-medium">카테고리</TableHead>
                                    <TableHead className="text-white font-medium">제목</TableHead>
                                    <TableHead className="text-white font-medium">작성일자</TableHead>
                                    <TableHead className="text-white font-medium">상태</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8">
                                            로딩 중...
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedFaqs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                            검색 결과가 없습니다.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedFaqs.map((faq) => (
                                        <TableRow key={faq.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium">{faq.category}</TableCell>
                                            <TableCell>
                                                <Link href="/admin/faq/view"/*{`/admin/faq/view${faq.id}`}*/ className="text-blue-600 hover:underline">
                                                    {faq.question}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-gray-600">{faq.createdAt}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={faq.status === "활성" ? "default" : "secondary"}
                                                    className={faq.status === "활성" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                                >
                                                    {faq.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const pageNum = i + 1
                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={currentPage === pageNum ? "bg-purple-600" : ""}
                                        >
                                            {pageNum}
                                        </Button>
                                    )
                                })}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
