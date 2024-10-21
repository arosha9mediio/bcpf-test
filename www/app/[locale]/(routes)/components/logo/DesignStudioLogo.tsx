import Image from "next/image";
import Link from "next/link";
import LogoIcon from "/public/assets/imgs/logo/icon.png";
import LogoWhite2 from "/public/assets/imgs/logo/site-logo-white-2.svg";

const DesignStudioLogo = () => {
  return (
    <>
      <div className="header__logo-2">
        <Link href={"/home"}>
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src={window.innerWidth <= 640 ? LogoIcon : LogoWhite2}
            alt="Site Logo"
          />
        </Link>
      </div>
    </>
  );
};

export default DesignStudioLogo;
