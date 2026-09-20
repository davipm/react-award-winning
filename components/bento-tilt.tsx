'use client';

import {
  animate,
  type HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import type React from 'react';
import { TiLocationArrow } from 'react-icons/ti';

const TILT_FACTOR = 5;
const EASE = { stiffness: 150, damping: 20 };

export function BentoTilt(props: HTMLMotionProps<'div'>) {
  const rotateX = useSpring(0, EASE);
  const rotateY = useSpring(0, EASE);
  const scale = useSpring(1, EASE);

  const transform = useTransform(
    [rotateX, rotateY, scale],
    ([rx, ry, s]) =>
      `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, ${s})`,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * TILT_FACTOR;
    const tiltY = (relativeX - 0.5) * -TILT_FACTOR;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
    scale.set(0.95);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      className={props.className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d', transform }}
      {...props}
    />
  );
}

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
  isComingSoon?: boolean;
}

export function BentoCard({ src, isComingSoon, description, title }: BentoCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(100px circle at ${latestX}px ${latestY}px, #656fe288, #00000026)`,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    animate(opacity, 1, { duration: 0.3, ease: 'linear' });
  };

  const handleMouseLeave = () => {
    animate(opacity, 0, { duration: 0.3, ease: 'linear' });
  };

  return (
    <div className="relative size-full">
      <video
        src={src}
        poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="font-zentry uppercase md:text-6xl text-4xl font-black">{title}</h1>
          {description && <p className="mt-3 max-w-64 text-sm md:text-base">{description}</p>}
        </div>

        {isComingSoon && (
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <motion.div
              className="pointer-events-none absolute -inset-px"
              style={{ background, opacity }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
