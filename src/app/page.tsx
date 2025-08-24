"use client";

import Image from "next/image";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Autoplay, Pagination} from "swiper/modules";

import AnimatedCounter from '../components/AnimatedCounter';
import {useInView} from "react-intersection-observer";
import Link from "next/link";

import { useEffect, useState } from "react"

import {motion} from "framer-motion";
import LoadingSpinner from "@/components/loading-spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface imageSlides {
    id: number
    imagePath: string
    sortOrder?: number
    title: string
    company: string
}

interface StatsResponse {
    sortOrder?: number
    statsName: string
    statistic: number
    unit: string
}

interface Stats {
    statsName: string
    statistic: string
}

interface Links {
    title: string
    linkPath: string
}

const newsLetters = [
    {
        image: "/main/section7_picture1.png",
        title: "기업이 찾는 실무형 인재, W.I.T.H 프로젝트에서 나온다",
        content:
            "\"바로 채용하고 싶을 정도였어요.\" 프로젝트 파트너 기업의 솔직한 이야기. 이들이 주목한 건 단순한 스펙이 아닌, 실무에 강한 팀워크형 ...",
        href: "https://forms.gle/Ujx2ishv4DTiv9tE9",
    },
    {
        image: "/main/section7_picture2.png",
        title: "육아와 커리어, 두마리 토끼를 잡은 그녀의 하루",
        content:
            "오전엔 아이 등원, 오후엔 실무 교육, 저녁엔 나만의 성장 시간. 육아와 커리어를 동시에 이끌어가는 한 엄마의 진짜 이야기를 ...",
        href: "https://forms.gle/Ujx2ishv4DTiv9tE9",
    },
];

const logos1 = [
    "/main/partners/과기부.png",
    "/main/partners/국민외교아카데미.png",
    "/main/partners/국방부.png",
    "/main/partners/사이버작전사령부.png",
    "/main/partners/산업통상자원부.png",
    "/main/partners/서울우먼업.png",
    "/main/partners/서울특별시.png",
    "/main/partners/서울특별시여성능력개발원.png",
    "/main/partners/알씨케이.png",
    "/main/partners/올잇원.png",
    "/main/partners/외교부.png",
    "/main/partners/재외동포청.png",
    "/main/partners/질병관리본부KCDC.png",
    "/main/partners/한국국제교류재단.png",
    "/main/partners/한국데이터산업진흥원.png",
    "/main/partners/한국여성재단.png",
    "/main/partners/한국은행.png",
    "/main/partners/한국전자통신연구원.png",
    "/main/partners/한국지능정보사회진흥원.png",
    "/main/partners/alpinelab.png",
    "/main/partners/autocrypt.png",
    "/main/partners/BKit.png",
];

const logos2 = [
    "/main/partners/ccmediaservice.png",
    "/main/partners/cloud.png",
    "/main/partners/coontec.png",
    "/main/partners/deotis.png",
    "/main/partners/enki.png",
    "/main/partners/iaccess.png",
    "/main/partners/idb.png",
    "/main/partners/iotree.png",
    "/main/partners/KISA.png",
    "/main/partners/lg경영연구원.png",
    "/main/partners/luvmom.png",
    "/main/partners/Mind&Manual.png",
    "/main/partners/nshc.png",
    "/main/partners/nurilab.png",
    "/main/partners/opstech.png",
    "/main/partners/pado.svg",
    "/main/partners/smarterbuild.png",
    "/main/partners/somma.png",
    "/main/partners/trendly.png",
    "/main/partners/uinus.png",
    "/main/partners/vizensoft.png",
    "/main/partners/webbizz.png",
    "/main/partners/zetaluh.png",
];

export default function Home() {
    const { ref: counterSectionRef, inView } = useInView({
        triggerOnce: true,
        threshold: 0.6,            // 더 많이 보였을 때만 발동
        rootMargin: "0px 0px -15% 0px", // 아래쪽 15%는 제외(조금 더 들어왔을 때만)
        initialInView: false,      // SSR/초기 렌더에서 true로 시작하는 것 방지
    });
    const [shouldCount, setShouldCount] = useState(false);

    useEffect(() => {
        if (inView) setShouldCount(true);
    }, [inView]);

    const [imageSlides, setImageSlides] = useState<imageSlides[]>([])
    const [stats, setStats] = useState<Stats[]>([])
    const [links, setLinks] = useState<Links[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMainDataList = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/client/home`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!res.ok) throw new Error("메인페이지 데이터를 불러오지 못했습니다.")

                const data = await res.json()
                const imageSlides: imageSlides[] = data.introImages
                const statsResponses: StatsResponse[] = data.stats

                const stats: Stats[] = statsResponses.map(item => ({
                    statsName: item.statsName,
                    statistic: `${item.statistic}${item.unit}`
                }));

                setImageSlides(imageSlides)
                setStats(stats)
            } catch (err) {
                setError(err instanceof Error ? err.message : "알 수 없는 오류")
            } finally {
                setIsLoading(false)
            }
        }

        fetchMainDataList()
    }, [])

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/client/links`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!res.ok) throw new Error("URL 정보를 불러오지 못했습니다.")

                const getLinks = await res.json();
                setLinks(getLinks);
            } catch (err) {
                setError(err instanceof Error ? err.message : "알 수 없는 오류")
            } finally {
                setIsLoading(false)
            }
        }

        fetchLinks()
    }, [])

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

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error) {
        // TODO: API 호출 에러처리
    }

    return (
        <main>
            {/* Section1 - 배경 이미지 */}
            <section className="relative w-full h-[60vh] lg:h-auto lg:aspect-video">
                {/* 꽉 찬 배경 이미지 */}
                <Image
                    src="/main/section1_bg.jpg"
                    alt="Main Background"
                    fill
                    unoptimized
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
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 3}}
                >
                    <motion.p
                        className="font-bold text-[9px] mb-[5px] lg:text-[29px] lg:mb-[17px]"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 3, delay: 0.3}}
                    >
                        당신의 여정이 머무르지 않도록,
                    </motion.p>
                    <motion.h1
                        className="font-black text-[21px] lg:text-[61px]"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 3, delay: 0.6}}
                    >
                        우리는 길을 만듭니다
                    </motion.h1>
                </motion.div>

                {/* 하단 로고 */}
                <div className="absolute left-1/2 -translate-x-1/2 transform bottom-[20px] w-[71px] h-[16px]
                    lg:bottom-[37px] lg:w-[175px] lg:h-[40px] z-20">
                    <Image
                        src="/main/section1_logo_white.svg"
                        alt="Logo-white"
                        fill
                        unoptimized
                        className="object-contain"
                    />
                </div>
            </section>
            {/* Section2 - 슬라이드 */}
            <section className="relative bg-white w-full h-auto">
                {imageSlides.length === 0 ? null : (
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={
                            imageSlides.length > 1
                                ? { delay: 3000, disableOnInteraction: false }
                                : false
                        }
                        loop={imageSlides.length > 1}
                        key={imageSlides.length > 1 ? "loop" : "no-loop"} // 옵션 변경 감지 강제
                    >
                        {imageSlides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full aspect-video group overflow-hidden shadow-md">
                                    {/* 배경 이미지 */}
                                    <Image
                                        src={slide.imagePath}
                                        alt={`슬라이드 ${index + 1}`}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* 텍스트 오버레이 */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 ">
                                        <div className="border-t-[1px] border-b-[1px] border-white py-[15px] px-[22px] lg:py-[44px] lg:px-[65px]">
                                            <p className="text-white font-extrabold text-[9px] lg:text-[29px]">
                                                {slide.company}
                                            </p>
                                            <h1
                                                className="text-white font-extrabold text-[20px] lg:text-[51px]"
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </section>
            {/* Section3 - 수치 */}
            <section
                ref={counterSectionRef} // 여기에 ref 걸어줌
                className="relative bg-white w-full h-auto pt-[31px] pb-[20px] lg:pt-[163px]"
            >
                <div className="flex flex-col w-full items-center justify-center text-center text-black font-bold
                    space-y-[3px] text-[10px]
                    lg:space-y-[10px] lg:text-[27px]">
                    <p>커넥플은 <span className="font-black">사람과 사람을, 사람과 사회</span>를 다시 연결합니다.</p>
                    <p>그리고 연결을 넘어, <span className="font-black">함께 성장하는 미래</span>를 만들어갑니다.</p>
                </div>

                <h1 className="flex flex-col w-full items-center justify-center text-center text-[#541E80] font-black
                    text-[15px] mt-[12px] lg:text-[45px] lg:mt-[34px]">
                    Connect to Grow. Connect to Society
                </h1>

                <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-[34px] lg:mt-[86px]">
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center w-[176px] h-[176px] hover:scale-105 transition
                                rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] shadow-[3px_3px_6px_0_rgba(0,0,0,0.25)]"
                        >
                            <div className="flex-[3] flex items-center justify-center text-center">
                                <p
                                    className="text-black font-bold text-[18px] space-y-[9px]"
                                    dangerouslySetInnerHTML={{__html: item.statsName}}
                                ></p>
                            </div>
                            <div className="flex-[2] flex items-center justify-center text-center">
                                <p className="text-[#541E80] font-black text-[31px]">
                                    <AnimatedCounter value={item.statistic} shouldAnimate={shouldCount}
                                                     duration={1 + idx * 0.3}/>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:hidden grid grid-rows-2 gap-y-[17px] mt-[31px]">
                    <div className="flex justify-center items-center gap-x-[9px]">
                        {stats.slice(0, 3).map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center w-[87px] h-[87px]
                                    rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] shadow-[3px_3px_6px_0_rgba(0,0,0,0.25)]"
                            >
                                <div className="flex-[3] flex items-center justify-center text-center">
                                    <p
                                        className="text-black font-bold text-[9px] space-y-[6px]"
                                        dangerouslySetInnerHTML={{__html: item.statsName}}
                                    ></p>
                                </div>
                                <div className="flex-[2] flex items-center justify-center text-center">
                                    <p className="text-[#541E80] font-black text-[15px]">
                                        <AnimatedCounter value={item.statistic} shouldAnimate={shouldCount}
                                                         duration={1 + idx * 0.3}/>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-x-[9px]">
                        {stats.slice(3, 5).map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center w-[87px] h-[87px]
                                    rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] shadow-[3px_3px_6px_0_rgba(0,0,0,0.25)]"
                            >
                                <div className="flex-[3] flex items-center justify-center text-center">
                                    <p
                                        className="text-black font-bold text-[9px] space-y-[6px]"
                                        dangerouslySetInnerHTML={{__html: item.statsName}}
                                    ></p>
                                </div>
                                <div className="flex-[2] flex items-center justify-center text-center">
                                    <p className="text-[#541E80] font-black text-[15px]">
                                        <AnimatedCounter value={item.statistic} shouldAnimate={inView}
                                                         duration={1.9 + idx * 0.3}/>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Section4 - Brand Story */}
            <section className="relative bg-white w-full h-auto">
                <div
                    className="flex flex-col items-center justify-center text-center pt-[51px] pb-[45px] lg:pt-[200px] lg:pb-[139px]">
                    <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">
                        Connecple Brand Story
                    </h1>
                    <p className="text-black font-extrabold mt-[30px] text-[8px] lg:mt-[56px] lg:text-[22px]">
                        당신의 경험이 새로운 기회가 되도록, 커넥플이 함께해요.<br/>
                        복귀를 넘어, 다시 주인공이 되는 길<br/><br/>

                        경력의 공백은 약점이 아니라 더 단단해질 기회임을 우리는 믿어요.<br/>
                        커넥플과 함께 우리는 새로운 출발을 준비합니다.<br/><br/>

                        체계적인 교육과 커리어 연결로 당신이 다시 주인공이 되는 순간을 함께 할게요.<br/>
                        당신의 경험은 더 큰 가치를 만들어 낼 것이 분명해요.
                    </p>
                </div>
            </section>
            {/* Section5 - With Project */}
            <section className="bg-white w-full h-auto">
                <div className="relative flex flex-col w-full h-auto bg-[#F4F4F4] rounded-tl-[60px] pt-[54px]
                    lg:rounded-tl-[150px] lg:pt-[129px]">
                    <div className="pl-[51px] lg:pl-[130px]">
                        <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">
                            W.I.T.H PROJECT
                        </h1>
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                        {/* 좌측 콘텐츠 영역 */}
                        <div className="text-black flex flex-col justify-center pl-[51px] lg:pl-[130px]">
                            <p className="font-black text-[12px] mt-[1px] mb-[3px]
                                lg:text-[27px] lg:mt-[3px] lg:mb-[10px]">
                                경력보유여성 재도약 프로그램
                            </p>
                            <p className="font-tvn-medium text-[#944896] text-[12px] lg:text-[33px]">
                                {"가능성은 여전히 당신 안에 있습니다"}
                            </p>
                            <div className="flex flex-col mt-[20px] space-y-[14px]
                                lg:mt-[44px] lg:space-y-[47px]">
                                {[
                                    "ICT 융합 분야 트렌드 학습 기회",
                                    "프로젝트 멤버로 직접 참여하는 성장형 교육 프로그램",
                                    "현장에서 쌓는 실무 경험",
                                    "프로젝트 실무 노하우 집중 학습",
                                    "커리어 방향성 설정 &  개인 강점 컨설팅",
                                    "우수 수료생 대상 인턴십 프로그램",
                                    "경제적 자립을 위한 실질적 기회"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center h-[7px] lg:h-[14px]">
                                    <span className="rounded-full bg-[#541E80] shrink-0 w-[4px] h-[4px]
                                        lg:w-[8px] lg:h-[8px]"/>
                                        <p className="font-extrabold text-[10px] ml-[7px]
                                        lg:text-[20px] lg:ml-[16px]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 우측 이미지 영역 */}
                        <div className="relative w-full h-full flex flex-col justify-between items-center px-[50px] mt-[31px]
                            lg:px-0 lg:mt-0">
                            <div className="relative flex-[8] lg:flex-[9] w-full aspect-video overflow-hidden rounded-l-[36px] rounded-r-[36px]
                                lg:rounded-l-full">
                                <Image
                                    src="/main/section5_picture1.png"
                                    alt="section5_picture1"
                                    fill
                                    unoptimized
                                    className="object-cover object-top"
                                />
                                {/* 우측 하단 로고 */}
                                <Image
                                    src="/main/section5_logo_with_project.svg"
                                    alt="Logo"
                                    width={109}
                                    height={57}
                                    unoptimized
                                    className="absolute bottom-[13px] right-[20px]
                                        lg:bottom-[30px] lg:right-[23px] lg:w-[274px] lg:h-[144px]"
                                />
                            </div>
                            <div>
                                <Link
                                    href={links[0]?.linkPath || "https://www.connecple.com"}
                                    target="_blank"
                                    className="absolute bg-[#541E80] text-white font-extrabold flex flex-col items-center justify-center shadow-[3px_3px_6px_0_rgba(0,0,0,0.25)] hover:scale-105 transition
                                        right-[49px] top-[-34px] text-[10px] space-y-[8px] w-[68px] h-[68px]
                                        rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]
                                        lg:top-auto lg:right-auto lg:left-[0px] lg:bottom-[2px] lg:text-[20px] lg:space-y-[10px] lg:w-[126px] lg:h-[126px]
                                        lg:rounded-tl-[20px] lg:rounded-tr-[20xp] lg:rounded-bl-[20px]">
                                    <span>
                                        가능성을<br/>
                                        현실로<br/>
                                        만들기&nbsp;&nbsp;&nbsp;
                                        <span>
                                            <Image
                                                src={"/main/vector_right_white.svg"}
                                                alt="화살표"
                                                width={10}
                                                height={6.7}
                                                unoptimized
                                                className={`absolute object-contain right-[8px] bottom-[15px] 
                                                    lg:right-[14px] lg:bottom-[23px] lg:w-[20px] lg:h-[20px]`}
                                            />
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section6 - With ConnecDay */}
            <section className="w-full h-auto bg-[#F4F4F4]">
                <div className="flex flex-col text-black pt-[100px] px-[50px]
                    lg:pt-[151px] lg:px-[130px]">
                    {/* 제목 영역 */}
                    <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">
                        W.I.T.H CONNECDAY
                    </h1>
                    <p className="font-black text-[12px] mt-[1px] mb-[3px]
                        lg:text-[27px] lg:mt-[3px] lg:mb-[10px]">
                        경력보유여성의 성장을 지원하는 정기 네트워킹
                    </p>
                    <p className="font-tvn-medium text-[#944896] text-[12px] h-[8px] mb-[29px]
                        lg:text-[33px] lg:h-[60px] lg:mb-[15px]">
                        {"가능성은 연결될 때 빛이 납니다."}
                    </p>

                    {/* 카드 영역 */}
                    <div className="grid gap-0 overflow-hidden rounded-[20px] h-[174px]
                        lg:grid-cols-3 lg:rounded-[50px] lg:h-[280px]">
                        {[
                            {
                                src: "/main/section6_picture1.png",
                                title: "성장의 여정을 공유하는 자리",
                                content: "위드프로젝트 수료생들과의 만남",
                            },
                            {
                                src: "/main/section6_picture2.png",
                                title: "새로운 커리어 기회를 연결하는 네트워킹",
                                content: "다양한 분야 전문가들과의 만남",
                            },
                            {
                                src: "/main/section6_picture3.png",
                                title: "단절을 넘어 함께 그리는 미래",
                                content: "성장 선언 챌린지, 테이블 멘토링",
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="relative group hover:scale-105 transition">
                                {/* 배경 이미지 */}
                                <Image
                                    src={item.src}
                                    alt={`image-${idx + 1}`}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />

                                {/* 항상 보이는 오버레이 */}
                                <div
                                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center">
                                    <h1 className="font-extrabold text-[10px] h-[7px] lg:text-[20px] lg:h-[14px]">
                                        {item.title}
                                    </h1>
                                    <p className="lg:hidden lg:group-hover:block font-bold
                                        text-[8px] h-[6px] mt-[6px]
                                        lg:text-[18px] lg:h-[13px] lg:mt-[21px]">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 하단 버튼 */}
                    <div className="relative col-span-5 h-full flex items-center justify-end mt-[17px] mb-[46px]
                        lg:mt-[37px] lg:mb-[137px]">
                        <Link
                            href={links[1]?.linkPath || "https://www.connecple.com"}
                            target="_blank"
                            className="bg-[#541E80] text-white font-extrabold flex items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] hover:scale-105 transition
                                rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] w-[139px] h-[25px] text-[10px]
                                lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[20px] lg:w-[307px] lg:h-[52px] lg:text-[20px]"
                        >
                            나의 성장 가능성 연결하기&nbsp;&nbsp;&nbsp;
                            <span>
                                <Image
                                    src="/main/vector_right_white.svg"
                                    alt="화살표"
                                    width={10}
                                    height={6.7}
                                    unoptimized
                                    className="object-contain lg:w-[20px] lg:h-[20px]"
                                />
                            </span>
                        </Link>
                    </div>

                </div>
            </section>
            {/* Section7 - With News Letter */}
            <section className="bg-[#F4F4F4] w-full h-auto">
                <div className="flex flex-col w-full h-auto bg-white text-black rounded-tr-[60px] pt-[47px] px-[50px]
                    lg:rounded-tr-[100px] lg:pt-[95px] lg:px-[130px]">
                    {/* 제목 영역 */}
                    <h1 className="text-[#541E80] font-black text-[18px] lg:text-[45px]">W.I.T.H NEWS LETTER</h1>
                    <p className="font-black text-[12px] mt-[1px] mb-[1px] lg:text-[27px] lg:mt-[3px] lg:mb-[10px]">
                        경력보유여성을 위한 커리어 인사이트와 성장 소식을 전하는 정기 뉴스레터
                    </p>
                    <p className="font-tvn-medium text-[#944896] text-[12px] lg:text-[33px]">
                        당신과의 시간과 당신의 가능성은 소중합니다.
                    </p>
                    {/* 네비게이션 화살표 */}
                    <div
                        className="flex justify-end gap-[10px] mt-[-20px] mb-[10px] lg:gap-[44px] lg:mt-[-20px] lg:mb-[33px]">
                        {/* 왼쪽 */}
                        <button
                            onClick={prev}
                            disabled={index === 0}
                            className={`w-6 h-6 lg:w-8 lg:h-8 ${index === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:scale-120 transition`}
                        >
                            <Image
                                src={index === 0 ? "/main/vector_left_gray.svg" : "/main/vector_right_black.svg"}
                                alt="왼쪽 화살표"
                                width={9}
                                height={9}
                                unoptimized
                                className={`lg:w-[32px] lg:h-[32px] object-contain ${index === 0 ? "" : "rotate-180"}`}
                            />
                        </button>
                        {/* 오른쪽 */}
                        <button
                            onClick={next}
                            disabled={index >= newsLetters.length - 2}
                            className={`w-6 h-6 lg:w-8 lg:h-8 ${index >= newsLetters.length - 2 ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-120 transition'}`}
                        >
                            <Image
                                src={index >= newsLetters.length - 2 ? "/main/vector_left_gray.svg" : "/main/vector_right_black.svg"}
                                alt="오른쪽 화살표"
                                width={9}
                                height={9}
                                unoptimized
                                className={`lg:w-[32px] lg:h-[32px] object-contain ${index >= newsLetters.length - 2 ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                    {/* 뉴스 카드 */}
                    <div className="grid grid-cols-2 w-full gap-[11px] lg:gap-[16px]">
                        {[newsLetters[index], newsLetters[index + 1]].map((item, i) => (
                            <div
                                key={i}
                                className="relative overflow-hidden group h-[118px] rounded-[12px] hover:scale-105 transition
                                    lg:h-[300px] lg:rounded-[30px]"
                            >
                                {/* 이미지 */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                {/* 항상 보이는 어두운 배경 */}
                                <div className="absolute inset-0 bg-black/60"/>
                                {/* 항상 보이는 텍스트 */}
                                <div className="absolute inset-0 flex flex-col text-white group
                                    pl-[12px] pr-[30%] pt-[28px]
                                    lg:pl-[40px] lg:pr-[40%] lg:pt-[75px]">
                                    <div className="flex-[3]">
                                        <h1 className="font-black text-[8px] lg:text-[23px]">{item.title}</h1>
                                    </div>
                                    <div className="flex-[2] overflow-hidden lg:hidden lg:group-hover:block">
                                        <p className="font-medium line-clamp-3 text-[5px] lg:text-[14px]">{item.content}</p>
                                    </div>
                                </div>
                                {/* 항상 보이는 우하단 버튼 (hover하면 색 반전) */}
                                <Link
                                    href={links[2]?.linkPath || "https://www.connecple.com"}
                                    target="_blank"
                                    className="absolute flex items-center justify-center bg-transparent text-white border border-white
                                        hover:bg-white hover:text-black transition-colors duration-300
                                        w-[9px] h-[9px] bottom-[20px] right-[26px] text-[5px]
                                        lg:w-[30px] lg:h-[30px] lg:bottom-[50px] lg:right-[50px] lg:text-[15px]"
                                >
                                    {">"}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* 하단 버튼 */}
                    <div className="relative flex justify-start mt-[28px] lg:mt-[27px]">
                        <Link
                            href={links[2]?.linkPath || "https://www.connecple.com"}
                            target="_blank"
                            className="bg-[#541E80] text-white font-extrabold flex items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] hover:scale-105 transition
                                rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] w-[141px] h-[25px] text-[10px]
                                lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[20px] lg:w-[295px] lg:h-[52px] lg:text-[20px]"
                        >
                            성장의 첫 걸음, 지금 시작&nbsp;&nbsp;&nbsp;
                            <span>
                                <Image
                                    src="/main/vector_right_white.svg"
                                    alt="화살표"
                                    width={10}
                                    height={6.7}
                                    unoptimized
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
                <div className="w-full overflow-hidden bg-white mt-[20px] lg:mt-[63px]">
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
                                    <div key={`logos1-${i}`}
                                         className="flex items-center justify-center mx-[15px] lg:mx-[30px] w-[55px] h-[34px] lg:w-[128px] lg:h-[79px]">
                                        <Image
                                            src={src}
                                            alt={`logos1-${i}`}
                                            width={128}
                                            height={79}
                                            unoptimized
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
                                    <div key={`logos2-${i}`}
                                         className="flex items-center justify-center mx-[15px] lg:mx-[30px] w-[55px] h-[34px] lg:w-[128px] lg:h-[79px]">
                                        <Image
                                            src={src}
                                            alt={`logos2-${i}`}
                                            width={128}
                                            height={79}
                                            unoptimized
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
                    src="/main/section9_bg.png"
                    alt="Main Detail Background"
                    fill
                    unoptimized
                    className="object-contain"
                    priority
                />
                {/* 콘텐츠 영역 */}
                <div className="absolute inset-0 flex items-start justify-center
                    px-[34px] mt-[47px] lg:px-[100px] lg:mt-[150px]">
                    {/* 왼쪽 텍스트 (세로줄 포함, 3/5) */}
                    <div className="flex-[3] text-white border-white pl-[11px] space-y-[5px] border-l-[1px]
                        lg:pl-[32px] lg:space-y-[16px] lg:border-l-[3px]">
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
                                href: "https://forms.gle/HWXpfoB6Me3wsNaa7"
                            },
                            {
                                labelEng: "W.I.T.H Connecday",
                                labelKor: "바로 함께하기",
                                href: "https://forms.gle/ud4xy9A8FejjwbsE9"
                            },
                            {
                                labelEng: "W.I.T.H News letter",
                                labelKor: "바로 구독하기",
                                href: "https://forms.gle/Ujx2ishv4DTiv9tE9"
                            }
                        ].map((btn, idx) => (
                            <Link
                                key={idx}
                                href={links[idx]?.linkPath || btn.href}
                                target="_blank"
                                className="flex items-center justify-between bg-[#541E80] hover:bg-[#944896] text-white font-bold
                                    rounded-tl-[5px] rounded-tr-[5px] rounded-bl-[5px]
                                    px-[11px] w-[132px] h-[20px] text-[9px]
                                    lg:rounded-tl-[16px] lg:rounded-tr-[16px] lg:rounded-bl-[16px]
                                    lg:px-[33px] lg:w-[500px] lg:h-[60px] lg:text-[20px] transition"
                            >
                                <span className="truncate flex items-center gap-x-[2px]">
                                    {/* 영어는 항상 보이고 */}
                                    <span>{btn.labelEng}</span>
                                    {/* 한글은 PC(lg 이상)일 때만 보이게 */}
                                    <span className="hidden lg:inline">&nbsp;{btn.labelKor}</span>
                                </span>
                                <span>
                                    <Image
                                        src={"/main/vector_right_white.svg"}
                                        alt="화살표"
                                        width={10}
                                        height={6.7}
                                        unoptimized
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
