"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import AnimatedCounter from '../components/AnimatedCounter';
import { useInView } from "react-intersection-observer";
import Link from "next/link";

import { useState } from "react";

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

function ListItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="mt-4 space-y-1">
      {/* 첫 번째 줄 */}
      <div className="flex items-center gap-2 space-x-5">
        <span className="w-2.5 h-2.5 rounded-full bg-purple-900 shrink-0" />
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
          {title}
        </p>
      </div>

      {/* 두 번째 줄 */}
      <div className="flex items-center gap-2 space-x-5">
        <span className="w-2.5 h-2.5 shrink-0" />
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          - {description}
        </p>
      </div>
    </div>
  );
}

const newsLetters = [
  {
    image: "/picture1.svg",
    title: "기업이 찾는 실무형 인재, W.I.T.H 프로젝트에서 나온다",
    content:
      "\"바로 채용하고 싶을 정도였어요.\" 프로젝트 파트너 기업의 솔직한 이야기. 이들이 주목한 건 단순한 스펙이 아닌, 실무에 강한 팀워크형 ...",
    href: "/story/1",
  },
  {
    image: "/picture2.svg",
    title: "육아와 커리어, 두마리 토끼를 잡은 그녀의 하루",
    content:
      "오전엔 아이 등원, 오후엔 실무 교육, 저녁엔 나만의 성장 시간. 육아와 커리어를 동시에 이끌어가는 한 엄마의 진짜 이야기를 ...",
    href: "/story/2",
  },
  {
    image: "/picture3.svg",
    title: "당당한 복귀, 두려움은 없었다",
    content:
      "W.I.T.H 프로젝트로 다시 커리어를 시작한 그녀. 실무 능력뿐 아니라 자신감까지 얻은 성장의 기록 ...",
    href: "/story/3",
  },
  {
    image: "/picture4.svg",
    title: "팀워크가 만든 놀라운 결과",
    content:
      "프로젝트 속 팀 활동에서 얻은 협업 경험. 실무 현장에서 더 빛났던 이유를 전합니다 ...",
    href: "/story/4",
  },
  {
    image: "/picture5.svg",
    title: "첫 도전, 첫 성과",
    content:
      "경력단절 후 첫 실무 도전, 결과는 예상보다 놀라웠다. 진짜 실력은 포기하지 않은 마음에서 나온다 ...",
    href: "/story/5",
  },
];

const logos = [
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
  "/logo.png",
];

export default function Home() {
  const { ref: counterSectionRef, inView } = useInView({
    triggerOnce: true,  // 한 번만 실행
    threshold: 0.3,     // 30% 보이면 발동
  });

  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? newsLetters.length - 2 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev >= newsLetters.length - 2 ? 0 : prev + 1));
  };

  return (
    <main>
      {/* Section1 - 배경 이미지 */}
      <section className="relative w-full aspect-video">
        {/* 꽉 찬 배경 이미지 */}
        <Image
          src="/picture_main.png" // public 폴더에 넣은 이미지 경로
          alt="Main Background"
          fill
          className="object-cover"
          priority
        />
        {/* 중앙 텍스트 오버레이 */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          flex flex-col items-center justify-center text-white">
          <p className="font-bold text-[9px] mb-[5px]
            lg:text-[29px] lg:mb-[17px]">
            당신의 여정이 머무르지 않도록,
          </p>
          <h1 className="font-black text-[21px]
            lg:text-[61px]">
            우리는 길을 만듭니다
          </h1>
        </div>

        {/* 하단 로고 */}
        <div className="absolute left-1/2 -translate-x-1/2 transform
          bottom-[20px] w-[71px] h-[16px]
          lg:bottom-[37px] lg:w-[175px] lg:h-[40px]">
          <Image
            src="/logo_main_picture.svg"
            alt="Logo-white"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* Section2 - 슬라이드 */}
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

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center">
                  <p className="text-white font-extrabold
                    text-[9px]
                    lg:text-[29px]">
                    {slide.company}
                  </p>
                  <h1
                    className="text-white font-extrabold
                      text-[20px]
                      lg:text-[51px]"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  ></h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Section3 - 수치 */}
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

      {/* Section4 - Brand Story */}
      <section className="relative w-full h-auto px-10 py-8 sm:py-20 md:py-22 lg:py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-purple-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
            Connecple Brand Story
          </h1>
          <p className="text-black mt-8 text-sm font-bold
            sm:mt-10 sm:text-base 
            md:mt-13 md:text-lg 
            lg:mt-17 lg:text-2xl">
            경력은 멈출 수 있어도, 가능성은 멈추지 않습니다.<br /><br />

            커넥플은 경력보유여성이 다시 사회와 연결되어, 자신의 경험과 역량을 새로운 기회로 바꿀 수 있도록 함께해요.<br />
            우리는 단순한 복귀를 넘어, 스스로 길을 만들어가는 성장을 지향하지요.<br />
            경력의 공백은 약점이 아니라, 더 단단해질 기회임을, 각자의 시간은 모두 소중한 경험임을 우리는 믿어요.<br /><br />

            당신의 경력, 다시 시작이 아닌 새로운 도약입니다.<br />
            커넥플과 함께, 우리는 새로운 출발을 준비합니다.<br /><br />

            체계적인 교육과 실질적인 커리어 연결을 통해, 당신이 다시 주인공이 되는 순간을 함께 할게요.<br />
            단절의 시간을 넘어, 당신의 경험과 역량은 더 큰 가치를 만들어 낼 것이 분명해요.<br /><br /><br />


            사람과 사람을, 사람과 사회를 연결하는 커넥플_<br />
            Connect to Grow. Connect to Society
          </p>
        </div>
      </section>

      {/* Section5 - With Project */}
      <section className="bg-white w-full h-auto">
        <div className="relative flex flex-col w-full h-auto bg-[#F4F4F4] rounded-tl-[150px] py-20">
          <div className="pl-30 pt-10 pb-5">
            <h2 className="text-purple-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              W.I.T.H PROJECT
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full items-stretch">
            {/* 좌측 콘텐츠 영역 */}
            <div className="flex flex-col justify-center pl-30">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                경력보유여성 재도약 프로젝트
              </p>
              <p className="italic text-purple-600 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-4 mb-5">
                {"\"경력의 공백을 가능성으로 바꾸다\""}
              </p>
              <div>
                <ListItem
                  title="ICT 융합 분야 트렌드 학습 기회"
                  description="빠르게 변화하는 디지털 산업 흐름을 이해하고 대비합니다"
                />
                <ListItem
                  title="프로젝트 멤버로 직접 참여하는 성장형 교육 프로그램"
                  description="실전 프로젝트를 통해 실무 능력과 팀워크를 키웁니다"
                />
                <ListItem
                  title="현장에서 쌓는 실무 경험"
                  description="이론을 넘어, 실제 업무를 수행하며 경험을 쌓습니다"
                />
                <ListItem
                  title="프로젝트 실무 노하우 집중 학습"
                  description="현업 전문가의 노하우를 배우고 업무 역량을 강화합니다"
                />
                <ListItem
                  title="커리어 방향성 설정 & 개인 강점 컨설팅"
                  description="나만의 커리어 로드맵을 설계하고, 강점을 명확히 찾습니다"
                />
                <ListItem
                  title="우수 수료생 대상 인턴십 프로그램"
                  description="선발된 수료생에게 유연근무형 인턴십 기회를 제공합니다"
                />
                <ListItem
                  title="경제적 자립을 위한 실질적 기회"
                  description="프로젝트 참여를 통해 급여와 함께 자립 기반을 마련합니다"
                />
              </div>
            </div>

            {/* 우측 이미지 영역 */}
            <div className="relative w-full h-full flex flex-col justify-between items-center">
              <div className="relative w-full aspect-video md:aspect-auto md:flex-[9] overflow-hidden rounded-l-full">
                <Image
                  src="/picture1.svg"
                  alt="WITH Project Banner"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div>
                <Link
                  href="/with-project"
                  className="md:absolute left-0 bottom-0 mx-auto my-6 md:my-0 md:ml-0 md:mr-0 block
                    bg-purple-900 text-white px-6 py-4 font-bold rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl
                    text-lg lg:text-2xl space-y-1 text-left"
                >
                  <span className="block">가능성을</span>
                  <span className="block">현실로</span>
                  <span className="block">만들기 →</span>
                </Link>
              </div>

              <div className="flex-[1] flex items-end justify-center">
                <p className="text-purple-900 font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-center">
                  가능성은 여전히 당신 안에 있습니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section6 - With ConnectDay */}
      <section className="w-full h-auto bg-[#F4F4F4] py-20 px-30">
        <div className="flex flex-col">
          <h1 className="text-purple-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            W.I.T.H CONNECTDAY
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-5">
                경력보유여성의 성장을 지원하는 정기 네트워킹
          </p>
          <p className="italic text-purple-600 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-5">
            {"\"성장을 나누고, 새로운 기회를 연결하다\""}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden rounded-3xl mt-5">
            {[
              {
                src: "/picture1.svg",
                title: "성장의 여정을 공유하는 자리",
                content: "위드프로젝트 수료생들과의 만남",
              },
              {
                src: "/picture2.svg",
                title: "함께 걸어온 시간들",
                content: "성장과 도전의 순간을 기념하다",
              },
              {
                src: "/picture3.svg",
                title: "다시 도약하는 그 순간",
                content: "새로운 출발을 준비하는 우리들",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative group h-[200px] sm:h-[300px]">
                {/* 배경 이미지 */}
                <Image
                  src={item.src}
                  alt={`image-${idx + 1}`}
                  fill
                  className="object-cover"
                />

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white px-4 text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{item.title}</h3>
                  <p className="text-base sm:text-lg lg:text-xl mt-2">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="items-end justify-center mt-5">
          <p className="text-purple-900 font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-right">
            가능성은 연결될 때 빛이 납니다
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <Link
            href="/with-connectday"
            className="px-6 py-4 bg-purple-900 text-white font-bold 
              rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl
              text-lg lg:text-2xl text-center"
          >
            나의 성장도 연결하기 →
          </Link>
        </div>
      </section>

      {/* Section7 - With News Letter */}
      <section className="bg-[#F4F4F4] w-full h-auto">
        <div className="flex flex-col w-full h-auto bg-white rounded-tr-[150px] px-30 py-30">
          <h1 className="text-purple-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            W.I.T.H NEWS LETTER
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-5">
                경력보유여성을 위한 커리어 인사이트와 성장 소식을 전하는 정기 뉴스레터
          </p>
          <p className="italic text-purple-600 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-5">
            {"\"가능성을 깨우고, 성장의 기회를 전하다\""}
          </p>
          <div className="flex justify-end gap-5 mb-5">
            <button
              onClick={prev}
              disabled={index === 0}
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl
                ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-purple-700 cursor-pointer'}`}
            >
              ←
            </button>
            <button
              onClick={next}
              disabled={index >= newsLetters.length - 2}
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl
                ${index >= newsLetters.length - 2 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-purple-700 cursor-pointer'}`}
            >
              →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-screen-xl w-full">
            {[newsLetters[index], newsLetters[index + 1]].map((item, i) => (
              <div
                key={i}
                className="relative h-[300px] sm:h-[400px] rounded-3xl overflow-hidden group"
              >
                {/* 이미지 */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* 어두운 배경 */}
                <div className="absolute inset-0 group-hover:bg-black/60 transition duration-300" />

                {/* 텍스트 (hover 시 등장) */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 pr-20 text-white 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base line-clamp-2">{item.content}</p>
                </div>

                {/* 우하단 바로가기 버튼 (hover 시 등장) */}
                <Link
                  href={item.href}
                  className="absolute w-8 h-8 bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-transparent text-white rounded-xl border border-white hover:bg-white hover:text-black
                            flex items-center justify-center"
                >
                  {"\>"}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-purple-900 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
              당신과의 시간과 당신의 가능성은 소중합니다
            </p>
          </div>
          <div className="mt-5">
            <Link
              href="/with-connectday"
              className="px-6 py-4 bg-purple-900 text-white font-bold 
                rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl
                text-lg lg:text-2xl text-center"
            >
              가능성을 향한 첫 걸음 →
            </Link>
          </div>
        </div>
      </section>

      {/* Section8 - 파트너스 */}
      <section className="pb-30 w-full h-auto flex flex-col items-center">
        <h1 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            커넥플과 함께하고 있는 파트너스
        </h1>
        <p className="px-30 text-gray-400 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-5 text-center">
              경력보유여성을 위한 커리어 인사이트와 성장 소식을 전하는 정기 뉴스레터
        </p>
        <div className="w-full overflow-hidden bg-white py-20">
          <style jsx>{`
            @keyframes scrollLeft {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .scroll-row {
              display: flex;
              width: max-content;
              white-space: nowrap;
              animation: scrollLeft 30s linear infinite;
            }
          `}</style>

          {/* 두 줄 (엇갈림 적용) */}
          <div className="flex flex-col gap-4">
            {[0, 1].map((row) => (
              <div key={row} className="overflow-hidden relative">
                <div
                  className={`scroll-row ${row % 2 === 1 ? 'ml-[70px]' : ''}`}
                >
                  {[...logos, ...logos].map((src, i) => (
                    <div key={`${row}-${i}`} className="mx-6 flex items-center">
                      <Image
                        src={src}
                        alt={`logo-${i}`}
                        width={100}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section9 - 자세히 보기 */}
      <section 
        className="relative w-full aspect-video text-white bg-cover bg-center"
        style={{backgroundImage: "url('/picture8.svg')"}}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-5 items-center">
          {/* 왼쪽 텍스트 (세로줄 포함, 3/5) */}
          <div className="md:col-span-3 border-l-4 border-white pl-6 space-y-4">
            <p className="text-2xl sm:text-3xl font-bold">당신의 재도약을 응원합니다</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold">Women In The Hope</h2>
            <p className="text-xl sm:text-2xl font-semibold">경력보유여성 재도약 프로젝트</p>
          </div>

          {/* 오른쪽 버튼 3개 (2/5) - 반응형 대응 포함) */}
          <div className="mt-10 md:mt-0 md:col-span-2 flex flex-col md:items-start gap-4 w-full items-stretch max-w-[400px]">
            {[
              {
                label: "W.I.T.H Project 자세히 보기",
                href: "/with-project"
              },
              {
                label: "W.I.T.H Connecday 자세히 보기",
                href: "/with-connecday"
              },
              {
                label: "W.I.T.H News letter 자세히 보기",
                href: "/with-newsletter"
              }
            ].map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className="bg-purple-900 hover:bg-[#B44FB4] text-white font-semibold px-6 py-4 
                  rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] 
                  text-center text-base sm:text-lg transition w-full"
              >
                {btn.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
