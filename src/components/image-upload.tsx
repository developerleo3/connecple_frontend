"use client"
import Image from "next/image"
import { X, Plus } from "lucide-react"

interface ImageUploadProps {
  id: number
  preview: string
  onImageChange: (id: number, file: File) => void
  onRemove: (id: number) => void
  onTitleChange: (id: number, title: string) => void
  onDescriptionChange: (id: number, description: string) => void
  title: string
  description: string
  showError?: boolean
}

export default function ImageUpload({
  id,
  preview,
  onImageChange,
  onRemove,
  onTitleChange,
  onDescriptionChange,
  title,
  description,
  showError = false,
}: ImageUploadProps) {
  const handleFileSelect = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        onImageChange(id, file)
      }
    }
    input.click()
  }

  return (
    <div className="border rounded-lg p-4 mb-4 relative">
      <div className="flex items-center mb-2">
        <span className="mr-2">↕</span>
        <div className="relative w-full max-w-[250px] h-[150px] bg-gray-100 rounded-lg overflow-hidden">
          {preview && (
            <div className="relative w-full h-full">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={handleFileSelect} className="bg-white/80 p-2 rounded-lg">
                  <Plus size={20} />
                  <span>이미지 업로드</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <button onClick={() => onRemove(id)} className="ml-2 p-1 rounded-full bg-black text-white">
          <X size={16} />
        </button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-1">사이즈: 1250x720px 권장 치수입니다.</p>
        <p className="text-sm text-gray-500 mb-4">
          파일이 업로드되는 순서에 맞춰 슬라이드가 보여지며, 비율이 일정하지 않는 경우 잘리거나 찌그러질 수 있습니다.
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="기관명 (최대 30자)"
            className="w-full border rounded-lg p-2"
            value={title}
            onChange={(e) => onTitleChange(id, e.target.value)}
            maxLength={30}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="2024 데이터산업구역 활용 공동경진대회 시상식"
            className="w-full border rounded-lg p-2"
            value={description}
            onChange={(e) => onDescriptionChange(id, e.target.value)}
          />
        </div>

        {showError && <p className="text-sm text-red-500 mt-2">이미지 관련 정보를 모두 작성해주세요.</p>}
      </div>
    </div>
  )
}
