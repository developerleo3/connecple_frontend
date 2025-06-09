'use client'

import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <html lang="ko">
      <body className="__className_e8ce0c">
        {!isAdminPage && <Header />}
        {children}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}