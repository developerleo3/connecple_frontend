"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";

type SnsItem = {
    name: string;
    href: string;
    iconSrc: string; // /public 경로나 외부 URL
    aria?: string;
};

interface FloatingSnsFabProps {
    items: SnsItem[];
    positionClass?: string; // 위치 커스터마이즈용 (기본: 우측하단)
}

export default function FloatingSnsFab({
                                           items,
                                           positionClass = "right-4 bottom-4 lg:right-8 lg:bottom-8",
                                       }: FloatingSnsFabProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // 바깥 클릭/ESC 닫기
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`fixed z-50 ${positionClass} select-none`}
            aria-live="polite"
        >
            {/* 펼쳐지는 아이콘 컬럼 (Speed Dial) */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 bottom-14 lg:bottom-20 flex flex-col items-center gap-2.5 lg:gap-3.5 transition-all duration-200 ease-out
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}`}
            >
                {/* 기둥 배경 */}
                {open && (<div
                    className="absolute -z-10 left-1/2 -translate-x-1/2 w-12 lg:w-16 inset-y-0 rounded-[24px] bg-[#C0AED1]/50 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.2)]"/>)}

                {items.map((it) => (
                    <Link
                        key={it.name}
                        href={it.href}
                        target="_blank"
                        aria-label={it.aria || it.name}
                        className="group relative grid place-items-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:scale-105 transition"
                    >
                        <Image
                            src={it.iconSrc}
                            alt={it.name}
                            width={40}
                            height={40}
                            unoptimized
                            className="object-contain w-6 h-6 lg:w-9 lg:h-9"
                        />
                        <span
                            className="pointer-events-none absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition"/>
                    </Link>
                ))}
            </div>

            {/* 메인 FAB 버튼 */}
            <button
                type="button"
                aria-label={open ? "SNS 메뉴 닫기" : "SNS 메뉴 열기"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative grid place-items-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#C0AED1]/90 backdrop-blur shadow-[0_8px_22px_rgba(0,0,0,0.25)]
                    ring-1 ring-black/5 hover:scale-105 active:scale-95 transition">
                {/* 닫힘 상태: 로고 */}
                <div
                    className={`transition-all ${open ? "opacity-0 scale-75 absolute" : "opacity-100 scale-100 flex flex-col items-center"}`}>
                    <Image
                        src="/sns/fab_logo.svg"
                        alt="sns"
                        width={36}
                        height={36}
                        unoptimized
                        className="w-7 h-7 lg:w-9 lg:h-9"
                    />
                    {/* 아이콘 밑에 작은 텍스트 */}
                    <span className="mt-0.5 text-[9px] lg:text-xs text-[#541E80] font-black">Click</span>
                </div>

                {/* 열림 상태: X 아이콘 */}
                <div className={`transition-all ${open ? "opacity-100 scale-100" : "opacity-0 scale-75 absolute"}`}>
                    <Image
                        src="/sns/fab_close.svg"
                        alt="close"
                        width={50}
                        height={50}
                        unoptimized
                        className="w-8 h-8 lg:w-[50px] lg:h-[50px]"
                    />
                </div>
            </button>
        </div>
    );
}