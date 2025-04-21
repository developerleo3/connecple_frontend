"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-auto flex flex-col
      mt-[31px] px-[46px]
      lg:mt-[66px] lg:px-[130px]">
      {/* 메뉴 */}
      <div
        className="flex text-black font-bold
          text-[8px] gap-x-[11px]
          lg:text-[20px] lg:gap-x-[48px]"
      >
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
      <Image
        src="/logo_footer.svg"
        alt="CONNECPLE"
        width={90}
        height={21}
        className="lg:w-[272px] lg:h-[61px] mt-[15px] lg:mt-[35px]"
      />

      <div className="grid grid-cols-5 mt-[15px] lg:mt-[40px]">
        {/* 좌측 정보 (3/5) */}
        <div className="col-span-3 border-r-[1px] border-[#C3C3C3]
          space-y-[5px] text-[8px]
          lg:space-y-[16px] lg:text-[20px]">
          {/* 대표 정보 */}
          <div className="flex font-medium gap-x-[10px] lg:gap-x-[44px]">
            <p className="font-bold">대표</p>
            <p>박지희</p>
            <p>주식회사커넥플</p>
          </div>

          {/* 주소 정보 */}
          <div className="flex gap-x-[10px] lg:gap-x-[44px]">
            <p className="font-bold">주소</p>
            <p>서울시 양천구 은행정로5길 42 2층</p>
          </div>

          {/* 사업자정보 */}
          <div className="flex flex-wrap">
            <p className="font-bold">사업자번호</p>
            <p className="ml-[5px] lg:ml-[22px]">123-45-67890</p>
            <p className="font-bold ml-[10px] lg:ml-[44px]">대표 이메일</p>
            <p className="ml-[5px] lg:ml-[22px]">with@cnp.day</p>
          </div>
        </div>

        {/* 우측 고객센터 (2/5) */}
        <div className="col-span-2 pl-[31px] lg:pl-[112px]">
          <p className="font-bold text-[8px] lg:text-[20px]">고객센터</p>
          <p className="font-bold text-[11px] lg:text-[32px]">02-2610-9774</p>
          <p className="font-medium text-[6px] lg:text-[20px]">평일 9:00 - 18:00</p>
          <p className="font-medium text-[6px] lg:text-[20px]">주말 10:00 - 14:00</p>
        </div>
      </div>
      <p className="text-[8px] mt-[20px] mb-[28px]
        lg:text-[20px] lg:mt-[40px] lg:mb-[70px]">Copyright ⓒ 2025.All right Reserved by CONNECPLE.</p>
    </footer>
  );
}
