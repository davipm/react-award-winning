'use client';

import { cn } from 'cnfast';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import { Button } from '@/components/button';

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];
const SCROLL_BUFFER = 10;

export function Navbar() {
  const { y: currentScrollY = 0 } = useWindowScroll();

  const [mounted, setMounted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const lastScrollYRef = useRef(0);
  const isNavVisibleRef = useRef(true);

  const toggleAudio = () => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;

    if (isAudioPlaying) {
      audioElement.pause();
      setIsAudioPlaying(false);
    } else {
      audioElement
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => setIsAudioPlaying(false));
    }
  };

  if (currentScrollY <= SCROLL_BUFFER) {
    isNavVisibleRef.current = true;
  } else isNavVisibleRef.current = currentScrollY <= lastScrollYRef.current;

  lastScrollYRef.current = currentScrollY;
  const isNavVisible = isNavVisibleRef.current;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className={cn(
        'fixed inset-0 top-4 z-50 h-16 border-none sm:inset-x-6 transition-all duration-300',
        {
          'bg-black rounded-lg border': mounted && currentScrollY > 0,
        },
      )}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image src="/img/logo.png" alt="Logo" width={40} height={40} loading="eager" />
            <Button
              type="button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              className="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              onClick={toggleAudio}
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  className="relative ms-10 text-xs uppercase text-blue-50 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="ml-10 flex items-center space-x-0.5 cursor-pointer p-3"
              aria-label={isAudioPlaying ? 'Pause' : 'Play'}
              onClick={toggleAudio}
            >
              <audio ref={audioElementRef} loop hidden>
                <source src="/audio/loop.mp3" type="audio/mpeg" />
                <track kind="captions" />
              </audio>
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                  className={cn(
                    'h-1 w-px rounded-full bg-white transition-all duration-200 ease-in-out indicator-line',
                    {
                      'animate-wiggle delay-200': isAudioPlaying,
                    },
                  )}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </motion.div>
  );
}
