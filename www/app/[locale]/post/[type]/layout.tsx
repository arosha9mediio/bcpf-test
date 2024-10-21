import { ReactNode } from "react";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss"; // breaking tailwind
import "../../../../node_modules/react-quill/dist/quill.snow.css"; // global css overriding this

import { CategoryTypes } from "./constants";
import BroadcastHero from "../../(routes)/components/broadcast-view/BroadcastHero";
import { getDictionary } from "@/dictionaries";

type DynamicLayoutProps = {
  children: ReactNode;
  params: { type: CategoryTypes; locale: "en" | "ko" };
};

type DynamicLayoutType = (props: DynamicLayoutProps) => Promise<JSX.Element>;

const DynamicLayout: DynamicLayoutType = async ({
  children,
  params: { type, locale },
}) => {
  const dict = await getDictionary(locale);

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <BroadcastHero
        hasSubtitle
        text={dict?.[`${type}_list_hero_text`]}
        title={dict?.[`${type}_list_hero_title`]}
        countPrefix={dict?.[`${type}_list_hero_countPrefix`]}
        countSuffix={dict?.[`${type}_list_hero_countSuffix`]}
      />

      {children}
    </RootLayoutNew>
  );
};

export default DynamicLayout;
