import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./button.tsx";
import VideoPreview from "./video-preview.tsx";

import { useHeroVideo, VIDEO_IDS } from "../hooks";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const mainVideoRef = useRef(null);

  const {
    isLoading,
    handleVideoLoad,
    handleMiniVdClick,
    previewVideoSrc,
    mainVideoSrc,
    backgroundVideoSrc,
  } = useHeroVideo({ mainVideoRef });

  useGSAP(() => {
    gsap.set(`#${VIDEO_IDS.FRAME}`, {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from(`#${VIDEO_IDS.FRAME}`, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: `#${VIDEO_IDS.FRAME}`,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id={VIDEO_IDS.FRAME}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-violet-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 hover:cursor-pointer">
            <VideoPreview>
              <div
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                onClick={handleMiniVdClick}
              >
                <video
                  id={VIDEO_IDS.PREVIEW}
                  src={previewVideoSrc}
                  loop
                  muted
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>
          <video
            ref={mainVideoRef}
            id={VIDEO_IDS.MAIN}
            src={mainVideoSrc}
            loop
            muted
            onLoadedData={handleVideoLoad}
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          <video
            src={backgroundVideoSrc}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-50">
          G<b>A</b>MING
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
}
