"use client";

import Image from "next/image";
import Link from "next/link";

import {useEffect, useRef, useState} from "react";

const timelineItems = [
    {
        year: "2025",
        contents: ["5월 한국여성재단 기부", "4월 서울시 우먼업 인턴십 참여"],
    },
    {
        year: "2024",
        contents: ["12월 NIA SW 여성인재사업 네트워킹 파티 후원", "4월 서울시 우먼업 정규직 참여"],
    },
    {
        year: "2023",
        contents: ["3월 직접 생산 증명 발급 (전시)", "2월 커넥플 경력단절여성 제도"],
    },
    {
        year: "2022",
        contents: ["3월 직접 생산 증명 발급 (전시)", "2월 커넥플 경력단절여성 제도"],
    },
    {
        year: "2021",
        contents: ["3월 직접 생산 증명 발급 (전시)", "2월 커넥플 경력단절여성 제도"],
    },
    {
        year: "2020",
        contents: ["3월 직접 생산 증명 발급 (전시)", "2월 커넥플 경력단절여성 제도"],
    },
];

export default function AboutPage() {

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
        }
    };

    const scrollLeft = () => {
        const scrollAmount = window.innerWidth >= 1024 ? 800 : 300; // lg 기준
        scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const scrollAmount = window.innerWidth >= 1024 ? 800 : 300;
        scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", updateScrollState);
            return () => el.removeEventListener("scroll", updateScrollState);
        }
    }, []);

    const [selected, setSelected] = useState<'office' | 'class'>('office');


    return (
        <main>
            {/* section1 */}
            <section className="relative flex flex-col w-full h-auto
                pl-[30px] pr-[20px] mt-[46px] lg:pl-[106px] lg:pr-[76px] lg:mt-[180px]">
                <h2 className="font-extrabold text-end text-[15px] mr-[30px] lg:text-[60px] lg:mr-[100px]">
                    <span className="text-[#541E80]">커넥플은 함께 </span>
                    만들어 가는&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;과정 속에서
                </h2>
                <h1 className="font-extrabold text-end text-[20px] lg:text-[70px] lg:mr-[20px]">
                    즐거움을&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-[#541E80]">찾아갑니다.</span>
                </h1>
                <p className="font-normal z-10 text-[6px] mt-[60px] lg:text-[18px] lg:mt-[131px]">
                    커넥플은 사람과 일, 성장을 잇는 작은 연결을 만듭니다.<br/>
                    경력보유여성을 위한 커리어 프로그램을 직접 기획하고, 함께 성장해갑니다.<br/>
                    우리는 서로의 삶을 존중하고, 일하는 방식을 다양하게 인정합니다.
                </p>
                <p className="font-extrabold text-[8px] mt-[16px] lg:text-[20px] lg:mt-[51px]">
                    “경보녀, 당신의 가치를 응원합니다&#34;
                </p>
                <Link
                    href={"/about"}
                    className="flex font-bold justify-center items-center text-[#541E80]
                        rounded-[10px] w-[96px] h-[17px] text-[7px] mt-[3px] mb-[5px] border-[0.5px]
                        lg:rounded-[20px] lg:w-[262px] lg:h-[36px] lg:text-[20px] lg:mt-[14px] lg:mb-[26px] lg:border-[2px]
                        hover:bg-[#541E80] hover:text-white hover:border-[2px] border-[#541E80]">
                    이슈메이커 기사 보러가기
                </Link>
                <Image src={"/about/ceo_picture.png"} alt={"ceo"}
                       width={153}
                       height={226}
                       unoptimized
                       className="absolute right-[71px] lg:right-[340px] bottom-0 lg:w-[450px] lg:h-[680px]"
                />
            </section>
            {/* section2 */}
            <section className="flex flex-col w-full h-auto
                px-[30px] mt-[59px] mb-[60px] lg:px-[157px] lg:mt-[225px] lg:mb-[229px]">
                <h1 className="font-black text-[#541E80] text-[15px] lg:text-[45px]">
                    협력과 소통으로 이루어진 우리 팀을 소개합니다.
                </h1>
                <p className="font-extrabold text-[10px] mt-[11px] lg:text-[27px] lg:mt-[12px]">
                    각자의 전문성을 바탕으로 유기적인 협업 체계를 이루고 있습니다
                </p>
                <div className="flex flex-row w-full h-auto justify-between mt-[24px] lg:mt-[76px]">
                    {[
                        {
                            img_url: "/about/profile_pjh.png",
                            position: "대표",
                            name: "박지희",
                            des: '성과 중심의 마케팅 전략과<br /> 브랜딩 디자인을 담당하는<br /><span class="font-black text-[#541E80]">홍보사업부</span>',
                        },
                        {
                            img_url: "/about/profile_ksg.png",
                            position: "팀장",
                            name: "권슬기",
                            des: '다양한 규모 행사<br />기획·실행을 전문으로 하는<br /><span class="font-black text-[#541E80]">MICE 사업부</span>',
                        },
                        {
                            img_url: "/about/profile_ahi.png",
                            position: "팀장",
                            name: "안혜인",
                            des: '10년 이상의 현장 경험을<br />바탕으로 한 교육 기획·운영<br />전문가 조직 <span class="font-black text-[#541E80]">교육사업부</span>'
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col justify-center items-center bg-[#F4F4F4] shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)]
                            w-[92px] h-[104px] rounded-[10px] lg:w-[296px] lg:h-[318px] lg:rounded-[50px]">
                            <div className="flex flex-row w-full h-auto items-center px-[3px] lg:px-[14px] lg:mt-[-15px]">
                                <div className="overflow-hidden rounded-full w-[44px] h-[44px] lg:w-[157px] lg:h-[157px]">
                                    <Image
                                        src={item.img_url}
                                        alt={"alt"}
                                        width={44}
                                        height={44}
                                        unoptimized
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-center mt-[8px] lg:mt-[20px]">
                                    <p className="font-bold text-[8px] lg:text-[20px]">{item.position}</p>
                                    <p className="font-black text-[10px] lg:text-[30px]">{item.name}</p>
                                </div>
                            </div>
                            <div className="w-full px-[5px] lg:px-[24px]">
                                <div className="border-[#C0AED1] border-[0.5px] lg:border-[1.5px] w-full"/>
                            </div>
                            <p className="font-bold text-[7px] mt-[10px] lg:text-[20px] lg:px-[24px] lg:mt-[19px]"
                                dangerouslySetInnerHTML={{__html:item.des}}>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            {/* section3 */}
            <section className="flex flex-col w-full h-auto bg-[#F6F6F6] px-[30px] pb-[50px] lg:px-[157px] lg:pb-[109px]">
                <h1 className="font-black text-[#541E80] text-[15px] mt-[33px] lg:text-[45px] lg:mt-[108px]">
                    더 나은 내일을 꿈꿔온 우리
                </h1>
                <p className="font-extrabold text-[#383838] text-[10px] lg:text-[27px] lg:mt-[12px]">
                    커넥플이 걸어온 길
                </p>
                {/* 화살표 */}
                <div className="flex justify-end gap-[22px] lg:gap-[44px]">
                    {/* 왼쪽 화살표 */}
                    <button onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className={`${canScrollLeft ? "cursor-pointer" : "cursor-not-allowed"}`}
                    >
                        <Image
                            src={canScrollLeft ? "/main/vector_right_black.svg" : "/main/vector_left_gray.svg"}
                            alt="left"
                            width={12}
                            height={8}
                            className={`object-contain ${canScrollLeft ? "rotate-180" : ""} lg:w-[22px] lg:h-[16px]}]`}
                        />
                    </button>
                    {/* 오른쪽 화살표 */}
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className={`${canScrollRight ? "cursor-pointer" : "cursor-not-allowed"}`}
                    >
                        <Image
                            src={canScrollRight ? "/main/vector_right_black.svg" : "/main/vector_left_gray.svg"}
                            alt="right"
                            width={12}
                            height={8}
                            className={`object-contain ${!canScrollRight ? "rotate-180" : ""} lg:w-[22px] lg:h-[16px]`}
                        />
                    </button>
                </div>
                {/* 타임라인 바 */}
                <div ref={scrollRef} className="overflow-x-auto scroll-smooth no-scrollbar">
                    <div className="flex flex-row items-start relative min-w-fit mt-[16px] lg:mt-[70px]">
                        {timelineItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="min-w-fit flex flex-col items-start">
                                {/* 연도 */}
                                <div className="text-[#541E80] font-black text-[13px] lg:text-[35px]">
                                    {item.year}
                                </div>
                                {/* 점 */}
                                <div className="bg-[#541E80] rounded-full w-[6px] h-[6px]
                                    lg:w-[13px] lg:h-[13px] lg:mt-[27px]"/>
                                {/* 선 */}
                                <div className="border-[#541E80] border-[1px] lg:border-[2px] w-full mt-[-4px] lg:mt-[-9px]"/>
                                {/* 내용 */}
                                <div className="flex flex-col font-semibold text-start text-[#9A9A9A]
                                    gap-y-[2px] text-[7px] mt-[13px] mr-[40px]
                                    lg:gap-y-[4px] lg:text-[20px] lg:mt-[33px] lg:mr-[170px]">
                                    {item.contents.map((line, i) => (
                                        <span key={i}>{line}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* section4 */}
            <section className="flex w-full h-auto px-[30px] lg:px-[157px]">
                <div className="flex flex-row justify-between w-full h-auto my-[63px] lg:my-[203px]">
                    {[
                        {
                            path: "/about/section4_picture1.png",
                            title: "NIA 2023년 SW여성인재 역량강화기반 조성교육",
                            content: "타이트한 일정이었지만 엑기스로 배울 수 있어 좋았습니다. 강사님께서 친절하고 밝게 교육해주셔서 에너지가 너무 좋았습니다."
                        },
                        {
                            path: "/about/section4_picture2.png",
                            title: "NIA 2023년 SW여성인재 역량강화기반 조성교육",
                            content: "과제를 통해 이론뿐만이 아니라 실무 스킬까지 익힐 수 있는 점이 너무 만족스러웠습니다. 새로운 도전에 설레고 재밌었어요."
                        },
                        {
                            path: "/about/section4_picture3.png",
                            title: "K-DATA 2023년 데이터안심구역<br />미개방데이터 확보 및 이용 활성화",
                            content: "일방적인 주입식 교육이 아닌 과제 피드백과 중간중간 소통을 통해 교육이 진행되어 더욱 집중할 수 있었습니다."
                        }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col w-[98px] lg:w-[314px]  h-auto items-center">
                            <div className="relative w-full h-[87px] lg:h-[279px] rounded-[10px] lg:rounded-[30px] overflow-hidden">
                                <Image
                                    src={item.path}
                                    alt="alt"
                                    fill
                                    unoptimized
                                    className="object-fill rounded-[10px] lg:rounded-[30px]"
                                />
                            </div>
                            <div className="flex w-full h-[40px] lg:h-[84px] justify-center items-center">
                                <p className="font-extrabold text-[7px] lg:text-[15px] text-center"
                                   dangerouslySetInnerHTML={{__html: item.title}}/>
                            </div>

                            <p className="w-full h-auto text-center font-semibold
                                text-[6px] lg:text-[16px]"
                               dangerouslySetInnerHTML={{__html: item.content}}/>
                        </div>
                    ))}
                </div>
            </section>
            {/* section5 */}
            <section className="flex flex-col w-full h-auto bg-gradient-to-b from-[#C0AED1B2] to-white
                px-[30px] lg:px-[157px] pb-[50px] lg:pb-[100px]">
                <h1 className="font-black text-[#541E80] text-[15px] mt-[35px] lg:text-[45px] lg:mt-[78px]">
                    우리가 행복해야 회사도 잘된다!
                </h1>
                <p className="font-extrabold text-[#383838] text-[10px] mt-[10px] lg:text-[27px] lg:mt-[12px]">
                    커넥플에서 제공하는 복지 혜택
                </p>
                <div className="flex flex-col w-full h-auto mt-[23px] gap-y-[11px] lg:mt-[46px] lg:gap-y-[23px]">
                    <div className="flex flex-row w-full h-auto justify-between items-center">
                        {[
                            {
                                title: "우리가 행복해야<br />회사도 잘된다",
                                main: "유연근무제"
                            },
                            {
                                title: "바쁜 내 자신을 위한<br />출퇴근 시간 절약",
                                main: "재택근무제"
                            },
                            {
                                title: "마음껏 공부하고<br />힘차게 재도약",
                                main: "클래스 101 무제한 수강"
                            },
                            {
                                title: "건물 있는 회사<br />교육장 있는 회사",
                                main: "사내 교육장"
                            },

                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col bg-[#F9F9F9] shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] h-auto
                                    w-[70px] rounded-[10px] p-[5px] lg:w-[256px] lg:rounded-[15px] lg:p-[10px]">
                                <p className="font-extrabold text-start text-[7px] lg:text-[18px]"
                                   dangerouslySetInnerHTML={{__html: item.title}}/>
                                <p className="font-bold text-end text-[6px] mt-[5px] lg:text-[15px] lg:mt-[12px]"
                                   dangerouslySetInnerHTML={{__html: item.main}}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row w-full h-auto justify-between items-center">
                        <div className="relative bg-[#F9F9F9] shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]
                            w-[70px] h-[80px] rounded-[10px] p-[5px]
                            lg:w-[250px] lg:h-[260px] lg:rounded-[15px] lg:p-[12px]">
                            <p className="absolute font-extrabold text-start text-[7px] lg:text-[18px]">
                                재충전이 필요할 땐<br/>
                                눈치보지 말고
                            </p>
                            <p className="absolute font-bold text-end
                                text-[6px] lg:text-[15px] bottom-[5px] right-[5px] lg:bottom-[12px] lg:right-[12px]">
                                연말/연초 리프레쉬 휴가
                            </p>
                        </div>
                        <div>
                            <Image
                                src={"/about/section5_image.png"}
                                alt={"section5_image.png"}
                                width={150}
                                height={130}
                                unoptimized
                                className="object-contain lg:w-[500px] lg:h-[260px]"
                            />
                        </div>

                        <div className="relative bg-[#F9F9F9] shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]
                            w-[70px] h-[80px] rounded-[10px] p-[5px]
                            lg:w-[250px] lg:h-[260px] lg:rounded-[15px] lg:p-[12px]">
                            <p className="absolute font-extrabold text-start text-[7px] lg:text-[18px]">
                                아프지마<br/>
                                건강히 일해야지
                            </p>
                            <p className="absolute font-bold text-end
                                text-[6px] lg:text-[15px] bottom-[5px] right-[5px] lg:bottom-[12px] lg:right-[12px]">
                                정기 건강검진
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row w-full h-auto justify-between items-center">
                        {[
                            {
                                title: "스팸, 한방샴푸<br />그게 뭐죠?",
                                main: "특별한 명절선물"
                            },
                            {
                                title: "생일을 진심으로<br />축하하는 커넥플",
                                main: "생일 선물 & 기념 연차"
                            },
                            {
                                title: "나도 안챙기는 과일<br />회사가 챙겨주네",
                                main: "계절 과일 선물"
                            },
                            {
                                title: "나는야 초단기<br />긱워커",
                                main: "(해당자)긱근무제"
                            },

                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col bg-[#F9F9F9] shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] h-auto
                                    w-[70px] rounded-[10px] p-[5px] lg:w-[256px] lg:rounded-[15px] lg:p-[10px]">
                                <p className="font-extrabold text-start text-[7px] lg:text-[18px]"
                                   dangerouslySetInnerHTML={{__html: item.title}}/>
                                <p className="font-bold text-end text-[6px] mt-[5px] lg:text-[15px] lg:mt-[12px]"
                                   dangerouslySetInnerHTML={{__html: item.main}}/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* section6 */}
            <section className="flex flex-col w-full h-auto px-[30px] pb-[50px] lg:px-[157px] lg:pb-[220px]">
                <h1 className="font-black text-[#541E80] text-[15px] lg:text-[45px] lg:mt-[78px]">
                    당신을 맞이할 준비가 되어 있는 곳
                </h1>
                <p className="font-extrabold text-[#383838] text-[12px] mt-[6px] lg:text-[27px] lg:mt-[12px]">
                    커넥플로 오시는 길
                </p>
                <div className="flex flex-row w-full h-auto justify-between items-center
                    mt-[24px] gap-x-[20px] lg:mt-[48px] lg:gap-x-[39px]">
                    <button onClick={() => setSelected('office')}
                            className={`flex w-full h-full justify-center items-center font-black border-b-[1px] lg:border-b-[2px]
                        ${selected === 'office' ? 'text-[#541E80]' : 'text-[#B3B3B3]'}
                        text-[10px] pb-[5px] lg:text-[25px] lg:pb-[17px] cursor-pointer`}
                    >
                        사무실
                    </button>
                    <button onClick={() => setSelected('class')}
                            className={`flex w-full h-full justify-center items-center font-black border-b-[1px] lg:border-b-[2px]
                        ${selected === 'class' ? 'text-[#541E80]' : 'text-[#B3B3B3]'}
                        text-[10px] pb-[5px] lg:text-[25px] lg:pb-[17px] cursor-pointer`}
                    >
                        교육장
                    </button>
                </div>
                {/* 탭 콘텐츠 영역 */}
                <div className="w-full h-auto mt-[22px] lg:mt-[44px]">
                    {selected === 'office' && (
                        <div className="flex flex-col w-full h-auto aspect-video gap-y-[10px] lg:gap-y-[20px]">
                            {/* 지도 */}
                            <div className="flex w-full h-auto aspect-video">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.378272641362!2d126.84948147596894!3d37.522579426647354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9dced2e3ccd9%3A0xce8b9f57f744560e!2z7ISc7Jq47Yq567OE7IucIOyWkeyynOq1rCDspJHslZnroZwgMjk0!5e0!3m2!1sko!2skr!4v1752243346640!5m2!1sko!2skr"
                                    width="100%"
                                    height="100%"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            {/* 정보 */}
                            <div className="flex flex-col w-full h-auto justify-end gap-y-[4px] lg:gap-y-[8px]">
                                {/* 주소 */}
                                <div className="flex flex-row w-full h-auto gap-x-[13px] lg:gap-x-[26px]">
                                    <p className="font-bold text-[10px] lg:text-[18px]">주&nbsp;&nbsp;&nbsp;&nbsp;소</p>
                                    <div className="flex flex-row items-center justify-center gap-x-[6px] lg:gap-x-[12px]">
                                        <p className="font-normal text-[10px] lg:text-[18px]">서울시 양천구 중앙로294, 명성빌딩 6층 6-50호</p>
                                    </div>
                                </div>
                                {/* 버스 */}
                                <div className="flex flex-row w-full h-auto gap-x-[13px] lg:gap-x-[26px]">
                                    <p className="font-bold text-[10px] lg:text-[18px]">버&nbsp;&nbsp;&nbsp;&nbsp;스</p>
                                    <div className="flex flex-col gap-y-[4px] lg:gap-y-[8px]">
                                        <div className="flex flex-row items-center justify-start gap-x-[6px] lg:gap-x-[12px]">
                                            <Image
                                                src={"/about/icon_bus_blue.svg"}
                                                alt={"icon_bus_green"}
                                                width={9}
                                                height={10}
                                                unoptimized
                                                className="lg:w-[16px] lg:h-[19px]"
                                            />
                                            <p className="font-bold text-[#476FF3] text-[10px] lg:text-[18px]">603</p>
                                            <p className="font-normal text-[10px] lg:text-[18px]">신정네거리역 하차, 도보 2분</p>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-x-[6px] lg:gap-x-[12px]">
                                            <Image
                                                src={"/about/icon_bus_green.svg"}
                                                alt={"icon_bus_green"}
                                                width={9}
                                                height={10}
                                                unoptimized
                                                className="lg:w-[16px] lg:h-[19px]"
                                            />
                                            <p className="font-bold text-[#43C478] text-[10px] lg:text-[18px]">6514, 98, 5012,6614, 6714, 양천03, 6617</p>
                                        </div>
                                        <p className="font-semibold text-[#4A4A4A]
                                            text-[10px] ml-[14px] lg:text-[18px] lg:ml-[28px]">
                                            신정네거리역 3번출구, 도보 3분
                                        </p>
                                    </div>
                                </div>
                                {/* 지하철 */}
                                <div className="flex flex-row w-full h-auto gap-x-[13px] lg:gap-x-[26px]">
                                    <p className="font-bold text-[10px] lg:text-[18px]">지하철</p>
                                    <div className="flex flex-row items-center justify-center gap-x-[6px] lg:gap-x-[12px]">
                                        <Image
                                            src={"/about/icon_subway_green.svg"}
                                            alt={"icon_bus_green"}
                                            width={9}
                                            height={10}
                                            unoptimized
                                            className="lg:w-[16px] lg:h-[19px]"
                                        />
                                        <p className="font-bold text-[#43C478] text-[10px] lg:text-[18px]">2호선</p>
                                        <p className="font-normal text-[10px] lg:text-[18px]">신정네거리역</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selected === 'class' && (
                        <div className="flex flex-col w-full h-auto aspect-video gap-y-[10px] lg:gap-y-[20px]">
                            {/* 지도 */}
                            <div className="flex w-full h-auto aspect-video">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.448622010018!2d126.85253017596872!3d37.520920726742325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9dcfacf9f7f3%3A0x35655742a1e20836!2z7ISc7Jq47Yq567OE7IucIOyWkeyynOq1rCDsnYDtlonsoJXroZw16ri4IDQy!5e0!3m2!1sko!2skr!4v1752249782288!5m2!1sko!2skr"
                                    width="100%"
                                    height="100%"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            {/* 정보 */}
                            <div className="flex flex-col w-full h-auto justify-end gap-y-[4px] lg:gap-y-[8px]">
                                {/* 주소 */}
                                <div className="flex flex-row w-full h-auto gap-x-[13px] lg:gap-x-[26px]">
                                    <p className="font-bold text-[10px] lg:text-[18px]">주&nbsp;&nbsp;&nbsp;&nbsp;소</p>
                                    <div className="flex flex-row items-center justify-center gap-x-[6px] lg:gap-x-[12px]">
                                        <p className="font-normal text-[10px] lg:text-[18px]">서울시 양천구 은행정로5길 42, 2층 커넥플아카데미</p>
                                    </div>
                                </div>
                                {/* 버스 */}
                                <div className="flex flex-row w-full h-auto gap-x-[13px] lg:gap-x-[26px]">
                                    <p className="font-bold text-[10px] lg:text-[18px]">버&nbsp;&nbsp;&nbsp;&nbsp;스</p>
                                    <div className="flex flex-col gap-y-[4px] lg:gap-y-[8px]">
                                        <div className="flex flex-row items-center justify-start gap-x-[6px] lg:gap-x-[12px]">
                                            <Image
                                                src={"/about/icon_bus_blue.svg"}
                                                alt={"icon_bus_green"}
                                                width={9}
                                                height={10}
                                                unoptimized
                                                className="lg:w-[16px] lg:h-[19px]"
                                            />
                                            <p className="font-bold text-[#476FF3] text-[10px] lg:text-[18px]">603</p>
                                            <p className="font-normal text-[10px] lg:text-[18px]">신정네거리역 하차, 도보 2분</p>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-x-[6px] lg:gap-x-[12px]">
                                            <Image
                                                src={"/about/icon_bus_green.svg"}
                                                alt={"icon_bus_green"}
                                                width={9}
                                                height={10}
                                                unoptimized
                                                className="lg:w-[16px] lg:h-[19px]"
                                            />
                                            <p className="font-bold text-[#43C478] text-[10px] lg:text-[18px]">6514, 98, 5012,6614, 6714, 양천03, 6617</p>
                                        </div>
                                        <p className="font-semibold text-[#4A4A4A]
                                            text-[10px] ml-[14px] lg:text-[18px] lg:ml-[28px]">
                                            신정네거리역 3번출구, 도보 3분
                                        </p>
                                    </div>
                                </div>
                                {/* 지하철 */}
                                <div className="flex flex-row w-full h-auto gap-x-[13px] lg:gap-x-[26px]">
                                    <p className="font-bold text-[10px] lg:text-[18px]">지하철</p>
                                    <div className="flex flex-row items-center justify-center gap-x-[6px] lg:gap-x-[12px]">
                                        <Image
                                            src={"/about/icon_subway_green.svg"}
                                            alt={"icon_bus_green"}
                                            width={9}
                                            height={10}
                                            unoptimized
                                            className="lg:w-[16px] lg:h-[19px]"
                                        />
                                        <p className="font-bold text-[#43C478] text-[10px] lg:text-[18px]">2호선</p>
                                        <p className="font-normal text-[10px] lg:text-[18px]">신정네거리역</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
