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
            {/* 팝업 컬럼 */}
            <div
                className={`
          className={\`
    absolute left-1/2 -translate-x-1/2
    bottom-5 lg:bottom-18            
    flex flex-col items-center gap-4   
    transition-all duration-200 ease-out
          ${open ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}
        `}
            >
                {/* 반투명 배경 기둥 */}
                {open && (
                    <div
                        className="absolute inset-0 -z-10 w-16
                        left-1/2 -translate-x-1/2 rounded-[24px]
                         bg-[#C0AED1]/50 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.2)]"/>
                )}

                {items.map((it, idx) => (
                    <Link
                        key={it.name}
                        href={it.href}
                        target="_blank"
                        aria-label={it.aria || it.name}
                        className="group relative grid place-items-center w-14 h-14 rounded-full bg-white backdrop-blur hover:scale-105 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                    >
                        <Image
                            src={it.iconSrc}
                            alt={it.name}
                            width={40}
                            height={40}
                            className="object-contain"
                            unoptimized
                        />
                        {/* 살짝 하이라이트 */}
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
                className={`
          grid place-items-center w-16 h-16 rounded-full
          bg-[#C0AED1]/90 backdrop-blur
          shadow-[0_8px_22px_rgba(0,0,0,0.25)]
          ring-1 ring-black/5
          hover:scale-105 active:scale-95 transition
        `}
            >
                {/* 로고/아이콘 (닫힐 때=로고, 열릴 때=X 아이콘 느낌) */}
                <div className={`transition-all ${open ? "opacity-0 scale-75 absolute" : "opacity-100 scale-100"}`}>
                    <Image src="/sns/fab_logo.svg" alt="sns" width={36} height={36} unoptimized/>
                </div>
                <div className={`transition-all ${open ? "opacity-100 scale-100" : "opacity-0 scale-75 absolute"}`}>
                    <Image src="/sns/fab_close.svg" alt="close" width={50} height={50} unoptimized/>
                </div>
            </button>
        </div>
    );
}