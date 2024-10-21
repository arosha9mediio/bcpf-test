import { gsap } from "gsap";
import { ScrollTrigger } from "../plugins";
import { isMobile } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const AboutVideo = () => {
  return (
    <>
      <section className="award__area-8">
        <div className="award__video-8">
          <div className="portfolio__big">
            {/* <div
          className="portfolio__big-inner"
          style={{ backgroundImage: "url(assets/imgs/portfolio/detail/1.jpg)" }}
        >
          {" "}
        </div> */}
            <iframe
              width="100%"
              height={isMobile() ? "210" : "900"}
              src="https://www.youtube.com/embed/FAkNkYggXsI?si=NMtXEBaWzOgp6pG6&autoplay=1&loop=1&muted=0"></iframe>

            {/* <video loop muted autoPlay playsInline>
              <source src="/assets/video/highlight.mp4" type="video/mp4" />
            </video> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutVideo;
