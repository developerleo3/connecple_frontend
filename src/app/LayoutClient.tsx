"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";
import { usePathname } from "next/navigation";

export default function LayoutClient({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isAdminPage = pathname?.startsWith("/admin");

    const useFooter2 = [
        "/with-connecday",
        "/with-newsletter",
        "/with-gig",
        "/about",
    ].some((prefix) => pathname?.startsWith(prefix));

    return (
        <>
            {!isAdminPage && <Header />}
            {children}
            {!isAdminPage && (useFooter2 ? <Footer2 /> : <Footer />)}
        </>
    );
}