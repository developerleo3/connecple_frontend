"use client";

import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import LoadingSpinner from "@/components/loading-spinner";
import Link from "next/link";
import AlertModal from "@/components/alert-modal";
import FloatingSnsFab from "@/components/FloatingSnsFab";

// URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// 인터페이스
interface Faq {
    id: number
    category: string
    question: string
    fileCount: number
    createdAt: string
}
interface FaqListResponse {
    faqs: Faq[]
    totalCount: number
    page: number
    size: number
    totalPages: number
}
interface Notice {
    id: number
    category: string
    title: string
    fileCount: number
    createdAt: string
}
interface NoticeListResponse {
    notices: Notice[]
    totalCount: number
    page: number
    size: number
    totalPages: number
}

// API 에러
class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message)
        this.name = "ApiError"
    }
}

// API 호출 설정
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

// FAQ 조회
const getFaqs = async (page: number, size: number, keyword?: string, categories?: string[]): Promise<FaqListResponse> => {
    const queryParams: string[] = [];

    if (keyword) {
        queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    }

    // 카테고리 필터링 추가: '전체'가 아닐 경우에만 추가
    if (categories && categories.length > 0 && !categories.includes("전체")) {
        categories.forEach(cat => {
            queryParams.push(`category=${encodeURIComponent(cat)}`);
        });
    }

    queryParams.push(`page=${page}`);
    queryParams.push(`size=${size}`);
    queryParams.push(`sortBy=createdAt`);

    let endpoint = `/client/faqs`;
    // If keyword is present, use search endpoint
    if (keyword) {
        endpoint = `/client/faqs/search`;
    }

    if (queryParams.length > 0) {
        endpoint += `?${queryParams.join('&')}`;
    }

    return fetchApi<FaqListResponse>(endpoint);
}

const getNotices = async (page: number, size: number, keyword?: string, categories?: string[]): Promise<NoticeListResponse> => {
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

    let endpoint = `/client/notices`;
    if (keyword) {
        endpoint = `/client/notices/search`;
    }

    if (queryParams.length > 0) {
        endpoint += `?${queryParams.join('&')}`;
    }

    return fetchApi<NoticeListResponse>(endpoint);
}

// 카테고리
const CATEGORIES = ["전체", "위드프로젝트", "위드커넥데이", "위드뉴스레터", "위드GIG", "기타"]

// 페이지 수 옵션
const PAGE_SIZE_OPTIONS = [
    {value: "10", label: "10개씩 보기"},
    {value: "30", label: "30개씩 보기"},
    {value: "50", label: "50개씩 보기"},
]

export default function SupportPage() {
    const [selected, setSelected] = useState<'notice' | 'faq'>('notice');

    const [faqs, setFaqs] = useState<Faq[]>([])             // FAQ
    const [notices, setNotices] = useState<Notice[]>([])    // 공지사항
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState("")
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

    const fetchFaqs = async () => {
        try {
            setLoading(true)
            const response = await getFaqs(currentPage, pageSize, searchKeyword, selectedCategories)

            if (response) {
                setFaqs(response.faqs)
                setTotalPages(response.totalPages)
                setTotalCount(response.totalCount)
            }

        } catch (error) {
            console.error("Failed to fetch FAQs:", error)
            setAlertModal({
                isOpen: true,
                title: "오류",
                message: "FAQ를 불러오는데 실패했습니다.",
                type: "error",
            })
            setFaqs([])
            setTotalCount(0)
            setTotalPages(0)
        } finally {
            setLoading(false)
        }
    }

    const fetchNotices = async () => {
        try {
            setLoading(true)
            const response = await getNotices(currentPage, pageSize, searchKeyword, selectedCategories)

            if (response) {
                setNotices(response.notices)
                setTotalPages(response.totalPages)
                setTotalCount(response.totalCount)
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
        fetchFaqs()
    }, [currentPage, pageSize, selectedCategories])

    useEffect(() => {
        fetchNotices()
    }, [currentPage, pageSize, selectedCategories])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(0)
        fetchFaqs()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setCurrentPage(0)
            fetchFaqs()
        }
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) => {
            if (category === "전체") {
                // '전체'를 선택하면 다른 모든 카테고리 선택 해제하고 '전체'만 선택
                return ["전체"];
            } else {
                // '전체'가 아닌 다른 카테고리를 선택
                const newSelection = prev.includes(category)
                    ? prev.filter((c) => c !== category) // 이미 선택된 경우 해제
                    : [...prev, category]; // 선택되지 않은 경우 추가

                // 만약 '전체'가 선택되어 있다면 해제
                if (newSelection.includes("전체")) {
                    return newSelection.filter((c) => c !== "전체");
                }

                // 모든 카테고리가 해제되면 자동으로 '전체' 선택
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
        {length: endPage - startPage},
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
        <main>
            <section className="flex flex-col w-full h-auto px-[20px] mt-[58px] mb-[30px] lg:mt-[144px] lg:px-[100px] lg:mb-[200px]">
                <h1 className="text-center
                        text-[18px] font-black
                        lg:text-[30px] lg:font-extrabold">
                    고객센터
                </h1>
                {/* 버튼 UI */}
                <div className="flex flex-row w-full h-auto justify-between items-center
                    mt-[24px] gap-x-[20px] lg:mt-[48px] lg:gap-x-[39px]">
                    <button onClick={() => setSelected('notice')}
                            className={`flex w-full h-full justify-center items-center font-black border-b-[1px] lg:border-b-[2px] hover:scale-110 transition
                        ${selected === 'notice' ? 'text-[#541E80]' : 'text-[#B3B3B3]'}
                        text-[10px] pb-[5px] lg:text-[25px] lg:pb-[17px] cursor-pointer`}
                    >
                        공지사항
                    </button>
                    <button onClick={() => setSelected('faq')}
                            className={`flex w-full h-full justify-center items-center font-black border-b-[1px] lg:border-b-[2px] hover:scale-110 transition
                        ${selected === 'faq' ? 'text-[#541E80]' : 'text-[#B3B3B3]'}
                        text-[10px] pb-[5px] lg:text-[25px] lg:pb-[17px] cursor-pointer`}
                    >
                        FAQ
                    </button>
                </div>
                {/* 탭 콘텐츠 영역 */}
                <div className="w-full h-auto mt-[22px] lg:mt-[44px]">
                    <div className="mx-auto">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 pb-3">
                                <div className="mb-6 space-y-4">
                                    <form onSubmit={handleSearch} className="flex gap-4">
                                        <div className="flex-1">
                                            <Input
                                                type="text"
                                                placeholder="제목 또는 내용을 입력해주세요."
                                                value={searchKeyword}
                                                onChange={(e) => setSearchKeyword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent border border-gray-300 shadow-md"
                                            />
                                        </div>
                                        <Button type="submit" className="bg-[#541E80] hover:bg-purple-700 text-white font-bold hover:cursor-pointer">
                                            <Search className="h-4 w-4 mr-2"/>
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
                                            className={selectedCategories.includes(category) ? "bg-[#541E80] hover:bg-purple-700 text-white border-purple-600 ring-2 ring-purple-400 ring-opacity-50 hover:cursor-pointer"
                                                : "text-gray-500 border-gray-200 hover:bg-gray-200 hover:cursor-pointer shadow-sm"}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <div className="text-base font-bold text-gray-400">총 {totalCount}건</div>
                                    <div className="flex items-center gap-2">
                                        <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                                            <SelectTrigger
                                                className="w-30 border border-gray-200 shadow-md hover:cursor-pointer">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent
                                                className="bg-white shadow-lg border border-gray-200 rounded-md z-50 w-30">
                                                {PAGE_SIZE_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}
                                                                className="hover:bg-gray-200 hover:cursor-pointer">
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            {/* 공지사항 리스트 */}
                            {selected === 'notice' && (
                                <Table>
                                    <TableHeader className="bg-[#541E80]">
                                        <TableRow>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">카테고리</TableHead>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">제목</TableHead>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">작성일자</TableHead>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">파일갯수</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center py-8">
                                                    <LoadingSpinner />
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
                                                <TableRow key={notice.id} className="hover:bg-gray-50 border-t border-gray-200">
                                                    <TableCell className="text-gray-600 font-medium text-base text-center align-middle py-3">{notice.category}</TableCell>
                                                    <TableCell className="text-center py-3">
                                                        <Link href={`/support/notices/${notice.id}`} className="text-base text-blue-600 hover:underline">
                                                            {notice.title}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="text-gray-600 text-base text-center align-middle py-3">{formatDate(notice.createdAt)}</TableCell>
                                                    <TableCell className="text-gray-600 font-medium text-base text-center align-middle py-3">{notice.fileCount}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                            {selected === 'faq' && (
                                <Table>
                                    <TableHeader className="bg-[#541E80]">
                                        <TableRow>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">카테고리</TableHead>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">질문</TableHead>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">작성일자</TableHead>
                                            <TableHead className="text-white text-base font-medium text-center align-middle py-3">파일갯수</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center py-8">
                                                    <LoadingSpinner/>
                                                </TableCell>
                                            </TableRow>
                                        ) : faqs.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                                    {searchKeyword ? "검색 결과가 없습니다." : "등록된 FAQ가 없습니다."}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            faqs.map((faq) => (
                                                <TableRow key={faq.id}
                                                          className="hover:bg-gray-50 border-t border-gray-200">
                                                    <TableCell
                                                        className="text-gray-600 font-medium text-base text-center align-middle py-3">{faq.category}</TableCell>
                                                    <TableCell className="text-center py-3">
                                                        <Link href={`/support/faqs/${faq.id}`}
                                                              className="text-base text-blue-600 hover:underline">
                                                            {faq.question}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell
                                                        className="text-gray-600 text-base text-center align-middle py-3">{formatDate(faq.createdAt)}</TableCell>
                                                    <TableCell
                                                        className="text-gray-600 text-base text-center align-middle py-3">{faq.fileCount}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                            {totalPages > 0 && (
                                <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 hover:cursor-pointer">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleFirstPage}
                                        disabled={currentPage === 0}
                                        className="border border-gray-200 text-gray-600 hover:cursor-pointer"
                                    >
                                        <ChevronsLeft className="h-4 w-4"/>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handlePrevGroup}
                                        disabled={currentPage === 0}
                                        className="border border-gray-200 text-gray-600 hover:cursor-pointer"
                                    >
                                        <ChevronLeft className="h-4 w-4"/>
                                    </Button>

                                    {pageNumbers.map((pageNum) => (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={currentPage === pageNum ? "bg-[#541E80] hover:bg-purple-700 text-white hover:cursor-pointer" : "border border-gray-200 text-gray-600 hover:cursor-pointer"}
                                        >
                                            {pageNum + 1}
                                        </Button>
                                    ))}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNextGroup}
                                        disabled={currentPage >= totalPages - 1}
                                        className="border border-gray-200 text-gray-600 hover:cursor-pointer"
                                    >
                                        <ChevronRight className="h-4 w-4"/>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleLastPage}
                                        disabled={currentPage >= totalPages - 1}
                                        className="border border-gray-200 text-gray-600 hover:cursor-pointer"
                                    >
                                        <ChevronsRight className="h-4 w-4"/>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/*)}*/}
                </div>
            </section>

            <AlertModal
                isOpen={alertModal.isOpen}
                onClose={() => setAlertModal({...alertModal, isOpen: false})}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />

            <FloatingSnsFab
                items={[
                    { name: "Instagram", href: "https://www.instagram.com/cnp.withproject", iconSrc: "/sns/instagram.png" },
                    { name: "newsletter", href: "https://connecple.stibee.com/subscribe", iconSrc: "/sns/newsletter.png" },
                    { name: "naverblog", href: "https://m.blog.naver.com/connecple2022", iconSrc: "/sns/naverblog.png" },
                    { name: "linktree", href: "https://linktr.ee/connecple", iconSrc: "/sns/linktree.png" },
                ]}
                // 위치 커스터마이즈 하고싶으면:
                positionClass="right-3 bottom-3 lg:right-10 lg:bottom-10"
            />
        </main>
    )
}
