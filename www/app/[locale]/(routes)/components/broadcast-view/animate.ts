import { MutableRefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "../plugins";
import "./styles.css";

const animateTitle = (ref: MutableRefObject<HTMLParagraphElement>) => {
  const splitTitle = new SplitText(ref.current, {
    type: "chars",
  });

  gsap.from(splitTitle.chars, {
    duration: 1,
    x: 70,
    autoAlpha: 0,
    stagger: 0.1,
  });
};

const animateSubtitle = (ref: MutableRefObject<HTMLParagraphElement>) => {
  const splitSubtitle = new SplitText(ref.current, {
    type: "chars words",
  });

  gsap.from(splitSubtitle.words, {
    duration: 1,
    x: 50,
    autoAlpha: 0,
    stagger: 0.05,
  });
};

export { animateTitle, animateSubtitle };

// useEffect(() => {
//   if (typeof window !== "undefined") {
//     let tHero = gsap.context(() => {
//       gsap.set(".experience", {
//         y: 50,
//         opacity: 0,
//       });
//       let split_hero__title = new SplitText(heroTitle.current, {
//         type: "chars",
//       });
//       let split_hero__subtitle = new SplitText(heroSubTitle.current, {
//         type: "chars words",
//       });

//       gsap.from(split_hero__title.chars, {
//         duration: 1,
//         x: 70,
//         autoAlpha: 0,
//         stagger: 0.1,
//       });
//       gsap.from(
//         split_hero__subtitle.words,
//         //@ts-ignore
//         { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
//         "-=1",
//       );

//       gsap.to(
//         ".experience",
//         {
//           y: 0,
//           opacity: 1,
//           duration: 2,
//           ease: "power2.out",
//         } as any,
//         //@ts-ignore
//         "-=1.5",
//       );
//     });
//     return () => tHero.revert();
//   }
// }, []);
