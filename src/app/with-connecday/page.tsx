"use client";

import Image from "next/image";
import Link from "next/link";

export default function WithConnecdayPage() {
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
                    <h1 className="text-center
                        lg:text-[27px] lg:font-semibold lg:mt-[20px]">
                        재도약을 꿈꾸는 이 멋진 여성들을 위한 네트워킹 모임
                    </h1>
                </div>
                <div className="flex flex-col w-full h-auto justify-center">
                    <h1 className="text-center font-extrabold
                        text-[13px]
                        lg:text-[35px] lg:mt-[92px]">
                        “경력보유여성과 사회를 잇는, 커넥플만의 연결 플랫폼“
                    </h1>
                    <p className="text-center font-semibold
                        lg:text-[23px] lg:mt-[77px]">
                        워드커넥데이는 교육 수료생, 참여 기업, 전문가, 참여 동기들과<br/>
                        소통하고 연결하며 새로운 기회를 만드는 네트워킹 행사입니다.
                    </p>
                    <h3 className="text-center font-extrabold
                        lg:text-[25px] lg:mt-[62px]">
                        연결을 통해 커리어를 확장하는 날.<br/>
                        <span className="text-[#541E80]">사람과 사회를 잇는 진짜 네트워킹의 장.</span>
                    </h3>
                    <div className="relative flex flex-col items-center">
                        <h1 className="relative z-10 text-center font-tvn-medium text-[#541E80]
                            lg:text-[35px] lg:mt-[97px]">
                            선착순 20명 !
                        </h1>
                        <div className="absolute z-0 bg-[#D9D9D9]
                            lg:w-[174px] lg:h-[25px] lg:mt-[120px]"/>
                    </div>
                    <Link
                        href="/with-project"
                        className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold
                        lg:mt-[19px] lg:w-[388px] lg:h-[60px] lg:text-[27px] lg:rounded-[30px]">
                        나의 성장 가능성 연결하기
                    </Link>
                    <h3 className="flex self-center font-bold
                        lg:text-[20px] lg:mt-[25px]">
                        가능성은 연결될 때 빛이 납니다.
                    </h3>
                </div>
            </section>

            {/* section2 */}
            <section className="flex flex-col w-full h-auto lg:mt-[88px] lg:px-[123px]">
                <h1 className="font-black text-[#541E80] lg:text-[45px] lg:mt-[143px]">
                    한 걸음 내디뎠다면, 이제 연결이 필요한 순간입니다.
                </h1>
                <h2 className="font-extrabold lg:text-[27px] lg:mt-[26px]">
                    같은 길을 걷는 동료들, 실무에서 찾는 기업들,<br/>
                    내 가능성을 믿어주는 멘토들과 서로 연결되는 단 하루의 기회!
                </h2>
                <div className="flex flex-row justify-between lg:mt-[64px]">
                    <div className="flex justify-center items-center rounded-full bg-[#F6F6F6] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:w-[296px] lg:h-[296px]">
                        <p className="font-bold text-center lg:text-[27px] leading-relaxed">
                            위드프로젝트<br/>
                            설명회<br/>
                            <span className="inline-flex items-center justify-center">
                                <Image
                                    src="/withConnecDay/triangle_bottom.svg"
                                    alt="triangle_bottom"
                                    width={27}
                                    height={27}
                                    className="inline-block align-middle"
                                />
                            </span>
                            <br/>
                            <span className="font-extrabold">정보</span>
                        </p>
                    </div>
                    <div className="flex justify-center items-center rounded-full bg-[#ECECEC] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:w-[296px] lg:h-[296px]">
                        <p className="font-bold text-center lg:text-[27px] leading-relaxed">
                            인사이트<br/>
                            특강<br/>
                            <span className="inline-flex items-center justify-center">
                                <Image
                                    src="/withConnecDay/triangle_bottom.svg"
                                    alt="triangle_bottom"
                                    width={27}
                                    height={27}
                                    className="inline-block align-middle"
                                />
                            </span>
                            <br/>
                            <span className="font-extrabold">동기부여</span>
                        </p>
                    </div>
                    <div className="flex justify-center items-center rounded-full bg-[#F6F6F6] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
                        lg:w-[296px] lg:h-[296px]">
                        <p className="font-bold text-center lg:text-[27px] leading-relaxed">
                            네트워킹<br/>
                            티타임<br/>
                            <span className="inline-flex items-center justify-center">
                                <Image
                                    src="/withConnecDay/triangle_bottom.svg"
                                    alt="triangle_bottom"
                                    width={27}
                                    height={27}
                                    className="inline-block align-middle"
                                />
                            </span>
                            <br/>
                            <span className="font-extrabold">관계 형성</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* section3 */}
            <section className="flex flex-row w-full justify-between h-auto lg:px-[130px] lg:py-[90px] lg:mt-[300px] lg:mb-[157px]">
                <div className="flex flex-col">
                    <h1 className="font-black text-[#541E80] lg:text-[45px]">
                        PROGRAM
                    </h1>
                    <div className="flex flex-row lg:mt-[38px]">
                        <p className="flex justify-center items-center bg-[#D9D9D9] font-extrabold rounded-full
                            lg:text-[30px] lg:w-[50px] lg:h-[50px]">1</p>
                        <p className="flex justify-center items-center bg-[#D9D9D9] font-extrabold rounded-full
                            lg:text-[30px] lg:w-[50px] lg:h-[50px] lg:ml-[17px]">2</p>
                        <p className="flex justify-center items-center bg-[#D9D9D9] font-extrabold rounded-full
                            lg:text-[30px] lg:w-[50px] lg:h-[50px] lg:ml-[17px]">3</p>
                    </div>
                    <h2 className="font-extrabold lg:text-[32px] lg:mt-[46px]">인사이트 특강</h2>
                    <h3 className="font-bold lg:text-[28px]">: 나보다 먼저 걸어간 이야기에서 영감을</h3>
                    <h2 className="font-tvn-medium text-[#541E80] lg:text-[35px] lg:mt-[16px]">누군가의 경험은 나의 가능성이 됩니다.</h2>
                    <div className="lg:w-[446px] border-t-3 border-dotted lg:mt-[17px]"/>
                    <p className="font-extrabold lg:text-[19px] lg:mt-[29px]">
                        경력보유여성 선배 또는 업계 실무자의 진솔한 커리어 스토리<br/>
                        ICT·교육 ·행사 기획 분야 등 다양한 분야 경험 공유
                    </p>
                    <div className="lg:w-[446px] border-t-3 border-dotted lg:mt-[29px]"/>
                    <div className="flex flex-row items-center lg:mt-[18px]">
                        <Image
                            src={"/withConnecDay/check_purple.png"}
                            alt={"check_purple.png"}
                            width={25}
                            height={25}
                            className="lg:w-[25px] lg:h-[25px]"/>
                        <p className="font-bold text-[#541E80] lg:text-[18px] lg:ml-[10px]">다시 일하고 싶은 마음에 용기를 더해주는 현실 조언</p>
                    </div>
                    <div className="flex flex-row items-center lg:mt-[15px]">
                        <Image
                            src={"/withConnecDay/check_purple.png"}
                            alt={"check_purple.png"}
                            width={25}
                            height={25}
                            className="lg:w-[25px] lg:h-[25px]"/>
                        <p className="font-bold text-[#541E80] lg:text-[18px] lg:ml-[10px]">단절 이후에도 ‘가능성은 있다'는 실제 사례로 동기부여</p>
                    </div>
                    <div className="flex flex-row items-center lg:mt-[15px]">
                        <Image
                            src={"/withConnecDay/check_purple.png"}
                            alt={"check_purple.png"}
                            width={25}
                            height={25}
                            className="lg:w-[25px] lg:h-[25px]"/>
                        <p className="font-bold text-[#541E80] lg:text-[18px] lg:ml-[10px]">내가 가고 싶은 길을 상상해보는 시간</p>
                    </div>
                </div>
                <Image
                    src={"/withConnecDay/image1.png"}
                    alt={"image1.png"}
                    width={50}
                    height={50}
                    className="lg:w-[514px] lg:h-[636px] lg:rounded-[30px]"
                />
            </section>
        </main>
    );
}
