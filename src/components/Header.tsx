"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname(); // 현재 경로 확인용

  const menus = [
    { text: "위드프로젝트", path: "/with-project" },
    { text: "위드커넥데이", path: "/with-connectday" },
    { text: "위드뉴스레터", path: "/with-newsletter" },
    { text: "위드GIG", path: "/with-gig" },
    { text: "커넥플소개", path: "/about" },
    { text: "고객센터", path: "/support" },
  ];

  return (
    <header className="header-padding shadow-md bg-white">
      <nav className="grid grid-cols-7 items-center gap-4">
        {/* 로고 */}
        <div className="col-span-1 flex items-center justify-center h-[64px]">
          <Link href="/" className="block w-[120px] h-[64px] relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </Link>
        </div>

        {/* 메뉴 버튼들 */}
        <div className="col-span-6 grid grid-cols-6">
          {menus.map(({ text, path }) => {
            const isSelected = pathname === path;

            return (
              <div key={text} className="group relative">
                <Link
                  href={path}
                  className={`block text-center w-full px-4 py-8 font-bold transition duration-300 ease-in-out
                    ${isSelected ? "bg-purple-900 text-white" : "bg-white text-gray-800 hover:bg-purple-200" }
                    hover:opacity-80`}
                >
                  {text}
                </Link>

                {/* 화살표: 선택된 경우만 보임 */}
                {isSelected && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 transform
                      w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px]
                      border-l-transparent border-r-transparent border-b-purple-900"
                  />
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
