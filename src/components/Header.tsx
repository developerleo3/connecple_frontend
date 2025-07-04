"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname(); // 현재 경로 확인용
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menus = [
    { text: "위드프로젝트", path: "/with-project" },
    { text: "위드커넥데이", path: "/with-connecday" },
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
    };
  }, []);

  const selectedIndex = menus.findIndex(({ path }) => path === pathname);

  return (
    <header className="shadow-md bg-white">
      <nav className="h-[47px] flex items-center justify-between px-5 
        lg:h-[70px] lg:grid lg:grid-cols-7 lg:gap-4 lg:ml-[20px]">
        {/* 로고 */}
        <div className="flex items-center h-full col-span-1">
          <Link href="/" className="block relative">
            <Image
              src="/logo_header.svg"
              alt="Logo"
              width={90}
              height={20}
              className="object-contain lg:w-[160px] lg:h-[36px]"
            />
          </Link>
        </div>

        {/* 햄버거 버튼 (모바일만) */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative flex items-center justify-center w-[20px] h-full z-50 cursor-pointer"
          aria-label="모바일 메뉴 토글"
        >
          <span
            className={`absolute w-[20px] h-[2px] bg-gray-800 transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? "rotate-45 top-1/2" : "-translate-y-[4px]"}`}
          />
          <span
            className={`absolute w-[20px] h-[2px] bg-gray-800 transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute w-[20px] h-[2px] bg-gray-800 transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? "-rotate-45 top-1/2" : "translate-y-[4px]"}`}
          />
        </button>

        {/* 데스크탑 메뉴 (lg 이상) */}
        <div className="hidden col-span-6 h-full relative 
          lg:grid lg:grid-cols-6 lg:ml-[20px] lg:mr-[240px]">
          {/* 움직이는 보라색 배경 */}
          {selectedIndex !== -1 && (
            <motion.div
              layoutId="menu-highlight"
              className="absolute top-0 left-0 z-10 h-full bg-purple-900"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                width: `calc(100% / ${menus.length})`,
                left: `calc(${selectedIndex} * (100% / ${menus.length}))`,
              }}
            />
          )}

          {menus.map(({ text, path }) => {
            const isSelected = pathname === path;
            return (
              <div
                key={text}
                className="group relative flex items-center justify-center"
              >
                <Link
                  href={path}
                  className={`flex items-center justify-center w-full h-full font-extrabold text-[19px] transition duration-300 ease-in-out relative z-20 ${
                    isSelected ? "text-white" : "text-gray-800"
                  }`}
                >
                  {text}
                </Link>

                {/* 움직이는 화살표 */}
                {isSelected && (
                  <motion.div
                    layoutId="menu-arrow"
                    className="absolute top-full left-1/2 -translate-x-1/2 transform
                      w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px]
                      border-l-transparent border-r-transparent border-t-[#59168b]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
          className={`lg:hidden overflow-hidden bg-white border-t border-gray-200 px-4 shadow transition-all duration-300 ease-in-out cursor-pointer
              ${
                isMenuOpen
                  ? "max-h-[500px] opacity-100 pt-4"
                  : "max-h-0 opacity-0 pt-0"
              }`}
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
                      : "bg-white text-gray-800"
                  }`}
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
