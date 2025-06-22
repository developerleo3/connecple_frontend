'use client'

import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/components/auth-provider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <html lang="ko">
      <body className="__className_e8ce0c">
        <AuthProvider>
          {!isAdminPage && <Header />}
          {children}
          {!isAdminPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  )
}