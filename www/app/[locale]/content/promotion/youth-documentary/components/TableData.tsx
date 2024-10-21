import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TableData({ showModal, setShowModal }) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-[90%] sm:max-w-[70%]">
        <DialogHeader>
          <DialogTitle>제작지원자 연도별 성과</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="service__table-2">
            <ScrollArea className="h-[70vh] relative">
              <table className="service__table-2-head fade_bottom_3">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th className="text-center">작품명</th>
                    <th className="text-center">감독(대표)</th>
                    <th>성과</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={4}>2024년 청년 감독 성과 - (4명 중 4명)</td>
                    <td className="text-center">음파음파</td>
                    <td className="text-center">여인서</td>
                    <td className="text-center">
                      · 2024 DMZ Docs 인더스트리 ‘코리안 POV 2024 펀드’ 5백만원
                      선정
                      <br />
                      · 2024 영화진흥위원회(KOFIC) 독립예술영화 제작지원
                      장편신인부문 2,840만원 선정
                      <br />· 2024 경기글로벌피칭아카데미 제작지원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">알고 모르는 사람</td>
                    <td className="text-center">배꽃나래</td>
                    <td className="text-center">
                      · 2024 영화진흥위원회(KOFIC) 독립예술영화 제작지원
                      단편부문 2천만원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      싹난 감자도 볕을 받으면 씨감자가 된다
                    </td>
                    <td className="text-center">양다연</td>
                    <td className="text-center">
                      {" "}
                      · 2024 경기글로벌피칭아카데미 제작지원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">물속의 이름들</td>
                    <td className="text-center">김성원</td>
                    <td className="text-center">
                      {" "}
                      · 2024 경기글로벌피칭아카데미 제작지원 선정
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={5}>2023년 청년 감독 성과 - (8명 중 5명)</td>
                    <td className="text-center">다큐멘터리 손선이</td>
                    <td className="text-center">류승진</td>
                    <td className="text-center">
                      · 2023 EBS국제다큐영화제(EIDF) 인더스트리 ‘K-Pitch prime’{" "}
                      {`<최우수상>`} 9천만원 수상
                      <br />· 2023 영화진흥위원회(KOFIC) 독립예술영화 제작지원
                      신인장편부문 4천만원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">귀신 생식기</td>
                    <td className="text-center">김석빈</td>
                    <td className="text-center">
                      · 2024 DMZ Docs 인더스트리 ‘코리안 POV 2024 펀드’ 5백만원
                      선정 <br />· 2023 영화진흥위원회(KOFIC) 독립예술영화
                      제작지원 신인장편부문 6천만원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">상상서울</td>
                    <td className="text-center">도민주</td>
                    <td className="text-center">
                      · 2023 EBS국제다큐영화제(EIDF) 인더스트리 ‘Young Pitch’{" "}
                      {`<새로운 시선상>`} 5백만원 수상
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">1963 부녀대탈출</td>
                    <td className="text-center">조은솔</td>
                    <td className="text-center">
                      · 2024 영화진흥위원회(KOFIC) 독립예술영화 제작지원
                      장편신인부문 6천만원 선정 <br />· 2023 DMZ Docs 인더스트리
                      ‘코리안 POV 2023 펀드’ 5백만원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">블랙박스</td>
                    <td className="text-center">김수민</td>
                    <td className="text-center">
                      · 2024 경기글로벌피칭아카데미 제작지원 선정
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={4}>2022년 청년 감독 성과 - (8명 중 4명)</td>
                    <td className="text-center">공순이</td>
                    <td className="text-center">유소영</td>
                    <td className="text-center">
                      · 2023 서울국제여성영화제(SIWFF) 피치&캐치 다큐멘터리부문{" "}
                      {`<시우프상>`} 1천만원 수상 <br />· 2023
                      EBS국제다큐영화제(EIDF) 인더스트리 ‘KOCCA
                      신진다큐멘터리창작자’ {`<우수상> `}
                      9백만원 수상 <br />
                      · 2023 영화진흥위원회(KOFIC) 독립예술영화 제작지원
                      신인장편부문 3천만원 선정 <br />· 2023 부산영상위원회(BFC)
                      부산제작사 장편다큐멘터리 단계별지원사업 제작단계 신인부문
                      3천만원 선정 <br />· 2022 부산영상위원회(BFC) 부산제작사
                      장편극영화 제작지원사업 다큐멘터리 기획개발단계 1천만원
                      선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">별의 순간</td>
                    <td className="text-center">장효봉</td>
                    <td className="text-center">
                      · 2023 영화진흥위원회(KOFIC) 독립예술영화 제작지원
                      일반장편부문 8천만원 선정 <br />· 2022 DMZ Docs 인더스트리
                      프로덕션 피치 한국
                      {`<우수상>`} 2천만원 선정
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">이상한 레즈의 장례식</td>
                    <td className="text-center">이은혜</td>
                    <td className="text-center">
                      · 2023 제15회 DMZ국제다큐멘터리영화제 한국경쟁부문 상영{" "}
                      <br />· 2022 제24회 서울국제여성영화제(SIWFF) 피칭
                      {`<시우프상>`} 1천만원 수상
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">철규, 번지점프를 하다</td>
                    <td className="text-center">부성필</td>
                    <td className="text-center">
                      · 2022 강원영상위원회(GFC) 기획개발지원사업 1천만원 선정
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>2021년 청년 감독 성과 - (4명 중 3명)</td>
                    <td className="text-center">퀸의 뜨개질</td>
                    <td className="text-center">조한나</td>
                    <td className="text-center">
                      · 2023 서울국제대안영상예술페스티벌(NEMAF) 대안영상예술상
                      한국부문 {`<한국작품상> `}
                      150만원 수상 <br />· 2023 제24회 전주국제영화제
                      한국단편경쟁 부문
                      {`<대상>`} 500만원 수상 <br />· 2023 제24회 전주국제영화제{" "}
                      {`<왓챠가 주목한 단편부문>`}
                      100만원 수상 <br />· 2021 EBS국제다큐영화제(EIDF) ‘KOCCA
                      Short Pitch’
                      {`<최우수상>`} 1천만원 수상
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">낮에 뜬 달</td>
                    <td className="text-center">김혜이</td>
                    <td className="text-center">
                      · 2023 EBS국제다큐멘터리영화제(EIDF) 인더스트리 ‘H!-Docs
                      Pitch’ {`<인더스트리 초이스상>`} 3천만원 수상 <br />· 2021
                      DMZ Docs 인더스트리트 DMZ우수프로젝트
                      {`<K-Doc Curated>`} 1,500만원 수상
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">땅과 꿈</td>
                    <td className="text-center">이준용</td>
                    <td className="text-center">
                      · 2023 제15회 DMZ국제다큐멘터리영화제 뉴스타파부문 상영{" "}
                      <br />· 2021 DMZ Docs 인더스트리트 프로덕션 피치
                      {`<독엣지콜카타상>`} 선정
                    </td>
                  </tr>
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
