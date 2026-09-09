'use client';

import { motion, useSpring } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { useRef } from 'react';
import { AnimatedTitle } from '@/components/animated-title';
import { Button } from '@/components/button';

const EASE = { stiffness: 300, damping: 25 };

export function Story() {
  const frameRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, EASE);
  const rotateY = useSpring(0, EASE);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const element = frameRef.current;
    if (!element) return;

    const { clientY, clientX } = event;
    const rect = element.getBoundingClientRect();

    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const xOffset = (xPos - centerX) / centerX;
    const yOffset = (yPos - centerY) / centerY;

    const ROTATION_INTENSITY = 10;

    rotateX.set(-yOffset * ROTATION_INTENSITY);
    rotateY.set(xOffset * ROTATION_INTENSITY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-xs">the multiversal ip world</p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            className="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="relative md:h-dvh h-[90vh] w-full" style={{ filter: 'url(#flt_tag)' }}>
            <div
              className="absolute left-0 top-0 size-full overflow-hidden md:left-[20%] md:top-[-10%] md:size-4/5"
              style={{ clipPath: 'polygon(4% 0, 83% 21%, 100% 73%, 0% 100%)' }}
            >
              <div className="absolute perspective-normal w-full md:h-dvh h-[50dvh] opacity-100 left-10 top-16 md:left-0 md:top-10 lg:-left-75 lg:-top-25 translate-y-0 translate-x-0 translate-z-0 rotate-y-0 rotate-x-0 rotate-z-0 scale-[1]">
                <motion.div
                  className="w-full h-full relative"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  style={{ rotateX, rotateY }}
                  ref={frameRef}
                >
                  <Image
                    src="/img/entrance.webp"
                    alt="entrance.webp"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </div>
            </div>

            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Icon"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circularweb-book text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and
              shape your fate amidst infinite opportunities.
            </p>

            <Button id="realm-btn" title="discover prologue" className="mt-px" />
          </div>
        </div>
      </div>
    </section>
  );
}
