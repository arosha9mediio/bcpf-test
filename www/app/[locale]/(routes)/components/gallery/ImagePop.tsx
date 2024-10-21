"use client";
import Image, { StaticImageData } from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { isMobile } from "@/lib/utils";

type ImagePopItem = {
  dirImage: StaticImageData;
  alt: string;
};

type ImagePopProps = {
  items: ImagePopItem[];

  onOpen: () => void;
  onClose: () => void;
};

type ImagePopType = (props: ImagePopProps) => JSX.Element;

const ImagePop: ImagePopType = ({ items, onOpen, onClose }) => {
  const handleVisibleChange = (
    visible: boolean,
    index: number,
    state: unknown,
  ) => {
    if (visible) {
      onOpen();
      return;
    }

    if (!visible) {
      onClose();
      return;
    }
  };
  return (
    <PhotoProvider onVisibleChange={handleVisibleChange} maskOpacity={0.8}>
      {items.map((director, index) => {
        return (
          <PhotoView src={director.dirImage.src} key={index}>
            <Image
              key={index}
              width={isMobile() ? 40 : 120}
              style={{ height: "auto" }}
              src={director.dirImage}
              alt={director.alt}
              className="rounded-md"
            />
          </PhotoView>
        );
      })}
    </PhotoProvider>
  );
};

export { ImagePop };
