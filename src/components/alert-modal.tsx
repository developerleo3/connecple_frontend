"use client"

import { X } from "lucide-react"

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm?: () => void
    title: string
    message: string
    type: "info" | "warning" | "error" | "success"
    showCancel?: boolean
}

export default function AlertModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type,
    showCancel = false,
}: AlertModalProps) {
    if (!isOpen) return null

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-50 text-green-800"
            case "error":
                return "bg-red-50 text-red-800"
            case "warning":
                return "bg-yellow-50 text-yellow-800"
            default:
                return "bg-blue-50 text-blue-800"
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className={`p-4 rounded-lg ${getTypeStyles()}`}>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm">{message}</p>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    {showCancel && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            취소
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (onConfirm) {
                                onConfirm()
                            }
                            onClose()
                        }}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                            type === "error"
                                ? "bg-red-600 hover:bg-red-700"
                                : type === "success"
                                ? "bg-green-600 hover:bg-green-700"
                                : type === "warning"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {type === "warning" ? "확인" : "닫기"}
                    </button>
                </div>
            </div>
        </div>
    )
}
