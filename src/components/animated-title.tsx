import gsap from "gsap";
import clsx from "clsx";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  containerClass?: string;
}

export default function AnimatedTitle({
  title,
  containerClass,
  ...props
}: Props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      {...props}
      ref={containerRef}
      className={clsx("animated-title", containerClass)}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, index) => (
            <span
              key={index}
              className="animated-word special-font font-zentry"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
