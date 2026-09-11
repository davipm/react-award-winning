'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { Button } from '@/components/button';
import { VideoPreview } from '@/components/video-preview';
import { useHeroVideo, VIDEO_IDS } from '@/hooks/use-hero-video';

const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export function Hero() {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const {
    isAnimating,
    handleVideoLoad,
    backgroundVideoSrc,
    mainVideoSrc,
    previewVideoSrc,
    handleMiniVdClick,
  } = useHeroVideo({ mainVideoRef, previewVideoRef });

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['center center', 'end center'],
  });

  const easedProgress = useTransform(scrollYProgress, easeInOutQuad);

  const clipPath = useTransform(
    easedProgress,
    [0, 1],
    ['polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)'],
  );

  const borderRadius = useTransform(easedProgress, [0, 1], ['0% 0% 0% 0%', '0% 0% 40% 10%']);

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      <motion.div
        id={VIDEO_IDS.FRAME}
        ref={frameRef}
        style={{ clipPath, borderRadius }}
        className="relative z-10 h-dvh w-screen overflow-hidden bg-violet-75"
      >
        <div>
          <div className="mask-clip-path absolute left-1/2 top-1/2 z-50 size-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
            <VideoPreview>
              <button
                type="button"
                disabled={isAnimating}
                aria-label="Play next video"
                onClick={handleMiniVdClick}
                className="origin-center scale-50 cursor-pointer opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 disabled:cursor-default"
              >
                <video
                  ref={previewVideoRef}
                  id={VIDEO_IDS.PREVIEW}
                  src={previewVideoSrc}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </button>
            </VideoPreview>
          </div>

          <video
            ref={mainVideoRef}
            id={VIDEO_IDS.MAIN}
            src={mainVideoSrc}
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            className="absolute left-1/2 top-1/2 z-20 size-64 invisible object-cover object-center"
            style={{ translate: '-50% -50%' }}
          />

          <video
            src={backgroundVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="font-zentry special-font absolute bottom-5 right-5 z-40 text-5xl font-black uppercase text-blue-50 sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem]">
          G<b>A</b>MING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="font-zentry special-font text-5xl font-black uppercase text-blue-100 sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem]">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              className="flex items-center justify-center gap-1 bg-yellow-300"
            />
          </div>
        </div>
      </motion.div>

      <h1 className="font-zentry special-font absolute bottom-5 right-5 text-5xl font-black uppercase text-black sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem]">
        G<b>A</b>MING
      </h1>
    </section>
  );
}
