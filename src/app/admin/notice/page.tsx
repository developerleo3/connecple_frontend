"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import AlertModal from "@/components/alert-modal"
import AdminSidebar from "@/components/admin-sidebar"
import Link from "next/link"

// Types for this page
interface Notice {
  id: number
  category: string
  title: string
  isActive: boolean
  createdAt: string
}

interface NoticeListResponse {
  notices: Notice[]
  totalCount: number
  page: number
  size: number
  totalPages: number
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

const getNotices = async (page: number, size: number, keyword?: string, categories?: string[]): Promise<ApiResponse<NoticeListResponse>> => {
  const queryParams: string[] = [];

  if (keyword) {
    queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
  }

  if (categories && categories.length > 0 && !categories.includes("전체")) {
    categories.forEach(cat => {
      queryParams.push(`category=${encodeURIComponent(cat)}`);
    });
  }

  queryParams.push(`page=${page}`);
  queryParams.push(`size=${size}`);
  queryParams.push(`sortBy=createdAt`);

  let endpoint = `/admin/notice`;
  if (keyword) {
      endpoint = `/admin/notice/search`;
  }

  if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
  }

  return fetchApi<NoticeListResponse>(endpoint);
}

const CATEGORIES = ["전체", "워드프로젝트", "워드커네디어", "워드뉴스리터", "워드GIG", "기타"]
const PAGE_SIZE_OPTIONS = [
  { value: "10", label: "10개씩 보기" },
  { value: "30", label: "30개씩 보기" },
  { value: "50", label: "50개씩 보기" },
]

export default function NoticeListPage() {
  const router = useRouter()
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  // Alert modal state
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "error" | "success",
  })

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const response = await getNotices(currentPage, pageSize, searchKeyword, selectedCategories)

      if (response.data) {
        setNotices(response.data.notices)
        setTotalPages(response.data.totalPages)
        setTotalCount(response.data.totalCount)
      }
    } catch (error) {
      console.error("Failed to fetch notices:", error)
      setAlertModal({
        isOpen: true,
        title: "오류",
        message: "공지사항을 불러오는데 실패했습니다.",
        type: "error",
      })
      setNotices([])
      setTotalCount(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [currentPage, pageSize, selectedCategories])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(0)
    fetchNotices()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setCurrentPage(0)
      fetchNotices()
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (category === "전체") {
        return ["전체"];
      } else {
        const newSelection = prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category];

        if (newSelection.includes("전체")) {
          return newSelection.filter((c) => c !== "전체");
        }

        if (newSelection.length === 0) {
          return ["전체"];
        }

        return newSelection;
      }
    });
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(0)
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

  // Pagination logic
  const pagesPerGroup = 5;
  const currentGroup = Math.floor(currentPage / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i
  );

  const handlePrevGroup = () => {
    const newPage = Math.max(0, startPage - pagesPerGroup);
    setCurrentPage(newPage);
  };

  const handleNextGroup = () => {
    const newPage = Math.min(totalPages - 1, startPage + pagesPerGroup);
    setCurrentPage(newPage);
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">공지사항 관리</h1>
            <div className="flex items-center gap-4">             
              <Button onClick={() => router.push("/admin/notice/create")} className="bg-purple-600 hover:bg-purple-700">                
                공지사항 작성
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <p className="text-gray-600 mb-4">사용자에게 알리고 싶은 내용을 작성하고 관리할 수 있습니다.</p>

              <div className="mb-6 space-y-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="공지사항 검색"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    <Search className="h-4 w-4 mr-2" />
                    검색
                  </Button>
                </form>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    onClick={() => handleCategoryChange(category)}
                    className={selectedCategories.includes(category) ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">총 {totalCount}건</div>
                <div className="flex items-center gap-2">                 
                  <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-md z-50">
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                ) : notices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      {searchKeyword ? "검색 결과가 없습니다." : "등록된 공지사항이 없습니다."}
                    </TableCell>
                  </TableRow>
                ) : (
                  notices.map((notice) => (
                    <TableRow key={notice.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{notice.category}</TableCell>
                      <TableCell>
                        <Link href={`/admin/notice/${notice.id}`} className="text-blue-600 hover:underline">
                          {notice.title}
                        </Link>
                      </TableCell>
                      <TableCell className="text-gray-600">{formatDate(notice.createdAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={notice.isActive ? "default" : "secondary"}
                          className={notice.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {notice.isActive ? "활성" : "비활성"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {totalPages > 0 && (
              <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFirstPage}
                  disabled={currentPage === 0}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevGroup}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {pageNumbers.map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {pageNum + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextGroup}
                  disabled={currentPage >= totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLastPage}
                  disabled={currentPage >= totalPages - 1}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            )}
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
    </div>
  )
}