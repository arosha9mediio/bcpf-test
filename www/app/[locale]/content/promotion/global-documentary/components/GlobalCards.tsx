"use client";
import "/public/assets/scss/master.scss";
import Image from "next/image";
import Img1 from "/public/assets/imgs/content/global/global-1.jpg";
import Img2 from "/public/assets/imgs/content/global/global-2.jpg";
import Img3 from "/public/assets/imgs/content/global/global-3.jpg";

const GLOBAL = [
  {
    id: "1",
    img: Img1,
    t1: "국제공동제작 워크숍 운영",
    t2: "• 독일, 싱가포르 등에서 ‘Docu 클리닉 워크숍’ 운영을 통한 글로벌 제작인력 양성 및 글로벌 콘텐츠 제작 노하우 교육",
    t3: " ",
  },
  {
    id: "2",
    img: Img2,
    t1: "해외 유수의 방송사와 제작진 교류",
    t2: "• 암스레트담, 토론토, 사천 등에서 글로벌 피칭포럼 ‘Korea Pitching’을 통한 국제공동 제작 기틀 마련",
    t3: "• 한국, 중국, 일본 각국의 방송현안 토론 및 정보를 교환하는 방송인 해외 교류행사 ‘한중일 PD포럼’ 주관",
  },
  {
    id: "3",
    img: Img3,
    t1: "해외 제작현장 견학",
    t2: "• 라스베이거스 등 방송콘텐츠 트렌드와 동향 파악을 위한 현지 방송사와 스튜디오 방문, 글로벌 미디어 트렌드 세미나 진행",
    t3: "",
  },
];

const GlobalCards = () => {
  return (
    <div>
      {/* <div>
        <h3 className="text-2xl font-bold">글로벌 제작인력 양성</h3>
      </div> */}
      <div className="grid md:grid-cols-2 md:gap-12 mt-8">
        {GLOBAL.map(global => (
          <div key={global.id} className="awards__content md:mb-12">
            <article className="blog__item">
              <div className="blog__img-wrapper">
                <div className="img-box-2">
                  <Image
                    priority
                    style={{
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    className="image-box__item"
                    src={global.img}
                    alt="Blog Thumbnail"
                  />
                  <Image
                    priority
                    style={{
                      width: "auto",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    className="image-box__item"
                    src={global.img}
                    alt="Blog Thumbnail"
                  />
                </div>
              </div>
              <h4>{global.t1}</h4>
              <p>{global.t2}</p>
              <p>{global.t3}</p>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalCards;
