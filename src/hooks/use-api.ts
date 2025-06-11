"use client"

import { useState } from "react"
import { apiCall, API_ENDPOINTS, uploadImage } from "@/lib/api"

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

export function useHomeApi() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    // 통계 수치 저장
    const saveStats = async (stats: StatItem[]) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await apiCall(API_ENDPOINTS.STATS.POST, {
                method: "POST",
                body: JSON.stringify({ stats }),
            })
            return result
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "통계 수치 저장에 실패했습니다."
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    // 이미지 업로드
    const handleImageUpload = async (file: File) => {
        setIsLoading(true)
        setError(null)

        try {
            const imageUrl = await uploadImage(file)
            return imageUrl
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "이미지 업로드에 실패했습니다."
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    // 데이터 불러오기
    const loadData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const [slidesData, statsData] = await Promise.all([
                apiCall(API_ENDPOINTS.INTRO_IMAGES.GET),
                apiCall(API_ENDPOINTS.STATS.GET),
            ])

            return {
                slides: slidesData.slides || [],
                stats: statsData.stats || [],
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "데이터 불러오기에 실패했습니다."
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        saveStats,
        handleImageUpload,
        loadData,
    }
}
