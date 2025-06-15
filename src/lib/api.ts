// API 설정 파일
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// 통계 데이터 인터페이스
interface StatItem {
  statsName: string
  statistic: number
  unit: string
  sortOrder: number
}

interface StatsRequest {
  statsList: StatItem[]
}

// API 엔드포인트 설정
export const API_ENDPOINTS = {
  // 이미지 슬라이드 관련
  // 통계 수치 관련
  STATS: {
    GET: `${API_BASE_URL}/admin/stats`,
    POST: `${API_BASE_URL}/admin/stats`,
    PUT: (id: number) => `${API_BASE_URL}/admin/stats/${id}`,
  },
  // 소개 이미지 관련
  INTRO_IMAGES: {
    GET: `${API_BASE_URL}/admin/main-intro-images`,
    POST: `${API_BASE_URL}/admin/main-intro-images`,
    PUT: (id: number) => `${API_BASE_URL}/admin/main-intro-images/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/admin/main-intro-images/${id}`,
  },
  // 이미지 업로드
  UPLOAD: `${API_BASE_URL}/admin/upload`,
  // 관리자 로그인
  ADMIN: {
    LOGIN: `${API_BASE_URL}/admin/login`,
  },
}

// API 호출 헬퍼 함수
export async function apiCall(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // 필요시 인증 토큰 추가
        // "Authorization": `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API Call Error:", error)
    throw error
  }
}

// 이미지 업로드 함수
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("image", file)

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("이미지 업로드에 실패했습니다.")
    }

    const data = await response.json()
    return data.imageUrl // 서버에서 반환하는 이미지 URL
  } catch (error) {
    console.error("Image Upload Error:", error)
    throw error
  }
}

// 통계 데이터 저장 함수
export async function saveStats(statsList: StatItem[]): Promise<void> {
  const payload: StatsRequest = {
    statsList: statsList
  }

  try {
    const response = await fetch(API_ENDPOINTS.STATS.POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('통계 데이터 저장에 실패했습니다.')
    }

    return await response.json()
  } catch (error) {
    console.error('Stats Save Error:', error)
    throw error
  }
}

import { useAuth } from "@/components/auth-provider"

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message)
        this.name = "ApiError"
    }
}

export interface ApiResponse<T> {
    data: T
    message: string
    status: number
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`

    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    })

    if (response.status === 401) {
        // 세션 만료 또는 인증 실패
        alert("세션이 만료되었습니다. 로그인 페이지로 이동합니다.")
        window.location.href = "/admin"
        throw new ApiError(401, "인증이 필요합니다.")
    }

    if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    return response.json()
}
