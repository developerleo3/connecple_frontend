"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    const targets = document.querySelectorAll("[data-animate]");
    targets.forEach(el => observer.observe(el));

    return () => {
      targets.forEach(el => observer.unobserve(el));
    };
  }, []);

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
          <Link 
            href="/with-project"
            className="bg-[#541E80] text-white flex self-center items-center justify-center font-extrabold
            lg:mt-[55px] lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:rounded-[30px]">
            지금 바로 가능성을 현실로 만들기
          </Link>
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

        <div className="flex flex-col w-full h-auto lg:mt-[55px]">
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

      {/* section5 */}
      <section className="flex flex-col w-full h-auto justify-center lg:mt-[250px] lg:px-[200px]">
        <h1 className="font-black text-[#541E80] text-center lg:text-[45px]">
          교육생들의 생생후기
        </h1>
        <div className="relative lg:mt-[73px] w-full h-[590px]">
          <div className="absolute top-0 left-0 flex flex-row justify-between items-center bg-[#F8F8F8]
            lg:w-[469px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <Image
              src={"/withProject/comment1.png"}
              alt={"comment1.png"}
              width={55}
              height={55}
            />
            <p className="font-bold lg:text-[13px]">
              첫 날이라 시스템 환경이 어수선한 참가자들도 많았음에도 불구하고<br />
              전체를 잘 아울러 이끌어 무리없이 진행하는 운영능력이 돋보였습니다.
            </p>
          </div>

          <div className="absolute top-0 right-[13px] flex flex-row justify-between items-center bg-[#FCF9FF]
            lg:w-[415px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <p className="font-bold lg:text-[13px]">
              무슨 업무인지 감 잡을 수 있게 스스로 판단해서<br />
              설문처럼 답하는 방식의 교육이 즐거웠습니다.
            </p>
            <Image
              src={"/withProject/comment1.png"}
              alt={"comment1.png"}
              width={55}
              height={55}
            />
          </div>

          <div className="absolute top-[124px] left-[20px] flex flex-row justify-between items-center bg-[#FCF9FF]
            lg:w-[512px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <Image
              src={"/withProject/comment1.png"}
              alt={"comment1.png"}
              width={55}
              height={55}
            />
            <p className="font-bold lg:text-[13px]">
              행사나 교육운영의 전체적인 프로세스를 알 수 있었고<br />
              마지막 구글 설문지를 한글로 가져와 적용하는 부분은 매우 도움이 되었습니다.
            </p>
          </div>

          <div className="absolute top-[138px] right-[108px] flex flex-row justify-center items-center bg-[#F8F8F8]
            lg:w-[281px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <p className="font-bold lg:text-[13px]">
              내가 해보지 않은 분야에서의 첫 도전! 재밌었다!
            </p>
          </div>

          <div className="absolute top-[199px] right-[25px] flex flex-row justify-center items-center bg-[#F8F8F8]
            lg:w-[151px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <p className="font-bold lg:text-[13px]">
              좋은 교육 감사합니다.
            </p>
          </div>

          <div className="absolute top-[244px] left-[77px] flex flex-row justify-center items-center bg-[#F8F8F8]
            lg:w-[309px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <p className="font-bold lg:text-[13px]">
              한 주가 빠르게 흘러 교육 놓치지 않고 들어 좋았습니다.
            </p>
          </div>

          <div className="absolute top-[317px] left-[24px] flex flex-row justify-center items-center bg-[#FCF9FF]
            lg:w-[201px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <p className="font-bold lg:text-[13px]">
              복기는 곧 다음을 위한 시작이다.
            </p>
          </div>

          <div className="absolute top-[269px] right-[13px] flex flex-row justify-between items-center bg-[#F8F8F8]
            lg:w-[520px] lg:h-[176px] lg:rounded-[30px] lg:px-[20px] lg:shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
            data-animate>
            <p className="font-bold lg:text-[13px]">
              5일이었지만 매우 알차게 교육을 받은 것 같습니다.<br />
              과제 피드백과 중간 소통을 하는 교육이였기에 집중이 가능했고,<br />
              특히나 강사님이 교육생의 답에도 잘 호응을 해주셔서 자신감이<br />
                            생겼던 것 같습니다. 긍정적이고 좋은 교육 감사드립니다.<br />
전체적으로 저도 어떻게 시스템이 돌아가는 지에 대해 알게 되었던 부분이라<br />
              좋은 기회였습니다.
                          </p>
            <Image
              src={"/withProject/comment1.png"}
              alt={"comment1.png"}
              width={55}
              height={55}
            />
          </div>

            <div className="absolute top-[379px] left-[125px] flex flex-row justify-center items-center bg-[#F8F8F8]
            lg:w-[309px] lg:h-[71px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
              data-animate>
              <p className="font-bold lg:text-[13px]">
                교육 행사나 전반적인 운영체제나 관심이 있다면<br />
                꼭 알아야 되는 부분이라 생각됩니다.
              </p>
            </div>

            <div className="absolute top-[473px] right-[187px] flex flex-row justify-center items-center bg-[#FCF9FF]
            lg:w-[398px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
              data-animate>
              <p className="font-bold lg:text-[13px]">
                이론 뿐 아니라 과제를 통해 실무 스킬까지 익힐 수 있어서 좋은 것 같음.
              </p>
            </div>

            <div className="absolute bottom-0 right-0 flex flex-row justify-center items-center bg-[#F8F8F8]
            lg:w-[545px] lg:h-[43px] lg:rounded-[30px] lg:px-[13px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
              data-animate>
              <p className="font-bold lg:text-[13px]">
                전문가 양성 교육이라 내용 대비 타이트한 일정이였지만 엑기스로 배울 수 있어 좋았습니다.
              </p>
            </div>

            <div className="absolute bottom-0 left-0 flex flex-row justify-between items-center bg-[#FCF9FF]
            lg:w-[365px] lg:h-[91px] lg:rounded-[30px] lg:px-[20px] shadow-[2px_2px_10px_0_rgba(0,0,0,0.25)] opacity-0"
              data-animate>
              <Image
                src={"/withProject/comment1.png"}
                alt={"comment1.png"}
                width={55}
                height={55}
              />
              <p className="font-bold lg:text-[13px]">
                경험해 보지 못한 새로운 분야를 수강하면서<br />
                과제도 해보고 유익하고 흥미로운 시간이였습니다.
              </p>
            </div>
        </div>
      </section>

      {/* section6 */}
      <section className="flex flex-col w-full h-auto bg-[#EAEAEA80] rounded-tl-[120px] 
        lg:px-[146px] lg:mt-[439px] lg:pb-[195px]">
        <div className="relative w-full h-auto lg:mt-[-209px]">
          {/* 배경 */}
          <Image
            src="/withProject/section6_image.png" // 이미지 경로
            alt="section6 background"
            width={1020}
            height={432}
            className="lg:w-full lg:h-auto object-cover rounded-[50px] lg:mb-[26px]"
          />
          {/* 오버레이 및 텍스트 */}
          <div className="absolute inset-0 flex flex-col justify-center
            lg:px-[62px]">
            {/* 로고 + 텍스트 */}
            <Image
              src="/withProject/logo_section6.svg" // 흰색 로고 사용
              alt="connecple logo"
              width={30}
              height={30}
              className="lg:w-[157px] lg:h-[35px]"
            />
            {/* 타이틀 */}
            <h1 className="font-black text-white
              lg:text-[45px] lg:mt-[32px]">
              재도약에 성공한 그녀의<br />
              이야기를 들어보다
            </h1>

            {/* 가로 선 */}
            <div className="w-full h-[2px] bg-white
              lg:mt-[35px]" />

            {/* 서브 텍스트 */}
            <p className="font-semibold text-white 
              lg:mt-[31px] lg:text-[20px]">
              위드프로젝트 수료생 인터뷰<br />
              3~5레벨 수료생의 변화
            </p>
          </div>
        </div>
        {[
          {
            question: "위드프로젝트를 시작하시게 된 계기가 있나요?",
            answer: "아이가 어린이집에 들어가니 저도 여유가 생기게 되었어요. 다시 일을 시작하고 싶었지만 3년이라는 공백으로 혼자 뒤처진 건 아닌지 걱정이 많아지더라구요.<br />어린이집 친구 엄마에게 위드 프로젝트를 소개받아 연락하게 되었습니다.",
          },
          {
            question: "위드프로젝트를 수강하면서 어떤 점이 가장 좋으셨어요?",
            answer: "궁금한 부분들을 바로 확인하여 가이드해 주시는 점이요.  제가 이런 질문을 해도 되나 싶을 만큼 사소한 부분이었는데도<br />늘 친절하게 답변해 주셨어요. 덕분에 금방 적응했구요!",
          },
          {
            question: "위드프로젝트 전체 레벨을 수강하셨던데요!",
            answer: "ICT분야도, 프로젝트 매니저라는 업무도 처음이다 보니 레벨1부터 차근차근 배우기 시작했구요, 레벨 3이 되니 커뮤니케이션 역량이 많이 필요하다는 생각이<br />들었어요! 가지고 있던 기존의 커리어를 잘 살려주신 덕분에 여러 프로젝트에 참여할 수 있었어요!",
          },
          {
            question: "위드프로젝트와 타교육의 차이점이 있나요?",
            answer: "효율적인 교육 운영 방식이요! 경력 보유 여성 입장을 누구보다 잘 아는 분들이 설계해서 그런지 저희가 가장 자유로운 오전 10시부터 오후 3시까지 교육을<br />진행하시더라구요! 이해 못하고 넘어간 부분은 다시 공부해 볼 수 있도록 온라인 영상 학습도 지원해 주셨어요!",
          },
          {
            question: "위드프로젝트 수료 후 달라진 점이 있나요?",
            answer: "무엇보다 자신감이 아닐까요? 저는 망고보드, 노션, 슬랙... 모두 낯설기만 했거든요. 위드프로젝트 교육을 들으며 과제도 해보고 실무 프로젝트에서 직접<br />사용해 보니까 너무 재밌더라구요! 이제 그런거 다 사용할 수 있다고 어딜가서든 자신있게 말해요!",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="relative flex flex-col w-full h-[108px] rounded-[20px] border-[2px] border-[#E7E2EC] lg:mt-[20px]"
          >
            <div className="flex items-center w-full h-[42px] bg-[#E2E2E2] rounded-[20px]">
              <div className="absolute flex items-center justify-center bg-[#541E80] rounded-[20px] lg:w-[65px] h-[42px]">
                <p className="font-extrabold text-white lg:text-[22px]">{`Q${idx + 1}.`}</p>
              </div>
              <p
                className="font-extrabold text-[#541E80] lg:text-[22px] lg:ml-[72px]"
                dangerouslySetInnerHTML={{ __html: item.question }}
              />
            </div>
            <p
              className="absolute font-medium lg:text-[15px] lg:ml-[29px] lg:bottom-[9px]"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
            <p className="absolute font-extrabold text-[#C3B2D4] lg:text-[22px] lg:bottom-[16px] lg:right-[21px]">{`A${idx + 1}.`}</p>
          </div>
        ))}
      </section>

      {/* section7 */}
      <section className="flex flex-col w-full h-auto rounded-tr-[120px] bg-white justify-between
        lg:px-[146px] lg:mt-[-80px]">
        <h1 className="font-black text-[#541E80] lg:text-[45px] lg:mt-[117px]">PROGRAM</h1>
        <div className="flex flex-row w-full h-auto lg:mt-[26px]">
          {/* 네비게이션 */}
          <div>
            <Image
              src={"/withProject/section7_capture.png"}
              alt={"image"}
              width={487}
              height={525}
              className="lg:w-auto lg:h-[531px]"
            />
          </div>
          {/* 제목, 소제목, 전문성, 포인트 */}
          <div className="flex flex-col justify-center lg:w-auto lg:h-[531px] lg:px-[43px]">
            <h2 className="font-bold lg:text-[28px]">실습 중심 기본기 함양 온라인 교육</h2>
            <h3 className="font-bold text-[#541E80] lg:text-[25px] lg:mt-[10px]">이러닝 + 실시간 온라인 강의 병행</h3>
            <div className="lg:w-[411px] border-t-2 border-dotted lg:mt-[35px]" />
            <div className="flex flex-row items-center lg:mt-[35px]">
              <Image
                src={"/withProject/check_purple.png"}
                alt={"check_purple.png"}
                width={25}
                height={25}
                className="lg:w-[25px] lg:h-[25px]"
              />
              <p className="font-extrabold text-[#541E80] lg:text-[25px] lg:ml-[15px]">전문성</p>
            </div>
            <p className="font-extrabold text-[#878787] lg:text-[18px] lg:mt-[5px]">ICT MICE 실무자 특강부터 AI 협업툴 활용 워크숍까지</p>
            <div className="lg:w-[411px] border-t-2 border-dotted lg:mt-[35px]" />
            <div className="flex flex-row items-center lg:mt-[35px]">
              <Image
                src={"/withProject/check_purple.png"}
                alt={"check_purple.png"}
                width={25}
                height={25}
                className="lg:w-[25px] lg:h-[25px]"
              />
              <p className="font-extrabold text-[#541E80] lg:text-[25px] lg:ml-[15px]">포인트</p>
            </div>
            <p className="font-extrabold text-[#878787] lg:text-[18px] lg:mt-[5px]">아이를 돌보며 집에서도 수강 가능한, 유연한 학습 시스템</p>
          </div>
          {/* 이미지 */}
          <div className="relative bg-[#D9D9D9] rounded-[20px] lg:w-[493px] lg:h-[531px]">
            <Image
              src={"/withProject/section7_image1.png"}
              alt={"image"}
              width={487}
              height={525}
              className="lg:w-[487px] lg:h-[525px]"
            />
          </div>
        </div>
      </section>

      {/* section8 */}
      <section className="flex flex-col w-full h-auto lg:px-[146px] lg:mt-[138px]">
        <h1 className="text-center font-black text-[#541E80] lg:text-[45px] lg:mt-[59px]">위드프로젝트 어떻게 들을 수 있나요?</h1>
        <Image
          src={"/withProject/section8_capture.png"}
          alt={"image"}
          width={487}
          height={525}
          className="lg:w-full lg:h-auto lg:mt-[50px]"
        />
        <div className="flex justify-center items-center">
          <Link
            href="/with-project"
            className="bg-[#541E80] text-white font-extrabold flex items-center justify-center shadow-[4px_4px_6px_0_rgba(0,0,0,0.25)]
            rounded-[30px]
            w-[141px] h-[25px] text-[10px]
            lg:rounded-[30px]
            lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:mt-[60px]"
          >
            위드프로젝트 신청서 작성하러 가기
          </Link>
        </div>
      </section>

      {/* section9 */}
      <section className="flex flex-col w-full h-auto lg:px-[146px] lg:mt-[207px] lg:mb-[50px]">
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
        <h3 className="text-center font-extrabold
            lg:text-[25px] lg:mt-[62px]">
            인생변화를 위한 당신의 선택! 도전!<br />
            <span className="text-[#541E80]">당신의 재도약을 커넥플이 응원합니다.</span>
          </h3>
          <Link 
            href="/with-project"
            className="bg-[#541E80] text-white self-center flex items-center justify-center font-extrabold
              lg:mt-[55px] lg:w-[388px] lg:h-[60px] lg:text-[23px] lg:rounded-[30px]">
            지금 바로 가능성을 현실로 만들기
          </Link>
      </section>
    </main>
  );
}
