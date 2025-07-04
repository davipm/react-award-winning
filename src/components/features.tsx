import React, { useState, useRef, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";

// import video5 from "../assets/videos/feature-5.mp4";

/**
 * Defines the props for the BentoTilt component.
 */
type BentoTiltProps = {
  children: React.ReactNode;
  className?: string;
};

// Constants for the tilt effect to improve readability and maintainability.
const TILT_FACTOR = 5;
const PERSPECTIVE = "700px";
const SCALE = "0.95";
const INITIAL_TRANSFORM = "";

/**
 * A React functional component that provides a tilt effect on hover for a child element.
 * The tilt effect is achieved by dynamically updating the transform style based on
 * the user's mouse position relative to the component.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the component.
 * @param {string} [props.className=""] - Optional class name for custom styling.
 */
export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState(INITIAL_TRANSFORM);
  const itemRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the mouse move event on a target element and calculates the tilt and transformation effect
   * based on the mouse position relative to the element. Updates the transform style dynamically.
   *
   * This function is used in conjunction with `useCallback` to memoize the event handler,
   * ensuring it does not re-render unnecessarily.
   *
   * The calculated transformation effect includes:
   * - Perspective projection.
   * - Rotation along the X and Y axes based on mouse movement.
   * - Scaling for a dynamic visual effect.
   *
   * @param {React.MouseEvent<HTMLDivElement>} event - The mouse event object containing information about the mouse's position.
   * @returns {void} Does not return any value. Updates the transformation style of the referenced element.
   */
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!itemRef.current) {
        return;
      }

      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the element, from 0 to 1.
      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;

      // Map the relative position to tilt angles. The center (0.5, 0.5) results in tilt 0.
      const tiltX = (relativeY - 0.5) * TILT_FACTOR;
      const tiltY = (relativeX - 0.5) * -TILT_FACTOR;

      const newTransform = `perspective(${PERSPECTIVE}) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${SCALE}, ${SCALE}, ${SCALE})`;
      setTransformStyle(newTransform);
    },
    [], // No dependencies needed as all values used are stable.
  );

  const handleMouseLeave = useCallback(() => {
    setTransformStyle(INITIAL_TRANSFORM);
  }, []); // No dependencies needed as setTransformStyle is stable.

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        // Hint to the browser that the transform property will change,
        // allowing for potential performance optimizations during the animation.
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
  isComingSoon?: boolean;
}

export const BentoCard = ({
  src,
  title,
  description,
  isComingSoon,
}: BentoCardProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title font-zentry">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                opacity: hoverOpacity,
              }}
            />

            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into the Metagame Layer
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              radia<b>n</b>t
            </>
          }
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 col-span-2 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 col-span-2 md:col-span-1">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 col-span-2 md:col-span-1">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 col-span-2 md:col-span-1">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title font-zentry max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 col-span-2 md:col-span-1">
          <video
            src="/videos/feature-5.mp4"
            // src={String(video5)}
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
