'use client';

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import type React from 'react';
import { useRef, useState } from 'react';
import { AnimatedTitle } from '@/components/animated-title';

export function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [pinState, setPinState] = useState<'before' | 'pinned' | 'after'>('before');

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latestValue) => {
    if (latestValue <= 0) setPinState('before');
    else if (latestValue >= 1) setPinState('after');
    else setPinState('pinned');
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  const width = useTransform(smooth, [0, 1], ['30vw', '100%']);
  const height = useTransform(smooth, [0, 1], ['60vh', '100%']);
  const borderRadius = useTransform(smooth, [0, 1], [24, 0]);

  const pinnedBoxStyle: React.CSSProperties =
    pinState === 'pinned'
      ? { position: 'fixed', top: 0, left: 0 }
      : pinState === 'after'
        ? { position: 'absolute', bottom: 0, left: 0 }
        : { position: 'absolute', top: 0, left: 0 };

  return (
    <section className="min-h-screen w-screen" id="about">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">Welcome to Zentry</p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          className="mt-5 text-black! text-center"
        />

        <div className="absolute bottom-[-80dvh] left-1/2 w-full max-w-96 -translate-x-1/2 text-center font-circularweb-book text-lg md:max-w-136">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both digital and
            physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div ref={wrapperRef} className="relative" style={{ height: `calc(100dvh + 800px)` }}>
        <div className="h-dvh w-screen overflow-hidden" style={pinnedBoxStyle}>
          <motion.div
            className="mask-clip-path absolute left-1/2 top-0 z-20 origin-center -translate-x-1/2 overflow-hidden"
            style={{ width, height, borderRadius }}
          >
            <Image
              src="/img/about.webp"
              alt="About"
              width={1920}
              height={1080}
              loading="eager"
              priority
              className="absolute left-0 top-0 size-full object-cover object-center"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
