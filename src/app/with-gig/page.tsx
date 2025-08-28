"use client";

import Image from "next/image";
import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/loading-spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface Links {
    title: string
    linkPath: string
}

// 신청절차
const applicationProcess = [
    {
        title: "지원 신청",
        content: "아래 신청 버튼 클릭<br />① 참여자 : 신청서, 이력서 등<br />② 수요기업 : 구인 요청서 등",
        img: "/withGIG/section8_step1.svg"
    },
    {
        title: "역량 매칭",
        content: "실시간 프로젝트 연계방 초대,<br />신청자와 수요기업 매칭",
        img: "/withGIG/section8_step2.svg"
    },
    {
        title: "프로젝트 제안 수락",
        content: "위드긱 업무 계약 체결<br />- 커넥플<->참여자<br />- 커넥플<-수요기업",
        img: "/withGIG/section8_step3.svg"
    },
    {
        title: "협업 시작",
        content: "위드긱 업무 진행<br />(필요시 커넥플 QA 지원)",
        img: "/withGIG/section8_step4.svg"
    }
]

export default function WithGigPage() {
    const { ref: gigSection2Ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.6,
        rootMargin: "0px 0px -15% 0px",
        initialInView: false,
    });
    const [showStickyBar, setShowStickyBar] = useState(false);
    useEffect(() => {
        if (inView) setShowStickyBar(true); // 한번 보이면 이후 계속 표시
    }, [inView]);

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
            const footerRect = footerRef.current.getBoundingClientRect();
            const footerTopAbs = window.scrollY + footerRect.top;
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
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", updateFooter);
            window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [footerHeight]);

    // 링크 설정
    const [links, setLinks] = useState<Links[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // 링크 불러오기
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

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (error) {
        // TODO: API 호출 에러처리
    }

    return (
        <main>
            {/* section1 - 위드GIG 소개 */}
            <section className={"relative w-full aspect-video"}>
                <Image
                    src={"/withGIG/bg_image.png"}
                    alt={"bg-image.png"}
                    fill
                    unoptimized
                    className={"z-0"}
                />
                <div className={"absolute z-10 flex flex-col left-[26px] top-[23px] lg:left-[140px] lg:top-[132px]"}>
                    <h3 className={"font-extrabold text-[9.2px] lg:font-bold text-[#D8AEFF] lg:text-[23px]"}>
                        경력, 일, 삶의 균형을 위한 새로운 일의 방식
                    </h3>
                    <h1 className={"font-extrabold lg:font-black text-white text-[20px] mt-[12px] lg:text-[50px] lg:mt-[47px]"}>
                        경력보유여성을 위한<br/>
                        유연근무 기반 일경험 플랫폼
                    </h1>
                </div>
                <p className="absolute z-10 text-white font-bold leading-loose
                    text-[8px] left-[26px] bottom-[21px] lg:text-[25px] lg:left-[140px] lg:bottom-[123px]">
                    위드긱은 ‘긱(GIG)’ 근무 방식을 기반으로,<br/>
                    경력보유여성들이 자신만의 속도로 다시 일할 수 있도록<br/>
                    재택 · 유연 · 단기 중심의 프로젝트형 일자리를 연결해주는 커리어 플랫폼입니다.
                </p>
            </section>
            {/* section2 - 이런 분들을 위해 만들어 졌습니다 */}
            <section ref={gigSection2Ref} className={"flex flex-col w-full h-auto px-[30px] mt-[52px] lg:px-[200px] lg:mt-[169px]"}>
                <h1 className={"font-black text-[#541E80] lg:text-[45px]"}>이런 분들을 위해 만들어졌습니다.</h1>
                <div className={"flex flex-col w-full h-auto mt-[20px] gap-y-[15px] lg:mt-[46px] lg:gap-y-[23px]"}>
                    {[
                        {
                            index: "01",
                            title: "잠시 일을 쉬었지만, 다시 시작해보고 싶은 분",
                            content: "육아나 가족 돌봄 등으로 경력이 비었어도, 다시 나만의 일을 찾고 싶은 당신을 응원합니다."
                        },
                        {
                            index: "02",
                            title: "정해진 출퇴근보다 나에게 맞는 방식으로 일하고 싶은 분",
                            content: "시간과 장소에 구애받지 않고, 내 삶의 리듬에 맞춰 일하고 싶다면 위드긱이 함께합니다."
                        },
                        {
                            index: "03",
                            title: "그동안 쌓은 경험을 프로젝트로 풀어내고 싶은 분",
                            content: "디자인, 마케팅, 콘텐츠 등 다양한 분야에서 당신의 전문성이 다시 빛날 수 있어요."
                        },
                        {
                            index: "04",
                            title: "내가 하는 일의 가치를 존중받고, 정당한 보상을 받고 싶은 분",
                            content: "불투명한 일 대신, 조건이 명확하고 신뢰할 수 있는 일로 다시 시작해보세요."
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`${idx % 2 === 0 ? "bg-[#F6F6F6]" : "bg-[#ECECEC]"} group hover:scale-110 transition
                                flex flex-row justify-between items-center w-full h-auto shadow-[3px_3px_6px_0_rgba(0,0,0,0.25)]
                                rounded-[10px] pl-[14px] pr-[10px] pt-[5px] pb-[10px]
                                lg:rounded-[20px] lg:pl-[45px] lg:pr-[20px] lg:py-[10px]`}
                        >
                            <div className={"flex flex-col mt-[5px] group-hover:lg:mt-[10px]"}>
                                <p className={"font-extrabold lg:font-bold text-[9px] lg:text-[25px]"}>{item.title}</p>
                                <p className="lg:hidden lg:group-hover:block text-[#878787] lg:text-[#9E9E9E] font-bold lg:font-normal
                                    text-[7px] mt-[5px] lg:text-[20px] lg:mt-[20px]">{item.content}</p>
                            </div>
                            <p className={"font-extrabold text-[#C0AED166] lg:text-[45px] group-hover:lg:text-[65px]"}>{item.index}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* section3 - 성공사례 */}
            <section className={"flex flex-col w-full h-auto px-[30px] mt-[63px] lg:px-[200px] lg:mt-[255px]"}>
                <h1 className={"font-black text-[#541E80] text-[15px] lg:text-[45px]"}>
                    위드GIG 성공사례
                </h1>
                <div className={"font-bold leading-loose text-[7px] mt-[14px] lg:text-[25px] lg:mt-[26px]"}>
                    • “나도 다시 할 수 있을까?”라는 고민에서 시작된 변화의 이야기<br/>
                    • 위드긱을 통해 다시 일하기 시작한 사람들의 진짜 이야기<br/>
                    • 당신의 다음 이야기가 될 수 있는, 누군가의 지금 이야기<br/>
                </div>
                <div className={"flex flex-row w-full h-auto justify-between items-center mt-[17px] lg:mt-[54px]"}>
                    {/*<div className="flex bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] items-center justify-center
                        w-[13px] h-[70px] rounded-[4px] lg:w-[42px] lg:h-[293px] lg:rounded-[15px]">
                        <p className="font-semibold text-[10px] lg:text-[20px]">{"<"}</p>
                    </div>*/}
                    {[
                        {
                            path: "/withGIG/section3_image1.png",
                            alt: "section3_image1.png"
                        },
                        {
                            path: "/withGIG/section3_image2.png",
                            alt: "section3_image1.png"
                        },
                        {
                            path: "/withGIG/section3_image3.png",
                            alt: "section3_image1.png"
                        },
                    ].map((item, idx) => (
                        <Image
                            key={idx}
                            src={item.path}
                            alt={item.alt}
                            width={85}
                            height={70}
                            unoptimized
                            className={"lg:w-[293px] lg:h-[293px] rounded-[6px] lg:rounded-[30px]"}/>
                    ))}
                    {/*<div className="flex bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] items-center justify-center
                        w-[13px] h-[70px] rounded-[4px] lg:w-[42px] lg:h-[293px] lg:rounded-[15px]">
                        <p className="font-semibold text-[10px] lg:text-[20px]">{">"}</p>
                    </div>*/}
                </div>
            </section>
            {/* section4 - 구직자를 위한 GIG */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA]
                mt-[61px] rounded-tl-[60px] px-[30px] lg:mt-[159px] lg:rounded-tl-[150px] lg:px-[200px]">
                <div className="flex flex-row items-center mt-[72px] lg:mt-[110px]">
                    {/* 왼쪽 로고 */}
                    <Image
                        src="/withProject/logo_mini_C.svg"
                        alt="미니 로고"
                        width={21}
                        height={21}
                        unoptimized
                        className="lg:w-[36px] lg:h-[36px]"
                    />
                    {/* 말풍선 (꼬리 포함) */}
                    <div className="relative ml-[12px] lg:ml-[25px]">
                        {/* 꼬리 */}
                        <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2
                            w-[5px] h-[5px] lg:w-[10px] lg:h-[10px] bg-[#C0AED1] rotate-45"/>

                        {/* 말풍선 본문 */}
                        <div className="bg-[#C0AED1] text-white font-tvn-medium rounded-[20px]
                            px-[13px] py-[2px] text-[15px] lg:px-[28px] lg:py-[3px] lg:text-[35px]">
                            다시 일하고 싶지만, 내 삶의 방식도 지키고 싶다면?
                        </div>
                    </div>
                </div>
                <h1 className={"font-black text-[#541E80] text-[15px] mt-[11px] lg:text-[45px] lg:mt-[29px]"}>
                    구직자를 위한 GIG
                </h1>
                <h3 className={"font-extrabold text-[10px] mt-[7px] lg:text-[27px] lg:mt-[14px]"}>
                    위드긱은 정규직 중심의 채용 시장이 부담스러운 경력보유여성에게 맞춘<br/>
                    유연한 ‘실전 커리어' 방식입니다.
                </h3>
                <div className={"flex flex-col mt-[33px] gap-y-[8px] lg:mt-[74px] lg:gap-y-[29px]"}>
                    {[
                        {
                            logo: "/withGIG/section4_logo1.svg",
                            alt: "section4_logo1.svg",
                            title: "시간제, 재택, 단기 프로젝트 등 맞춤 근무 가능",
                            sub: "아이를 돌보면서도, 나만의 속도로 일할 수 있는 환경"
                        },
                        {
                            logo: "/withGIG/section4_logo2.svg",
                            alt: "section4_logo2.svg",
                            title: "실무 역할 기반 투입으로 성취감과 보람 모두 챙김",
                            sub: "기획서 작성, 콘텐츠 제작, 행사 준비 등 일한 만큼 결과가 보이는 구조"
                        },
                        {
                            logo: "/withGIG/section4_logo3.svg",
                            alt: "section4_logo3.svg",
                            title: "나의 커리어를 끊기지 않게, 유연하게 이어가기",
                            sub: "짧은 공백 후 자신감을 회복하고 다시 사회와 연결되는 방법"
                        }
                    ].map((item, idx) => (
                        <div key={idx}
                             className="relative z-0 flex flex-row bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
                             rounded-[15px] px-[12px] h-[40px] py-[8px]
                             lg:rounded-[40px] lg:px-[41px] lg:h-[94px] lg:py-[22px]">
                            <Image src={item.logo} alt={item.alt}
                                   width={22}
                                   height={22}
                                   unoptimized
                                   className={"lg:w-[49px] lg:h-[49px]"}/>
                            <div className={"flex flex-col justify-center ml-[15px] lg:ml-[64px]"}>
                                <p className={"font-extrabold text-[#541E80] text-[9px] lg:text-[24px]"}>{item.title}</p>
                                <p className={"font-semibold text-[#171717] text-[7px] lg:text-[20px]"}>{item.sub}</p>
                            </div>
                            <div className="absolute flex items-center justify-center border-[#C0AED1] border-[1px]
                                right-[14px] rounded-[5px] w-[16px] h-[16px]
                                lg:right-[37px] lg:rounded-[10px] lg:w-[40px] lg:h-[40px]">
                                <Image
                                    src={"/withGIG/check_purple_thin.svg"}
                                    alt={"check_purple_thin.svg"}
                                    width={11}
                                    height={12}
                                    unoptimized
                                    className={"lg:w-[38px] lg:h-[39px] mb-[8px] lg:mb-[25px] ml-[3px] lg:ml-[10px]"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={"flex flex-row justify-between items-center w-full h-auto mt-[42px] lg:mt-[126px]"}>
                    <div className="border-[#541E80]
                        w-[12px] h-[42px] rounded-l-[2px] border-t-[1px] border-l-[1px] border-b-[1px]
                        lg:w-[32px] lg:h-[117px] lg:rounded-l-[10px] lg:border-t-[2px] lg:border-l-[2px] lg:border-b-[2px]"></div>
                    <p className="font-extrabold text-[#541E80] text-center text-[10px] lg:text-[28px]">
                        풀타임이 아니어도 괜찮아요.<br/>
                        내 시간, 내 방식으로 일할 수 있어야 지속 가능하니까요.
                    </p>
                    <div className="border-[#541E80]
                        w-[12px] h-[42px] rounded-l-[2px] border-t-[1px] border-r-[1px] border-b-[1px]
                        lg:w-[32px] lg:h-[117px] lg:rounded-r-[10px] lg:border-t-[2px] lg:border-r-[2px] lg:border-b-[2px]"></div>
                </div>
            </section>
            {/* section5 - 구직자 말풍선 */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA] pt-[45px] lg:pt-[141px]">
                <div className="relative w-full h-[147px] lg:h-[480px]">
                    <Image
                        src={"/withGIG/section4_picture.png"}
                        alt={"section4_picture.png"}
                        fill
                        unoptimized
                        className="absolute z-0 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"/>
                    <div className="absolute z-10 flex justify-center items-center
                        top-[44px] left-[35px] w-[130px] h-[25px]
                        lg:top-[144px] lg:left-[133px] lg:w-[305px] lg:h-[80px]">
                        <Image
                            src={"/withGIG/speech_bubble_white1.png"}
                            alt={"speech_bubble_white1.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold text-[8px] mt-[2px] lg:text-[20px] lg:mt-[5px]">
                            육아 중이라도 다시 일하고 싶어요.
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        top-[82px] left-[58px] w-[126px] h-[45px]
                        lg:top-auto lg:bottom-[102px] lg:left-[235px] lg:w-[305px] lg:h-[104px]">
                        <Image
                            src={"/withGIG/speech_bubble_white2.png"}
                            alt={"speech_bubble_white1.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold text-[8px] mt-[4px] lg:text-[20px] lg:mt-[5px]">
                            풀타임은 어려워요.<br/>
                            내 시간에 맞춰 일할 수 없을까요?
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        top-[50px] right-[21px] w-[141px] h-[73px]
                        lg:top-auto lg:bottom-[63px] lg:right-[228px] lg:w-[317px] lg:h-[197px]">
                        <Image
                            src={"/withGIG/speech_bubble_purple1.png"}
                            alt={"speech_bubble_white1.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <div className="absolute z-20 flex flex-col ">
                            <p className="font-extrabold text-[8px] mt-[5px] lg:text-[20px] lg:mt-[5px]">
                                정규직이 아니어도 괜찮아요.<br/>
                                단기, 재택, 유연 근무로 내 삶의<br/>
                                방식에 맞는 커리어를 시작하세요.
                            </p>
                            <p className="font-black text-[#541E80] text-[8px] lg:text-[23px] lg:mt-[15px]">
                                바로 위드긱에서 가능합니다!
                            </p>
                        </div>
                    </div>
                </div>
                <Link
                    href={links[5]?.linkPath || "https://www.connecple.com"}
                    target="_blank"
                    className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold hover:scale-105 transition
                        mt-[19px] w-[131px] h-[25px] text-[10px] rounded-[30px]
                        lg:mt-[45px] lg:w-[316px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                        위드긱 ‘참여자’ 신청

                </Link>
            </section>
            {/* section6 - 기업을 위한 GIG */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA]">
                <div className="bg-white rounded-tr-[60px] px-[30px] mt-[60px]
                    lg:rounded-tr-[150px] lg:px-[200px] lg:mt-[108px]">
                    <div className="flex flex-row items-center mt-[51px] lg:mt-[110px]">
                        {/* 왼쪽 로고 */}
                        <Image
                            src="/withProject/logo_mini_C.svg"
                            alt="미니 로고"
                            width={21}
                            height={21}
                            unoptimized
                            className="lg:w-[36px] lg:h-[36px]"
                        />
                        {/* 말풍선 (꼬리 포함) */}
                        <div className="relative ml-[12px] lg:ml-[25px]">
                            {/* 꼬리 */}
                            <div className="absolute left-[-2px] top-1/2 transform -translate-y-1/2
                                w-[5px] h-[5px] lg:w-[10px] lg:h-[10px] bg-[#C0AED1] rotate-45"/>

                            {/* 말풍선 본문 */}
                            <div className="bg-[#C0AED1] text-white font-tvn-medium
                                px-[15px] py-[1px] rounded-[20px] text-[15px]
                                lg:px-[28px] lg:py-[3px] lg:rounded-[20px] lg:text-[35px]">
                                고정 인건비는 부담되는데, 일은 쌓여만 가는가요?
                            </div>
                        </div>
                    </div>
                    <h1 className={"font-black text-[#541E80] text-[15px] mt-[10px] lg:text-[45px] lg:mt-[29px]"}>
                        기업을 위한 GIG
                    </h1>
                    <h3 className={"font-extrabold text-[10px] mt-[7px] lg:text-[27px] lg:mt-[14px]"}>
                        전문성은 필요하지만 정규 채용은 부담스러운 기업에게,위드긱은<br />
                        ‘한 명을 뽑는 대신, 필요한 역할만 딱!’ 맡길 수 있는프로젝트 기반 인재 매칭 솔루션입니다.
                    </h3>
                    <div className={"flex flex-col mt-[33px] gap-y-[8px] lg:mt-[74px] lg:gap-y-[29px]"}>
                        {[
                            {
                                logo: "/withGIG/section6_logo1.svg",
                                alt: "section6_logo1.svg",
                                title: "필요한 기간만, 필요한 역할만",
                                sub: "교육 콘텐츠 제작, 행사 운영, 자료 정리, 문서 기획 등 실무 단위 투입"
                            },
                            {
                                logo: "/withGIG/section6_logo2.svg",
                                alt: "section6_logo2.svg",
                                title: "경력보유여성 중심의 실무형 인재풀",
                                sub: "위드프로젝트 수료자 중심, 실전 과제와 멘토링을 거친 검증된 인력"
                            },
                            {
                                logo: "/withGIG/section6_logo3.svg",
                                alt: "section6_logo3.svg",
                                title: "채용 부담 없이, 업무 효율은 높게",
                                sub: "고용 리스크 없이, 프로젝트 단위로 전문가를 ‘잘 써먹을 수 있는’ 기회"
                            }
                        ].map((item, idx) => (
                            <div key={idx}
                                 className="relative z-0 flex flex-row bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
                                    rounded-[15px] px-[12px] h-[40px] py-[8px]
                                    lg:rounded-[40px] lg:px-[41px] lg:h-[94px] lg:py-[22px]">
                                <Image src={item.logo} alt={item.alt}
                                       width={22}
                                       height={22}
                                       unoptimized
                                       className={"lg:w-[49px] lg:h-[49px]"}/>
                                <div className={"flex flex-col justify-center ml-[15px] lg:ml-[64px]"}>
                                    <p className={"font-extrabold text-[#541E80] text-[9px] lg:text-[24px]"}>{item.title}</p>
                                    <p className={"font-semibold text-[#171717] text-[7px] lg:text-[20px]"}>{item.sub}</p>
                                </div>
                                <div className="absolute flex items-center justify-center border-[#C0AED1] border-[1px]
                                    right-[14px] rounded-[5px] w-[16px] h-[16px]
                                    lg:right-[37px] lg:rounded-[10px] lg:w-[40px] lg:h-[40px]">
                                    <Image
                                        src={"/withGIG/check_purple_thin.svg"}
                                        alt={"check_purple_thin.svg"}
                                        width={11}
                                        height={12}
                                        unoptimized
                                        className={"lg:w-[38px] lg:h-[39px] mb-[8px] lg:mb-[25px] ml-[3px] lg:ml-[10px]"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex flex-row justify-between items-center w-full h-auto mt-[42px] lg:mt-[126px]"}>
                        <div className="border-[#541E80]
                        w-[12px] h-[42px] rounded-l-[2px] border-t-[1px] border-l-[1px] border-b-[1px]
                        lg:w-[32px] lg:h-[117px] lg:rounded-l-[10px] lg:border-t-[2px] lg:border-l-[2px] lg:border-b-[2px]"></div>
                        <p className="font-extrabold text-[#541E80] text-center text-[10px] lg:text-[28px]">
                            정규직은 부담되고, 프리랜서는 불안한 기업에게<br />
                            신뢰 가능한 실무 인재를 프로젝트별로 연결해드립니다.
                        </p>
                        <div className="border-[#541E80]
                        w-[12px] h-[42px] rounded-l-[2px] border-t-[1px] border-r-[1px] border-b-[1px]
                        lg:w-[32px] lg:h-[117px] lg:rounded-r-[10px] lg:border-t-[2px] lg:border-r-[2px] lg:border-b-[2px]"></div>
                    </div>
                </div>
            </section>
            {/* section7 - 기업 말풍선*/}
            <section className="flex flex-col w-full h-auto pt-[45px] lg:pt-[141px]">
                <div className="relative w-full h-[147px] lg:h-[480px]">
                    <Image
                        src={"/withGIG/section7_picture1.png"}
                        alt={"section7_picture.png"}
                        fill
                        unoptimized
                        className="absolute z-0 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"/>
                    <div className="absolute z-10 flex justify-center items-center
                        top-[24px] left-[23px] w-[101px] h-[42px]
                        lg:top-[69px] lg:left-[135px] lg:w-[247px] lg:h-[104px]">
                        <Image
                            src={"/withGIG/speech_bubble_white3.png"}
                            alt={"speech_bubble_white3.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold text-[8px] mt-[3px] lg:text-[20px] lg:mt-[5px]">
                            일은 계속 쌓이는데...<br />
                            또 사람 뽑기는 부담돼요.
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        top-[35px] right-[41px] w-[148px] h-[27px]
                        lg:top-[116px] lg:right-[130px] lg:w-[359px] lg:h-[87px]">
                        <Image
                            src={"/withGIG/speech_bubble_purple2.png"}
                            alt={"speech_bubble_purple2.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold text-[8px] mt-[2px] lg:text-[20px] lg:mt-[5px]">
                            정규직은 부담, 프리랜서는 불안하셨죠?
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        top-[79px] right-[24px] w-[199px] h-[30px]
                        lg:top-auto lg:bottom-[139px] lg:right-[162px] lg:w-[473px] lg:h-[87px]">
                        <Image
                            src={"/withGIG/speech_bubble_purple3.png"}
                            alt={"speech_bubble_purple3.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <div className="absolute z-20 flex flex-col ">
                            <p className="font-extrabold text-[8px] mt-[2px] lg:text-[20px] lg:mt-[5px]">
                                지금, 필요한 역할만 '딱' 맡길 수 있는 방법이 있습니다!
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className="font-black text-center text-[10px] mt-[12px] lg:text-[23px] lg:mt-[42px]">인건비는 줄이고, 전문성은 더하다</h2>
                <h3 className="font-black text-center text-[#541E80] text-[10px] mt-[8px] lg:text-[25px] lg:mt-[16px]">단기 프로젝트 중심의 검증된 실무 인재 매칭</h3>
                <Link
                    href={links[6]?.linkPath || "https://www.connecple.com"}
                    target="_blank"
                    className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold hover:scale-105 transition
                        mt-[26px] w-[131px] h-[25px] text-[10px] rounded-[30px]
                        lg:mt-[45px] lg:w-[316px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                    위드긱 ‘수요 기업’ 신청
                </Link>
            </section>
            {/* section8 */}
            <section className="flex flex-col w-full h-auto justify-center items-center
                px-[30px] mt-[102px] mb-[102px] lg:px-[200px] lg:mt-[286px] lg:mb-[196px]">
                <h1 className="font-black text-[#541E80] text-center text-[15px] lg:text-[45px]">
                    작지만 진짜 일,<br />
                    위드긱 어떻게 참여하나요?
                </h1>
                <h1 className="flex justify-center items-center font-black text-[#541E80]
                    text-[12px] mt-[26px] w-[137px] border-b-[1px] pb-[6px]
                    lg:text-[25px] lg:mt-[71px] lg:w-[477px] lg:border-b-[2px] lg:pb-[17px]">
                    신청절차</h1>
                <div className="flex flex-row w-full h-auto mt-[20px] lg:mt-[50px] justify-between">
                    {applicationProcess.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="flex items-center justify-center bg-white rounded-full
                                shadow-[inset_2px_2px_2px_0_rgba(0,0,0,0.125)] lg:shadow-[inset_4px_4px_4px_0_rgba(0,0,0,0.25)]
                                w-[23px] h-[23px] lg:w-[54px] lg:h-[54px]">
                                <p className="font-black text-[#541E80] text-[10px] lg:text-[20px]">{(idx + 1).toString().padStart(2, "0")}</p>
                            </div>
                            <p className="bg-[#541E80] text-white rounded-full font-extrabold
                                mt-[10px] py-[3px] px-[5px] text-[6px] lg:mt-[30px] lg:py-[5px] lg:px-[24px] lg:text-[23px]">{item.title}</p>
                            <p className="flex font-semibold justify-center items-center text-center
                                h-[40px] text-[6px] lg:h-[150px] lg:text-[18px]"
                               dangerouslySetInnerHTML={{__html: item.content}}/>
                            <Image
                                src={item.img}
                                alt="step"
                                width={30}
                                height={30}
                                className="lg:w-[150px] lg:h-[150px]"
                            >
                            </Image>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center bg-[#D9D9D9] w-full h-auto
                    rounded-[10px] mt-[19px] px-[20px] py-[10px] lg:rounded-[30px] lg:mt-[80px] lg:px-[40px] lg:py-[20px]">
                    <p className="font-black text-[#6C6C6C] text-center text-[6px] lg:text-[15px]">
                        위드긱 프로젝트 예시<br />
                        “실제 업무 현장에서 즉시 투입 가능한 실무 지원 역할”
                    </p>
                    <div className="w-full border-t-[0.5px] lg:border-t-2 border-dotted my-[3px] lg:my-[10px]" />
                    <p className="font-normal text-[#6C6C6C] text-center text-[5.5px] lg:text-[15px]">
                        <span className="font-black"> ① 교육 프로젝트 추가 가능 업무<br /></span>
                        - 자료 조사 및 번역 : 교육 교재, 참고자료, 해외 사례 번역·정리<br />
                        - 온라인 시스템 운영 : 줌(Zoom), Webex 등 화상강의 세팅 및 지원<br />
                        - 수강생 관리 : 출결 체크, 만족도 조사, 설문조사 데이터 취합<br />
                        - 홍보 지원 : SNS·홈페이지 교육 안내 게시, 신청자 모집 홍보 콘텐츠 보조<br />
                        - 성과 정리 : 교육 결과 리포트(요약본) 작성, 통계 그래프 제작<br /><br />

                        <span className="font-black">② 행사 프로젝트 추가 가능 업무<br /></span>
                        - 참가자 관리 : 사전 등록 확인, 현장 등록·출입 관리, 명찰 제작 지원<br />
                        - 홍보·마케팅 보조 : 행사 카드뉴스·웹포스터 제작 보조, 현장 SNS 홍보 지원<br />
                        - 현장 지원 세부 역할 : 안내데스크, 동시통역·장비 세팅 보조, 물품 배부<br />
                        - 행사 기록 : 사진·영상 촬영 보조, 현장 스케치 작성, 결과보고용 자료 취합<br />
                        - 파트너 협력 : 협찬·후원 업체 응대, 연사·패널 안내 및 지원
                    </p>
                </div>
                {showStickyBar && (
                    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-t border-gray-200">
                        <div
                            className="fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50 flex gap-x-[13px] lg:gap-x-[32px]"
                            style={{
                                bottom: 100 + extraOffset, // 푸터 겹침 보정
                                transition: "bottom 200ms ease",
                            }}
                        >
                            <Link
                                href={links[5]?.linkPath || "https://www.connecple.com"}
                                target="_blank"
                                className="bg-[#541E80] text-white self-center flex items-center justify-center hover:scale-105 transition
          w-[159px] h-[25px] text-[10px] rounded-[30px] font-bold
          lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:rounded-[30px] lg:font-extrabold"
                            >
                                위드긱 ‘참여자’ 신청
                            </Link>
                            <Link
                                href={links[6]?.linkPath || "https://www.connecple.com"}
                                target="_blank"
                                className="bg-[#541E80] text-white self-center flex items-center justify-center hover:scale-105 transition
          w-[159px] h-[25px] text-[10px] rounded-[30px] font-bold
          lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:rounded-[30px] lg:font-extrabold"
                            >
                                위드긱 ‘수요기업’ 신청
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
