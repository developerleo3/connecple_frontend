"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import LoadingSpinner from "@/components/loading-spinner"

interface IntroImage {
  id: number
  imageUrl: string
  order: number
}

interface Stats {
  totalProjects: number
  totalMembers: number
  totalEvents: number
  totalNewsletters: number
}

export function DataView() {
  const [introImages, setIntroImages] = useState<IntroImage[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 소개 이미지 데이터 조회
        const imagesResponse = await fetch(`${API_BASE_URL}/admin/main-intro-images`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json()
          setIntroImages(imagesData)
        }

        console.log(imagesResponse)

        // 통계 수치 데이터 조회
        const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }

        console.log(statsResponse)

      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.")
        console.error("데이터 조회 오류:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="space-y-8">
      {/* 소개 이미지 섹션 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">소개 이미지</h2>
          {introImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {introImages.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.imageUrl}
                    alt={`소개 이미지 ${image.order}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                    순서: {image.order}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">등록된 소개 이미지가 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 통계 수치 섹션 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">통계 수치</h2>
          {stats ? (
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <p className="text-gray-600">총 프로젝트</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalProjects}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <p className="text-gray-600">총 회원</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalMembers}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <p className="text-gray-600">총 이벤트</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalEvents}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <p className="text-gray-600">총 뉴스레터</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalNewsletters}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">통계 데이터가 없습니다.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 