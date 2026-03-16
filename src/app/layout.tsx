import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "@/components/auth-provider";
import LayoutClient from "./LayoutClient";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.connecple.com"),
    title: {
        default: "커넥플 | 사람과 사회를 연결하다",
        template: "%s | 커넥플",
    },
    description: "커넥플은 사람과 사회를 연결하는 플랫폼입니다.",
    openGraph: {
        title: "커넥플 | 사람과 사회를 연결하다",
        description: "커넥플은 사람과 사회를 연결하는 플랫폼입니다.",
        url: "https://www.connecple.com",
        siteName: "커넥플",
        locale: "ko_KR",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body className="__className_e8ce0c">
        <AuthProvider>
            <LayoutClient>{children}</LayoutClient>
        </AuthProvider>
        </body>
        </html>
    );
}