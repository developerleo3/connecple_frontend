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

import { motion } from "framer-motion";

const slides = [
  {
    src: "/pictures/picture1.png",
    company: "과학기술정보통신부/한국데이터산업진흥원",
    title: "2024 데이터 안심구역 활용<br />공동경진대회 시상식",
  },
  {
    src: "/pictures/picture2.png",
    company: "과학기술정보통신부/한국데이터산업진흥원",
    title: "2024 데이터안심구역 활용<br />공동경진대회 성과발표회",
  },
  {
    src: "/pictures/picture3.png",
    company: "과학기술정보통신부/한국데이터산업진흥원",
    title: "2023 데이터안심구역<br />대전센터 개소식",
  },
  {
    src: "/pictures/picture4.png",
    company: "과학기술정보통신부/한국지능정보사회진흥원",
    title: "2023 SW우수인재 시상식",
  },
  {
    src: "/pictures/picture5.png",
    company: "과학기술정보통신부/한국지능정보사회진흥원",
    title: "2023 SW여성인재 데모데이",
  },
  {
    src: "/pictures/picture6.png",
    company: "국립외교원/국민외교아카데미",
    title: "2024 제 7기 대학생<br />외교연수 과정",
  },
  {
    src: "/pictures/picture7.png",
    company: "국립외교원/국민외교아카데미",
    title: "2024 대국민 특강",
  },
  {
    src: "/pictures/picture8.png",
    company: "국립외교원/국민외교아카데미",
    title: "2024 국민외교아카데미<br />제 6기 서포터스",
  },
  {
    src: "/pictures/picture9.png",
    company: "개인정보보호위원회/한국인터넷진흥원",
    title: "2022 가명정보 전문가 풀<br />워크숍",
  },
  {
    src: "/pictures/picture10.png",
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
    <div>
      {/* 첫 번째 줄 */}
      <div className="flex items-center h-[7px] lg:h-[14px]">
        <span className="rounded-full bg-[#541E80] shrink-0
          w-[4px] h-[4px]
          lg:w-[8px] lg:h-[8px]" />
        <p className="font-extrabold
          text-[10px] ml-[7px]
          lg:text-[20px] lg:ml-[16px]">
          {title}
        </p>
      </div>

      {/* 두 번째 줄 */}
      <div className="flex items-center 
        h-[7px] mt-[8px]
        lg:h-[13px] lg:mt-[17px]">
        <span className="shrink-0
          w-[4px] h-[4px]
          lg:w-[8px] lg:h-[8px]" />
        <p className="font-medium
          text-[10px] ml-[7px]
          lg:text-[18px] lg:ml-[16px]">
          - {description}
        </p>
      </div>
    </div>
  );
}

const newsLetters = [
  {
    image: "/picture_main_with_news_letter_1.png",
    title: "기업이 찾는 실무형 인재, W.I.T.H 프로젝트에서 나온다",
    content:
      "\"바로 채용하고 싶을 정도였어요.\" 프로젝트 파트너 기업의 솔직한 이야기. 이들이 주목한 건 단순한 스펙이 아닌, 실무에 강한 팀워크형 ...",
    href: "/",
  },
  {
    image: "/picture_main_with_news_letter_2.png",
    title: "육아와 커리어, 두마리 토끼를 잡은 그녀의 하루",
    content:
      "오전엔 아이 등원, 오후엔 실무 교육, 저녁엔 나만의 성장 시간. 육아와 커리어를 동시에 이끌어가는 한 엄마의 진짜 이야기를 ...",
    href: "/",
  },
];

const logos1 = [
  "/partners/과기부.png",
  "/partners/국민외교아카데미.png",
  "/partners/국방부.png",
  "/partners/사이버작전사령부.png",
  "/partners/산업통상자원부.png",
  "/partners/서울우먼업.png",
  "/partners/서울특별시.png",
  "/partners/서울특별시여성능력개발원.png",
  "/partners/알씨케이.png",
  "/partners/올잇원.png",
  "/partners/외교부.png",
  "/partners/재외동포청.png",
  "/partners/질병관리본부KCDC.png",
  "/partners/한국국제교류재단.png",
  "/partners/한국데이터산업진흥원.png",
  "/partners/한국여성재단.png",
  "/partners/한국전자통신연구원.png",
  "/partners/한국지능정보사회진흥원.png",
  "/partners/alpinelab.png",
  "/partners/autocrypt.png",
  "/partners/BKit.png",
];

const logos2 = [
  "/partners/ccmediaservice.png",
  "/partners/cloud.png",
  "/partners/coontec.png",
  "/partners/deotis.png",
  "/partners/enki.png",
  "/partners/iaccess.png",
  "/partners/idb.png",
  "/partners/iotree.png",
  "/partners/KISA.png",
  "/partners/lg경영연구원.png",
  "/partners/luvmom.png",
  "/partners/Mind&Manual.png",
  "/partners/nshc.png",
  "/partners/nurilab.png",
  "/partners/opstech.png",
  "/partners/pado.svg",
  "/partners/smarterbuild.png",
  "/partners/somma.png",
  "/partners/uinus.png",
  "/partners/vizensoft.png",
  "/partners/webbizz.png",
  "/partners/zetaluh.png",
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

  // 💡 고정된 로고 크기 및 간격
  const baseWidth = 55;
  const gap = 30; // mx-[15px] * 2
  const scrollSpeed = 80; // px/sec (원하는 속도)

  // 💡 logos 길이 기준 애니메이션 시간 계산
  const logos1Duration = ((baseWidth + gap) * logos1.length * 2) / scrollSpeed;
  const logos2Duration = ((baseWidth + gap) * logos2.length * 2) / scrollSpeed;

  return (
    <main>
      {/* Section1 - 배경 이미지 */}
      <section className="relative w-full aspect-video">
        {/* 꽉 찬 배경 이미지 */}
        <Image
          src="/picture_main.png" // public 폴더에 넣은 이미지 경로
          alt="Main Background"
          fill
          className="object-cover z-0"
          priority
        />
        {/* 💡 Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))",
          }}
        />
        {/* 중앙 텍스트 오버레이 */}
        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            flex flex-col items-center justify-center text-white z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <motion.p
            className="font-bold text-[9px] mb-[5px] lg:text-[29px] lg:mb-[17px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.3 }}
          >
            당신의 여정이 머무르지 않도록,
          </motion.p>
          <motion.h1
            className="font-black text-[21px] lg:text-[61px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.6 }}
          >
            우리는 길을 만듭니다
          </motion.h1>
        </motion.div>

        {/* 하단 로고 */}
        <div className="absolute left-1/2 -translate-x-1/2 transform
          bottom-[20px] w-[71px] h-[16px]
          lg:bottom-[37px] lg:w-[175px] lg:h-[40px] z-20">
          <Image
            src="/logo_main_picture.svg"
            alt="Logo-white"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* Section2 - 슬라이드 */}
      <section className="relative bg-white w-full h-auto">
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

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  flex flex-col items-center justify-center text-center">
                  
                  {/* 텍스트 감싸는 div 추가 */}
                  <div className="border-t-[1px] border-b-[1px] border-white py-[44px] px-[65px]">
                    <p className="text-white font-extrabold text-[9px] lg:text-[29px]">
                      {slide.company}
                    </p>
                    <h1
                      className="text-white font-extrabold text-[20px] lg:text-[51px]"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    ></h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Section3 - 수치 */}
      <section 
        ref={counterSectionRef} // 여기에 ref 걸어줌
        className="relative bg-white w-full h-auto
          pt-[31px] pb-[20px]
          lg:pt-[163px]"
      >
        <div className="flex flex-col w-full items-center justify-center text-center text-black font-bold
          space-y-[3px] text-[10px]
          lg:space-y-[10px] lg:text-[27px]">
          <p>커넥플은 <span className="font-black">사람과 사람을, 사람과 사회</span>를 다시 연결합니다.</p>
          <p>그리고 연결을 넘어, <span className="font-black">함께 성장하는 미래</span>를 만들어갑니다.</p>
        </div>

        <h1 className="flex flex-col w-full items-center justify-center text-center text-[#541E80] font-black
          text-[15px] mt-[12px]
          lg:text-[45px] lg:mt-[34px]">
            Connect to Grow. Connect to Society
        </h1>

        <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-[34px] lg:mt-[86px]">
          {storyLabels.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center
                w-[176px] h-[176px] 
                rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.5)]"
            >
              <div className="flex-[3] flex items-center justify-center text-center">
                <p
                  className="text-black font-bold text-[18px] space-y-[9px]"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                ></p>
              </div>
              <div className="flex-[2] flex items-center justify-center text-center">
                <p className="text-[#541E80] font-black text-[31px]">
                  <AnimatedCounter value={item.value} shouldAnimate={inView} duration={1 + idx * 0.3} />
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden grid grid-rows-2 gap-y-[17px] mt-[31px]">
          <div className="flex justify-center items-center gap-x-[9px]">
            {storyLabels.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center w-[87px] h-[87px]
                  rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] shadow-[3px_3px_10px_0_rgba(0,0,0,0.5)]"
              >
                <div className="flex-[3] flex items-center justify-center text-center">
                  <p
                    className="text-black font-bold text-[9px] space-y-[6px]"
                    dangerouslySetInnerHTML={{ __html: item.label }}
                  ></p>
                </div>
                <div className="flex-[2] flex items-center justify-center text-center">
                  <p className="text-[#541E80] font-black text-[15px]">
                    <AnimatedCounter value={item.value} shouldAnimate={inView} duration={1 + idx * 0.3} />
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-x-[9px]">
            {storyLabels.slice(3, 5).map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center w-[87px] h-[87px]
                  rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] shadow-[3px_3px_10px_0_rgba(0,0,0,0.5)]"
              >
                <div className="flex-[3] flex items-center justify-center text-center">
                  <p
                    className="text-black font-bold text-[9px] space-y-[6px]"
                    dangerouslySetInnerHTML={{ __html: item.label }}
                  ></p>
                </div>
                <div className="flex-[2] flex items-center justify-center text-center">
                  <p className="text-[#541E80] font-black text-[15px]">
                    <AnimatedCounter value={item.value} shouldAnimate={inView} duration={1.9 + idx * 0.3} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section4 - Brand Story */}
      <section className="relative bg-white w-full h-auto">
        <div className="flex flex-col items-center justify-center text-center
          pt-[51px] pb-[45px] lg:pt-[200px] lg:pb-[139px]">
          <h1 className="text-[#541E80] font-black
            text-[18px] lg:text-[45px]">
            Connecple Brand Story
          </h1>
          <p className="text-black font-extrabold
            mt-[30px] text-[8px] lg:mt-[56px] lg:text-[22px]">
            <span className="text-[#944896]">경력은 멈출 수 있어도, 가능성은 멈추지 않습니다.</span><br /><br />

            커넥플은 경력보유여성이 다시 사회와 연결되어, 자신의 경험과 역량을 새로운 기회로 바꿀 수 있도록 함께해요.<br />
            우리는 단순한 복귀를 넘어, 스스로 길을 만들어가는 성장을 지향하지요.<br />
            경력의 공백은 약점이 아니라, 더 단단해질 기회임을, 각자의 시간은 모두 소중한 경험임을 우리는 믿어요.<br /><br />

            <span className="text-[#944896]">당신의 경력, 다시 시작이 아닌 새로운 도약입니다.<br />
            커넥플과 함께, 우리는 새로운 출발을 준비합니다.</span><br /><br />

            체계적인 교육과 실질적인 커리어 연결을 통해, 당신이 다시 주인공이 되는 순간을 함께 할게요.<br />
            단절의 시간을 넘어, 당신의 경험과 역량은 더 큰 가치를 만들어 낼 것이 분명해요.<br /><br /><br />


            사람과 사람을, 사람과 사회를 연결하는 커넥플_<br />
            <span className="text-[#944896] text-[11px] lg:text-[30px] font-tvn-medium">Connect to Grow. Connect to Society</span>
          </p>
        </div>
      </section>

      {/* Section5 - With Project */}
      <section className="bg-white w-full h-auto">
        <div className="relative flex flex-col w-full h-auto bg-[#F4F4F4]
          rounded-tl-[60px] pt-[54px]
          lg:rounded-tl-[150px] lg:pt-[129px]">
          <div className="pl-[51px] lg:pl-[130px]">
            <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">
              W.I.T.H PROJECT
            </h1>
          </div>
          <div className="w-full 
            grid grid-cols-1 
            lg:grid-cols-2">
            {/* 좌측 콘텐츠 영역 */}
            <div className="text-black flex flex-col justify-center pl-[51px] lg:pl-[130px]">
              <p className="font-black
                text-[12px] mt-[1px] mb-[3px]
                lg:text-[27px] lg:mt-[3px] lg:mb-[10px]">
                경력보유여성 재도약 프로젝트
              </p>
              <p className="font-tvn-medium text-[#944896]
                text-[12px]
                lg:text-[33px]">
                {"\"경력의 공백을 가능성으로 바꾸다.\""}
              </p>
              <div className="flex flex-col 
                mt-[20px] space-y-[8px]
                lg:mt-[44px] lg:space-y-[26px]">
                <ListItem
                  title="ICT 융합 분야 트렌드 학습 기회"
                  description="빠르게 변화하는 디지털 산업 흐름을 이해하고 대비합니다."
                />
                <ListItem
                  title="프로젝트 멤버로 직접 참여하는 성장형 교육 프로그램"
                  description="실전 프로젝트를 통해 실무 능력과 팀워크를 키웁니다."
                />
                <ListItem
                  title="현장에서 쌓는 실무 경험"
                  description="이론을 넘어, 실제 업무를 수행하며 경험을 쌓습니다."
                />
                <ListItem
                  title="프로젝트 실무 노하우 집중 학습"
                  description="현업 전문가의 노하우를 배우고 업무 역량을 강화합니다."
                />
                <ListItem
                  title="커리어 방향성 설정 & 개인 강점 컨설팅"
                  description="나만의 커리어 로드맵을 설계하고, 강점을 명확히 찾습니다."
                />
                <ListItem
                  title="우수 수료생 대상 인턴십 프로그램"
                  description="선발된 수료생에게 유연근무형 인턴십 기회를 제공합니다."
                />
                <ListItem
                  title="경제적 자립을 위한 실질적 기회"
                  description="프로젝트 참여를 통해 급여와 함께 자립 기반을 마련합니다."
                />
              </div>
            </div>

            {/* 우측 이미지 영역 */}
            <div className="relative w-full h-full flex flex-col justify-between items-center
              px-[50px] mt-[31px]
              lg:px-0 lg:mt-0">
              <div className="relative flex-[8] lg:flex-[9] w-full aspect-video overflow-hidden 
                rounded-l-[36px] rounded-r-[36px]
                lg:rounded-l-full">
                <Image
                  src="/picture_with_project.png"
                  alt="WITH Project Banner"
                  fill
                  className="object-cover object-top"
                />
                {/* 우측 하단 로고 */}
                <Image
                  src="/logo_with_project.svg" // 원하는 로고 이미지 경로로 바꾸세요
                  alt="Logo"
                  width={109}
                  height={57}
                  className="absolute bottom-[13px] right-[20px] 
                    lg:bottom-[30px] lg:right-[23px] lg:w-[274px] lg:h-[144px]"
                />
              </div>
              <div>
                <Link
                  href="/with-project"
                  className="absolute bg-[#541E80] text-white font-extrabold flex flex-col items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
                    left-[50px] bottom-[10px] text-[10px] space-y-[8px] w-[68px] h-[68px]
                    rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]
                    lg:left-[63px] lg:bottom-[2px] lg:text-[20px] lg:space-y-[10px] lg:w-[126px] lg:h-[126px]
                    lg:rounded-tl-[20px] lg:rounded-tr-[20xp] lg:rounded-bl-[20px]"
                >
                  <span>
                    가능성을<br />
                    현실로<br />
                    만들기&nbsp;&nbsp;&nbsp;<span>
                      <Image
                        src={"/vector_right_white.svg"}
                        alt="화살표"
                        width={10}
                        height={6.7}
                        className={`absolute object-contain
                          right-[8px] bottom-[15px]
                          lg:right-[14px] lg:bottom-[23px] lg:w-[20px] lg:h-[20px]`}
                      />
                    </span>
                  </span>
                </Link>
              </div>

              <div className="flex-[2] lg:flex-[1] flex items-center">
                <p className="text-[#541E80] font-extrabold
                  h-[7px] text-[10px] ml-[25px]
                  lg:h-[14px] lg:text-[20px] lg:ml-[32px]">
                  가능성은 여전히 당신 안에 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section6 - With ConnecDay */}
      <section className="w-full h-auto bg-[#F4F4F4]">
        <div className="flex flex-col text-black
          pt-[100px] px-[50px]
          lg:pt-[151px] lg:px-[130px]">
          
          {/* 제목 영역 */}
          <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">
            W.I.T.H CONNECDAY
          </h1>
          <p className="font-black 
            text-[12px] mt-[1px] mb-[3px]
            lg:text-[27px] lg:mt-[3px] lg:mb-[10px]">
            경력보유여성의 성장을 지원하는 정기 네트워킹
          </p>
          <p className="font-tvn-medium text-[#944896]
            text-[12px] h-[8px] mb-[29px]
            lg:text-[33px] lg:h-[60px] lg:mb-[15px]">
            {"\“성장을 나누고, 새로운 기회를 연결하다.\""}
          </p>

          {/* 카드 영역 */}
          <div className="grid gap-0 overflow-hidden
            rounded-[20px] h-[174px]
            lg:grid-cols-3 lg:rounded-[50px] lg:h-[280px]">
            
            {[
              {
                src: "/picture_main_with_connectday_1.png",
                title: "성장의 여정을 공유하는 자리",
                content: "위드프로젝트 수료생들과의 만남",
              },
              {
                src: "/picture_main_with_connectday_2.png",
                title: "새로운 커리어 기회를 연결하는 네트워킹",
                content: "다양한 분야 전문가들과의 만남",
              },
              {
                src: "/picture_main_with_connectday_3.png",
                title: "단절을 넘어 함께 그리는 미래",
                content: "성장 선언 챌린지, 테이블 멘토링",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {/* 배경 이미지 */}
                <Image
                  src={item.src}
                  alt={`image-${idx + 1}`}
                  fill
                  className="object-cover"
                />

                {/* 항상 보이는 오버레이 */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
                  <h1 className="font-extrabold text-[10px] h-[7px] lg:text-[20px] lg:h-[14px]">
                    {item.title}
                  </h1>
                  <p className="font-bold text-[8px] h-[6px] mt-[6px] lg:text-[18px] lg:h-[13px] lg:mt-[21px]">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 문구 + 버튼 */}
          <div className="grid
            grid-cols-10 mb-[58px] mt-[17px]
            lg:flex lg:flex-col lg:mb-[115px] lg:mt-[29px]">
            
            <div className="col-span-6 flex items-center justify-end h-full">
              <p className="text-[#541E80] font-extrabold text-right
                text-[10px] mr-[10px]
                lg:text-[20px]">
                가능성은 연결될 때 빛이 납니다.
              </p>
            </div>

            <div className="relative col-span-4 h-full flex items-center justify-end lg:mt-[16px]">
              <Link
                href="/with-connectday"
                className="bg-[#541E80] text-white font-extrabold flex items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
                  rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]
                  w-[159px] h-[25px] text-[10px]
                  lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[20px]
                  lg:w-[307px] lg:h-[52px] lg:text-[20px]"
              >
                나의 성장 가능성 연결하기&nbsp;&nbsp;&nbsp;
                <span>
                  <Image
                    src="/vector_right_white.svg"
                    alt="화살표"
                    width={10}
                    height={6.7}
                    className="absolute object-contain
                      right-[8px] bottom-[9px]
                      lg:right-[20px] lg:bottom-[17px] lg:w-[20px] lg:h-[20px]"
                  />
                </span>
              </Link>
            </div>
            
          </div>            
        </div>
      </section>

      {/* Section7 - With News Letter */}
      <section className="bg-[#F4F4F4] w-full h-auto">
        <div className="flex flex-col w-full h-auto bg-white text-black
          rounded-tr-[60px] pt-[47px] px-[50px]
          lg:rounded-tr-[100px] lg:pt-[95px] lg:px-[130px]">
          
          {/* 제목 영역 */}
          <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">
            W.I.T.H NEWS LETTER
          </h1>
          <p className="font-black text-[12px] mt-[1px] mb-[1px] lg:text-[27px] lg:mt-[3px] lg:mb-[10px]">
            경력보유여성을 위한 커리어 인사이트와 성장 소식을 전하는 정기 뉴스레터
          </p>
          <p className="font-tvn-medium text-[#944896] text-[12px] lg:text-[33px]">
            {"\“가능성을 깨우고, 성장의 기회를 전하다.\""}
          </p>

          {/* 네비게이션 화살표 */}
          <div className="flex justify-end gap-[10px] mt-[-20px] mb-[10px] lg:gap-[44px] lg:mt-[-20px] lg:mb-[33px]">
            {/* 왼쪽 */}
            <button
              onClick={prev}
              disabled={index === 0}
              className={`w-6 h-6 lg:w-8 lg:h-8 ${index === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Image
                src={index === 0 ? "/vector_left_gray.svg" : "/vector_right_black.svg"}
                alt="왼쪽 화살표"
                width={9}
                height={9}
                className={`lg:w-[32px] lg:h-[32px] object-contain ${index === 0 ? "" : "rotate-180"}`}
              />
            </button>

            {/* 오른쪽 */}
            <button
              onClick={next}
              disabled={index >= newsLetters.length - 2}
              className={`w-6 h-6 lg:w-8 lg:h-8 ${index >= newsLetters.length - 2 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Image
                src={index >= newsLetters.length - 2 ? "/vector_left_gray.svg" : "/vector_right_black.svg"}
                alt="오른쪽 화살표"
                width={9}
                height={9}
                className={`lg:w-[32px] lg:h-[32px] object-contain ${index >= newsLetters.length - 2 ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* 뉴스 카드 */}
          <div className="grid grid-cols-2 w-full gap-[11px] lg:gap-[16px]">
            {[newsLetters[index], newsLetters[index + 1]].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden group
                  h-[118px] rounded-[12px]
                  lg:h-[300px] lg:rounded-[30px]"
              >
                {/* 이미지 */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* 항상 보이는 어두운 배경 */}
                <div className="absolute inset-0 bg-black/60" />

                {/* 항상 보이는 텍스트 */}
                <div className="absolute inset-0 flex flex-col text-white
                  pl-[12px] pr-[30%] pt-[28px]
                  lg:pl-[40px] lg:pr-[40%] lg:pt-[75px]">
                  <div className="flex-[3]">
                    <h1 className="font-black text-[8px] lg:text-[23px]">{item.title}</h1>
                  </div>
                  <div className="flex-[2] overflow-hidden">
                    <p className="font-medium line-clamp-3 text-[5px] lg:text-[14px]">{item.content}</p>
                  </div>
                </div>

                {/* 항상 보이는 우하단 버튼 (hover하면 색 반전) */}
                <Link
                  href={item.href}
                  className="absolute flex items-center justify-center
                    bg-transparent text-white border border-white
                    hover:bg-white hover:text-black transition-colors duration-300
                    w-[9px] h-[9px] bottom-[20px] right-[26px] text-[5px]
                    lg:w-[30px] lg:h-[30px] lg:bottom-[50px] lg:right-[50px] lg:text-[15px]"
                >
                  {">"}
                </Link>
              </div>
            ))}
          </div>

          {/* 하단 문구 */}
          <div className="mt-[11px] lg:mt-[37px]">
            <p className="text-[#541E80] font-extrabold text-[10px] lg:text-[20px]">
              당신과의 시간과 당신의 가능성은 소중합니다.
            </p>
          </div>

          {/* 하단 버튼 */}
          <div className="relative flex justify-start mt-[5px] lg:mt-[16px]">
            <Link
              href="/with-newsletter"
              className="bg-[#541E80] text-white font-extrabold flex items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
                rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]
                w-[141px] h-[25px] text-[10px]
                lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[20px]
                lg:w-[295px] lg:h-[52px] lg:text-[20px]"
            >
              성장의 첫 걸음, 지금 시작&nbsp;&nbsp;&nbsp;
              <span>
                <Image
                  src="/vector_right_white.svg"
                  alt="화살표"
                  width={10}
                  height={6.7}
                  className="object-contain lg:w-[20px] lg:h-[20px]"
                />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section8 - 파트너스 */}
      <section className="bg-white w-full h-auto flex flex-col items-center text-black
        pt-[84px] pb-[37px] lg:pt-[177px] lg:pb-[136px]">
        <h1 className="font-black text-center text-[18px] lg:text-[45px]">
            커넥플과 함께하고 있는 파트너스
        </h1>
        <p className="text-[#686868] font-extrabold text-center 
        text-[12px] mt-[15px]
        lg:text-[27px] lg:mt-[20px]">
          공공기관, 민간기업을 포함한 30개 이상의 고객사가 커넥플과 함께하고 있습니다. 
        </p>
        <div className="w-full overflow-hidden bg-white mt-[20px] lg:mt-[31px]">
          <style jsx>{`
            @keyframes scrollLeft {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .scroll-row-1 {
              display: flex;
              width: max-content;
              white-space: nowrap;
              animation: scrollLeft ${logos1Duration}s linear infinite;
            }
            .scroll-row-2 {
              display: flex;
              width: max-content;
              white-space: nowrap;
              animation: scrollLeft ${logos2Duration}s linear infinite;
            }
          `}</style>

          {/* 두 줄 (서로 다른 logos1, logos2) */}
          <div className="flex flex-col lg:gap-[16px]">
            {/* logos1 */}
            <div className="overflow-hidden relative">
              <div className="scroll-row-1">
                {[...logos1, ...logos1].map((src, i) => (
                  <div key={`logos1-${i}`} className="flex items-center justify-center mx-[15px] lg:mx-[30px] w-[55px] h-[34px] lg:w-[128px] lg:h-[79px]">
                    <Image
                      src={src}
                      alt={`logos1-${i}`}
                      width={128}
                      height={79}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* logos2 */}
            <div className="overflow-hidden relative">
              <div className="scroll-row-2 ml-[40px] lg:ml-[80px]">
                {[...logos2, ...logos2].map((src, i) => (
                  <div key={`logos2-${i}`} className="flex items-center justify-center mx-[15px] lg:mx-[30px] w-[55px] h-[34px] lg:w-[128px] lg:h-[79px]">
                    <Image
                      src={src}
                      alt={`logos2-${i}`}
                      width={128}
                      height={79}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section9 - 신청 링크 */}
      <section className="relative bg-white w-full aspect-video">
        {/* 꽉 찬 배경 이미지 */}
        <Image
          src="/picture_main_view_bg.png" // public 폴더에 넣은 이미지 경로
          alt="Main Detail Background"
          fill
          className="object-contain"
          priority
        />
        {/* 콘텐츠 영역 */}
        <div className="absolute inset-0 flex items-start justify-center
          px-[34px] mt-[47px]
          lg:px-[100px] lg:mt-[150px]">
          {/* 왼쪽 텍스트 (세로줄 포함, 3/5) */}
          <div className="flex-[3] border-l-[3px] text-white border-white 
            pl-[11px] space-y-[5px]
            lg:pl-[32px] lg:space-y-[16px]">
            <p className="font-bold text-[10px] lg:text-[45px]">당신의 재도약을 응원합니다</p>
            <h2 className="font-black text-[15px] lg:text-[60px]">Women In The Hope</h2>
            <p className="font-bold text-[8px] lg:text-[25px]">경력보유여성 재도약 프로젝트</p>
          </div>

          {/* 오른쪽 버튼 3개 (2/5) - 반응형 대응 포함) */}
          <div className="flex-[2] flex flex-col gap-y-[5px] lg:gap-y-[14px]">
            {[
              {
                labelEng: "W.I.T.H Project",
                labelKor: "바로 신청하기",
                href: "/with-project"
              },
              {
                labelEng: "W.I.T.H Connecday",
                labelKor: "바로 함께하기",
                href: "/with-connectday"
              },
              {
                labelEng: "W.I.T.H News letter",
                labelKor: "바로 구독하기",
                href: "/with-newsletter"
              }
            ].map((btn, idx) => (
              <Link
                key={idx}
                href={btn.href}
                className="flex items-center justify-between bg-[#541E80] hover:bg-[#944896] text-white font-bold 
                  rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[5px] 
                  px-[11px] w-[132px] h-[20px] text-[9px]
                  lg:rounded-tl-[16px] lg:rounded-tr-[16px] lg:rounded-bl-[16px] 
                  lg:px-[33px] lg:w-[500px] lg:h-[60px] lg:text-[20px] transition"
              >
                <span className="truncate flex items-center gap-x-[2px]">
                  {/* ✅ 영어는 항상 보이고 */}
                  <span>{btn.labelEng}</span>

                  {/* ✅ 한글은 PC(lg 이상)일 때만 보이게 */}
                  <span className="hidden lg:inline">&nbsp;{btn.labelKor}</span>
                </span>
                <span>
                  <Image
                    src={"/vector_right_white.svg"}
                    alt="화살표"
                    width={10}
                    height={6.7}
                    className="object-contain lg:w-[20px] lg:h-[20px]"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
