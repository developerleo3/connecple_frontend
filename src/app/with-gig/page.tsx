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
        </main>
    )
}
