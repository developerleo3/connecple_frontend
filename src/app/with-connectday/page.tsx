"use client";

import Image from "next/image";
import Link from "next/link";

export default function WithConnectdayPage() {
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
            워드커넥데이는 교육 수료생, 참여 기업, 전문가, 참여 동기들과<br />
            소통하고 연결하며 새로운 기회를 만드는 네트워킹 행사입니다.
          </p>
          <h3 className="text-center font-extrabold
            lg:text-[25px] lg:mt-[62px]">
            연결을 통해 커리어를 확장하는 날.<br />
            <span className="text-[#541E80]">사람과 사회를 잇는 진짜 네트워킹의 장.</span>
          </h3>
          <div className="relative flex flex-col items-center">
            <h1 className="relative z-10 text-center font-tvn-medium text-[#541E80] 
              lg:text-[35px] lg:mt-[97px]">
              선착순 20명 !
            </h1>
            <div className="absolute z-0 bg-[#D9D9D9]
              lg:w-[174px] lg:h-[25px] lg:mt-[120px]" />
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
    </main>
  )
}
