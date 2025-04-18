"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname(); // 현재 경로 확인용
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menus = [
    { text: "위드프로젝트", path: "/with-project" },
    { text: "위드커넥데이", path: "/with-connectday" },
    { text: "위드뉴스레터", path: "/with-newsletter" },
    { text: "위드GIG", path: "/with-gig" },
    { text: "커넥플소개", path: "/about" },
    { text: "고객센터", path: "/support" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const menuEl = menuRef.current;
      const buttonEl = menuButtonRef.current;

      if (
        menuEl &&
        !menuEl.contains(target) &&
        buttonEl &&
        !buttonEl.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <header className="header-padding shadow-md bg-white">
      <nav className="flex items-center justify-between lg:grid lg:grid-cols-7 lg:gap-4">
        {/* 로고 */}
        <div className="relative w-[120px] h-[64px] lg:col-span-1 flex-shrink-0">
          <Link href="/" className="block w-full h-full relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </Link>
        </div>

        {/* 햄버거 버튼 (모바일에서만 보임) */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative w-8 h-8 flex items-center justify-center z-50 cursor-pointer"
          aria-label="모바일 메뉴 토글"
        >
          {/* 1번째 줄 */}
          <span
            className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out
              ${isMenuOpen ? "rotate-45 top-1/2" : "-translate-y-2"}`}
          />
          {/* 2번째 줄 */}
          <span
            className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out
              ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          {/* 3번째 줄 */}
          <span
            className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out
              ${isMenuOpen ? "-rotate-45 top-1/2" : "translate-y-2"}`}
          />
        </button>

        {/* 데스크탑 메뉴 */}
        <div className="hidden lg:grid col-span-6 grid-cols-6">
          {menus.map(({ text, path }) => {
            const isSelected = pathname === path;

            return (
              <div key={text} className="group relative">
                <Link
                  href={path}
                  className={`block text-center w-full px-4 py-8 font-bold transition duration-300 ease-in-out
                    ${
                      isSelected
                        ? "bg-purple-900 text-white"
                        : "bg-white text-gray-800 hover:bg-purple-200"
                    }
                    hover:opacity-80`}
                >
                  {text}
                </Link>

                {/* 화살표: 선택된 경우만 보임 */}
                {isSelected && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 transform
                      w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px]
                      border-l-transparent border-r-transparent border-t-[#59168b]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={
            `lg:hidden overflow-hidden bg-white border-t border-gray-200 px-4 shadow transition-all duration-300 ease-in-out cursor-pointer
              ${isMenuOpen ? "max-h-[500px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`
            }
        >
          {menus.map(({ text, path }) => {
            const isSelected = pathname === path;
            return (
              <Link
                key={text}
                href={path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 font-bold border-b border-gray-100 transition cursor-pointer
                  ${
                    isSelected
                      ? "bg-purple-900 text-white"
                      : "bg-white text-gray-800 hover:bg-purple-200"
                  }
                    hover:opacity-80`}
              >
                {text}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
