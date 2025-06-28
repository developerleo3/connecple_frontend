"use client";

import Image from "next/image";

import { useState } from "react";

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


export default function WithProjectPage() {
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
            className="object-contain lg:w-[581px] lg:h-[361px]"
          />
        </div>
        <div className="flex flex-col w-full h-auto justify-center">
          <h1 className="text-center font-extrabold
            text-[13px]
            lg:text-[35px]">
            경력보유여성, 이런 고민해보셨나요?
          </h1>
          <p className="text-center font-semibold
            lg:text-[23px] lg:mt-[54px]">
            자신감 저하, 빠르게 변하는 트렌드에 대한 거리감,<br />
            부족한 네트워크, 육아와의 병행, 유연근무 기회의 부족까지,<br />
            커리어를 다시 시작하려는 경력보유여성 앞에 놓여진 다양한 심리적·현실적 장벽<br /><br />

            누구보다 그 마음을 잘 알기에<br />
            재도약의 시작이 가벼워질 수 있도록 맞춤형 솔루션을 준비했습니다.<br />
            심리적 장벽을 낮추고, 다시 걸음을 내딛을 수 있도록<br />
            ‘교육’, ‘네트워크’, ‘실전 프로젝트’까지 함께하는 커리어 재도약 프로그램<br />
            바로 위드프로젝트입니다.
          </p>
          <h3 className="text-center font-extrabold
            lg:text-[25px] lg:mt-[62px]">
            인생변화를 위한 당신의 선택! 도전!<br />
            <span className="text-[#541E80]">당신의 재도약을 커넥플이 응원합니다.</span>
          </h3>
          <button className="bg-[#541E80] text-white self-center font-extrabold
            lg:mt-[55px] lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:rounded-[30px]">
            지금 바로 가능성을 현실로 만들기
          </button>
        </div>
      </section>

      {/* section2 */}
      <section className="w-full h-auto 
        lg:px-[146px] lg:mt-[300px]">
        {/* 상단: 로고 + 문구 */}
        <div className="flex flex-row items-center">
          {/* 왼쪽 로고 */}
          <Image
            src="/withProject/logo_mini_C.svg"
            alt="미니 로고"
            width={20}
            height={20}
            className="lg:w-[36px] lg:h-[36px]"
          />
          {/* 말풍선 (꼬리 포함) */}
          <div className="relative lg:ml-[25px]">
            {/* 꼬리 */}
            <div className="absolute left-[-4px] top-1/2 transform -translate-y-1/2 
              lg:w-[10px] lg:h-[10px] bg-[#C0AED1] rotate-45" />

            {/* 말풍선 본문 */}
            <div className="bg-[#C0AED1] text-white font-tvn-medium
              lg:px-[28px] lg:py-[3px] lg:rounded-[20px] text-[15px] lg:text-[25px]">
              “예전엔 나도 일 잘했는데..”라는 마음, 그대로 두지 마세요.
            </div>
          </div>
        </div>

        <h1 className="font-black text-[#541E80]
          lg:mt-[25px] lg:text-[45px]">
          ICT 융합분야 교육 운영 매니저, 행사를 직접 기획<br />
          운영하는 프로젝트 매니저까지
        </h1>
        <h2 className="font-black
          lg:mt-[20px] lg:text-[27px]">
          내가 다시 주인공이 되는 자리, 위드프로젝트에 준비되어 있습니다.
        </h2>
        {/* 하단 아이콘 지표 */}
        <div className="flex flex-row w-full h-auto justify-between
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
                lg:w-[170px] lg:h-[170px]">
                <Image src={item.icon} alt={item.label} width={34} height={34} className="lg:w-[90px] lg:h-[90px]" />
              </div>
              <p className="font-semibold lg:text-[20px] lg:mt-[37px]" dangerouslySetInnerHTML={{ __html: item.label }}></p>
              <p className="font-extrabold text-[#541E80] lg:text-[35px] lg:mt-[28px]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* section3 */}
      <section className="flex flex-col w-full h-auto bg-[#C0AED1B2]
        lg:px-[146px]"
        style={{
          background: "linear-gradient(to bottom, rgba(192, 174, 209, 0.7), rgba(255, 255, 255, 1))",
        }}>
        <h2 className="font-bold lg:mt-[122px] lg:text-[27px]">
          ICT 융합 분야 프로젝트 기획 및 운영 전문기업 커넥플이 자체 개발한
        </h2>
        <h2 className="font-bold lg:mt-[10px] lg:text-[27px]">
          <span className="font-black lg:text-[45px] text-[#541E80]">[경력보유여성 커리어 재도약 프로그램]</span> 입니다.
        </h2>
        <div className="flex flex-row justify-between
            lg:mt-[73px] lg:mb-[218px]">
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
             w-[87px] h-[87px] rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[12px] shadow-[3px_3px_10px_0_rgba(0,0,0,0.5)]
             lg:w-[275px] lg:h-[270px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[20px]"
            >
              <Image
                src={item.picture}
                alt={item.label}
                width={275}
                height={182}
                className="object-cover w-full h-[182px] rounded-tl-[20px] rounded-tr-[20px]"
              />
              <div className="flex w-full h-[88px] justify-center items-center">
                <p
                  className="font-extrabold text-[#541E80] lg:text-[25px]"
                  dangerouslySetInnerHTML={{ __html: item.label }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* section4 */}
      <section className="flex flex-col w-full h-auto justify-center lg:mt-[83px] lg:px-[146px]">
        <h1 className="font-black text-[#541E80] text-center lg:text-[45px]">
          이런분들께 추천합니다.
        </h1>

        <div className="flex flex-col w-full h-auto lg:mt-[50px]">
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
              className={`flex flex-row w-full h-auto justify-between ${rowIndex === 1 ? "lg:mt-[39px]" : ""}`}
            >
              {row.map((item, idx) => {
                const isBgGray =
                  (rowIndex === 0 && idx % 2 === 0) || // 첫째 줄: 짝수
                  (rowIndex === 1 && idx % 2 === 1);   // 둘째 줄: 홀수

                return (
                  <div
                    key={idx}
                    className={`group flex flex-col items-center
                      w-[87px] h-[87px] rounded-[12px] shadow-[2px_2px_7px_0_rgba(0,0,0,0.25)]
                      lg:w-[214px] lg:h-[270px] lg:rounded-[20px]
                      ${isBgGray ? "bg-white" : "bg-[#F7F7F7]"} hover:bg-[#E2D5F1] transition-all duration-300`}
                  >
                    <Image
                      src={item.picture}
                      alt={item.title}
                      width={275}
                      height={182}
                      className="group-hover:hidden w-full h-[182px] rounded-tl-[20px] rounded-tr-[20px]
                        lg:w-[62px] lg:h-[62px] lg:mt-[28px]"
                    />
                    <Image
                      src={"/withProject/recommend_line.svg"}
                      alt={"recommend_line"}
                      width={168}
                      height={3}
                      className="group-hover:hidden lg:w-full lg:h-auto lg:px-[23px] lg:mt-[23px]"
                    />
                    <div className="group-hover:hidden flex w-full h-auto justify-center items-center text-center lg:mt-[30px]">
                      <p
                        className="font-bold lg:text-[18px]"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </div>
                    <div
                      className="hidden group-hover:flex w-full h-full items-center justify-center text-center font-bold
                        lg:text-[15px] lg:leading-[22px]"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
