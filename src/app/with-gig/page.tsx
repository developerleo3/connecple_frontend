"use client";

import Image from "next/image";
import Link from "next/link";

export default function WithGigPage() {
    return (
        <main>
            {/* section1 */}
            <section className={"relative w-full aspect-video"}>
                <Image
                    src={"/withGIG/bg_image.png"}
                    alt={"bg-image.png"}
                    fill
                    unoptimized
                    className={"z-0"}
                />
                <div className={"absolute z-10 flex flex-col lg:left-[140px] lg:top-[132px]"}>
                    <h3 className={"font-bold text-[#D8AEFF] lg:text-[23px]"}>
                        경력, 일, 삶의 균형을 위한 새로운 일의 방식
                    </h3>
                    <h1 className={"font-black text-white lg:text-[50px] lg:mt-[47px]"}>
                        경력보유여성을 위한<br/>
                        유연근무 기반 일경험 플랫폼
                    </h1>
                </div>
                <p className={"absolute z-10 text-white font-bold leading-loose lg:text-[25px] lg:left-[140px] lg:bottom-[123px]"}>
                    위드긱은 ‘긱(GIG)’ 근무 방식을 기반으로,<br/>
                    경력보유여성들이 자신만의 속도로 다시 일할 수 있도록<br/>
                    재택 · 유연 · 단기 중심의 프로젝트형 일자리를 연결해주는 커리어 플랫폼입니다.
                </p>
            </section>
            {/* section2 */}
            <section className={"flex flex-col w-full h-auto lg:px-[200px] lg:mt-[169px]"}>
                <h1 className={"font-black text-[#541E80] lg:text-[45px]"}>이런 분들을 위해 만들어졌습니다.</h1>
                <div className={"flex flex-col w-full h-auto lg:mt-[46px] lg:gap-y-[23px]"}>
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
                            className={`${idx % 2 === 0 ? "bg-[#F6F6F6]" : "bg-[#ECECEC]"} group
                                flex flex-row justify-between items-center w-full h-auto shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)] 
                                lg:rounded-[20px] lg:pl-[45px] lg:pr-[20px] lg:py-[10px]`}
                        >
                            <div className={"flex flex-col group-hover:lg:mt-[10px]"}>
                                <p className={"font-bold lg:text-[25px]"}>{item.title}</p>
                                <p className={"hidden group-hover:block text-[#9E9E9E] font-normal lg:text-[20px] lg:mt-[20px]"}>{item.content}</p>
                            </div>
                            <p className={"font-extrabold text-[#C0AED166] lg:text-[45px] group-hover:lg:text-[65px]"}>{item.index}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* section3 */}
            <section className={"flex flex-col w-full h-auto lg:px-[200px] lg:mt-[455px]"}>
                <h1 className={"font-black text-[#541E80] lg:text-[45px]"}>
                    위드GIG 성공사례
                </h1>
                <div className={"font-bold leading-loose lg:text-[25px] lg:mt-[26px]"}>
                    • “나도 다시 할 수 있을까?”라는 고민에서 시작된 변화의 이야기<br/>
                    • 위드긱을 통해 다시 일하기 시작한 사람들의 진짜 이야기<br/>
                    • 당신의 다음 이야기가 될 수 있는, 누군가의 지금 이야기<br/>
                </div>
                <div className={"flex flex-row w-full h-auto justify-between lg:mt-[54px]"}>
                    <div className="flex bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] items-center justify-center
                        lg:w-[42px] lg:h-[293px] lg:rounded-[15px]">
                        <p className="font-semibold lg:text-[20px]">{"<"}</p>
                    </div>
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
                            width={40}
                            height={40}
                            unoptimized
                            className={"lg:w-[293px] lg:h-[293px] lg:rounded-[30px]"}/>
                    ))}
                    <div className="flex bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] items-center justify-center
                        lg:w-[42px] lg:h-[293px] lg:rounded-[15px]">
                        <p className="font-semibold lg:text-[20px]">{">"}</p>
                    </div>
                </div>
            </section>
            {/* section4 */}
            <section className={"flex flex-col w-full h-auto bg-[#EAEAEA] " +
                "lg:mt-[159px] lg:rounded-tl-[150px] lg:px-[200px]"}>
                <div className="flex flex-row items-center lg:mt-[110px]">
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
                    <div className="relative lg:ml-[25px]">
                        {/* 꼬리 */}
                        <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2
                            lg:w-[10px] lg:h-[10px] bg-[#C0AED1] rotate-45"/>

                        {/* 말풍선 본문 */}
                        <div className="bg-[#C0AED1] text-white font-tvn-medium
                            lg:px-[28px] lg:py-[3px] lg:rounded-[20px] text-[15px] lg:text-[25px]">
                            다시 일하고 싶지만, 내 삶의 방식도 지키고 싶다면?
                        </div>
                    </div>
                </div>
                <h1 className={"font-black text-[#541E80] lg:text-[45px] lg:mt-[29px]"}>
                    구직자를 위한 GIG
                </h1>
                <h3 className={"font-extrabold lg:text-[27px] lg:mt-[14px]"}>
                    위드긱은 정규직 중심의 채용 시장이 부담스러운 경력보유여성에게 맞춘<br/>
                    유연한 ‘실전 커리어' 방식입니다.
                </h3>
                <div className={"flex flex-col lg:mt-[74px] lg:gap-y-[29px]"}>
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
                             className={"relative z-0 flex flex-row bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] " +
                                 "lg:rounded-[40px] lg:px-[41px] lg:h-[94px] lg:py-[22px]"}>
                            <Image src={item.logo} alt={item.alt}
                                   width={123}
                                   height={123}
                                   unoptimized
                                   className={"lg:w-[49px] lg:h-[49px]"}/>
                            <div className={"flex flex-col justify-center lg:ml-[64px]"}>
                                <p className={"font-extrabold text-[#541E80] lg:text-[24px]"}>{item.title}</p>
                                <p className={"font-semibold text-[#171717] lg:text-[20px]"}>{item.sub}</p>
                            </div>
                            <div className={"absolute flex items-center justify-center border-[#C0AED1] border-[1px] " +
                                "lg:right-[37px] lg:rounded-[10px] lg:w-[40px] lg:h-[40px]"}>
                                <Image
                                    src={"/withGIG/check_purple_thin.svg"}
                                    alt={"check_purple_thin.svg"}
                                    width={123}
                                    height={123}
                                    unoptimized
                                    className={"lg:w-[38px] lg:h-[39px] lg:mb-[25px]"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={"flex flex-row justify-between items-center w-full h-auto lg:mt-[126px]"}>
                    <div className="border-[#541E80] lg:w-[32px] lg:h-[117px] lg:rounded-l-[10px]
                        lg:border-t-[2px] lg:border-l-[2px] lg:border-b-[2px]"></div>
                    <p className="font-extrabold text-[#541E80] text-center lg:text-[28px]">
                        풀타임이 아니어도 괜찮아요.<br/>
                        내 시간, 내 방식으로 일할 수 있어야 지속 가능하니까요.
                    </p>
                    <div className="border-[#541E80] lg:w-[32px] lg:h-[117px] lg:rounded-r-[10px]
                        lg:border-t-[2px] lg:border-r-[2px] lg:border-b-[2px]"></div>
                </div>
            </section>
            {/* section5 */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA] lg:pt-[141px]">
                <div className="relative w-full lg:h-[480px]">
                    <Image
                        src={"/withGIG/section4_picture.png"}
                        alt={"section4_picture.png"}
                        fill
                        unoptimized
                        className="absolute z-0 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"/>
                    <div className="absolute z-10 flex justify-center items-center
                        lg:top-[144px] lg:left-[133px] lg:w-[305px] lg:h-[80px]">
                        <Image
                            src={"/withGIG/speech_bubble_white1.png"}
                            alt={"speech_bubble_white1.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold lg:text-[20px] lg:mt-[5px]">
                            육아 중이라도 다시 일하고 싶어요.
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        lg:bottom-[102px] lg:left-[235px] lg:w-[305px] lg:h-[104px]">
                        <Image
                            src={"/withGIG/speech_bubble_white2.png"}
                            alt={"speech_bubble_white1.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold lg:text-[20px] lg:mt-[5px]">
                            풀타임은 어려워요.<br/>
                            내 시간에 맞춰 일할 수 없을까요?
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        lg:bottom-[63px] lg:right-[228px] lg:w-[317px] lg:h-[197px]">
                        <Image
                            src={"/withGIG/speech_bubble_purple1.png"}
                            alt={"speech_bubble_white1.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <div className="absolute z-20 flex flex-col ">
                            <p className="font-extrabold lg:text-[20px] lg:mt-[5px]">
                                정규직이 아니어도 괜찮아요.<br/>
                                단기, 재택, 유연 근무로 내 삶의<br/>
                                방식에 맞는 커리어를 시작하세요.
                            </p>
                            <p className="font-black text-[#541E80] lg:text-[23px] lg:mt-[15px]">
                                바로 위드긱에서 가능합니다!
                            </p>
                        </div>
                    </div>
                </div>
                <Link
                    href="/with-gig"
                    className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold
                        lg:mt-[45px] lg:w-[316px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                    참여자 지원하기
                </Link>
            </section>
            {/* section6 */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA]">
                <div className="bg-white lg:rounded-tr-[150px] lg:px-[200px] lg:mt-[108px]">
                    <div className="flex flex-row items-center lg:mt-[110px]">
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
                        <div className="relative lg:ml-[25px]">
                            {/* 꼬리 */}
                            <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2
                            lg:w-[10px] lg:h-[10px] bg-[#C0AED1] rotate-45"/>

                            {/* 말풍선 본문 */}
                            <div className="bg-[#C0AED1] text-white font-tvn-medium
                            lg:px-[28px] lg:py-[3px] lg:rounded-[20px] text-[15px] lg:text-[25px]">
                                고정 인건비는 부담되는데, 일은 쌓여만 가는가요?
                            </div>
                        </div>
                    </div>
                    <h1 className={"font-black text-[#541E80] lg:text-[45px] lg:mt-[29px]"}>
                        기업을 위한 GIG
                    </h1>
                    <h3 className={"font-extrabold lg:text-[27px] lg:mt-[14px]"}>
                        전문성은 필요하지만 정규 채용은 부담스러운 기업에게,위드긱은<br />
                        ‘한 명을 뽑는 대신, 필요한 역할만 딱!’ 맡길 수 있는프로젝트 기반 인재 매칭 솔루션입니다.
                    </h3>
                    <div className={"flex flex-col lg:mt-[74px] lg:gap-y-[29px]"}>
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
                                 className={"relative z-0 flex flex-row bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] " +
                                     "lg:rounded-[40px] lg:px-[41px] lg:h-[94px] lg:py-[22px]"}>
                                <Image src={item.logo} alt={item.alt}
                                       width={123}
                                       height={123}
                                       unoptimized
                                       className={"lg:w-[49px] lg:h-[49px]"}/>
                                <div className={"flex flex-col justify-center lg:ml-[64px]"}>
                                    <p className={"font-extrabold text-[#541E80] lg:text-[24px]"}>{item.title}</p>
                                    <p className={"font-semibold text-[#171717] lg:text-[20px]"}>{item.sub}</p>
                                </div>
                                <div
                                    className={"absolute flex items-center justify-center border-[#C0AED1] border-[1px] " +
                                        "lg:right-[37px] lg:rounded-[10px] lg:w-[40px] lg:h-[40px]"}>
                                    <Image
                                        src={"/withGIG/check_purple_thin.svg"}
                                        alt={"check_purple_thin.svg"}
                                        width={123}
                                        height={123}
                                        unoptimized
                                        className={"lg:w-[38px] lg:h-[39px] lg:mb-[25px]"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex flex-row justify-between items-center w-full h-auto lg:mt-[126px]"}>
                        <div className="border-[#541E80] lg:w-[32px] lg:h-[117px] lg:rounded-l-[10px]
                            lg:border-t-[2px] lg:border-l-[2px] lg:border-b-[2px]" />
                        <p className="font-extrabold text-[#541E80] text-center lg:text-[28px]">
                            정규직은 부담되고, 프리랜서는 불안한 기업에게<br />
                            신뢰 가능한 실무 인재를 프로젝트별로 연결해드립니다.
                        </p>
                        <div className="border-[#541E80] lg:w-[32px] lg:h-[117px] lg:rounded-r-[10px]
                            lg:border-t-[2px] lg:border-r-[2px] lg:border-b-[2px]" />
                    </div>
                </div>
            </section>
            {/* section7 */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA] lg:pt-[141px]">
                <div className="relative w-full lg:h-[480px]">
                    <Image
                        src={"/withGIG/section7_picture1.png"}
                        alt={"section7_picture.png"}
                        fill
                        unoptimized
                        className="absolute z-0 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"/>
                    <div className="absolute z-10 flex justify-center items-center
                        lg:top-[69px] lg:left-[135px] lg:w-[247px] lg:h-[104px]">
                        <Image
                            src={"/withGIG/speech_bubble_white3.png"}
                            alt={"speech_bubble_white3.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold lg:text-[20px] lg:mt-[5px]">
                            일은 계속 쌓이는데...<br />
                            또 사람 뽑기는 부담돼요.
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        lg:top-[116px] lg:right-[130px] lg:w-[359px] lg:h-[87px]">
                        <Image
                            src={"/withGIG/speech_bubble_purple2.png"}
                            alt={"speech_bubble_purple2.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <p className="absolute z-20 font-extrabold lg:text-[20px] lg:mt-[5px]">
                            정규직은 부담, 프리랜서는 불안하셨죠?
                        </p>
                    </div>
                    <div className="absolute z-10 flex justify-center items-center
                        lg:bottom-[139px] lg:right-[162px] lg:w-[473px] lg:h-[87px]">
                        <Image
                            src={"/withGIG/speech_bubble_purple3.png"}
                            alt={"speech_bubble_purple3.png"}
                            fill
                            unoptimized
                            className="absolute z-10"
                        />
                        <div className="absolute z-20 flex flex-col ">
                            <p className="font-extrabold lg:text-[20px] lg:mt-[5px]">
                                지금, 필요한 역할만 ‘딱' 맡길 수 있는 방법이 있습니다!
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className="font-black text-center lg:text-[23px] lg:mt-[42px]">인건비는 줄이고, 전문성은 더하다</h2>
                <h3 className="font-black text-center text-[#541E80] lg:text-[25px] lg:mt-[16px]">단기 프로젝트 중심의 검증된 실무 인재 매칭</h3>
                <Link
                    href="/with-gig"
                    className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold
                        lg:mt-[45px] lg:w-[316px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                    기업 의뢰하기
                </Link>
            </section>
        </main>
    );
}
