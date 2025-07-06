"use client";

import Image from "next/image";
import Link from "next/link";

export default function WithNewsletterPage() {
    return (
        <main>
            {/* section1 */}
            <section className="flex flex-col w-full h-auto lg:mt-[144px]">
                <h1 className="text-center
                        text-[18px] font-black
                        lg:text-[30px] lg:font-extrabold">
                    W.I.T.H Newsletter
                </h1>
                <div className="relative flex justify-center items-center lg:h-[456px] lg:mt-[43px]">
                    {/* 배경 이미지 */}
                    <Image
                        src="/withNewsletter/section1_image.png"
                        alt="image_main"
                        width={123}
                        height={123}
                        unoptimized
                        className="absolute z-0 w-full h-full object-cover brightness-50"
                    />
                    <Image
                        src="/withNewsletter/subtract.png"
                        alt="subtract"
                        width={123}
                        height={123}
                        unoptimized
                        className="absolute z-10 lg:w-[944px] lg:h-[96px] brightness-75"
                    />
                    <p className="absolute z-20 text-center font-bold lg:text-[30px]">
                        최신 뉴스 정보와 커넥플 경력단절여성 지원 프로그램 소식을 만나보세요!
                    </p>
                </div>
                <p className="font-extrabold text-center lg:text-[25px] lg:mt-[70px] leading-loose">
                    당신의 시간과 가능성은 소중합니다.<br/>
                    <span className="text-[#541E80]">가능성을 향한 첫 걸음</span>
                </p>
                <div className="flex flex-row justify-center items-center lg:mt-[69px] lg:gap-x-[16px]">
                    <Link
                        href="/with-newsletter"
                        className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold
                        lg:mt-[19px] lg:w-[388px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                        위드뉴스레터 무료 구독
                    </Link>
                    <Link
                        href="/with-newsletter"
                        className="bg-[#878787] text-white flex self-center items-center justify-center font-extrabold
                        lg:mt-[19px] lg:w-[388px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                        뉴스레터 파트너 문의하기
                    </Link>
                </div>
            </section>
            {/* section2 */}
            <section className="w-full h-auto lg:px-[200px] lg:mt-[300px]">
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
                    <div className="relative lg:ml-[25px]">
                        {/* 꼬리 */}
                        <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2
                            lg:w-[10px] lg:h-[10px] bg-[#C0AED1] rotate-45"/>

                        {/* 말풍선 본문 */}
                        <div className="bg-[#C0AED1] text-white font-tvn-medium
                            lg:px-[28px] lg:py-[3px] lg:rounded-[20px] text-[15px] lg:text-[25px]">
                            W.I.T.H Newsletter 란?
                        </div>
                    </div>
                </div>
                <h1 className="font-black text-[#541E80]
                    lg:mt-[25px] lg:text-[45px]">
                    일과 삶 사이, 다시 시작을 준비하는<br/>
                    당신을 위한 뉴스레터.
                </h1>
                <h2 className="font-black
                    lg:mt-[20px] lg:text-[27px]">
                    국내 최초 경력보유여성 대상 뉴스레터인 위드뉴스레터는 경력보유여성을 위해<br/>
                    유익한 정보, 최신소식, 실전 팁을 담아 매주 한 번, 당신의 메일함으로 찾아갑니다.
                </h2>

                <div className="flex flex-row w-full h-auto bg-[#2C0E59] lg:mt-[40px] lg:rounded-[50px]">
                    <Image
                        src={"/withNewsletter/section2_image.png"}
                        alt={"section2_image"}
                        width={100}
                        height={100}
                        unoptimized
                        className="lg:w-[438px] lg:h-[432px] lg:rounded-tl-[50px] lg:rounded-bl-[50px]"
                    />
                    <div className="flex flex-col w-full h-full">
                        <div className="flex items-center justify-center border-[2px] border-white
                            lg:w-[142px] lg:h-[36px] lg:mt-[27px] lg:ml-[28px] lg:rounded-[20px]">
                            <p className="font-bold text-white lg:text-[20px]">Newsletter</p>
                        </div>
                        {/* 1번 벌꿀 */}
                        <div className="flex flex-row w-full h-auto
                            lg:mt-[25px] lg:ml-[50px] lg:gap-x-[15px]">
                            <p className="lg:text-[20px]">🐝</p>
                            <div className="flex flex-col lg:gap-y-[14px]">
                                <p className="font-bold text-white lg:text-[20px]">
                                    바쁜 당신을 위해, 여러분 대신 바쁘게 꿀정보 꿀소식<br/>
                                    찾아 돌아다니는 커넥플 허니비의 꿀정보 큐레이션!
                                </p>
                                <p className="font-normal text-white lg:text-[17px]">
                                    위드뉴스레터는 시간이 부족한 워킹맘과<br/>
                                    경력보유여성을 위해 꼭 필요한 정보를 한눈에 전달합니다.
                                </p>
                            </div>
                        </div>
                        {/* 점선 */}
                        <div className="flex justify-center border-white border-t-3 border-dotted
                            lg:my-[19px] lg:mx-[50px]"/>
                        {/* 2번 벌꿀 */}
                        <div className="flex flex-row w-full h-auto
                            lg:ml-[50px] lg:gap-x-[15px]">
                            <p className="lg:text-[20px]">🐝</p>
                            <div className="flex flex-col">
                                <p className="font-bold text-white lg:text-[20px] lg:mb-[10px]">
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
                                            width={25}
                                            height={25}
                                            unoptimized
                                            className="lg:w-[15px] lg:h-[20px]"
                                        />
                                        <p className="font-normal text-white lg:text-[14px] lg:ml-[10px]">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* section3 */}
            <section className="flex flex-col w-full h-auto bg-gradient-to-b from-white via-[#C0AED1] to-white
                lg:mt-[286px] lg:px-[200px] lg:pb-[74px]">
                <h1 className="font-black text-[#541E80] text-center
                    lg:text-[45px] lg:mb-[117px]">
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
                            <p className={"lg:text-[45px]"}>{item.em}</p>
                            {/* 말풍선 (꼬리 포함) */}
                            <div className="relative lg:ml-[25px]">
                                {/* 꼬리 */}
                                <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45
                                    lg:w-[12px] lg:h-[12px] bg-white shadow-[4px_4px_4px_0_rgba(0,0,0,0.15)] z-0"/>
                                {/* 말풍선 본문 */}
                                <div className="relative bg-white text-[#541E80] font-bold shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)]
                                    text-[15px] lg:px-[28px] lg:py-[10px] lg:rounded-[20px] lg:text-[20px] z-10"
                                     dangerouslySetInnerHTML={{__html: item.question}}>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-row items-center lg:mt-[40px] justify-end"}>
                            <div className="relative lg:mr-[25px]">
                                {/* 꼬리 */}
                                <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45
                                    lg:w-[12px] lg:h-[12px] bg-[#541E80] shadow-[4px_4px_4px_0_rgba(0,0,0,0.15)] z-0"/>
                                {/* 말풍선 본문 */}
                                <div className="relative bg-[#541E80] text-white font-bold shadow-[4px_4px_8px_0_rgba(0,0,0,0.25)]
                                    text-[15px] lg:px-[28px] lg:py-[10px] lg:rounded-[20px] lg:text-[20px] z-10"
                                     dangerouslySetInnerHTML={{__html: item.answer}}>
                                </div>
                            </div>
                            <Image
                                src={"/withNewsletter/logo_answer.svg"}
                                alt={"logo_answer.svg"}
                                width={12}
                                height={12}
                                className="lg:w-[45px] lg:h-[45px]"
                            />
                        </div>
                        {idx !== items.length - 1 && (
                            <div className="flex justify-center border-t-3 border-dotted lg:my-[45px]"/>
                        )}
                    </div>
                ))}
            </section>
            {/* section4 */}
            <section className="flex w-full h-auto lg:mt-[213px] lg:px-[200px]">
                <div className="flex flex-row w-full h-auto items-center justify-between">
                    <div className="flex flex-col justify-center items-center bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)]
                        lg:w-[360px] lg:h-[360px] lg:rounded-[30px]">
                        <p className="font-bold lg:text-[25px]">정보통 꿀단지 위드뉴스레터</p>
                        <Image src={"/withNewsletter/honey_bee.svg"} alt={"honey_bee"}
                               width={123}
                               height={123}
                               unoptimized
                               className="lg:w-[254px] lg:h-[164px] lg:mt-[18px]"/>
                        <p className="font-bold text-center lg:text-[17px] lg:mt-[29px]">
                            바쁜 꿀벌 커넥플 허니비가<br/>
                            맞춤형 꿀정보 꿀소식을 전해드려요.
                        </p>
                    </div>
                    {[
                        {
                            img_url: "/withNewsletter/section4_image1.png",
                            img_alt: "section4_image1.png",
                            title: "벚꽃의 계절인가 봄",
                            content: "시국이 어수선하고 마냥 좋을 수만은 없는 현실이긴 하지만 벚꽃의 계절이 온만큼 시국이 안정되면 벚꽃 야경으로 마음을 달래보아요.",
                        },
                        {
                            img_url: "/withNewsletter/section4_image2.png",
                            img_alt: "section4_image1.png",
                            title: "커넥플, 경력보유(단절)..",
                            content: "동네 육아친구를 찾아주는 육아크루는 3월 27일부터 30일까지 열린 ‘2025 마이비 마곡 베이비페어'에 참여하여...",
                        },
                        {
                            img_url: "/withNewsletter/section4_image3.png",
                            img_alt: "section4_image1.png",
                            title: "남부여성새로일하기센터..",
                            content: "서울시 남부여성발전센터와 남부여성새로일하기 센터는 여성의 경력단절 예방과 경제활동 참여를 지원...",
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)]
                        lg:w-[183px] lg:h-[307px] lg:rounded-[30px] lg:px-[12px] lg:py-[16px]">
                            <Image src={item.img_url}
                                   alt={item.img_alt}
                                   width={123}
                                   height={123}
                                   unoptimized
                                   className="lg:w-[159px] lg:h-[126px]"/>
                            <p className="font-bold text-center lg:text-[15px] lg:mt-[12px]">{item.title}</p>
                            <p className="font-semibold lg:text-[12px] lg:mt-[12px]">{item.content}</p>
                        </div>
                    ))}
                    <div className="flex bg-[#F1F1F1] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)] items-center justify-center
                        lg:w-[42px] lg:h-[307px] lg:rounded-[15px]">
                        <p className="font-semibold lg:text-[20px]">{">"}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
