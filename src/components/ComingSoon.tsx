// src/components/ComingSoon.tsx
"use client";

import Image from "next/image";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center mt-[10%] bg-white text-center px-4">
      <div className="w-24 h-24 mb-12 relative">
        <Image
          src="/circle-check.svg"
          alt="Check Icon"
          fill
          className="object-contain"
        />
      </div>

      <h1 className="text-5xl font-bold mb-12">{title}</h1>

      <p className="text-4xl mb-3">서비스를 준비중입니다!</p>
      <p className="text-4xl mb-8">빠른 시일 내에 오픈하겠습니다.</p>

      <p className="text-4xl">감사합니다.</p>
    </div>
  );
}