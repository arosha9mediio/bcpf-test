"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect } from "react";
import { ScrollTrigger } from "../plugins";
import { historyData } from "./HistoryData";

gsap.registerPlugin(ScrollTrigger);

const HistoryDetails = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      gsap.config({ nullTargetWarn: false });
      let tHero = gsap.context(() => {
        if (device_width > 1200) {
          gsap.to(".service__list-6", {
            scrollTrigger: {
              trigger: ".service__area-6",
              pin: ".service__list-6",
              pinSpacing: true,
              start: "top top",
              end: "bottom bottom",
            },
          });

          gsap.to(".service__image-wrap", {
            scrollTrigger: {
              trigger: ".service__area-6",
              pin: ".mid-content",
              pinSpacing: true,
              start: "top top",
              end: "bottom bottom",
              markers: false,
            },
          });

          const service_images =
            gsap.utils.toArray<HTMLElement>(".service__image");
          const service_imagess = gsap.utils.toArray<HTMLElement>(
            ".service__image img",
          );
          const service_items =
            gsap.utils.toArray<HTMLElement>(".history__item-6");
          const navItems = gsap.utils.toArray<HTMLAnchorElement>(
            ".service__list-6 li a",
          );

          if (service_items) {
            service_items.forEach((image, i) => {
              let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: image,
                  scrub: 1,
                  start: "top center",
                  end: "bottom center",
                  markers: false,
                  onEnter: () => {
                    navItems.forEach(navItem =>
                      navItem.classList.remove("active"),
                    );
                    if (navItems[i]) navItems[i].classList.add("active");
                    service_images.forEach(img => (img.style.display = "none"));
                    service_images[i].style.display = "block";
                  },
                  onEnterBack: () => {
                    navItems.forEach(navItem =>
                      navItem.classList.remove("active"),
                    );
                    if (navItems[i]) navItems[i].classList.add("active");
                    service_images.forEach(img => (img.style.display = "none"));
                    service_images[i].style.display = "block";
                  },
                  onLeave: () => {
                    if (navItems[i]) navItems[i].classList.remove("active");
                  },
                  onLeaveBack: () => {
                    if (navItems[i]) navItems[i].classList.remove("active");
                  },
                },
              });
              tl.to(service_images[i], {
                zIndex: "1",
              });
              tl.to(
                service_imagess[i],
                {
                  opacity: 1,
                  duration: 1,
                  scale: 1.2,
                  ease: "power4.out",
                },
                "-=1",
              );
            });
          }

          if (navItems) {
            navItems.forEach(nav => {
              nav.addEventListener("click", e => {
                e.preventDefault();
                const ids = nav.getAttribute("href");
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: ids,
                  ease: "power4.out",
                  onComplete: () => {
                    navItems.forEach(navItem =>
                      navItem.classList.remove("active"),
                    );
                    nav.classList.add("active");
                    const targetIndex = navItems.findIndex(n => n === nav);
                    service_images.forEach(img => (img.style.display = "none"));
                    service_images[targetIndex].style.display = "block";
                  },
                });
              });
            });
          }
        }
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <section className="service__area-6">
      <div className="container">
        <div className="row inherit-row">
          <div className="col-xxl-12">
            <div className="content-wrapper">
              <div className="left-content">
                <ul className="service__list-6">
                  {historyData.map(item => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.year}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mid-content">
                {historyData.map((item, index) => (
                  <div
                    className="service__image"
                    key={item.id}
                    // style={{ display: index === 0 ? "block" : "none" }}
                  >
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={item.image}
                      alt={`Service Image ${item.year}`}
                    />
                  </div>
                ))}
              </div>
              <div className="right-content">
                <div className="history__items">
                  {historyData.map(item => (
                    <div
                      className="history__item-6 has__service_animation"
                      id={item.id}
                      key={item.id}
                      data-secid={item.id}>
                      <div className="image-tab">
                        <Image
                          priority
                          style={{ width: "auto", height: "auto" }}
                          src={item.image}
                          alt={`Service Image ${item.year}`}
                        />
                      </div>
                      <div className="animation__service_page">
                        <h2 className="history__title">{item.year}년</h2>
                        {item.details.map((detail, idx) => {
                          if (Array.isArray(detail)) {
                            return (
                              <ul key={idx}>
                                {detail.map((subDetail, subIdx) => (
                                  <li key={subIdx}>{subDetail}</li>
                                ))}
                              </ul>
                            );
                          } else {
                            return <p key={idx}>{detail}</p>;
                          }
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryDetails;
