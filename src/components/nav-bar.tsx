import gsap from "gsap";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import Button from "./button.tsx";
import { TiLocationArrow } from "react-icons/ti";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

/**
 * A responsive, fixed navigation bar that hides on scroll-down and reappears on scroll-up.
 * Features a background audio toggle with a visual indicator.
 */
export default function NavBar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY = 0 } = useWindowScroll();

  /**
   * Toggles the background audio playback state.
   */
  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  // Effect to play or pause the audio element based on state.
  useEffect(() => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;

    if (isAudioPlaying) {
      // play() returns a promise which can be rejected if the user hasn't interacted with the page yet.
      audioElement.play().catch((error) => {
        console.error("Audio playback failed:", error);
        // Optionally reset state if playback fails
        setIsAudioPlaying(false);
      });
    } else {
      audioElement.pause();
    }
  }, [isAudioPlaying]);

  // Effect to control navbar visibility based on scroll direction.
  useEffect(() => {
    // A small buffer to prevent hiding the nav immediately on scroll from the top.
    const SCROLL_BUFFER = 10;

    if (currentScrollY <= SCROLL_BUFFER) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Effect to animate the navbar's appearance and disappearance.
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  const navContainerClasses = clsx(
    "fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6",
    {
      // This class can be used for styling the navbar when it's not at the top.
      "floating-nav": currentScrollY > 0,
    },
  );

  return (
    <div ref={navContainerRef} className={navContainerClasses}>
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="Logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5 hover:cursor-pointer p-3"
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
            >
              <audio src="/audio/loop.mp3" ref={audioElementRef} loop hidden />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", { active: isAudioPlaying })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
