'use client';

import { cn } from 'cnfast';
import { motion } from 'motion/react';
import type React from 'react';
import { useId } from 'react';

interface Props extends React.ComponentProps<'div'> {
  title: string;
}

const EASE = [0.65, 0, 0.35, 1] as const;

const lineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    x: '100%',
    y: '100%',
    rotateY: 90,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export function AnimatedTitle({ title, className, ...props }: Props) {
  const id = useId();

  return (
    <div
      {...props}
      className={cn(
        'flex flex-col gap-1 text-7xl uppercase leading-[.8] text-white sm:px-32 md:text-[6rem]',
        className,
      )}
    >
      {title.split('<br />').map((line) => (
        <motion.div
          key={`${id}-${line}`}
          className="flex justify-center items-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={lineVariants}
        >
          {line.split(' ').map((word, index) => (
            <motion.span
              key={`${id}-${word}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: Need it for unique keys
                index
              }`}
              className="font-zentry inline-block font-black opacity-0 will-change-[opacity,transform] translate-x-3 -translate-z-15 -rotate-x-40 rotate-y-60 origin-[50%_50%_-150px]!"
              variants={wordVariants}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for rendering HTML entities in text
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
