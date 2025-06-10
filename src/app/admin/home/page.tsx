"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X } from "lucide-react"
import AdminSidebar from "@/components/admin-sidebar"

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
}

export default function AdminHomePage() {
  const [imageSlides, setImageSlides] = useState<ImageSlide[]>([
    {
      id: 1,
      image: "/sample-image.png",
      title: "2024 데이터산업구역 활용 공동경진대회 시상식",
      description: "이미지 관련 정보를 모두 작성해주세요.",
      organization: "[과학기술정보통신부/한국데이터산업진흥원]",
    },
    {
      id: 2,
      image: "/sample-image.png",
      title: "2024 데이터산업구역 활용 공동경진대회 시상식",
      description: "",
      organization: "[과학기술정보통신부/한국데이터산업진흥원]",
    },
  ])

  const [statItems, setStatItems] = useState<StatItem[]>([
    { id: 1, title: "커넥플과 함께 성장한", subtitle: "고객사 기업 · 기관", count: "12개" },
    { id: 2, title: "커넥플과 함께 성장한", subtitle: "고객사 기업 · 기관", count: "12개" },
    { id: 3, title: "커넥플과 함께 성장한", subtitle: "고객사 기업 · 기관", count: "12개" },
    { id: 4, title: "", subtitle: "", count: "" },
    { id: 5, title: "", subtitle: "", count: "" },
  ])

  const [currentCount] = useState(2)
  const [maxCount] = useState(10)

  const handleAddSlide = () => {
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
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="bg-white flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">홈 관리</h1>
            <div className="text-sm text-gray-600">관리자명</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-8">
              메인 페이지의 슬라이드 이미지와 통계 수치, 메뉴별 메인 링크를 변경할 수 있습니다.
            </p>

            {/* Image Slides Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">
                  홈 화면 소개 이미지 <span className="text-red-500">*</span>
                </h2>
                <span className="text-sm text-gray-500">
                  {currentCount}/{maxCount}
                </span>
              </div>

              {/* Add Image Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                <button
                  onClick={handleAddSlide}
                  className="w-full flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700"
                >
                  <Plus size={20} />
                  <span>이미지 슬라이드 추가</span>
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
                          <Image src={slide.image || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
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
                            />
                            <div className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                              <Plus size={16} />
                              <span>이미지 업로드</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveSlide(slide.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
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
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            value={slide.organization}
                            onChange={(e) => handleSlideChange(slide.id, "organization", e.target.value)}
                            maxLength={30}
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="2024 데이터산업구역 활용 공동경진대회 시상식"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            value={slide.title}
                            onChange={(e) => handleSlideChange(slide.id, "title", e.target.value)}
                          />
                        </div>

                        {index === 0 && <p className="text-sm text-red-500">이미지 관련 정보를 모두 작성해주세요.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">등록하기</button>
              </div>
            </div>

            {/* Statistics Section */}
            <div>
              <h2 className="text-lg font-semibold mb-6">
                통계 수치 관리 <span className="text-red-500">*</span>
              </h2>

              <div className="space-y-4">
                {statItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="커넥플과 함께 성장한"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        value={item.title}
                        onChange={(e) => handleStatChange(item.id, "title", e.target.value)}
                      />
                      {index === 0 && <p className="text-sm text-red-500 mt-1">통계정보를 모두 작성해주세요.</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="고객사 기업 · 기관"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        value={item.subtitle}
                        onChange={(e) => handleStatChange(item.id, "subtitle", e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="12개"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        value={item.count}
                        onChange={(e) => handleStatChange(item.id, "count", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">등록하기</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
