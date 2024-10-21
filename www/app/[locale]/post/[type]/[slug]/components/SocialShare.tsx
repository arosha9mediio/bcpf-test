import { Fa500Px, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { TbSquareLetterNFilled } from "react-icons/tb";

const SocialShareButtons = ({ url }) => {
  const SOCIAL_SHARERS = {
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    li: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`,
    nb: `http://blog.naver.com/openapi/share?url=${encodeURIComponent(url)}`,
  } as const;

  return (
    <div className="flex flex-row space-x-4 justify-end items-center mt-12">
      <Link href={SOCIAL_SHARERS.x} target="_blank">
        <FaTwitter className="h-7 w-7" />
      </Link>

      <Link href={SOCIAL_SHARERS.fb} target="_blank">
        <FaFacebook className="h-7 w-7" />
      </Link>

      <Link href={SOCIAL_SHARERS.li} target="_blank">
        <FaLinkedin className="h-7 w-7" />
      </Link>

      <Link href={SOCIAL_SHARERS.nb} target="_blank">
        <TbSquareLetterNFilled className="h-8 w-8" />
      </Link>
    </div>
  );
};

export { SocialShareButtons };
