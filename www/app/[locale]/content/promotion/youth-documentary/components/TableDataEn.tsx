import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TableDataEn({ showModal, setShowModal }) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-[90%] sm:max-w-[70%]">
        <DialogHeader>
          <DialogTitle>
            Yearly Achievements of Production Support Recipients
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="service__table-2">
            <ScrollArea className="h-[70vh] relative">
              <table className="service__table-2-head fade_bottom_3">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Director (Representative)</th>
                    <th>Achievements</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={4}>
                      {`2024 Young Directors' Achievements - (4 out of 4)`}
                    </td>
                    <td className="text-center">Oompa Oompa</td>
                    <td className="text-center">Yeo In-seo</td>
                    <td className="text-center">
                      {`· Selected for 2024 DMZ Docs Industry 'Korean POV 2024
                      Fund' 5 million KRW`}
                      <br />
                      · Selected for 2024 Korean Film Council (KOFIC)
                      Independent Art Film Production Support in the New
                      Director Feature category, 28.4 million KRW
                      <br />· Selected for 2024 Gyeonggi Global Pitching Academy
                      Production Support
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      People You Know and Don’t Know
                    </td>
                    <td className="text-center">Bae Kkot-na-rae</td>
                    <td className="text-center">
                      · Selected for 2024 KOFIC Independent Art Film Production
                      Support in the Short Film category, 20 million KRW
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      Even Sprouting Potatoes Become Seed Potatoes in the Sun
                    </td>
                    <td className="text-center">Yang Da-yeon</td>
                    <td className="text-center">
                      · Selected for 2024 Gyeonggi Global Pitching Academy
                      Production Support
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Names in the Water</td>
                    <td className="text-center">Kim Seong-won</td>
                    <td className="text-center">
                      · Selected for 2024 Gyeonggi Global Pitching Academy
                      Production Support
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={5}>
                      {`2023 Young Directors' Achievements - (5 out of 8)`}
                    </td>
                    <td className="text-center">Documentary Son Seon-i</td>
                    <td className="text-center">Ryu Seung-jin</td>
                    <td className="text-center">
                     {` · Won 90 million KRW at the 2023 EBS International
                      Documentary Festival (EIDF) Industry ‘K-Pitch Prime’ `}
                      <br />· Selected for 2023 KOFIC Independent Art Film
                      Production Support in the New Director Feature category,
                      40 million KRW
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Ghost Genitalia</td>
                    <td className="text-center">Kim Seok-bin</td>
                    <td className="text-center">
                      {`· Selected for 2024 DMZ Docs Industry ‘Korean POV 2024
                      Fund’ 5 million KRW`}
                      <br />· Selected for 2023 KOFIC Independent Art Film
                      Production Support in the New Director Feature category,
                      60 million KRW
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Imaginary Seoul</td>
                    <td className="text-center">Do Min-ju</td>
                    <td className="text-center">
                      · Won 5 million KRW at the 2023 EBS International
                      Documentary Festival (EIDF) Industry ‘Young Pitch’{" "}
                      {`<New Perspective Award>`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      1963 Father and Daughter Escape
                    </td>
                    <td className="text-center">Jo Eun-sol</td>
                    <td className="text-center">
                      · Selected for 2024 KOFIC Independent Art Film Production
                      Support in the New Director Feature category, 60 million
                      KRW
                      <br />· Selected for 2023 DMZ Docs Industry ‘Korean POV
                      2023 Fund’ 5 million KRW
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Black Box</td>
                    <td className="text-center">Kim Su-min</td>
                    <td className="text-center">
                      · Selected for 2024 Gyeonggi Global Pitching Academy
                      Production Support
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={4}>
                      {`2022 Young Directors' Achievements - (4 out of 8)`}
                    </td>
                    <td className="text-center">Kong Soon-yi</td>
                    <td className="text-center">Yoo So-young</td>
                    <td className="text-center">
                      {`· Won 10 million KRW at the 2023 Seoul International
                      Women's Film Festival (SIWFF) Pitch&Catch Documentary `}
                      {`<Siwoof Award>`} <br />· Won 9 million KRW at the 2023
                      {`EBS International Documentary Festival (EIDF) Industry
                      ‘KOCCA New Documentary Creators’`} {`<Excellence Award>`}{" "}
                      <br />
                      · Selected for 2023 KOFIC Independent Art Film Production
                      Support in the New Director Feature category, 30 million
                      KRW
                      <br />
                      · Selected for 2023 Busan Film Commission (BFC) Feature
                      Documentary Production Support for the Production Stage in
                      the New Director category, 30 million KRW
                      <br />· Selected for 2022 BFC Feature Film Development
                      Stage Documentary Support, 10 million KRW
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">The Moment of Stars</td>
                    <td className="text-center">Jang Hyo-bong</td>
                    <td className="text-center">
                      · Selected for 2023 KOFIC Independent Art Film Production
                      Support in the General Feature category, 80 million KRW{" "}
                      <br />· Won 20 million KRW at the 2022 DMZ Docs Industry
                      Production Pitch Korea {`<Excellence Award>`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      The Strange Funeral of Lesbians
                    </td>
                    <td className="text-center">Lee Eun-hye</td>
                    <td className="text-center">
                      · Screened at the 2023 15th DMZ International Documentary
                      Film Festival Korean Competition Section
                      <br />· {`Won 10 million KRW at the 2022 24th Seoul
                      International Women's Film Festival (SIWFF) Pitch`}{" "}
                      {`<Siwoof Award>`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      Cheol-gyu, Does a Bungee Jump
                    </td>
                    <td className="text-center">Boo Seong-pil</td>
                    <td className="text-center">
                      · Selected for 2022 Gyeonggi Film Commission (GFC)
                      Development Support Project, 10 million KRW
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3}>
                      {`2021 Young Directors' Achievements - (3 out of 4)`}
                    </td>
                    <td className="text-center">{`The Queen's Knitting`}</td>
                    <td className="text-center">Cho Hanna</td>
                    <td className="text-center">
                      · Won 1.5 million KRW at the 2023 Seoul International
                      NewMedia Alternative Film Festival (NEMAF) Korean Section{" "}
                      {`<Korean Work Award>`} <br />· Won 5 million KRW at the
                      2023 24th Jeonju International Film Festival Korean Short
                      Competition Section {`<Grand Prize>`} <br />· Won 1
                      million KRW at the 2023 24th Jeonju International Film
                      Festival {`<Watched Shorts by Watcha>`} <br />· Won 10
                      million KRW at the 2021 EBS International Documentary
                      Festival (EIDF) ‘KOCCA Short Pitch’ {`<Excellence Award>`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">The Moon at Noon</td>
                    <td className="text-center">Kim Hye-i</td>
                    <td className="text-center">
                      · Won 30 million KRW at the 2023 EBS International
                      Documentary Film Festival (EIDF) Industry ‘H!-Docs Pitch’{" "}
                      {`<Industry Choice Award>`} <br />· Won 15 million KRW at
                      the 2021 DMZ Docs Industry Excellent Project{" "}
                      {`<K-Doc Curated>`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">Land and Dreams</td>
                    <td className="text-center">Lee Joon-yong</td>
                    <td className="text-center">
                      · Screened at the 2023 15th DMZ International Documentary
                      Film Festival Newstapa Section
                      <br />· Selected for the 2021 DMZ Docs Industry Production
                      Pitch {`<Doc Edge Kolkata Award>`}
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
