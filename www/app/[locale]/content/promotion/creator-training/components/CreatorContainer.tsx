"use client";
import { useState } from "react";
import EduProgram from "./EduProgram";
import SimpleGallery from "./SimpleGallery";

const CreatorContainer = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleStepClick = index => {
    setActiveSlideIndex(index);
  };

  return (
    <>
      <EduProgram onStepClick={handleStepClick} />
      <SimpleGallery activeSlideIndex={activeSlideIndex} />
    </>
  );
};

export default CreatorContainer;
