"use client";

import Image from "next/image";

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
        lg:px-[136px] lg:mt-[300px]">
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
        lg:px-[136px]"
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
    </main>
  );
}
