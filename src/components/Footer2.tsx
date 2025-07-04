"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-auto flex flex-col bg-[#B1B1B1] text-white
      pt-[31px] px-[34px]
      lg:py-[50px] lg:px-[130px]">
      {/* 메뉴 */}
      <div className="flex flex-row justify-between">
        <Image
            src="/logo_main_picture.svg"
            alt="CONNECPLE"
            width={90}
            height={21}
            className="lg:w-[156px] lg:h-[35px]"
        />
        <div className="flex font-bold
          text-[7px] gap-x-[11px]
          lg:text-[20px] lg:gap-x-[48px]">
          <Link href="#" className="hover:text-gray-600">
            개인정보 처리방침
          </Link>
          <Link href="#" className="hover:text-gray-600">
            이용약관
          </Link>
          <Link href="#" className="hover:text-gray-600">
            문의하기
          </Link>
        </div>
      </div>

      <div className="flex flex-col
          gap-y-[1px] text-[7px]
          lg:gap-y-[10px] lg:text-[20px]">
        {/* 대표 정보 */}
        <div className="flex font-medium gap-x-[10px] mt-[5px] lg:mt-[10px] lg:gap-x-[44px]">
          <p className="font-bold">대표</p>
          <p>박지희</p>
          <p>주식회사커넥플</p>
        </div>

        {/* 본사 정보 */}
        <div className="flex gap-x-[10px] lg:gap-x-[44px]">
          <p className="font-bold">본사</p>
          <p>서울시 양천구 중앙로294 명성빌딩 6층 6-50호</p>
        </div>

        {/* 교육장 정보 */}
        <div className="flex gap-x-[10px] lg:gap-x-[27px]">
          <p className="font-bold">교육장</p>
          <p>서울시 양천구 은행정로5길 42 알파인타워 2층</p>
        </div>

        {/* 사업자정보 */}
        <div className="flex flex-wrap">
          <p className="font-bold">사업자번호</p>
          <p className="ml-[3px] lg:ml-[22px]">191-88-02321</p>
          <p className="font-bold ml-[5px] lg:ml-[44px]">대표 이메일</p>
          <p className="ml-[3px] lg:ml-[22px]">admin@cnp.day</p>
        </div>

        {/* 고객센터 정보 */}
        <div className="flex gap-x-[10px] lg:gap-x-[44px]">
          <p className="font-bold">고객센터</p>
          <p>02-2610-9770(대표)  |  02-2610-9772(MICE사업부) | 02-2610-9774(교육사업부)  | 평일 9:00-18:00</p>
        </div>

        {/* 저작권 */}
        <p className="text-[6px]
        lg:text-[20px]">Copyright ⓒ 2025.All right Reserved by CONNECPLE.</p>
      </div>

    </footer>
  );
}
