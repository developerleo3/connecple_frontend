"use client";

import Image from "next/image";
import {useEffect} from "react";
import Link from "next/link";
import {useState} from "react";

/**
 * font-thin        100
 * font-extralight  200
 * font-light       300
 * font-normal      400 (기본값)
 * font-medium      500
 * font-semibold    600
 * font-bold        700
 * font-extrabold   800
 * font-black       900
 */


/**
 * [flex]
 * items-center               세로 가운데 정렬
 * justify-center or mx-auto  가로 가운데 정렬
 * self-center                자신 가운데 정렬 (ex: section1 button 가운데정렬)
 */
const contents = [
    {
        title: "실습 중심 기본기 함양 온라인 교육",
        sub: "이러닝 + 실시간 온라인 강의 병행",
        content1: "ICT MICE 실무자 특강부터<br />AI 협업툴 활용 워크숍까지",
        content2: "아이를 돌보며 집에서도 수강 가능한, 유연한 학습 시스템",
        img: "/withProject/section7_image11.png"
    },
    {
        title: "실습 중심 실전 감각 함양 온라인 교육",
        sub: "현장 중심 실전 과제 구성",
        content1: "교육 행사 기획서부터<br />실제 기업용 홍보물 제작까지 단계별 과제",
        content2: "결과물이 바로 포트폴리오가 되는 실전형 과제",
        img: "/withProject/section7_image2.png"
    },
    {
        title: "1:1 맞춤 멘토링",
        sub: "담당 멘토 배정 + 밀착형 코칭",
        content1: "현직 교육 기획자·행사<br />PM 출신 멘토의 경력별 실전 조언",
        content2: "경력단절 기간도 나만의 강점으로 바꾸는 커리어 코칭 지원",
        img: "/withProject/section7_image3.png"
    },
    {
        title: "실무 프로젝트 참여",
        sub: "레벨별 실무 투입 + 단계별 급여 지급",
        content1: "레벨1(보조) → 레벨2(매니저) → 레벨3~5(리더급)까지<br />실무 난이도에 따라 점진적 투입",
        content2: "교육 수료 후 실제 프로젝트에 참여하며 커리어 방향을 탐색",
        img: "/withProject/section7_image4.png"
    },
    {
        title: "현장 참관 프로그램",
        sub: "ICT 융합 분야 체험형 학습",
        content1: "국제 행사, 교육 테크,<br />데이터·AI 교육 현장 실습 탐방",
        content2: "변화하는 현장을 직접 보고 배우는 생생한 체험 기회",
        img: "/withProject/section7_image5.png"
    }
]

export default function WithProjectPage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                        entry.target.classList.remove("opacity-0");
                    }
                });
            },
            {threshold: 0.2}
        );

        const targets = document.querySelectorAll("[data-animate]");
        targets.forEach(el => observer.observe(el));

        return () => {
            targets.forEach(el => observer.unobserve(el));
        };
    }, []);

    // PROGRAM 버튼
    const [selected, setSelected] = useState(0);

    // 모달 팝업
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 신청 & 수강 절차
    const [selected2, setSelected2] = useState<'reg' | 'class'>('reg');

    return (
        <main>
            {/* section1 */}
            <section className="flex flex-col w-full h-auto">
                <div className="flex flex-col justify-center mt-[58px] lg:mt-[156px]">
                    <h1 className="text-center
                        text-[18px] font-black
                        lg:text-[30px] lg:font-extrabold">
                        W.I.T.H Project
                    </h1>
                    <h1 className="text-center
                        text-[13px] font-bold mt-[22px]
                        lg:text-[27px] lg:font-semibold lg:mt-[20px]">
                        경력보유여성 재도약 프로젝트(Women In The Hope)
                    </h1>
                </div>
                <div className="flex w-full h-auto justify-center">
                    <Image
                        src="/withProject/logo_with_project.svg"
                        alt="with project logo"
                        width="310"
                        height="192"
                        unoptimized
                        className="object-contain lg:w-[581px] lg:h-[361px]"
                    />
                </div>
                <div className="flex flex-col w-full h-auto justify-center">
                    <h1 className="text-center font-extrabold text-[13px] lg:text-[35px]">
                        경력보유여성, 이런 고민해보셨나요?
                    </h1>
                    <p className="text-center font-semibold
                        text-[9px] mt-[32px]
                        lg:text-[23px] lg:mt-[54px]">
                        자신감 저하, 빠르게 변하는 트렌드에 대한 거리감,<br/>
                        부족한 네트워크, 육아와의 병행, 유연근무 기회의 부족까지,<br/>
                        커리어를 다시 시작하려는 경력보유여성 앞에 놓여진 다양한 심리적·현실적 장벽<br/><br/>

                        누구보다 그 마음을 잘 알기에<br/>
                        재도약의 시작이 가벼워질 수 있도록 맞춤형 솔루션을 준비했습니다.<br/>
                        심리적 장벽을 낮추고, 다시 걸음을 내딛을 수 있도록<br/>
                        ‘교육’, ‘네트워크’, ‘실전 프로젝트’까지 함께하는 커리어 재도약 프로그램<br/>
                        바로 위드프로젝트입니다.
                    </p>
                    <h3 className="text-center font-extrabold
                        text-[10px] mt-[40px]
                        lg:text-[25px] lg:mt-[62px]">
                        인생변화를 위한 당신의 선택! 도전!<br/>
                        <span className="text-[#541E80]">당신의 재도약을 커넥플이 응원합니다.</span>
                    </h3>
                    <Link
                        href="/with-project"
                        className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold rounded-[30px]
                            mt-[20px] w-[159px] h-[25px] text-[10px]
                            lg:mt-[55px] lg:w-[388px] lg:h-[60px] lg:text-[23px]">
                        지금 바로 가능성을 현실로 만들기
                    </Link>
                </div>
            </section>

            {/* section2 */}
            <section className="w-full h-auto px-[30px] mt-[110px] lg:px-[146px] lg:mt-[300px]">
                {/* 상단: 로고 + 문구 */}
                <div className="flex flex-row items-center">
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
                        <div className="absolute top-1/2 transform -translate-y-1/2 bg-[#C0AED1] rotate-45
                            left-[-2px] w-[5px] h-[5px]
                            lg:left-[-4px] lg:w-[10px] lg:h-[10px]"/>

                        {/* 말풍선 본문 */}
                        <div className="bg-[#C0AED1] text-white font-tvn-medium rounded-[20px]
                            px-[10px] py-[1px] text-[15px]
                            lg:px-[28px] lg:py-[3px] lg:text-[25px]">
                            “예전엔 나도 일 잘했는데..”라는 마음, 그대로 두지 마세요.
                        </div>
                    </div>
                </div>

                <h1 className="font-black text-[#541E80]
                    mt-[10px] text-[15px]
                    lg:mt-[25px] lg:text-[45px]">
                    ICT 융합분야 교육 운영 매니저, 행사를 직접 기획<br/>
                    운영하는 프로젝트 매니저까지
                </h1>
                <h2 className="font-black
                    mt-[6px] text-[10px]
                    lg:mt-[20px] lg:text-[27px]">
                    내가 다시 주인공이 되는 자리, 위드프로젝트에 준비되어 있습니다.
                </h2>
                {/* 하단 아이콘 지표 */}
                <div className="flex flex-row w-full h-auto justify-between
                    mt-[36px] mb-[94px]
                    lg:mt-[63px] lg:mb-[209px]">
                    {[
                        {
                            icon: "/withProject/icon_career_gap.svg",
                            label: "위드프로젝트<br /> 평균 경력단절기간",
                            value: "5.7년",
                        },
                        {
                            icon: "/withProject/icon_education_rate.svg",
                            label: "위드프로젝트<br /> 교육 수료율",
                            value: "95%",
                        },
                        {
                            icon: "/withProject/icon_satisfaction.svg",
                            label: "위드프로젝트<br /> 수강 만족도",
                            value: "98점",
                        },
                        {
                            icon: "/withProject/icon_project_link.svg",
                            label: "위드프로젝트<br /> 실무 프로젝트 연계",
                            value: "100%",
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="flex items-center justify-center bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)] rounded-full transition group-hover:scale-105
                                w-[63px] h-[63px] lg:w-[170px] lg:h-[170px]">
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={34}
                                    height={34}
                                    className="lg:w-[90px] lg:h-[90px]"/>
                            </div>
                            <p className="font-semibold text-[8px] mt-[16px] lg:text-[20px] lg:mt-[37px]"
                               dangerouslySetInnerHTML={{__html: item.label}}></p>
                            <p className="font-extrabold text-[#541E80] text-[13px] mt-[11px] lg:text-[35px] lg:mt-[28px]">{item.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* section3 */}
            <section className="flex flex-col w-full h-auto bg-[#C0AED1B2] px-[30px] lg:px-[146px]"
                     style={{
                         background: "linear-gradient(to bottom, rgba(192, 174, 209, 0.7), rgba(255, 255, 255, 1))",
                     }}>
                <h2 className="font-bold mt-[38px] text-[10px] lg:mt-[122px] lg:text-[27px]">
                    ICT 융합 분야 프로젝트 기획 및 운영 전문기업 커넥플이 자체 개발한
                </h2>
                <h2 className="font-bold mt-[5px] text-[10px] lg:mt-[10px] lg:text-[27px]">
                    <span
                        className="font-black text-[15px] lg:text-[45px] text-[#541E80]">[경력보유여성 커리어 재도약 프로그램]</span> 입니다.
                </h2>
                <div className="flex flex-row justify-between mt-[29px] mb-[70px] lg:mt-[73px] lg:mb-[218px]">
                    {[
                        {
                            picture: "/withProject/program1.png",
                            label: "경력보유여성",
                        },
                        {
                            picture: "/withProject/program2.png",
                            label: "미취업여성",
                        },
                        {
                            picture: "/withProject/program3.png",
                            label: "그 밖의 열의 가득한<br /> 누.구.나",
                        }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col justify-between items-center bg-white text-center
                                w-[80px] h-[89px] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.25)]
                                lg:w-[275px] lg:h-[270px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[20px] lg:shadow-[3px_3px_10px_0_rgba(0,0,0,0.5)]"
                        >
                            <Image
                                src={item.picture}
                                alt={item.label}
                                width={100}
                                height={100}
                                unoptimized
                                className="object-cover w-full h-auto"
                            />
                            <div className="flex w-full h-[38px] lg:h-[88px] justify-center items-center">
                                <p
                                    className="font-extrabold text-[#541E80] text-[9px] lg:text-[25px]"
                                    dangerouslySetInnerHTML={{__html: item.label}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* section4 */}
            <section
                className="flex flex-col w-full h-auto justify-center mt-[23px] px-[30px] lg:mt-[83px] lg:px-[146px]">
                <h1 className="font-black text-[#541E80] text-center text-[15px] lg:text-[45px]">
                    이런분들께 추천합니다.
                </h1>
                <div className="flex flex-col w-full h-auto mt-[24px] lg:mt-[55px]">
                    {[
                        [
                            {
                                picture: "/withProject/recommend1.svg",
                                title: "다시 일하고 싶지만,<br /><span class='font-black'>어디서 시작해야할지<br />막막</span>한 분",
                                content: "경력의 공백이 길수록<br />자신감은 낮아지죠.<br />위드프로젝트는 작지만 확실한<br />첫걸음을 함께 시작합니다."
                            },
                            {
                                picture: "/withProject/recommend2.svg",
                                title: "<span class='font-black'>'엄마'가 아닌 '나'</span><br />로서 다시 일하고<br />싶은 분",
                                content: "육아와 병행하면서도 내 이름으로<br />다시 일하고 싶은 마음,<br />그 소중한 마음을<br />위드프로젝트는 존중합니다."
                            },
                            {
                                picture: "/withProject/recommend3.svg",
                                title: "<span class='font-black'>변화가 빠른 시대</span>에<br />나만 멈춘 것 같아<br />불안한 분",
                                content: "디지털 전환,<br />새로운 기술, 낯선 용어들 ...<br />지금 시작해도 늦지 않아요.<br />우리 함께 따라가볼 수 있습니다."
                            },
                            {
                                picture: "/withProject/recommend4.svg",
                                title: "혼자서는<br /><span class='font-black'>계속 망설이기만</span><br />했던 분",
                                content: "정보는 많지만,<br />누구와 시작해야 할 지<br />몰랐다면 같은 고민을<br />가진 동료들과 함께 도전해요"
                            },
                        ],
                        [
                            {
                                picture: "/withProject/recommend5.svg",
                                title: "<span class='font-black'>재택이나 유연근무</span>가<br />가능한 일자리를<br />원하시는 분",
                                content: "일과 육아의 균형, 이제는<br />선택이 아닌 필수.<br />현실적인 근무환경까지 고려한<br />커리어 방향을 함께 설계해드립니다."
                            },
                            {
                                picture: "/withProject/recommend6.svg",
                                title: "하루 3~5시간은<br /><span class='font-black'>온전히 집중</span>할 수<br />있는 분",
                                content: "짧은 시간이라도 책임감 있게<br />몰입할 준비가 되셨다면,<br />위드프로젝트는 당신의 진심을<br />실력으로 바꿔드립니다."
                            },
                            {
                                picture: "/withProject/recommend7.svg",
                                title: "내 경험이<br /><span class='font-black'>더 이상 쓸모없다</span>고<br />느껴졌던 분",
                                content: "잠시 멈췄을 뿐, 당신의 경력은<br />충분히 다시 쓰일 수 있어요.<br />우리가 함께 그 가치를<br />꺼내드릴게요."
                            },
                            {
                                picture: "/withProject/recommend8.svg",
                                title: "단순한 취업이<br />아닌, <span class='font-black'>나답게</span><br />일하고 싶으신 분",
                                content: "단지 ‘일’을 찾는 게 아니라,<br />나의 삶을 다시 설계하는 여정<br />그 시작을 위드프로젝트가<br />함께합니다."
                            },
                        ],
                    ].map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`flex flex-row w-full h-auto justify-between ${rowIndex === 1 ? "mt-[24px] lg:mt-[39px]" : ""}`}
                        >
                            {row.map((item, idx) => {
                                const isBgGray =
                                    (rowIndex === 0 && idx % 2 === 0) || // 첫째 줄: 짝수
                                    (rowIndex === 1 && idx % 2 === 1);   // 둘째 줄: 홀수

                                return (
                                    <div
                                        key={idx}
                                        className={`group flex flex-col items-center shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)]
                                            w-[68px] h-[114px] rounded-[30px]
                                            lg:w-[214px] lg:h-[270px] lg:rounded-[20px] 
                                            ${isBgGray ? "bg-white" : "bg-[#F7F7F7]"} hover:bg-[#E2D5F1] transition-all duration-300`}
                                    >
                                        <Image
                                            src={item.picture}
                                            alt={item.title}
                                            width={27}
                                            height={27}
                                            unoptimized
                                            className="group-hover:hidden w-full h-[27px] mt-[20px]
                                                lg:w-[62px] lg:h-[62px] lg:mt-[28px]"
                                        />
                                        <Image
                                            src={"/withProject/recommend_line.svg"}
                                            alt={"recommend_line"}
                                            width={55}
                                            height={1}
                                            unoptimized
                                            className="group-hover:hidden w-full h-auto
                                                 px-[7px] mt-[9px] lg:px-[23px] lg:mt-[23px]"
                                        />
                                        <div
                                            className="group-hover:hidden flex w-full h-auto justify-center items-center text-center mt-[9px] lg:mt-[30px]">
                                            <p
                                                className="font-bold text-[6px] lg:text-[18px]"
                                                dangerouslySetInnerHTML={{__html: item.title}}
                                            />
                                        </div>
                                        <div
                                            className="hidden group-hover:flex w-full h-full items-center justify-center text-center font-bold
                                                text-[5px] leading-[7px] lg:text-[15px] lg:leading-[22px]"
                                            dangerouslySetInnerHTML={{__html: item.content}}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>

            {/* section5 */}
            <section
                className="flex flex-col w-full h-auto justify-center mt-[58px] px-[30px] lg:mt-[250px] lg:px-[200px]">
                <h1 className="font-black text-[#541E80] text-center text-[15px] lg:text-[45px]">
                    교육생들의 생생후기
                </h1>
                <div className="relative mt-[22px] lg:mt-[73px] w-full h-[274px] lg:h-[590px]">

                    <div className="absolute top-0 left-0 flex flex-row justify-between items-center bg-[#F8F8F8] opacity-0
                        w-[193px] h-[35px] rounded-[15px] px-[8px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:w-[469px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)"
                         data-animate>
                        <Image
                            src={"/withProject/comment1.png"}
                            alt={"comment1.png"}
                            width={21}
                            height={21}
                            unoptimized
                            className="lg:w-[55px] lg:h-[55px]"
                        />
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            첫 날이라 시스템 환경이 어수선한 참가자들도 많았음에도 불구하고<br/>
                            전체를 잘 아울러 이끌어 무리없이 진행하는 운영능력이 돋보였습니다.
                        </p>
                    </div>

                    <div className="absolute  flex flex-row justify-between items-center bg-[#FCF9FF] opacity-0
                        top-[48px] right-[0px] w-[164px] h-[35px] rounded-[15px] px-[14px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[0px] lg:right-[13px] lg:w-[415px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            무슨 업무인지 감 잡을 수 있게 스스로 판단해서<br/>
                            설문처럼 답하는 방식의 교육이 즐거웠습니다.
                        </p>
                        <Image
                            src={"/withProject/comment1.png"}
                            alt={"comment1.png"}
                            width={21}
                            height={21}
                            unoptimized
                            className="lg:w-[55px] lg:h-[55px]"
                        />
                    </div>

                    <div className="absolute flex flex-row justify-between items-center bg-[#FCF9FF] opacity-0
                         top-[48px] left-[0px] w-[112px] h-[56px] rounded-[15px] px-[10px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                         lg:top-[124px] lg:left-[20px] lg:w-[512px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <Image
                            src={"/withProject/comment1.png"}
                            alt={"comment1.png"}
                            width={21}
                            height={21}
                            unoptimized
                            className="lg:w-[55px] lg:h-[55px]"
                        />
                        <p className="hidden lg:block font-bold text-[13px]">
                            행사나 교육운영의 전체적인 프로세스를 알 수 있었고<br/>
                            마지막 구글 설문지를 한글로 가져와 적용하는 부분은 매우 도움이 되었습니다.
                        </p>

                        <p className="block lg:hidden font-bold text-[5px]">
                            행사나 교육운영의 전체적인<br/>
                            프로세스를 알 수 있었고<br/>
                            마지막 구글 설문지를 한글로<br/>
                            가져와 적용하는 부분은 매우<br/>
                            도움이 되었습니다.
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-center items-center bg-[#F8F8F8] opacity-0
                        top-[10px] right-[0px] w-[82px] h-[25px] rounded-[15px] px-[10px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[138px] lg:right-[108px] lg:w-[281px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            내가 해보지 않은 분야에서의 첫 도전! 재밌었다!
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-center items-center bg-[#F8F8F8] opacity-0
                        top-[112px] left-[4px] w-[82px] h-[16px] rounded-[15px] px-[14px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[199px] lg:left-auto lg:right-[25px] lg:w-[151px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            좋은 교육 감사합니다.
                        </p>
                    </div>

                    <div className="absolute  flex flex-row justify-center items-center bg-[#F8F8F8]
                        top-[96px] right-[16px] w-[149px] h-[16px] rounded-[15px] px-[14px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[244px] lg:left-[77px] lg:w-[309px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
                         data-animate>
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            한 주가 빠르게 흘러 교육 놓치지 않고 들어 좋았습니다.
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-center items-center bg-[#FCF9FF] opacity-0
                        top-[137px] left-[20px] w-[94px] h-[16px] rounded-[15px] px-[14px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[317px] lg:left-[24px] lg:w-[201px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            복기는 곧 다음을 위한 시작이다.
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-between items-center bg-[#F8F8F8] opacity-0
                        top-[121px] right-[0px] w-[164px] h-[68px] rounded-[15px] px-[14px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[269px] lg:right-[13px] lg:w-[520px] lg:h-[176px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="hidden lg:block font-bold text-[13px]">
                            5일이었지만 매우 알차게 교육을 받은 것 같습니다.<br/>
                            과제 피드백과 중간 소통을 하는 교육이였기에 집중이 가능했고,<br/>
                            특히나 강사님이 교육생의 답에도 잘 호응을 해주셔서 자신감이<br/>
                            생겼던 것 같습니다. 긍정적이고 좋은 교육 감사드립니다.<br/>
                            전체적으로 저도 어떻게 시스템이 돌아가는 지에 대해 알게 되었던 부분이라<br/>
                            좋은 기회였습니다.
                        </p>
                        <p className="block lg:hidden font-bold text-[5px]">
                            5일이었지만 매우 알차게 교육을 받은 것 같습니다.<br/>
                            과제 피드백과 중간 소통을 하는 교육이였기에 집중이<br/>
                            가능했고, 특히나 강사님이 교육생의 답에도 잘 호응을<br/>
                            해주셔서 자신감이 생겼던 것 같습니다.<br/>
                            긍정적이고 좋은 교육 감사드립니다.<br/>
                            전체적으로 저도 어떻게 시스템이 돌아가는 지에 대해<br/>
                            알게 되었던 부분이라 좋은 기회였습니다.
                        </p>
                        <Image
                            src={"/withProject/comment1.png"}
                            alt={"comment1.png"}
                            width={21}
                            height={21}
                            unoptimized
                            className="lg:w-[55px] lg:h-[55px]"
                        />
                    </div>

                    <div className="absolute flex flex-row justify-center items-center bg-[#F8F8F8] opacity-0
                        top-[162px] left-[0px] w-[112px] h-[36px] rounded-[15px] px-[14px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[379px] lg:left-[125px] lg:w-[309px] lg:h-[71px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="hidden lg:block font-bold text-[13px]">
                            교육 행사나 전반적인 운영체제나 관심이 있다면<br/>
                            꼭 알아야 되는 부분이라 생각됩니다.
                        </p>
                        <p className="block lg:hidden font-bold text-[5px]">
                            교육 행사나 전반적인 운영체제나<br/>
                            관심이 있다면 꼭 알아야 되는 부분이라<br/>
                            생각됩니다.
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-center items-center bg-[#FCF9FF] opacity-0
                        top-[206px] left-[0px] w-[158px] h-[16px] rounded-[15px] px-[10px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-[473px] lg:left-auto lg:right-[187px] lg:w-[398px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="font-bold text-[5px] lg:text-[13px]">
                            이론 뿐 아니라 과제를 통해 실무 스킬까지 익힐 수 있어서 좋은 것 같음.
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-center items-center bg-[#F8F8F8] opacity-0
                        top-[201px] right-[0px] w-[120px] h-[25px] rounded-[15px] px-[10px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:top-auto lg:bottom-0 lg:right-0 lg:w-[545px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <p className="hidden lg:block font-bold text-[13px]">
                            전문가 양성 교육이라 내용 대비 타이트한 일정이였지만 엑기스로 배울 수 있어 좋았습니다.
                        </p>
                        <p className="block lg:hidden font-bold text-[5px]">
                            전문가 양성 교육이라 내용 대비 타이트한 일정이<br/>
                            였지만 엑기스로 배울 수 있어 좋았습니다.
                        </p>
                    </div>

                    <div className="absolute flex flex-row justify-between items-center bg-[#FCF9FF] opacity-0
                        bottom-[0px] left-[0px] w-[185px] h-[37px] rounded-[15px] px-[20px] shadow-[2px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:bottom-0 lg:left-0 lg:w-[365px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)]"
                         data-animate>
                        <Image
                            src={"/withProject/comment1.png"}
                            alt={"comment1.png"}
                            width={21}
                            height={21}
                            unoptimized
                            className="lg:w-[55px] lg:h-[55px]"
                        />
                        <p className="hidden lg:block font-bold text-[13px]">
                            경험해 보지 못한 새로운 분야를 수강하면서<br/>
                            과제도 해보고 유익하고 흥미로운 시간이였습니다.
                        </p>
                        <p className="block lg:hidden font-bold text-[5px]">
                            경험해 보지 못한 새로운 분야를 수강하면서 과제도 해보고<br/>
                            유익하고 흥미로운 시간이였습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* section6 */}
            <section className="flex flex-col w-full h-auto bg-[#EAEAEA80] rounded-tl-[120px]
                px-[30px] mt-[78px] pb-[62px] lg:px-[146px] lg:mt-[439px] lg:pb-[195px]">
                <div className="relative w-full h-auto lg:mt-[-209px]">
                    {/* 배경 */}
                    <Image
                        src="/withProject/section6_image.png" // 이미지 경로
                        alt="section6 background"
                        width={1020}
                        height={432}
                        unoptimized
                        className="w-full h-auto object-cover rounded-[20px] mb-[1px] lg:rounded-[50px] lg:mb-[26px]"
                    />
                    {/* 오버레이 및 텍스트 */}
                    <div className="absolute inset-0 flex flex-col justify-center px-[22px] lg:px-[62px]">
                        {/* 로고 + 텍스트 */}
                        <Image
                            src="/withProject/logo_section6.svg" // 흰색 로고 사용
                            alt="connecple logo"
                            width={67}
                            height={15}
                            unoptimized
                            className="lg:w-[157px] lg:h-[35px]"
                        />
                        {/* 타이틀 */}
                        <h1 className="font-black text-white
                            text-[12px] mt-[15px] lg:text-[45px] lg:mt-[32px]">
                            재도약에 성공한 그녀의<br/>
                            이야기를 들어보다
                        </h1>

                        {/* 가로 선 */}
                        <div className="w-full h-[1px] lg:h-[2px] bg-white mt-[16px] lg:mt-[35px]"/>

                        {/* 서브 텍스트 */}
                        <p className="font-semibold text-white mt-[14px] text-[8px] lg:mt-[31px] lg:text-[20px]">
                            위드프로젝트 수료생 인터뷰<br/>
                            3~5레벨 수료생의 변화
                        </p>
                    </div>
                </div>
                {[
                    {
                        question: "위드프로젝트를 시작하시게 된 계기가 있나요?",
                        answer: "아이가 어린이집에 들어가니 저도 여유가 생기게 되었어요. 다시 일을 시작하고 싶었지만 3년이라는 공백으로 혼자 뒤처진 건 아닌지 걱정이 많아지더라구요.<br />어린이집 친구 엄마에게 위드 프로젝트를 소개받아 연락하게 되었습니다.",
                    },
                    {
                        question: "위드프로젝트를 수강하면서 어떤 점이 가장 좋으셨어요?",
                        answer: "궁금한 부분들을 바로 확인하여 가이드해 주시는 점이요.  제가 이런 질문을 해도 되나 싶을 만큼 사소한 부분이었는데도<br />늘 친절하게 답변해 주셨어요. 덕분에 금방 적응했구요!",
                    },
                    {
                        question: "위드프로젝트 전체 레벨을 수강하셨던데요!",
                        answer: "ICT분야도, 프로젝트 매니저라는 업무도 처음이다 보니 레벨1부터 차근차근 배우기 시작했구요, 레벨 3이 되니 커뮤니케이션 역량이 많이 필요하다는 생각이<br />들었어요! 가지고 있던 기존의 커리어를 잘 살려주신 덕분에 여러 프로젝트에 참여할 수 있었어요!",
                    },
                    {
                        question: "위드프로젝트와 타교육의 차이점이 있나요?",
                        answer: "효율적인 교육 운영 방식이요! 경력 보유 여성 입장을 누구보다 잘 아는 분들이 설계해서 그런지 저희가 가장 자유로운 오전 10시부터 오후 3시까지 교육을<br />진행하시더라구요! 이해 못하고 넘어간 부분은 다시 공부해 볼 수 있도록 온라인 영상 학습도 지원해 주셨어요!",
                    },
                    {
                        question: "위드프로젝트 수료 후 달라진 점이 있나요?",
                        answer: "무엇보다 자신감이 아닐까요? 저는 망고보드, 노션, 슬랙... 모두 낯설기만 했거든요. 위드프로젝트 교육을 들으며 과제도 해보고 실무 프로젝트에서 직접<br />사용해 보니까 너무 재밌더라구요! 이제 그런거 다 사용할 수 있다고 어딜가서든 자신있게 말해요!",
                    },
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="relative flex flex-col w-full border-[#E7E2EC]
                            h-[48px] rounded-[10px] border-[1px] mt-[11px]
                            lg:h-[108px] lg:rounded-[20px] lg:border-[2px] lg:mt-[20px]"
                    >
                        <div className="flex items-center w-full bg-[#E2E2E2]
                            h-[20px] rounded-[10px] lg:h-[42px] lg:rounded-[20px]">
                            <div
                                className="absolute flex items-center justify-center bg-[#541E80]
                                    rounded-[10px] w-[40px] h-[20px]
                                    lg:rounded-[20px] lg:w-[65px] lg:h-[42px]">
                                <p className="font-extrabold text-white text-[8px] lg:text-[22px]">{`Q${idx + 1}.`}</p>
                            </div>
                            <p
                                className="font-extrabold text-[#541E80] text-[8px] ml-[46px] lg:text-[22px] lg:ml-[72px]"
                                dangerouslySetInnerHTML={{__html: item.question}}
                            />
                        </div>
                        <p
                            className="absolute font-medium
                                text-[5.5px] ml-[11px] bottom-[5px]
                                lg:text-[15px] lg:ml-[29px] lg:bottom-[9px]"
                            dangerouslySetInnerHTML={{__html: item.answer}}
                        />
                        <p className="absolute font-extrabold text-[#C3B2D4]
                            text-[8px] bottom-[5px] right-[8px]
                            lg:text-[22px] lg:bottom-[16px] lg:right-[21px]">
                            {`A${idx + 1}.`}
                        </p>
                    </div>
                ))}
            </section>

            {/* section7 */}
            <section className="flex w-full h-auto bg-[#EAEAEA80]">
                <div className="flex flex-col w-full h-auto bg-white justify-between
                    rounded-tr-[50px] px-[53px] lg:rounded-tr-[120px] lg:px-[146px]">
                    <h1 className="font-black text-[#541E80] text-[15px] mt-[55px] lg:text-[45px] lg:mt-[117px]">PROGRAM</h1>
                    {/* pc 레이아웃 */}
                    <div className="hidden lg:flex flex-row w-full h-auto lg:mt-[26px]">
                        <div className="flex flex-col w-auto justify-center lg:mt-[26px] lg:gap-y-[60px]">
                            {contents.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelected(idx)}
                                    className={`w-[108px] h-[35px] clip-trapezoid rotate-90 flex justify-center items-center z-0 cursor-pointer 
                                ${
                                        selected === idx ? "bg-[#541E80] z-10" : "bg-[#D9D9D9] z-0"
                                    }`}
                                >
                                    <p className={`font-bold text-[30px] rotate-270 ${
                                        selected === idx ? "text-[#D9D9D9]" : "text-[#5D5D5D]"}`}>
                                        {idx + 1}
                                    </p>
                                </button>
                            ))}
                        </div>
                        {/* 제목, 소제목, 전문성, 포인트 */}
                        <div className="flex flex-col justify-center lg:w-auto lg:h-[531px] lg:px-[43px]">
                            <h2 className="font-bold lg:text-[28px]">{contents[selected].title}</h2>
                            <h3 className="font-bold text-[#541E80] lg:text-[25px] lg:mt-[10px]">{contents[selected].sub}</h3>
                            <div className="lg:w-[411px] border-t-2 border-dotted lg:mt-[35px]"/>
                            <div className="flex flex-row items-center lg:mt-[35px]">
                                <Image
                                    src={"/withProject/check_purple.png"}
                                    alt={"check_purple.png"}
                                    width={25}
                                    height={25}
                                    unoptimized
                                    className="lg:w-[25px] lg:h-[25px]"
                                />
                                <p className="font-extrabold text-[#541E80] lg:text-[25px] lg:ml-[15px]">전문성</p>
                            </div>
                            <p className="font-extrabold text-[#878787] lg:text-[18px] lg:mt-[5px]"
                               dangerouslySetInnerHTML={{__html: contents[selected].content1}}/>
                            <div className="lg:w-[411px] border-t-2 border-dotted lg:mt-[35px]"/>
                            <div className="flex flex-row items-center lg:mt-[35px]">
                                <Image
                                    src={"/withProject/check_purple.png"}
                                    alt={"check_purple.png"}
                                    width={25}
                                    height={25}
                                    unoptimized
                                    className="lg:w-[25px] lg:h-[25px]"
                                />
                                <p className="font-extrabold text-[#541E80] lg:text-[25px] lg:ml-[15px]">포인트</p>
                            </div>
                            <p className="font-extrabold text-[#878787] lg:text-[18px] lg:mt-[5px]"
                               dangerouslySetInnerHTML={{__html: contents[selected].content2}}/>
                        </div>
                        {/* 이미지 */}
                        <div className="relative bg-[#D9D9D9] rounded-[20px] flex justify-center items-center lg:w-[493px] lg:h-[531px]">
                            <Image
                                src={contents[selected].img}
                                alt="image"
                                width={selected === 0 || selected === 1 ? 487 : 444}
                                height={selected === 0 || selected === 1 ? 525 : 481}
                                unoptimized
                                className={`object-fill ${
                                    selected === 0 || selected === 1
                                        ? 'lg:w-[487px] lg:h-[525px]'
                                        : 'lg:w-[444px] lg:h-[481px]'
                                }`}
                                onClick={() => setIsModalOpen(true)}
                            />
                            {isModalOpen && (
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <div
                                        className="relative bg-[#D9D9D9] rounded-[20px] lg:w-[741px] lg:h-[798px]"
                                        onClick={(e) => e.stopPropagation()} // 바깥 클릭 시 닫히게 + 내부 클릭은 무시
                                    >
                                        {/* 닫기 버튼 */}
                                        <button
                                            className="absolute z-100 top-[11px] right-[11px] text-[#541E80] cursor-pointer"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            <Image
                                                src={"/withProject/section7_modal_X.svg"}
                                                alt={"닫기"}
                                                width={37}
                                                height={37}
                                                unoptimized
                                            />
                                        </button>
                                        {/* 팝업 이미지 */}
                                        <Image
                                            src={contents[selected].img}
                                            alt="popup-image"
                                            fill
                                            className={`object-fill 
                                            ${selected === 0 || selected === 1 ? "p-[10px]" : "p-[50px]"}`}
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 모바일 레이아웃 */}
                    <div className="flex lg:hidden flex-col w-full h-auto mt-[19px]">
                        {/* 버튼 */}
                        <div className="flex flex-row w-auto justify-center gap-x-[9px]">
                            {contents.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelected(idx)}
                                    className={`flex justify-center items-center w-[46px] h-[12px] rounded-[10px] cursor-pointer 
                                    ${selected === idx ? "bg-[#541E80]" : "bg-[#D9D9D9]"}`}
                                >
                                    <p className={`font-bold text-[8px] 
                                    ${selected === idx ? "text-white" : "text-[#878787]"}`}
                                    >
                                        {idx + 1}
                                    </p>
                                </button>
                            ))}
                        </div>
                        {/* 제목, 소제목, 전문성, 포인트 */}
                        <div className="relative flex flex-col justify-center items-center w-[289px] h-auto
                            bg-[#E7E2EC] mt-[8px] self-center rounded-[10px] p-[14px]">
                            <div className="flex flex-col w-full h-auto rounded-[10px] bg-white justify-center px-[16px] py-[10px]">
                                <h2 className="font-extrabold text-[10px]">{contents[selected].title}</h2>
                                <h3 className="font-bold text-[#541E80] text-[9px] mt-[3px]">{contents[selected].sub}</h3>
                                <div className="w-full border-[0.7px] border-dotted border-[#BDBDBD] mt-[6px] self-center"/>
                                <div className="flex flex-row items-center mt-[9px]">
                                    <Image
                                        src={"/withProject/check_purple.png"}
                                        alt={"check_purple.png"}
                                        width={10}
                                        height={10}
                                        unoptimized
                                    />
                                    <p className="font-extrabold text-[#541E80] text-[10px] ml-[6px]">전문성</p>
                                </div>
                                <p className="font-bold text-[#878787] text-[8px] mt-[1px]"
                                   dangerouslySetInnerHTML={{__html: contents[selected].content1}}/>
                                <div
                                    className="w-full border-[0.7px] border-dotted border-[#BDBDBD] mt-[3px] self-center"/>
                                <div className="flex flex-row items-center mt-[7px]">
                                    <Image
                                        src={"/withProject/check_purple.png"}
                                        alt={"check_purple.png"}
                                        width={10}
                                        height={10}
                                        unoptimized
                                    />
                                    <p className="font-extrabold text-[#541E80] text-[10px] ml-[6px]">포인트</p>
                                </div>
                                <p className="font-bold text-[#878787] text-[8px] mt-[1px]"
                                   dangerouslySetInnerHTML={{__html: contents[selected].content2}}/>
                            </div>
                        </div>
                        {/* 이미지 */}
                        <div className={`relative bg-[#D9D9D9] rounded-[10px] flex justify-center items-center
                            w-[289px] h-auto self-center mt-[11px]
                            ${selected === 0 || selected === 1 ? "p-[1px]" : "p-[15px]"}`}>
                            <Image
                                src={contents[selected].img}
                                alt="image"
                                width={487}
                                height={525}
                                unoptimized
                                className="object-fill"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* section8 */}
            <section className="flex flex-col w-full h-auto px-[52px] mt-[69px] lg:px-[200px] lg:mt-[138px]">
                <h1 className="text-center font-black text-[#541E80] text-[15px] mt-[25px] lg:text-[45px] lg:mt-[59px]">
                    위드프로젝트 어떻게 들을 수 있나요?
                </h1>
                <div className="flex flex-row w-full h-auto justify-between items-center
                    mt-[20px] gap-x-[11px] lg:mt-[48px] lg:gap-x-[39px]">
                    <button onClick={() => setSelected2('reg')}
                            className={`flex w-full h-full justify-center items-center font-black border-b-[2px] cursor-pointer
                        ${selected2 === 'reg' ? 'text-[#541E80]' : 'text-[#B3B3B3]'}
                        text-[12px] pb-[6px] lg:text-[25px] lg:pb-[17px]`}
                    >
                        신청절차
                    </button>
                    <button onClick={() => setSelected2('class')}
                            className={`flex w-full h-full justify-center items-center font-black border-b-[2px] cursor-pointer
                        ${selected2 === 'class' ? 'text-[#541E80]' : 'text-[#B3B3B3]'}
                        text-[12px] pb-[6px] lg:text-[25px] lg:pb-[17px]`}
                    >
                        수강절차
                    </button>
                </div>
                <Image
                    src={`${selected2 === 'reg' ? "/withProject/section8_image1.png" : "/withProject/section8_image2.png"}`}
                    alt={"image"}
                    width={487}
                    height={525}
                    unoptimized
                    className="hidden lg:block w-full h-[350px] mt-[50px]"
                />
                <Image
                    src={`${selected2 === 'reg' ? "/withProject/section8_image3.png" : "/withProject/section8_image4.png"}`}
                    alt={"image"}
                    width={250}
                    height={263}
                    unoptimized
                    className="block lg:hidden w-full h-[135px] mt-[15px]"
                />
                <div className="flex justify-center items-center">
                    <Link
                        href="/with-project"
                        className="bg-[#541E80] text-white flex items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
                            font-bold rounded-[30px] text-[10px] w-[159px] h-[25px] mt-[21px]
                            lg:font-extrabold lg:rounded-[30px] lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:mt-[60px]"
                    >
                        위드프로젝트 신청서 작성하러 가기
                    </Link>
                </div>
            </section>

            {/* section9 */}
            <section className="flex flex-col w-full h-auto
                mt-[113px] mb-[67px] lg:px-[146px] lg:mt-[207px] lg:mb-[300px]">
                <div className="flex flex-col justify-center mt-[58px] lg:mt-[156px]">
                    <h1 className="text-center text-[15px] font-black lg:text-[30px] lg:font-extrabold">
                        W.I.T.H Project
                    </h1>
                    <h1 className="text-center text-[13px] font-bold mt-[11px] lg:text-[27px] lg:font-semibold lg:mt-[20px]">
                        경력보유여성 재도약 프로젝트(Women In The Hope)
                    </h1>
                </div>
                <div className="flex w-full h-auto justify-center">
                    <Image
                        src="/withProject/logo_with_project.svg"
                        alt="with project logo"
                        width="256"
                        height="159"
                        unoptimized
                        className="object-contain lg:w-[581px] lg:h-[361px]"
                    />
                </div>
                <h3 className="text-center font-bold text-[10px] mt-[4px] lg:font-extrabold lg:text-[25px] lg:mt-[62px] leading-loose">
                    인생변화를 위한 당신의 선택! 도전!<br/>
                    <span className="text-[#541E80]">당신의 재도약을 커넥플이 응원합니다.</span>
                </h3>
                <Link
                    href="/with-project"
                    className="bg-[#541E80] text-white self-center flex items-center justify-center
                        mt-[17px] w-[159px] h-[25px] text-[10px] rounded-[30px] font-bold
                        lg:mt-[55px] lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:rounded-[30px] lg:font-extrabold">
                        지금 바로 가능성을 현실로 만들기
                </Link>
            </section>
        </main>
    );
}
