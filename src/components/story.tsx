import gsap from "gsap";
import { useRef } from "react";

import type { MouseEventProps } from "./features.tsx";
import AnimatedTitle from "./animated-title.tsx";

export default function Story() {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEventProps) => {
    const { clientX, clientY } = event;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <div id="story" className="min-h-dvh wscreen bg-black text-blue-50">
      <div></div>
    </div>
  );
}
