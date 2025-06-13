import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AlertModal from "./alert-modal"

interface LoginRequiredModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
    const router = useRouter()

    useEffect(() => {
        if (isOpen) {
            // 1.5초 후에 로그인 페이지로 리다이렉트
            const timer = setTimeout(() => {
                router.push("/admin")
            }, 1500)

            return () => clearTimeout(timer)
        }
    }, [isOpen, router])

    return (
        <AlertModal
            isOpen={isOpen}
            onClose={onClose}
            title="로그인 필요"
            message="로그인이 필요한 서비스입니다.\n잠시 후 로그인 페이지로 이동합니다."
            type="warning"
        />
    )
} 