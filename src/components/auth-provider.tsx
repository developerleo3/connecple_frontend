"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import LoginRequiredModal from "./login-required-modal"

interface AuthContextType {
    isAuthenticated: boolean
    checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    checkAuth: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const checkAuth = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/session-check`, {
                credentials: "include",
            })

            if (!response.ok) {
                setIsAuthenticated(false)
                if (pathname?.startsWith("/admin") && pathname !== "/admin") {
                    router.push("/admin")
                }
                return
            }

            const isAdmin = await response.json()
            setIsAuthenticated(isAdmin)

            if (!isAdmin && pathname?.startsWith("/admin") && pathname !== "/admin") {
                router.push("/admin")
            }
        } catch (error) {
            console.error("Auth check failed:", error)
            setIsAuthenticated(false)
            if (pathname?.startsWith("/admin") && pathname !== "/admin") {
                router.push("/admin")
            }
        }
    }

    useEffect(() => {
        // 로그인 페이지가 아닌 관리자 페이지에서만 체크
        if (pathname?.startsWith("/admin") && pathname !== "/admin" && !isAuthenticated) {
            checkAuth()
        }
    }, [pathname, isAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
            {children}
            <LoginRequiredModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 