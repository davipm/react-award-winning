import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type RefObject, useCallback, useEffect, useState } from "react";

const TOTAL_VIDEOS = 4;
export const VIDEO_IDS = {
  FRAME: "video-frame",
  PREVIEW: "preview-video",
  MAIN: "main-video",
};

export const useHeroVideo = ({
  mainVideoRef,
}: {
  mainVideoRef: RefObject<any>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const handleVideoLoad = useCallback(() => {
    setLoadedVideos((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // There are 3 video elements rendered initially.
    // Loading is complete when all three have loaded their data.
    if (loadedVideos === 3) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % TOTAL_VIDEOS) + 1);
  };

  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set(`#${VIDEO_IDS.MAIN}`, { visibility: "visible" });
        gsap.to(`#${VIDEO_IDS.MAIN}`, {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.out",
          onStart: () => mainVideoRef.current?.play(),
        });
        gsap.from(`#${VIDEO_IDS.PREVIEW}`, {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.out",
        });
      }
    },
    { dependencies: [currentIndex, hasClicked], revertOnUpdate: true },
  );

  return {
    isLoading,
    mainVideoRef,
    handleVideoLoad,
    handleMiniVdClick,
    previewVideoSrc: getVideoSrc((currentIndex % TOTAL_VIDEOS) + 1),
    mainVideoSrc: getVideoSrc(currentIndex),
    backgroundVideoSrc: getVideoSrc(
      currentIndex === TOTAL_VIDEOS - 1 ? 1 : currentIndex,
    ),
  };
};
