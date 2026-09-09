import { type AnimationPlaybackControls, animate } from 'motion/react';
import { type RefObject, useEffect, useRef, useState } from 'react';

const TOTAL_VIDEOS = 4;

export const VIDEO_IDS = {
  FRAME: 'video-frame',
  PREVIEW: 'preview-video',
  MAIN: 'main-video',
} as const;

const COLLAPSED_SIZE = '16rem';
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

const nextIndex = (index: number) => (index % TOTAL_VIDEOS) + 1;

type UseHeroVideoOptions = {
  mainVideoRef: RefObject<HTMLVideoElement | null>;
  previewVideoRef: RefObject<HTMLVideoElement | null>;
};

export function useHeroVideo({ mainVideoRef, previewVideoRef }: UseHeroVideoOptions) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [mainVideoSrc, setMainVideoSrc] = useState(() => getVideoSrc(nextIndex(1)));
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const controlsRef = useRef<AnimationPlaybackControls[]>([]);

  const upcomingVideoIndex = nextIndex(currentIndex);

  const loading = loadedVideos < 3;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVdClick = () => {
    const mainVideoEl = mainVideoRef.current;
    const previewVideoEl = previewVideoRef.current;

    if (!mainVideoEl || !previewVideoEl || isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex(upcomingVideoIndex);

    mainVideoEl.style.visibility = 'visible';

    const mainControls = animate(
      mainVideoEl,
      { width: [COLLAPSED_SIZE, '100%'], height: [COLLAPSED_SIZE, '100%'] },
      {
        duration: 1,
        ease: EASE_OUT,
        onComplete: () => {
          mainVideoEl.style.visibility = 'hidden';
          mainVideoEl.style.width = COLLAPSED_SIZE;
          mainVideoEl.style.height = COLLAPSED_SIZE;
          setMainVideoSrc(getVideoSrc(nextIndex(upcomingVideoIndex)));
          setIsAnimating(false);
        },
      },
    );

    const previewControls = animate(
      previewVideoEl,
      { scale: [0, 1] },
      { duration: 1.5, ease: EASE_OUT },
    );

    controlsRef.current = [mainControls, previewControls];
  };

  useEffect(() => {
    const controls = controlsRef.current;
    return () => {
      for (const c of controls) {
        c.stop();
      }
    };
  }, []);

  return {
    loading,
    isAnimating,
    handleVideoLoad,
    handleMiniVdClick,
    previewVideoSrc: getVideoSrc(upcomingVideoIndex),
    mainVideoSrc,
    backgroundVideoSrc: getVideoSrc(currentIndex),
  };
}
