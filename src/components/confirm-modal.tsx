"use client"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: React.ReactNode // string -> React.ReactNode
    confirmText?: string
    cancelText?: string
    isLoading?: boolean
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "확인",
    cancelText = "취소",
    isLoading = false,
}: ConfirmModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-center text-base pt-4">{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-4 pt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 border-[#541E80] text-[#541E80] hover:bg-purple-50 hover:cursor-pointer"
                    >
                        {cancelText}
                    </Button>
                    <Button onClick={onConfirm} disabled={isLoading} className="flex-1 bg-[#541E80] hover:bg-purple-700 text-white hover:cursor-pointer">
                        {isLoading ? "처리중..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
