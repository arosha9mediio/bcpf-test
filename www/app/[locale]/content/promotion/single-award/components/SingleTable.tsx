"use client";
import "/public/assets/scss/master.scss";
import { useParams } from "next/navigation";

const SingleTable = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <div className="w-full">
      {locale == "ko" ? (
        <div className="service__table-wrapper">
          <div className="service__table-head fade_bottom_3">
            <h3>내역</h3>
            <h3 className="text-center">편수</h3>
            <h3 className="text-center">수상금</h3>
            <h3>비고</h3>
          </div>

          <div className="divide-y">
            <div className="service__table-content fade_bottom_3">
              <p className="tm-name">대상</p>
              <p className="text-center">1편</p>
              <p className="text-center">5,000,000원</p>
              <p className="text-right">방송통신위원장상</p>
            </div>

            <div className="service__table-content fade_bottom_3">
              <p className="tm-name">제작상</p>
              <p className="text-center">1편</p>
              <p className="text-center">3,000,000원</p>
              <p className="text-right"> </p>
            </div>

            <div className="service__table-content fade_bottom_3">
              <p className="tm-name">기획상</p>
              <p className="text-center">1편</p>
              <p className="text-center">3,000,000원</p>
              <p className="text-right"> </p>
            </div>

            <div className="service__table-content fade_bottom_3">
              <p className="tm-name">특별상</p>
              <p className="text-center">1편</p>
              <p className="text-center">2,000,000원</p>
              <p className="text-right"> </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="service__table-wrapper">
          <div className="service__table-head-3 fade_bottom_3">
            <h3>Category</h3>
            <h3 className="text-center">Works</h3>
            <h3 className="text-center">Prize Money</h3>
            <h3>Remarks</h3>
          </div>

          <div className="divide-y">
            <div className="service__table-content-3 fade_bottom_3">
              <p className="tm-name">Grand Prize</p>
              <p className="text-center">1</p>
              <p className="text-center">5,000,000 KRW</p>
              <p className="text-right">
                Chairman of the Korea Communications Commission Award
              </p>
            </div>

            <div className="service__table-content-3 fade_bottom_3">
              <p className="tm-name">Production Award</p>
              <p className="text-center">1</p>
              <p className="text-center">3,000,000 KRW</p>
              <p className="text-right"></p>
            </div>

            <div className="service__table-content-3 fade_bottom_3">
              <p className="tm-name">Planning Award</p>
              <p className="text-center">1</p>
              <p className="text-center">3,000,000 KRW</p>
              <p className="text-right"></p>
            </div>

            <div className="service__table-content-3 fade_bottom_3">
              <p className="tm-name">Special Award</p>
              <p className="text-center">1</p>
              <p className="text-center">2,000,000 KRW</p>
              <p className="text-right"></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTable;
