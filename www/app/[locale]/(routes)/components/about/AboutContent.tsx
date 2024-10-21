"use client";
import Image from "next/image";
import Shape4 from "../../../../../public/assets/imgs/home-7/shape-4.png";
import { useParams } from "next/navigation";

const AboutContent = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      <section className="about__area-7">
        <div className="container pt-130 pb-110">
          <div className="row">
            <div className="col-xxl-12">
              {locale == "ko" ? (
                <div className="sec-title-wrapper">
                  <h2 className="sec-title title-anim">
                    K-콘텐츠 진흥을 통하여,
                    <br />
                    K-컬처의 발전과 세계확산에
                    <br />
                    기여하겠습니다!
                  </h2>
                </div>
              ) : (
                <div className="sec-title-wrapper">
                  <h2 className="sec-title title-anim">
                    By promoting K-content,
                    <br />
                    we will help advance K-culture
                    <br />
                    and spread it globally!
                  </h2>
                </div>
              )}
            </div>
          </div>
          <div className="md:flex justify-between w-full">
            <div className="md:w-full">
              {locale == "ko" ? (
                <div className="about__mid-7 text-anim">
                  <p>
                    인류는 디지털AI가 선도하는 4차 산업 혁명에 돌입했습니다.
                  </p>
                  <p>
                    ‘미디어 혁신’은 디지털 문명전환을 견인하는 동시에 소통의
                    방식과 내용을 변모시켜 인간의 삶을 변화시키고 있습니다.
                  </p>
                  <p>
                    우리 재단은 다양한 방송과 통신, 기술, 라이프스타일, 커머스가
                    융합하고 통합되는 새로운 미디어 환경에 맞춰 공익성과
                    다양성을 갖춘 방송콘텐츠 진흥 사업을 더욱 적극적으로
                    펼치겠습니다.
                  </p>
                  <p>
                    먼저, 우리는 ‘미디어 혁신’ 시대의 방송혁신을 선도하겠습니다.
                    시대정신과 어젠다, 트렌드를 담아내는 방송콘텐츠를 주도적으로
                    기획해 나가겠습니다.
                  </p>
                  <p>
                    둘째, 우리는 우수 방송 인력을 찾아내어 적극 지원하고
                    육성함으로써, 디지털 시대에 부응하는 질 높은 방송콘텐츠가
                    만들어질 수 있도록 하겠습니다.
                  </p>
                  <p>
                    셋째, 우리는 혁신적 방송콘텐츠 진흥사업을 다각적으로
                    전개함으로써 대한민국이 방송콘텐츠 강국으로 우뚝 서도록
                    하겠습니다. 한국인에게 독특한 콘텐츠이면서 동시에 세계인의
                    감성에 깊게 스며들 수 있는 K-콘텐츠의 발굴과 제작에 지원을
                    아끼지 않겠습니다. <br />
                    넷째, 우리는 스마트 폰 혁명, AI콘텐츠의 등으로 미디어
                    생태계의 한 축을 이루는 1인 크리에이터의 콘텐츠 진흥과 제작
                    지원을 확대해 나갈 것입니다. 방송과 미디어에 개인의 관점,
                    창조적이고 복합적인 소통이 이루어질 수 있도록 하겠습니다.
                  </p>
                  <p>
                    방송콘텐츠진흥재단은 K-콘텐츠를 진흥하여 K-컬처의 발전과
                    세계확산에 기여하겠습니다.
                  </p>
                  <p>많은 관심과 격려 부탁 드립니다.</p>
                  <p className="font-bold">이사장 조성환</p>
                </div>
              ) : (
                <div className="about__mid-7 text-anim">
                  <p>
                    We have entered the Fourth Industrial Revolution, driven by
                    digital AI.
                  </p>
                  <p>
                    {`"Media innovation" is at the forefront of this digital
                    transformation, reshaping the way we communicate and
                    influencing the content and form of human interactions.`}
                  </p>
                  <p>
                    In response to this new media environment—where
                    broadcasting, communication, technology, lifestyle, and
                    commerce converge—our foundation is committed to actively
                    promoting broadcasting content that upholds public interest
                    and diversity.
                  </p>
                  <p>
                   {`First, we will lead the way in broadcasting innovation in
                    this era of "media revolution." We aim to take the
                    initiative in creating content that captures the spirit of
                    the times, sets agendas, and defines trends.`}
                  </p>
                  <p>
                    Second, by identifying, supporting, and nurturing
                    exceptional broadcasting talent, we will foster the creation
                    of high-quality content that meets the needs of the digital
                    era.
                  </p>
                  <p>
                    Third, through a wide range of innovative broadcasting
                    content promotion projects, we will help position South
                    Korea as a global leader in broadcasting content. We are
                    fully committed to discovering and producing K-content that
                    is uniquely Korean, yet deeply resonates with audiences
                    worldwide.
                  </p>
                  <p>
                    Lastly, we will expand our support for independent creators,
                    who are becoming a key pillar of the media ecosystem in the
                    age of smartphones and AI-driven content. We will promote
                    personal perspectives and foster creative, multifaceted
                    communication within broadcasting and media.
                  </p>
                  <p>
                    The Broadcasting Content Promotion Foundation is dedicated
                    to advancing K-content and contributing to the growth and
                    global spread of K-culture.
                  </p>
                  <p>We appreciate your interest and support.</p>
                  <p className="font-bold">Chairman Jo Seong-hwan</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Image
          priority
          width={76}
          height={119}
          src={Shape4}
          alt="Shape"
          className="shape-1"
        />
      </section>
    </>
  );
};

export default AboutContent;
