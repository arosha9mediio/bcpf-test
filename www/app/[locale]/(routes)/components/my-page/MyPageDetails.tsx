"use client";
import { LoadingSpinner } from "@/components/table/components/TableActionLoader";
import { useAuth } from "@/hooks/use-auth";
import * as Tabs from "@radix-ui/react-tabs";
import { gsap } from "gsap";
import { ReactNode, useEffect, useRef } from "react";
import { SplitText } from "../plugins";
import DeleteAccount from "./DeleteAccount";
import ProfileInfo from "./ProfileInfo";

type MyPageDetailsProps = {
  children?: ReactNode;
  className?: string;
};

type MyPageDetailsType = (props: MyPageDetailsProps) => JSX.Element;

const MyPageDetails: MyPageDetailsType = ({
  children,
  className = "my-page__area",
}) => {
  const titleLeft = useRef();
  const titleRight = useRef();
  const heroTextAnim = useRef();
  const { user, refresh } = useAuth();
  const heroArea = useRef();
  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    if (typeof window !== "undefined") {
      let split_creatives = new SplitText(titleLeft.current, { type: "chars" });
      let split_solutions = new SplitText(titleRight.current, {
        type: "chars",
      });
      let split_text_animation = new SplitText(heroTextAnim.current, {
        type: "chars words",
      });
      let tHero = gsap.context(() => {
        let HomeDigital = gsap.timeline();

        HomeDigital.from(split_creatives.chars, {
          duration: 2,
          x: 100,
          autoAlpha: 0,
          stagger: 0.2,
        });
        HomeDigital.from(
          split_solutions.chars,
          { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 },
          "-=1",
        );
        HomeDigital.from(
          split_text_animation.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1",
        );
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <>
      <section className={className} ref={heroArea}>
        <div className={children && "container"}>
          <Tabs.Root defaultValue="tab1">
            <Tabs.List
              aria-label="Manage your account"
              className="my-page__tab-wrapper">
              <Tabs.Trigger value="tab1" className="my-page__tab">
                내 정보
              </Tabs.Trigger>
              {children && (
                <Tabs.Trigger value="tab2" className="my-page__tab">
                  공모지원 내역
                </Tabs.Trigger>
              )}
              <Tabs.Trigger value="tab3" className="my-page__tab">
                계정 삭제
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1">
              {user ? (
                <ProfileInfo
                  user={user}
                  refresh={refresh}
                  isAdmin={!!children}
                />
              ) : (
                <LoadingSpinner />
              )}
            </Tabs.Content>
            <Tabs.Content value="tab2">{children}</Tabs.Content>
            <Tabs.Content value="tab3">
              <DeleteAccount />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
};

export default MyPageDetails;
