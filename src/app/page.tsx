import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* 배경 이미지 섹션 */}
      <section className="relative w-full aspect-video">
        {/* 꽉 찬 배경 이미지 */}
        <Image
          src="/picture4.svg" // public 폴더에 넣은 이미지 경로
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
        {/* 중앙 텍스트 오버레이 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4">
            당신의 여정이 머무르지 않도록,
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            우리는 길을 만듭니다
          </h1>
        </div>

        {/* 하단 로고 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform w-24 sm:w-28 md:w-32 lg:w-36 h-8 sm:h-10 md:h-12 lg:h-14">
          <Image src="/logo.png" alt="Logo-white" fill className="object-contain" />
        </div>
      </section>
    </main>
  );
}
