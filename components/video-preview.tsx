'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { type MouseEvent, useEffect, useState } from 'react';

const SPRING_CONFIG = { stiffness: 100, damping: 20 };

export function VideoPreview({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const contentX = useMotionValue(0);
  const contentY = useMotionValue(0);

  const smoothX = useSpring(x, SPRING_CONFIG);
  const smoothY = useSpring(y, SPRING_CONFIG);
  const smoothRotateX = useSpring(rotateX, SPRING_CONFIG);
  const smoothRotateY = useSpring(rotateY, SPRING_CONFIG);

  const smoothContentX = useSpring(contentX, SPRING_CONFIG);
  const smoothContentY = useSpring(contentY, SPRING_CONFIG);

  const handleMouseMove = ({ clientY, clientX, currentTarget }: MouseEvent) => {
    const rect = currentTarget.getBoundingClientRect();
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovered) {
      x.set(xOffset);
      y.set(yOffset);
      rotateX.set(xOffset / 2);
      rotateY.set(yOffset / 2);

      contentX.set(-xOffset);
      contentY.set(-yOffset);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      smoothX.set(0);
      smoothY.set(0);
      smoothRotateX.set(0);
      smoothRotateY.set(0);
    }
  }, [isHovered, smoothRotateX, smoothRotateY, smoothX, smoothY]);

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        x: smoothX,
        y: smoothY,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        perspective: '500px',
      }}
    >
      <motion.div
        className="origin-center rounded-lg"
        style={{ transformStyle: 'preserve-3d', x: smoothContentX, y: smoothContentY }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
