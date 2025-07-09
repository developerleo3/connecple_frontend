"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main>
            {/* section1 */}
            <section className="relative flex flex-col w-full h-auto lg:px-[146px] lg:mt-[73px]">
                <h2 className="font-extrabold text-end lg:text-[60px] lg:mr-[80px]">
                    <span className="text-[#541E80]">커넥플은 함께 </span>
                    만들어 가는&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;과정 속에서
                </h2>
                <h1 className="font-extrabold text-end lg:text-[70px] lg:mr-[30px]">
                    즐거움을&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-[#541E80]">찾아갑니다.</span>
                </h1>
                <p className="font-normal lg:text-[18px] lg:mt-[131px]">
                    커넥플은 사람과 일, 성장을 잇는 작은 연결을 만듭니다.<br />
                    경력보유여성을 위한 커리어 프로그램을 직접 기획하고, 함께 성장해갑니다.<br />
                    우리는 서로의 삶을 존중하고, 일하는 방식을 다양하게 인정합니다.
                </p>
                <p className="font-extrabold lg:text-[20px] lg:mt-[51px]">
                    “경보녀, 당신의 가치를 응원합니다"
                </p>
                <Link href={"/about"}
                    className="flex font-bold justify-center items-center text-[#541E80] border-[2px]
                    lg:rounded-[20px] lg:w-[262px] lg:h-[36px] lg:text-[20px] lg:mt-[14px] lg:mb-[26px]
                    hover:bg-[#541E80] hover:text-white hover:border-[2px] border-[#541E80]">
                    이슈메이커 기사 보러가기
                </Link>
                <Image src={"/about/ceo_picture.png"} alt={"ceo"}
                       width={123}
                       height={123}
                       unoptimized
                       className="absolute lg:right-[380px] bottom-0 lg:w-[395px] lg:h-[581px]"
                />
            </section>
            {/* section2 */}
            <section className="flex flex-col w-full h-auto lg:px-[200px] lg:mt-[225px] lg:mb-[229px]">
                <h1 className="font-black text-[#541E80] lg:text-[45px]">
                    협력과 소통으로 이루어진 우리 팀을 소개합니다.
                </h1>
                <p className="font-extrabold lg:text-[27px] lg:mt-[12px]">
                    각자의 전문성을 바탕으로 유기적인 협업 체계를 이루고 있습니다
                </p>
                <div className="flex flex-row w-full h-auto justify-between lg:mt-[76px]">
                    {[
                        {
                            img_url : "/about/profile_pjh.png",
                            position : "대표",
                            name : "박지희",
                            des : "성과 중심의 마케팅 전략과 브랜딩 디자인을 담당하는 ",
                            depart : "홍보사업부"
                        },
                        {
                            img_url : "/about/profile_ksg.png",
                            position : "팀장",
                            name : "권슬기",
                            des : "다양한 규모 행사 기획·실행을 전문으로 하는 ",
                            depart : "MICE 사업부"
                        },
                        {
                            img_url : "/about/profile_ahi.png",
                            position : "팀장",
                            name : "안혜인",
                            des : "10년 이상의 현장 경험을 바탕으로 한 교육 기획·운영 전문가 조직 ",
                            depart : "교육사업부"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col justify-center items-center bg-[#F4F4F4] shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)]
                            lg:w-[296px] lg:h-[318px] lg:rounded-[50px]">
                            <div className="flex flex-row w-full h-auto items-center lg:px-[14px]">
                                <div className="overflow-hidden rounded-full lg:w-[157px] h-[157px]">
                                    <Image
                                        src={item.img_url}
                                        alt={"alt"}
                                        width={123}
                                        height={123}
                                        unoptimized
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col justify-center lg:mt-[20px]">
                                    <p className="font-bold lg:text-[20px]">{item.position}</p>
                                    <p className="font-black lg:text-[30px]">{item.name}</p>
                                </div>
                            </div>
                            <div className="w-full lg:px-[24px]">
                                <div className="border-[#C0AED1] border-[3px] w-full" />
                            </div>
                            <p className="font-bold lg:text-[20px] lg:px-[40px] lg:mt-[19px]">{item.des}
                                <span className="font-black text-[#541E80]">{item.depart}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
