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
                        src="/withNewsletter/image_main.png"
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
                    당신의 시간과 가능성은 소중합니다.<br />
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
        </main>
    );
}
