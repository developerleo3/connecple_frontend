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
                        경력보유여성을 위한<br />
                        유연근무 기반 일경험 플랫폼
                    </h1>
                </div>
                <p className={"absolute z-10 text-white font-bold leading-loose lg:text-[25px] lg:left-[140px] lg:bottom-[123px]"}>
                    위드긱은 ‘긱(GIG)’ 근무 방식을 기반으로,<br />
                    경력보유여성들이 자신만의 속도로 다시 일할 수 있도록<br />
                    재택 · 유연 · 단기 중심의 프로젝트형 일자리를 연결해주는 커리어 플랫폼입니다.
                </p>
            </section>
        </main>
    )
}
