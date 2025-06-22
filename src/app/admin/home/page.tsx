"use client"

import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"
import AlertModal from "@/components/alert-modal"
import { ConfirmModal } from "@/components/confirm-modal"
import LoginRequiredModal from "@/components/login-required-modal"

// API 응답 타입 정의
interface ImageSlideResponse {
  id: number
  imagePath: string
  sortOrder?: number
  title: string
  company: string
}

interface StatItemResponse {
  statsName: string
  statistic: number
  unit: string
  sortOrder?: number
}

// 컴포넌트 내부에서 사용할 타입 정의
interface ImageSlide {
  id: number
  image: string
  title: string
  description: string
  organization: string
}

interface StatItem {
  id: number
  title: string
  subtitle: string
  count: string
  sortOrder?: number
}

interface StatisticData {
  statsName: string
  statistic: number
  unit: string
  sortOrder: number
}

// 유효성 검사 상태 타입
interface ValidationErrors {
  [key: number]: {
    title: boolean
    subtitle: boolean
    count: boolean
  }
}

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminHomePage() {
  const [imageSlides, setImageSlides] = useState<ImageSlide[]>([])
  const [statItems, setStatItems] = useState<StatItem[]>([
    { id: 1, title: "", subtitle: "", count: "" },
    { id: 2, title: "", subtitle: "", count: "" },
    { id: 3, title: "", subtitle: "", count: "" },
    { id: 4, title: "", subtitle: "", count: "" },
    { id: 5, title: "", subtitle: "", count: "" },
  ])

  const [statistics, setStatistics] = useState<StatisticData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 유효성 검사 상태 추가
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

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

  const maxCount = 10
  const currentCount = imageSlides.length

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // 이미지 슬라이드 데이터 가져오기
        const slidesResponse = await fetch(`${API_BASE_URL}/admin/main-intro-images`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (slidesResponse.ok) {
          const slidesData = await slidesResponse.json()
          if (slidesData && Array.isArray(slidesData) && slidesData.length > 0) {
            const mappedSlides = slidesData.map((item: ImageSlideResponse) => ({
              id: item.id,
              image: item.imagePath,
              title: item.title,
              sortOrder: item.sortOrder,
              description: "",
              organization: item.company,
            }))

            mappedSlides.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            setImageSlides(mappedSlides)
          }
        }

        // 통계 수치 데이터 가져오기
        const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (statsResponse.ok) {
          const { data } = await statsResponse.json()
          if (data && Array.isArray(data)) {
            const mappedStats = data.map((item: StatisticData, index: number) => ({
              id: index + 1,
              title: item.statsName,
              subtitle: item.statistic.toString(),
              count: item.unit,
              sortOrder: item.sortOrder,
            }))

            mappedStats.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
            const filledStats = [...mappedStats]
            while (filledStats.length < 5) {
              filledStats.push({
                id: filledStats.length + 1,
                title: "",
                subtitle: "",
                count: "",
                sortOrder: 0,
              })
            }
            setStatItems(filledStats.slice(0, 5))
          }
        }
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error)
        setError(error instanceof Error ? error.message : "데이터를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // 에러 처리
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

  const handleAddSlide = () => {
    if (currentCount >= maxCount) {
      setAlertModal({
        isOpen: true,
        title: "홈 화면 이미지",
        message: "홈화면 이미지는 최대 10개까지 첨부 가능합니다.",
        type: "warning",
      })
      return
    }

    const newSlide: ImageSlide = {
      id: Date.now(),
      image: "",
      title: "",
      description: "",
      organization: "",
    }
    setImageSlides([...imageSlides, newSlide])
  }

  const handleRemoveSlide = (id: number) => {
    setImageSlides(imageSlides.filter((slide) => slide.id !== id))
  }

  const handleImageUpload = (id: number, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSlides(
        imageSlides.map((slide) => (slide.id === id ? { ...slide, image: e.target?.result as string } : slide)),
      )
    }
    reader.readAsDataURL(file)
  }

  const handleSlideChange = (id: number, field: keyof ImageSlide, value: string) => {
    setImageSlides(imageSlides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)))
  }

  const handleStatChange = (id: number, field: keyof StatItem, value: string) => {
    setStatItems(statItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))

    // 입력 시 해당 필드의 오류 상태 제거
    if (validationErrors[id]) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: false,
        },
      }))
    }
  }

  // 통계 수치 유효성 검사 함수
  const validateForm = () => {
    const newErrors: ValidationErrors = {}

    // 각 항목의 필수 입력값 검사
    statItems.forEach((item, index) => {
      const itemErrors = {
        title: !item.title.trim(),
        subtitle: !item.subtitle.trim(),
        count: !item.count.trim(),
      }

      if (itemErrors.title || itemErrors.subtitle || itemErrors.count) {
        newErrors[index] = itemErrors
      }
    })

    setValidationErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveSlides = () => {
    // 유효성 검사 실행 - 모달창 표시 없이 오류 상태만 설정
    validateForm()

    // 실제로 저장할 데이터만 필터링 (모든 필드가 채워진 항목만)
    const validStatItems = statItems.filter((item) => item.title.trim() && item.subtitle.trim() && item.count.trim())

    if (validStatItems.length === 0) {
      // 모든 항목이 비어있는 경우에만 모달 표시
      setAlertModal({
        isOpen: true,
        title: "입력 오류",
        message: "최소 하나의 통계 항목을 완전히 입력해주세요.",
        type: "warning",
      })
      return
    }

    if (imageSlides.length === 0) {
      setAlertModal({
        isOpen: true,
        title: "홈 화면 이미지",
        message: "홈 화면 이미지는 최소 1개 이상 있어야 합니다.",
        type: "warning",
      })
      return
    }

    // 필수 필드 검증
    const hasEmptyFields = imageSlides.some((slide) => !slide.image || !slide.title || !slide.organization)
    if (hasEmptyFields) {
      setAlertModal({
        isOpen: true,
        title: "입력 오류",
        message: "모든 이미지에 대해 이미지, 기관명, 사업명을 입력해주세요.",
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
          // API 요청 데이터 형식에 맞게 변환
          const requestData = imageSlides.map((slide, index) => ({
            id: slide.id,
            imagePath: slide.image,
            sortOrder: index + 1,
            title: slide.title,
            company: slide.organization,
          }))

          const response = await fetch(`${API_BASE_URL}/admin/main-intro-images`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          })

          if (response.ok) {
            setAlertModal({
              isOpen: true,
              title: "성공",
              message: "이미지 슬라이드가 성공적으로 등록되었습니다.",
              type: "success",
            })
          } else {
            throw new Error("이미지 슬라이드 저장에 실패했습니다.")
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "이미지 슬라이드 저장에 실패했습니다.")
        } finally {
          setIsLoading(false)
          setConfirmModal({ ...confirmModal, isOpen: false })
        }
      },
    })
  }

  const handleSaveStats = async () => {
    if (statItems.length !== 5) {
      setAlertModal({
        isOpen: true,
        title: "입력 오류",
        message: "정확히 5개의 통계를 입력해주세요.",
        type: "warning"
      })
      return
    }

    if (!validateForm()) return

    setConfirmModal({
      isOpen: true,
      title: "등록하기",
      message: "입력하신 정보로\n홈 화면에 통계수치를 등록하시겠습니까?",
      action: async () => {
        setIsLoading(true)
        try {
          const requestData = statItems.map((item) => ({
            statsName: item.title,
            statistic: parseInt(item.subtitle),
            unit: item.count,
            sortOrder: item.sortOrder || 0,
          }))

          const response = await fetch(`${API_BASE_URL}/admin/stats`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ statsList: requestData }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "통계수치 등록에 실패했습니다")
          }

          setAlertModal({
            isOpen: true,
            title: "등록 완료",
            message: "통계수치를 등록하였습니다.",
            type: "success",
          })
        } catch (error) {
          setAlertModal({
            isOpen: true,
            title: "등록 실패",
            message: "적절한 수치 값을 입력해 주세요",
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
      },
    })
  }

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="bg-gray flex-1 p-6">
        {/* Header */}
        <div className="bg-gray border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black">홈 관리</h1>
          </div>
          <p className="text-gray-600 pt-4">메인 페이지의 슬라이드 이미지와 통계 수치, 메뉴별 메인 링크를 변경할 수 있습니다.</p>
        </div>

        {/* Main Content */}
        <div className="p-8 pt-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        
            {/* Image Slides Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-black">
                  홈 화면 소개 이미지 <span className="text-red-500">*</span>
                </h2>
                <span className="text-sm text-gray-500">
                  {currentCount}/{maxCount}
                </span>
              </div>

              {/* Add Image Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 hover:cursor-pointer hover:border-purple-600">
                <button
                  onClick={handleAddSlide}
                  className="w-full flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 hover:cursor-pointer"
                  disabled={isLoading}
                >
                  <Plus size={20} />
                  <span className="hover:cursor-pointer">이미지 슬라이드 추가</span>
                </button>
              </div>

              {/* Image Slides */}
              {imageSlides.map((slide, index) => (
                <div key={slide.id} className="border border-gray-200 rounded-lg p-6 mb-4">
                  <div className="flex gap-4">
                    {/* Drag Handle */}
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400 cursor-move">↕</div>
                    </div>

                    {/* Image Preview */}
                    <div className="relative">
                      <div className="w-[280px] h-[160px] bg-gray-100 rounded-lg overflow-hidden relative">
                        {slide.image ? (
                          <img
                            src={slide.image || "/logo_header.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">이미지 없음</span>
                          </div>
                        )}

                        {/* Upload Button Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(slide.id, file)
                              }}
                              disabled={isLoading}
                            />
                            <div className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                              <Plus size={16} />
                              <span>{isLoading ? "업로드중..." : "이미지 업로드"}</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveSlide(slide.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 hover:cursor-pointer"
                        disabled={isLoading}
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">사이즈: 1250x720px 권장 치수입니다.</p>
                        <p className="text-sm text-gray-500 mb-4">
                          파일이 업로드되는 순서에 맞춰 슬라이드가 보여지며, 비율이 일정하지 않는 경우 잘리거나 찌그러질
                          수 있습니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="기관명 (최대 30자)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={slide.organization}
                            onChange={(e) => handleSlideChange(slide.id, "organization", e.target.value)}
                            maxLength={30}
                            disabled={isLoading}
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="사업명 (최대 100자)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={slide.title}
                            onChange={(e) => handleSlideChange(slide.id, "title", e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={handleSaveSlides}
                  disabled={isLoading}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 hover:cursor-pointer"
                >
                  {isLoading ? "저장중..." : "등록하기"}
                </button>
              </div>
            </div>

            {/* Statistics Section */}
            <div>
              <h2 className="text-lg font-semibold mb-6 text-black">
                통계 수치 관리 <span className="text-red-500">*</span>
              </h2>

              <div className="space-y-6">
                {statItems.map((item, index) => {
                  const hasError = validationErrors[index]
                  const hasAnyValue = item.title.trim() || item.subtitle.trim() || item.count.trim()
                  const showError = hasError && (hasError.title || hasError.subtitle || hasError.count)

                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">통계 {index + 1}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <input
                            type="text"
                            placeholder="제목"
                            className={`w-full rounded-lg px-3 py-2 text-sm border ${
                              hasError?.title
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-transparent focus:ring-purple-500"
                            } focus:outline-none focus:ring-2`}
                            value={item.title}
                            onChange={(e) => handleStatChange(item.id, "title", e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="수치"
                            className={`w-full rounded-lg px-3 py-2 text-sm border ${
                              hasError?.subtitle
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-transparent focus:ring-purple-500"
                            } focus:outline-none focus:ring-2`}
                            value={item.subtitle}
                            onChange={(e) => handleStatChange(item.id, "subtitle", e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="단위"
                            className={`w-full rounded-lg px-3 py-2 text-sm border ${
                              hasError?.count
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-transparent focus:ring-purple-500"
                            } focus:outline-none focus:ring-2`}
                            value={item.count}
                            onChange={(e) => handleStatChange(item.id, "count", e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      {showError && <p className="text-sm text-red-500 mt-1">통계정보를 모두 작성해주세요.</p>}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleSaveStats}
                  disabled={isLoading}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 hover:cursor-pointer"
                >
                  {isLoading ? "저장중..." : "등록하기"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}
