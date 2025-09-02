"use client";

import Image from "next/image";
import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import {useInView} from "react-intersection-observer";
import LoadingSpinner from "@/components/loading-spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface Links {
    title: string
    linkPath: string
}

interface NewsLetter {
    title: string
    content: string
    imagePath: string
    newsUrl: string
}

export default function WithNewsletterPage() {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    // 1) section1의 버튼 덩어리가 화면에 보이는지 관찰
    const {ref: btnGroupRef, inView: isBtnGroupVisible} = useInView({
        threshold: 0,          // 살짝만 보여도 "보임"으로 처리
        rootMargin: "0px",
        initialInView: true,   // 처음엔 보이는 상태로 시작(상단에 있으니까)
    });

    // 2) 푸터 겹침 보정 (#page-footer 기준)
    const footerRef = useRef<HTMLElement | null>(null);
    const [footerHeight, setFooterHeight] = useState(0);
    const [extraOffset, setExtraOffset] = useState(0);

    useEffect(() => {
        const footerEl = document.getElementById("page-footer");
        footerRef.current = footerEl as HTMLElement | null;

        const updateFooter = () => {
            if (!footerRef.current) return;
            setFooterHeight(footerRef.current.offsetHeight || 0);
        };
        updateFooter();
        window.addEventListener("resize", updateFooter);

        let raf = 0;
        const onScroll = () => {
            if (!footerRef.current) return;
            const rect = footerRef.current.getBoundingClientRect();
            const footerTopAbs = window.scrollY + rect.top;
            const viewportBottom = window.scrollY + window.innerHeight;
            const overlap = Math.max(0, viewportBottom - footerTopAbs);
            const clamped = Math.min(overlap, footerHeight);

            if (!raf) {
                raf = requestAnimationFrame(() => {
                    setExtraOffset(clamped);
                    raf = 0;
                });
            }
        };

        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});

        return () => {
            window.removeEventListener("resize", updateFooter);
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [footerHeight]);

    // 3) 떠다니는 바는 "원래 버튼이 화면에서 사라졌을 때"만 보이게
    const showStickyBar = !isBtnGroupVisible;

    // 링크 설정
    const [links, setLinks] = useState<Links[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [newsList, setNewsList] = useState<NewsLetter[]>([])

    // 링크 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resLinks, resNews] = await Promise.all([
                    fetch(`${API_BASE_URL}/client/links`, {
                        method: "GET",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch(`${API_BASE_URL}/client/news`, {
                        method: "GET",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    }),
                ]);

                // 1) links 응답 검증 + 상세 로그
                if (!resLinks.ok) {
                    throw new Error("URL 정보를 불러오지 못했습니다.");
                }

                // 2) news 응답 검증 + 상세 로그
                if (!resNews.ok) {
                    throw new Error("뉴스 정보를 불러오지 못했습니다.");
                }

                const getLinks = await resLinks.json();
                // /client/news 가 '그냥 리스트'라면 아래처럼 바로 배열로 받기
                const getNews = (await resNews.json()) as NewsLetter[];

                console.log('links : ', getLinks);

                setLinks(getLinks);
                setNewsList(getNews);
            } catch (err) {
                setError(err instanceof Error ? err.message : "알 수 없는 오류");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>
    }

    if (error) {
        // TODO: API 호출 에러처리
    }

    return (
        <main>
            {/* section1 - 뉴스레터 소개 */}
            <section className="flex flex-col w-full h-auto mt-[58px] lg:mt-[144px]">
                <h1 className="text-center
                        text-[18px] font-black
                        lg:text-[30px] lg:font-extrabold">
                    W.I.T.H Newsletter
                </h1>
                <div
                    className="relative flex justify-center items-center h-[140px] mt-[26px] lg:h-[456px] lg:mt-[43px]">
                    {/* 배경 이미지 */}
                    <Image
                        src="/withNewsletter/section1_image.png"
                        alt="image_main"
                        width={393}
                        height={140}
                        unoptimized
                        className="absolute z-0 w-full h-full object-cover brightness-50"
                    />
                    <Image
                        src="/withNewsletter/subtract.png"
                        alt="subtract"
                        width={314}
                        height={44}
                        unoptimized
                        className="absolute z-10 lg:w-[944px] lg:h-[96px] brightness-75"
                    />
                    <p className="hidden lg:block absolute z-20 text-center font-bold lg:text-[30px]">
                        SINCE 2022<br/>
                        국내 최초 경력보유여성을 위한 뉴스레터, 커넥플이 앞장섭니다.

                    </p>
                    <p className="block lg:hidden absolute z-20 text-center font-bold text-[11px]">
                        SINCE 2022<br/>
                        국내 최초 경력보유여성을 위한 뉴스레터, 커넥플이 앞장섭니다.
                    </p>
                </div>
                <p className="font-extrabold text-center text-[10px] mt-[39px]
                    lg:text-[25px] lg:mt-[70px] leading-loose">
                    당신의 시간과 가능성은 소중합니다.<br/>
                    <span className="text-[#541E80]">가능성을 향한 첫 걸음</span>
                </p>
                <div
                    ref={btnGroupRef}
                    className="flex flex-row justify-center items-center mt-[20px] gap-x-[13px] lg:mt-[69px] lg:gap-x-[40px]">
                    <Link
                        href={links[3]?.linkPath || "https://www.connecple.com"}
                        target="_blank"
                        className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px] hover:scale-105 transition
                            lg:mt-[19px] w-[131px] h-[25px] text-[10px]
                            lg:w-[388px] lg:h-[60px] lg:text-[27px]">
                        위드뉴스레터 무료 구독
                    </Link>
                    <Link
                        href={links[4]?.linkPath || "https://www.connecple.com"}
                        className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px] hover:scale-105 transition
                            lg:mt-[19px] w-[131px] h-[25px] text-[10px]
                            lg:w-[388px] lg:h-[60px] lg:text-[27px]">
                        뉴스레터 파트너 문의하기
                    </Link>
                </div>
            </section>
            {/* section2 - 뉴스레터란? */}
            <section className="w-full h-auto px-[30px] mt-[96px] lg:px-[200px] lg:mt-[300px]">
                {/* 상단: 로고 + 문구 */}
                <div className="flex flex-row items-center">
                    {/* 왼쪽 로고 */}
                    <Image
                        src="/withProject/logo_mini_C.svg"
                        alt="미니 로고"
                        width={20}
                        height={20}
                        unoptimized
                        className="lg:w-[36px] lg:h-[36px]"
                    />
                    {/* 말풍선 (꼬리 포함) */}
                    <div className="relative ml-[12px] lg:ml-[25px]">
                        {/* 꼬리 */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 bg-[#C0AED1] rotate-45
                            left-[-2px] w-[5px] h-[5px]
                            lg:left-[-4px] lg:w-[10px] lg:h-[10px]"/>

                        {/* 말풍선 본문 */}
                        <div className="bg-[#C0AED1] text-white font-tvn-medium rounded-[20px]
                            px-[10px] py-[1px] text-[15px]
                            lg:px-[28px] lg:py-[3px] lg:text-[35px]">
                            W.I.T.H Newsletter 란?
                        </div>
                    </div>
                </div>
                <h1 className="font-black text-[#541E80]
                    mt-[10px] text-[15px] lg:mt-[25px] lg:text-[45px]">
                    일과 삶 사이, 다시 시작을 준비하는<br/>
                    당신을 위한 뉴스레터.
                </h1>
                <h2 className="font-black
                    mt-[11px] text-[10px] lg:mt-[20px] lg:text-[27px]">
                    국내 최초 경력단절여성을 위한 뉴스레터<br/>
                    2주에 한번, 유익한 정보를 가득 담아 메일로 보내 드려요.
                </h2>

                <div className="flex flex-row w-full h-auto bg-[#2C0E59]
                    mt-[20px] rounded-[20px] lg:mt-[40px] lg:rounded-[50px]">
                    <Image
                        src={"/withNewsletter/section2_image.png"}
                        alt={"section2_image"}
                        width={130}
                        height={164}
                        unoptimized
                        className="rounded-l-[20px] lg:w-[438px] lg:h-[432px] lg:rounded-l-[50px]"
                    />
                    <div className="flex flex-col w-full h-full">
                        <div className="flex items-center justify-center  border-white
                            border-[0.5px] w-[47px] h-[14px] mt-[10px] ml-[10px] rounded-[20px]
                            lg:border-[2px] lg:w-[142px] lg:h-[36px] lg:mt-[27px] lg:ml-[28px] lg:rounded-[20px]">
                            <p className="font-bold text-white text-[7px] lg:text-[20px]">Newsletter</p>
                        </div>
                        {/* 1번 벌꿀 */}
                        <div className="flex flex-row w-full h-auto
                            mt-[9px] ml-[10px] gap-x-[7px]
                            lg:mt-[25px] lg:ml-[50px] lg:gap-x-[15px]">
                            <p className="text-[6.8px] lg:text-[20px]">🐝</p>
                            <div className="flex flex-col gap-y-[4px] lg:gap-y-[14px]">
                                <p className="font-bold text-white text-[8px] lg:text-[25px]">
                                    바쁜 당신을 위해, 여러분 대신 바쁘게 꿀정보 꿀소식<br/>
                                    찾아 돌아다니는 커넥플 허니비의 꿀정보 큐레이션!
                                </p>
                            </div>
                        </div>
                        {/* 점선 */}
                        <div className="flex justify-center border-white border-dotted
                            border-t-[0.3px] my-[7px] mx-[12px] lg:border-t-[3px] lg:my-[19px] lg:mx-[50px]"/>
                        {/* 2번 벌꿀 */}
                        <div className="flex flex-row w-full h-auto
                            ml-[10px] gap-x-[7px] lg:ml-[50px] lg:gap-x-[15px]">
                            <p className="text-[6.8px] lg:text-[20px]">🐝</p>
                            <div className="flex flex-col mb-[14px]">
                                <p className="font-bold text-white text-[8px] lg:text-[25px] lg:mb-[10px]">
                                    뉴스레터의 하이라이트!
                                </p>
                                {[
                                    "맞춤형 꿀정보 · 꿀뉴스 : 우리에게 딱 맞는 최신 뉴스와 정보",
                                    "일자리·채용·지원 혜택 소식 : 놓치면 아쉬운 기회들",
                                    "당첨 확률 높은 이벤트 소식 : 참여만 해도 득템 찬스 UP!",
                                    "허니비 BJ의 힐링 플레이리스트 : 바쁜 일상 속 작은 쉼표",
                                ].map((text, idx) => (
                                    <div key={idx} className="flex flex-row items-center lg:mt-[5px]">
                                        <Image
                                            src="/withNewsletter/check_white.svg"
                                            alt="check_white.svg"
                                            width={5}
                                            height={6}
                                            unoptimized
                                            className="lg:w-[15px] lg:h-[20px]"
                                        />
                                        <p className="font-normal text-white text-[7px] ml-[4.3px] lg:text-[20px] lg:ml-[10px]">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section3 - 이런분들이 구독하고 계세요 */}
            <section className="flex flex-col w-full h-auto bg-gradient-to-b from-white via-[#C0AED1] to-white
                mt-[53px] px-[30px] pb-[57px] lg:mt-[286px] lg:px-[200px] lg:pb-[74px]">
                <h1 className="font-black text-[#541E80] text-center
                    text-[15px] mt-[32px] mb-[50px] lg:text-[45px] lg:mb-[117px]">
                    이런 분들이 구독하고 계세요!
                </h1>
                {[
                    {
                        question: "\“다시 일하고 싶은데, 어디서부터 시작할지 모르겠어요.\”",
                        answer: "정보가 너무 많아서 막막했던 분들이 뉴스레터로 꼭 필요한 정보만 골라보고 있어요!",
                        em: "😵‍💫"
                    },
                    {
                        question: "\“육아 중이라 교육 참여는 어렵지만, 커리어는 잃고 싶지 않아요.\”",
                        answer: "시간이 없더라도, 짧게 읽으며 내 커리어를 위한 ‘하루 한 걸음'을 만들고 있어요!",
                        em: "🥺"
                    },
                    {
                        question: "\“공백이 길어 트렌드에 자신이 없었는데, 조금씩 감이 생겨요.\”",
                        answer: "ICT 분야 교육 · MICE 분야의 최신 흐름,<br />실무 감각을 되살리는 콘텐츠로 감을 다시 찾고 있어요!",
                        em: "😊"
                    },
                    {
                        question: "\“위드프로젝트에 관심은 있지만 아직은 망설이고 있어요.\”",
                        answer: "프로그램 구성, 수료생 인터뷰, 실제 참여 후기 등 결정을 도와주는<br />정보들을 먼저 확인해보고 있어요!",
                        em: "🧐"
                    },
                    {
                        question: "\“실무 꿀팁이나 활용 가능한 도구를 알고 싶어요.\”",
                        answer: "바로 써먹을 수 있는 협업툴 사용법, 실무 문서 템플릿,<br />행사 기획 노하우 등 유익한 정보가 가득해요!",
                        em: "🤔"
                    },

                ].map((item, idx, items) => (
                    <div key={idx} className="flex flex-col w-full h-full">
                        <div className="flex flex-row items-center">
                            <p className={"text-[20px] lg:text-[45px]"}>{item.em}</p>
                            {/* 말풍선 (꼬리 포함) */}
                            <div className="relative ml-[10px] lg:ml-[25px]">
                                {/* 꼬리 */}
                                <div className="absolute left-[-2px] lg:left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45
                                    w-[6px] h-[6px] lg:w-[12px] lg:h-[12px] bg-white shadow-[4px_4px_4px_0_rgba(0,0,0,0.15)] z-0"/>
                                {/* 말풍선 본문 */}
                                <div className="relative bg-white text-[#541E80] font-bold shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)] z-10
                                    px-[10px] py-[6px] rounded-[30px] text-[7px]
                                    lg:px-[28px] lg:py-[10px] lg:rounded-[20px] lg:text-[20px]"
                                     dangerouslySetInnerHTML={{__html: item.question}}>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-row items-center mt-[16px] lg:mt-[40px] justify-end"}>
                            <div className="relative mr-[10px] lg:mr-[25px]">
                                {/* 꼬리 */}
                                <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45
                                    w-[6px] h-[6px] lg:w-[12px] lg:h-[12px] bg-[#541E80] shadow-[4px_4px_4px_0_rgba(0,0,0,0.15)] z-0"/>
                                {/* 말풍선 본문 */}
                                <div className="relative bg-[#541E80] text-white font-bold shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)] z-10
                                    px-[10px] py-[6px] rounded-[30px] text-[7px]
                                    lg:px-[28px] lg:py-[10px] lg:rounded-[20px] lg:text-[20px]"
                                     dangerouslySetInnerHTML={{__html: item.answer}}>
                                </div>
                            </div>
                            <Image
                                src={"/withNewsletter/logo_answer.svg"}
                                alt={"logo_answer.svg"}
                                width={17}
                                height={17}
                                className="lg:w-[45px] lg:h-[45px]"
                            />
                        </div>
                        {idx !== items.length - 1 && (
                            <div className="flex justify-center border-dotted
                                my-[22px] border-[0.4px] lg:my-[45px] lg:border-t-3"/>
                        )}
                    </div>
                ))}
            </section>
            {/* section4 - 뉴스레터 벌꿀 카드 */}
            <section
                className="flex w-full h-auto mt-[47px] px-[10px] lg:mt-[213px] lg:px-[200px] mb-[74px] lg:mb-[300px]">
                <div className="flex flex-row w-full h-auto items-center justify-between">
                    <Link href={links[3]?.linkPath || "https://www.connecple.com"} target="_blank">
                        <div className="flex flex-col justify-center items-center bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] hover:scale-110 transition
                            w-[127px] h-[127px] rounded-[20px] lg:w-[360px] lg:h-[360px] lg:rounded-[30px]">
                            <p className="font-extrabold lg:font-bold text-[8px] lg:text-[25px]">정보통 꿀단지 위드뉴스레터</p>
                            <Image src={"/withNewsletter/honey_bee.svg"} alt={"honey_bee"}
                                   width={80}
                                   height={41}
                                   unoptimized
                                   className="lg:w-[254px] lg:h-[164px] mt-[16px] lg:mt-[18px]"/>
                            <p className="font-bold text-center text-[6px] mt-[12px] lg:text-[17px] lg:mt-[29px]">
                                바쁜 꿀벌 커넥플 허니비가<br/>
                                맞춤형 꿀정보 꿀소식을 전해드려요.
                            </p>
                        </div>
                    </Link>
                    {newsList.map((item, idx) => (
                        <Link key={idx} href={item.newsUrl} target="_blank">
                            <div className="flex flex-col bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] hover:scale-110 transition items-center
                                w-[63px] h-[101px] rounded-[8px] px-[4px] py-[3px]
                                lg:w-[243px] lg:h-[307px] lg:rounded-[30px] lg:px-[12px] lg:py-[16px]">
                                <Image src={item.imagePath}
                                       alt="이미지"
                                       width={123}
                                       height={123}
                                       unoptimized
                                       className="lg:w-[209px] lg:h-[146px]"/>
                                <p className="font-bold text-center text-[5px] mt-[6px] lg:text-[15px] lg:mt-[12px]">{item.title}</p>
                                <p className="font-semibold text-[4.5px] mt-[4px] lg:text-[12px] lg:mt-[12px]">{item.content}</p>
                            </div>
                        </Link>
                    ))}
                    {/*<div className="flex bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] items-center justify-center*/}
                    {/*    w-[17px] h-[101px] rounded-[5px] lg:w-[42px] lg:h-[307px] lg:rounded-[15px]">*/}
                    {/*    <p className="font-semibold text-[8px] lg:text-[20px]">{">"}</p>*/}
                    {/*</div>*/}
                </div>
            </section>
            {showStickyBar && (
                <div className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-t border-gray-200">
                    <div
                        className="fixed left-1/2 -translate-x-1/2 z-50 flex gap-x-[13px] lg:gap-x-[40px]"
                        style={{
                            bottom: (isMobile ? 20 : 100) + extraOffset,
                            transition: "bottom 200ms ease",
                        }}
                    >
                        <Link
                            href={links[3]?.linkPath || "https://www.connecple.com"}
                            target="_blank"
                            className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px] hover:scale-105 transition
                            lg:mt-[19px] w-[131px] h-[25px] text-[10px]
                            lg:w-[388px] lg:h-[60px] lg:text-[27px]">
                            위드뉴스레터 무료 구독
                        </Link>
                        <Link
                            href={links[4]?.linkPath || "https://www.connecple.com"}
                            className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px] hover:scale-105 transition
                            lg:mt-[19px] w-[131px] h-[25px] text-[10px]
                            lg:w-[388px] lg:h-[60px] lg:text-[27px]">
                            뉴스레터 파트너 문의하기
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
}
