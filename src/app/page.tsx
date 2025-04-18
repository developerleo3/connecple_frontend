"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import AnimatedCounter from '../components/AnimatedCounter';
import { useInView } from "react-intersection-observer";

const slides = [
  {
    src: "/picture1.svg",
    company: "과학기술정보통신부/한국데이터산업진흥원",
    title: "2024 데이터 안심구역 활용<br />공동경진대회 시상식",
  },
  {
    src: "/picture2.svg",
    company: "과학기술정보통신부/한국데이터산업진흥원",
    title: "2024 데이터안심구역 활용<br />공동경진대회 성과발표회",
  },
  {
    src: "/picture3.svg",
    company: "과학기술정보통신부/한국데이터산업진흥원",
    title: "2023 데이터안심구역<br />대전센터 개소식",
  },
  {
    src: "/picture4.svg",
    company: "과학기술정보통신부/한국지능정보사회진흥원",
    title: "2023 SW우수인재 시상식",
  },
  {
    src: "/picture5.svg",
    company: "과학기술정보통신부/한국지능정보사회진흥원",
    title: "2023 SW여성인재 데모데이",
  },
  {
    src: "/picture6.svg",
    company: "국립외교원/국민외교아카데미",
    title: "2024 제 7기 대학생<br />외교연수 과정",
  },
  {
    src: "/picture7.svg",
    company: "국립외교원/국민외교아카데미",
    title: "2024 대국민 특강",
  },
  {
    src: "/picture8.svg",
    company: "국립외교원/국민외교아카데미",
    title: "2024 국민외교아카데미<br />제 6기 서포터스",
  },
  {
    src: "/picture9.svg",
    company: "개인정보보호위원회/한국인터넷진흥원",
    title: "2022 가명정보 전문가 풀<br />워크숍",
  },
  {
    src: "/picture10.svg",
    company: "서울시청",
    title: "2022 서울시청 서울런<br />입시설명회 행사",
  },
];

const storyLabels = [
  { label: "커넥플과 함께<br />성장한 고객사", value: "21개" },
  { label: "커넥플과 함께<br />성공한 프로젝트", value: "34개" },
  { label: "커넥플과 함께<br />기대한 서비스 만족도", value: "97.3%" },
  { label: "커넥플과 함께<br />걸어온 경력보유여성", value: "575명" },
  { label: "커넥플과 함께<br />재도약에 성공한<br />경력보유여성", value: "81명" },
];

export default function Home() {
  const { ref: counterSectionRef, inView } = useInView({
    triggerOnce: true,  // 한 번만 실행
    threshold: 0.3,     // 30% 보이면 발동
  });

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
          <Image
            src="/logo.png"
            alt="Logo-white"
            fill
            className="object-contain"
          />
        </div>
      </section>

      <section className="relative w-full h-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full aspect-video group overflow-hidden shadow-md">
                <Image
                  src={slide.src}
                  alt={`슬라이드 ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                  <p className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl mb-2 font-bold">
                    {slide.company}
                  </p>
                  <h1
                    className="text-white text-2xl leading-normal sm:text-3xl md:text-4xl lg:text-6xl font-bold"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  ></h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section 
        ref={counterSectionRef} // 여기에 ref 걸어줌
        className="relative w-full h-auto py-16 sm:py-20 md:py-22 lg:py-24"
      >
        <div className="flex flex-col w-full items-center justify-center px-4 text-center space-y-4">
          <p className="text-black text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold">
            커넥플은 <strong>사람과 사람을, 사람과 사회</strong>를 다시
            연결합니다
          </p>
          <p className="text-black text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold">
            그리고 연결을 넘어, <strong>함께 성장하는 미래</strong>를
            만들어갑니다
          </p>

          <h1 className="text-purple-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            Connect to Grow. Connect to Society
          </h1>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {storyLabels.map((item, idx) => (
            <div
              key={idx}
              className="relative w-[180px] h-[180px] bg-white 
                rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] shadow-[6px_6px_12px_rgba(0,0,0,0.4)] 
                py-3 flex flex-col overflow-hidden"
            >
              <div className="flex-3 flex items-center justify-center">
                <p
                  className="text-gray-800 text-lg font-semibold text-center"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                ></p>
              </div>
              <div className="flex-2 flex items-center justify-center">
                <p className="text-purple-900 font-extrabold text-4xl">
                  <AnimatedCounter value={item.value} shouldAnimate={inView} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
