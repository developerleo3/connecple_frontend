"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-30 mt-30 w-full h-auto flex flex-col">
      {/* 메뉴 */}
      <div
        className="flex gap-8 text-black font-semibold
            lg:text-[20px]"
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
        width={271.84}
        height={61}
        className="lg:mt-10"
      />

      <div className="grid 
        lg:gap-10 lg:grid-cols-5 lg:mt-10">
        {/* 좌측 정보 (3/5) */}
        <div className="col-span-3 lg:space-y-4 lg:text-[20px]">
          {/* 대표 정보 */}
          <div className="flex gap-4">
            <p className="font-bold">대표</p>
            <p>박지희</p>
            <p>주식회사커넥플</p>
          </div>

          {/* 주소 정보 */}
          <div className="flex gap-4">
            <p className="font-bold">주소</p>
            <p>서울시 양천구 은행정로5길 42 2층</p>
          </div>

          {/* 사업자정보 */}
          <div className="flex gap-4 flex-wrap">
            <p className="font-bold">사업자번호</p>
            <p>123-45-67890</p>
            <p className="font-bold lg:ml-6">대표 이메일</p>
            <p>with@cnp.day</p>
          </div>
        </div>

        {/* 우측 고객센터 (2/5) */}
        <div className="col-span-2 border-l flex flex-col justify-start
            pl-20">
          <p className="font-semibold text-[20px]">고객센터</p>
          <p className="text-[32px] font-semibold">02-2610-9774</p>
          <p className="lg:text-[20px]">평일 9:00 - 18:00</p>
          <p className="lg:text-[20px]">주말 10:00 - 14:00</p>
        </div>
      </div>
      <p className="lg:text-[20px] lg:mt-15 lg:mb-30">Copyright ⓒ 2025.All right Reserved by CONNECPLE.</p>
    </footer>
  );
}
