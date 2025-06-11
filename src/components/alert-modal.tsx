"use client"

import { X } from "lucide-react"

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    message: string
    type?: "info" | "warning" | "error" | "success"
}

export default function AlertModal({ isOpen, onClose, title, message, type = "info" }: AlertModalProps) {
    if (!isOpen) return null

    const getIconColor = () => {
        switch (type) {
            case "warning":
                return "text-yellow-500"
            case "error":
                return "text-red-500"
            case "success":
                return "text-green-500"
            default:
                return "text-blue-500"
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 text-center">{message}</p>
                </div>

                <div className="flex justify-center">
                    <button onClick={onClose} className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}
