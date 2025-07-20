"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

const programData = [
    {
        title: "인사이트 특강",
        subTitle: "나보다 먼저 걸어간 이야기에서 영감을",
        slogun: "누군가의 경험은 나의 가능성이 됩니다.",
        content:
            "경력보유여성 선배 또는 업계 실무자의 진솔한 커리어 스토리<br />ICT·교육 ·행사 기획 분야 등 다양한 분야 경험 공유",
        comment1: "다시 일하고 싶은 마음에 용기를 더해주는 현실 조언",
        comment2: "단절 이후에도 ‘가능성은 있다'는 실제 사례로 동기부여",
        comment3: "내가 가고 싶은 길을 상상해보는 시간",
        image_path: "/withConnecDay/picture1.png",
    },
    {
        title: "위드프로젝트 프로그램 설명회",
        subTitle: "나에게 맞는 기회를 정확하게",
        slogun: "제대로 알고 시작하는것이 가장 빠른 길입니다.",
        content:
            "워트프로젝트 커리큘럼 안내 (교육-실습-멘토링-프로젝트)<br />수료생 후기, 실무 투입 사례 소개, 신청방법 및 참여조건 안내",
        comment1: "프로그램 전 과정을 한눈에 이해할 수 있는 기회",
        comment2: "실제 수료생 경험 공유로 현실적인 기대치 설정 가능",
        comment3: "내 상황에 맞는 참여 가능성 직접 확인",
        image_path: "/withConnecDay/picture2.png",
    },
    {
        title: "네트워킹 티타임",
        subTitle: "혼자 아닌, 함께하는 커리어 여정",
        slogun: "사람이 연결되면, 기회는 그 안에서 생깁니다.",
        content:
            "참석자 간 자유 네트워킹<br />멘토·수료생·운영진과 1:1 또는 소규모 소통<br />커피/다과와 함께하는캐주얼한 대화 분위기",
        comment1: "경력단절, 재취업을 고민하는 사람들과의 공감 형성",
        comment2: "부담 없는 분위기에서 궁금한 점을 자유롭게 질문",
        comment3: "실전 커리어를 준비하는 과정에서 동료 &멘토 확보",
        image_path: "/withConnecDay/picture3.png",
    },
];

export default function WithConnecdayPage() {
    const [selected, setSelected] = useState(0);
    const current = programData[selected];

    return (
        <main>
            {/* section1 */}
            <section className="flex flex-col w-full h-auto">
                <div className="flex flex-col justify-center mt-[58px] lg:mt-[156px]">
                    <h1 className="text-center
                        text-[18px] font-black
                        lg:text-[30px] lg:font-extrabold">
                        W.I.T.H Connecday
                    </h1>
                    <h1 className="text-center text-[11px] font-bold mt-[25px] lg:text-[27px] lg:font-semibold lg:mt-[20px]">
                        재도약을 꿈꾸는 이 멋진 여성들을 위한 네트워킹 모임
                    </h1>
                </div>
                <div className="flex flex-col w-full h-auto justify-center">
                    <h1 className="text-center font-extrabold
                        text-[12px] mt-[25px]
                        lg:text-[35px] lg:mt-[92px]">
                        “경력보유여성과 사회를 잇는, 커넥플만의 연결 플랫폼“
                    </h1>
                    <p className="text-center font-semibold
                        text-[9px] mt-[25px]
                        lg:text-[23px] lg:mt-[77px]">
                        워드커넥데이는 교육 수료생, 참여 기업, 전문가, 참여 동기들과<br/>
                        소통하며 새로운 기회를 만드는 네트워킹 행사입니다.
                    </p>
                    <h3 className="text-center font-extrabold
                        text-[10px] mt-[25px]
                        lg:text-[25px] lg:mt-[62px]">
                        연결을 통해 커리어를 확장하는 날.<br/>
                        <span className="text-[#541E80]">사람과 사회를 잇는 진짜 네트워킹의 장.</span>
                    </h3>
                    <p className="text-center font-semibold
                        text-[9px] mt-[25px]
                        lg:text-[23px] lg:mt-[77px]">
                        매년 3월, 6월, 9월 운영<br/>
                        ‘위드프로젝트 교육 접수’
                    </p>

                    <div className="relative flex flex-col items-center">
                        <h1 className="relative z-10 text-center font-tvn-medium text-[#541E80]
                            text-[13px] mt-[38px] lg:text-[35px] lg:mt-[97px]">
                            선착순 20명 !
                        </h1>
                        <div className="absolute z-0 bg-[#D9D9D9]
                            w-[63px] h-[9px] mt-[45px]
                            lg:w-[174px] lg:h-[25px] lg:mt-[120px]"/>
                    </div>
                    <Link
                        href="https://forms.gle/HWXpfoB6Me3wsNaa7"
                        target="_blank"
                        className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px]
                            mt-[9px] w-[159px] h-[25px] text-[10px]
                            lg:mt-[19px] lg:w-[388px] lg:h-[60px] lg:text-[27px]">
                        나의 성장 가능성 연결하기
                    </Link>
                    <h3 className="flex self-center font-bold
                        text-[9px] mt-[13px]
                        lg:text-[20px] lg:mt-[25px]">
                        가능성은 연결될 때 빛이 납니다.
                    </h3>
                </div>
            </section>
            {/* section2 */}
            <section className="flex flex-col w-full h-auto mt-[99px] px-[30px] lg:mt-[88px] lg:px-[123px]">
                <h1 className="hidden lg:block font-black text-[#541E80] lg:text-[45px] lg:mt-[143px]">
                    한 걸음 내디뎠다면, 이제 연결이 필요한 순간입니다.
                </h1>
                <h1 className="block lg:hidden font-black text-[#541E80] text-[15px]">
                    한 걸음 내디뎠다면,<br/> 이제 연결이 필요한 순간입니다.
                </h1>
                <h2 className="font-black lg:font-extrabold text-[10px] mt-[9px] lg:text-[27px] lg:mt-[26px]">
                    같은 길을 걷는 동료들, 실무에서 찾는 기업들,<br/>
                    내 가능성을 믿어주는 멘토들과 서로 연결되는 단 하루의 기회!
                </h2>
                <div className="flex flex-row justify-between mt-[27px] lg:mt-[64px]">
                    <div className="group flex justify-center items-center rounded-full bg-[#F6F6F6] transition-all duration-300
                        w-[85px] h-[85px] shadow-[1px_1px_3.7px_0_rgba(0,0,0,0.11)]
                        lg:w-[296px] lg:h-[296px] lg:hover:bg-[#2F0D4B] lg:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">
                        <div className="text-center pt-[5px]">
                            {/* 일반 상태 */}
                            <p className="font-bold text-[10px] lg:text-[27px] leading-relaxed lg:group-hover:hidden">
                                위드프로젝트<br/>설명회<br/>
                                <span className="inline-flex items-center justify-center">
                                    <Image
                                        src="/withConnecDay/triangle_bottom.svg"
                                        alt="triangle_bottom"
                                        width={6}
                                        height={6}
                                        unoptimized
                                        className="inline-block align-middle lg:w-[27px] lg:h-[27px]"
                                    />
                                </span>
                                <br/>
                                <span className="font-extrabold text-[#541E80] lg:text-black">정보</span>
                            </p>

                            {/* 호버 상태 */}
                            <div className="hidden lg:group-hover:flex flex-col items-center text-white">
                                <p className="font-black lg:text-[20px]">Check Point</p>
                                <div className="border-[1px] border-white lg:w-[40px] lg:my-[13px]"/>
                                <p className="lg:text-[18px] font-semibold">
                                    전문가의 생생한 이야기와<br/>
                                    실무 중심의 내용을 통해<br/>
                                    현장에서 바로 활용할 수<br/>
                                    있는 <span className="font-black text-[#C0AED1]">깊이 있는 정보</span>를<br/>
                                    얻을 수 있어요!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group flex justify-center items-center rounded-full bg-[#ECECEC] transition-all duration-300
                        w-[85px] h-[85px] shadow-[1px_1px_3.7px_0_rgba(0,0,0,0.11)]
                        lg:w-[296px] lg:h-[296px] lg:hover:bg-[#2F0D4B] lg:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">
                        <div className="text-center pt-[5px]">
                            <p className="font-bold text-[10px] lg:text-[27px] leading-relaxed lg:group-hover:hidden">
                                인사이트<br/>특강<br/>
                                <span className="inline-flex items-center justify-center">
                                <Image
                                    src="/withConnecDay/triangle_bottom.svg"
                                    alt="triangle_bottom"
                                    width={6}
                                    height={6}
                                    unoptimized
                                    className="inline-block align-middle lg:w-[27px] lg:h-[27px]"
                                />
                                </span>
                                <br/>
                                <span className="font-extrabold text-[#541E80] lg:text-black">동기부여</span>
                            </p>
                            <div className="hidden lg:group-hover:flex flex-col items-center text-white">
                                <p className="font-black lg:text-[20px]">Check Point</p>
                                <div className="border-[1px] border-white lg:w-[40px] lg:my-[13px]"/>
                                <p className="lg:text-[18px] font-semibold">
                                    멘토들의 진솔한 경험을<br/>
                                    통해 <span className="font-black text-[#C0AED1]">나만의 가능성과<br/>
                                    열정</span>을 다시 떠올리게 되는<br/>
                                    소중한 시간이 될거에요!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group flex justify-center items-center rounded-full bg-[#F6F6F6] transition-all duration-300
                        w-[85px] h-[85px] shadow-[1px_1px_3.7px_0_rgba(0,0,0,0.11)]
                        lg:w-[296px] lg:h-[296px] lg:hover:bg-[#2F0D4B] lg:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]">
                        <div className="text-center">
                            <p className="font-bold text-[10px] lg:text-[27px] leading-relaxed lg:group-hover:hidden">
                                네트워킹<br/>티타임<br/>
                                <span className="inline-flex items-center justify-center">
                                <Image
                                    src="/withConnecDay/triangle_bottom.svg"
                                    alt="triangle_bottom"
                                    width={6}
                                    height={6}
                                    unoptimized
                                    className="inline-block align-middle lg:w-[27px] lg:h-[27px]"
                                />
                                </span>
                                <br/>
                                <span className="font-extrabold text-[#541E80] lg:text-black">관계 형성</span>
                            </p>
                            <div className="hidden lg:group-hover:flex flex-col items-center text-white">
                                <p className="font-black lg:text-[20px]">Check Point</p>
                                <div className="border-[1px] border-white lg:w-[40px] lg:my-[13px]"/>
                                <p className="lg:text-[18px] font-semibold">
                                    다양한 사람들과의<br/>
                                    <span className="font-black text-[#C0AED1]">편안한 소통</span> 속에서 공감과<br/>
                                    자극을 얻으며 자연스럽게<br/>
                                    <span className="font-black text-[#C0AED1]">동기부여</span>가 생겨요!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex lg:hidden flex-row justify-between mt-[27px] lg:mt-[64px]">
                    {[
                        "전문가의 생생한 이야기와<br/>" +
                        "실무 중심의 내용을 통해<br/>" +
                        "현장에서 바로 활용할 수<br/>" +
                        "있는 <span className=\"font-black]\">깊이 있는 정보</span>를<br/>" +
                        "얻을 수 있어요!",

                        "멘토들의 진솔한 경험을<br/>" +
                        "통해 <span className=\"font-black\">나만의 가능성과<br/>" +
                        "열정</span>을 다시 떠올리게 되는<br/>" +
                        "소중한 시간이 될거에요!<br/><br/>",

                        "다양한 사람들과의<br/>" +
                        "<span className=\"font-black text-[#C0AED1]\">편안한 소통</span> 속에서 공감과<br/>" +
                        "자극을 얻으며 자연스럽게<br/>" +
                        "<span className=\"font-black text-[#C0AED1]\">동기부여</span>가 생겨요!<br/><br/>"
                    ].map((item, idx) => (
                        <div key={idx}
                             className="flex justify-center items-center rounded-full bg-white border-[0.7px] border-[#541E80]
                                w-[85px] h-[85px]">
                            <div className="flex flex-col items-center stext-white">
                                <p className="font-bold text-[7px]">Check Point</p>
                                <div className="border-[0.5px] border-[#541E80] w-[15px] my-[7px]"/>
                                <p className="text-[5px] font-bold text-center"
                                   dangerouslySetInnerHTML={{__html: item}}>

                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* section3 - 버튼 클릭에 따라 콘텐츠 변경 */}
            <section className="flex flex-row w-full justify-between h-auto
                    px-[30px] mt-[88px] gap-x-[10px]
                    lg:px-[130px] lg:py-[90px] lg:mt-[300px]">
                <div className="flex flex-col">
                    <h1 className="font-black text-[#541E80] text-[15px] lg:text-[45px]">PROGRAM</h1>
                    <div className="flex flex-row mt-[27px] lg:mt-[38px]">
                        {[1, 2, 3].map((num, idx) => (
                            <button
                                key={num}
                                onClick={() => setSelected(idx)}
                                className={`flex justify-center items-center font-extrabold rounded-full 
                                    text-[8px] w-[20px] h-[20px] lg:text-[30px] lg:w-[50px] lg:h-[50px] 
                                    ${selected === idx ? "bg-[#541E80] text-white" : "bg-[#D9D9D9] cursor-pointer"} 
                                    ${idx !== 0 ? "ml-[10px] lg:ml-[17px]" : ""}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>

                    <h2 className="font-extrabold text-[10px] mt-[15px] lg:text-[32px] lg:mt-[46px]">{current.title}</h2>
                    <h3 className="font-bold text-[9px] lg:text-[28px]">: {current.subTitle}</h3>
                    <h2 className="font-tvn-medium text-[#541E80] text-[15px] mt-[6px] lg:text-[35px] lg:mt-[16px]">
                        {current.slogun}
                    </h2>

                    <div className="w-[189px] lg:w-[446px] border-t-1 border-dotted mt-[10px] lg:mt-[17px]"/>

                    <p
                        className="font-extrabold text-[7.8px] mt-[7px] lg:text-[19px] lg:mt-[29px]"
                        dangerouslySetInnerHTML={{__html: current.content}}
                    />

                    <div className="w-[189px] lg:w-[446px] border-t-1 border-dotted mt-[8px] lg:mt-[17px]"/>

                    {[current.comment1, current.comment2, current.comment3].map((cmt, i) => (
                        <div key={i} className="flex flex-row items-center justify-center mt-[6px] lg:mt-[15px]">
                            <Image
                                src="/withConnecDay/check_purple.png"
                                alt="check_purple.png"
                                width={8}
                                height={7}
                                unoptimized
                                className="lg:w-[25px] lg:h-[25px]"
                            />
                            <p className="font-semibold lg:font-bold text-[#541E80] text-[8px] ml-[4px] lg:text-[18px] lg:ml-[10px]">{cmt}</p>
                        </div>
                    ))}
                </div>
                <Image
                    src={current.image_path}
                    alt={current.title}
                    width={124}
                    height={195}
                    unoptimized
                    className="object-contain rounded-[20px] lg:w-[514px] lg:h-[636px] lg:rounded-[30px]"
                />
            </section>
            <section className="flex flex-col items-center justify-center w-full">
                <Link
                    href="https://forms.gle/HWXpfoB6Me3wsNaa7"
                    target="_blank"
                    className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px]
                            mt-[39px] w-[159px] h-[25px] text-[10px]
                            lg:mt-[19px] lg:w-[388px] lg:h-[60px] lg:text-[27px]">
                    위드커넥데이 무료 신청
                </Link>
                <h3 className="flex items-center justify-center font-bold
                        text-[9px] mt-[13px] mb-[84px]
                        lg:text-[20px] lg:mt-[25px] lg:mb-[300px]">
                    매월 둘째주 금요일 운영
                </h3>
            </section>
        </main>
    );
}
