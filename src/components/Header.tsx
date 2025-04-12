"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [selected, setSelected] = useState(""); // 선택된 버튼

  const menus = [
    "위드프로젝트",
    "위드커넥데이",
    "위드뉴스레터",
    "위드GIG",
    "커넥플소개",
    "고객센터",
  ];

  return (
    <header className="header-padding shadow-md">
      <nav className="grid grid-cols-7 items-center gap-4">
        {/* 로고 */}
        <div className="col-span-1 flex items-center justify-center h-[64px]">
          <Link href="/" className="block w-[70%] h-[70%] relative" onClick={() => setSelected("")}>
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </Link>
        </div>

        {/* 메뉴 버튼들 */}
        <div className="col-span-6 grid grid-cols-6">
          {menus.map((text) => {
            const isSelected = selected === text;

            return (
              <div key={text} className="group relative">
                <button
                  onClick={() => setSelected(text)}
                  className={`w-full px-4 py-8 font-bold transition duration-300 ease-in-out
                                ${
                                  isSelected
                                    ? "bg-purple-900 text-white"
                                    : "bg-white text-gray-800 hover:bg-purple-200"
                                }
                                cursor-pointer
                                hover:opacity-80`}
                >
                  {text}
                </button>

                {/* 화살표: 선택된 경우만 보임 */}
                {isSelected && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 transform
                                                    w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px]
                                                    border-l-transparent border-r-transparent border-b-purple-900"
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
