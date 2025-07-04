'use client'

import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Footer2 from '@/components/Footer2'
import {usePathname} from 'next/navigation'
import {AuthProvider} from '@/components/auth-provider'

export default function RootLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminPage = pathname?.startsWith('/admin')
    const useFooter2 = [
        '/with-connectday',
        '/with-newsletter',
        '/with-gig',
        '/about',
    ].some((prefix) => pathname?.startsWith(prefix));

    return (
        <html lang="ko">
        <body className="__className_e8ce0c">
        <AuthProvider>
            {!isAdminPage && <Header/>}
            {children}
            {!isAdminPage && (useFooter2 ? <Footer2 /> : <Footer />)}
        </AuthProvider>
        </body>
        </html>
    )
}