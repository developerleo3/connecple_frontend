// src/components/ComingSoon.tsx
"use client";

import Image from "next/image";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4 text-black">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-12">
        <Image
          src="/circle-check.svg"
          alt="Check Icon"
          fill
          className="object-contain"
        />
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
        {title}
      </h1>

      <p className="text-xl sm:text-2xl md:text-3xl mb-3">
        서비스를 준비중입니다!
      </p>
      <p className="text-xl sm:text-2xl md:text-3xl mb-8">
        빠른 시일 내에 오픈하겠습니다.
      </p>

      <p className="text-xl sm:text-2xl md:text-3xl">감사합니다.</p>
    </div>
  );
}
