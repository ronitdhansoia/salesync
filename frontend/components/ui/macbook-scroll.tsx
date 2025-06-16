"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Debounce function for resize events
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
  children,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Check if element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Only track scroll when in view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Handle resize with debounce
  const handleResize = useCallback(
    debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 150),
    []
  );

  useEffect(() => {
    // Initial check
    setIsMobile(window.innerWidth < 768);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Optimize transforms - only calculate when needed
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5],
    { clamp: true }
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5],
    { clamp: true }
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500], { clamp: true });
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0], { clamp: true });
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0], { clamp: true });

  return (
    <div
      ref={ref}
      className="min-h-[200vh] flex flex-col items-center py-10 md:py-20 justify-start flex-shrink-0 [perspective:800px] transform scale-[0.5] sm:scale-[0.65] md:scale-[0.8] lg:scale-95 xl:scale-100"
    >
      <motion.h2
        style={{
          translateY: isInView ? textTransform : 0,
          opacity: isInView ? textOpacity : 1,
        }}
        className="dark:text-white text-neutral-800 text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-20 text-center will-change-transform"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={isInView ? scaleX : 1.2}
        scaleY={isInView ? scaleY : 0.6}
        rotate={isInView ? rotate : -28}
        translate={isInView ? translate : 0}
        children={children}
      />
      {/* Base */}
      <div className="h-[32rem] w-[47.5rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        {/* above keyboard bar */}
        <div className="h-16 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-6 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-3 w-32 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = React.memo(({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
  children,
}: {
  scaleX: any;
  scaleY: any;
  rotate: any;
  translate: any;
  src?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[16rem] w-[47.5rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="h-[30rem] w-[47.5rem] absolute inset-0 bg-[#010101] rounded-2xl p-2 will-change-transform"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg overflow-hidden"
        >
          {children ? (
            <div className="h-full w-full">{children}</div>
          ) : src ? (
            <img
              src={src}
              alt="lid"
              className="object-cover object-left-top h-full w-full"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gray-900 flex items-center justify-center">
              <span className="text-white/50">No content</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
});

Lid.displayName = "Lid";

export const Trackpad = React.memo(() => {
  return (
    <div
      className="w-[40%] mx-auto h-24 rounded-xl my-1"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
});

Trackpad.displayName = "Trackpad";

export const Keypad = React.memo(() => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {/* First Row */}
      <Row>
        <KBtn className="w-8">esc</KBtn>
        <KBtn variant="brightness">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
        </KBtn>
        <KBtn variant="brightness">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </KBtn>
        <KBtn variant="brightness">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </KBtn>
        <KBtn variant="brightness">F4</KBtn>
        <KBtn variant="brightness">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM12.95 13.536a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM5.757 14.243a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414z" />
          </svg>
        </KBtn>
        <KBtn variant="brightness">F6</KBtn>
        <KBtn variant="brightness">F7</KBtn>
        <KBtn variant="brightness">F8</KBtn>
        <KBtn variant="brightness">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        </KBtn>
        <KBtn variant="brightness">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15.75 2.5a.75.75 0 00-1.5 0v1.69l-4.22-2.3A.75.75 0 009 2.54v6.75L5.03 7A.75.75 0 004 7.65v4.7c0 .26.14.5.36.64l10.5 6.5a.75.75 0 00.78-.02.75.75 0 00.36-.64V2.5z" />
          </svg>
        </KBtn>
        <KBtn variant="brightness">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.25 17.5a.75.75 0 001.5 0v-1.69l4.22 2.3a.75.75 0 001.03-.65v-6.75L15.97 13a.75.75 0 001.03-.65v-4.7a.75.75 0 00-.36-.64l-10.5-6.5a.75.75 0 00-.78.02.75.75 0 00-.36.64v16.33z" />
          </svg>
        </KBtn>
      </Row>

      {/* Second Row */}
      <Row>
        <KBtn variant="secondary">~</KBtn>
        <KBtn>1</KBtn>
        <KBtn>2</KBtn>
        <KBtn>3</KBtn>
        <KBtn>4</KBtn>
        <KBtn>5</KBtn>
        <KBtn>6</KBtn>
        <KBtn>7</KBtn>
        <KBtn>8</KBtn>
        <KBtn>9</KBtn>
        <KBtn>0</KBtn>
        <KBtn variant="secondary">-</KBtn>
        <KBtn variant="secondary">=</KBtn>
        <KBtn className="w-16" variant="secondary">
          delete
        </KBtn>
      </Row>

      {/* Third Row */}
      <Row>
        <KBtn className="w-12" variant="secondary">
          tab
        </KBtn>
        <KBtn>Q</KBtn>
        <KBtn>W</KBtn>
        <KBtn>E</KBtn>
        <KBtn>R</KBtn>
        <KBtn>T</KBtn>
        <KBtn>Y</KBtn>
        <KBtn>U</KBtn>
        <KBtn>I</KBtn>
        <KBtn>O</KBtn>
        <KBtn>P</KBtn>
        <KBtn variant="secondary">[</KBtn>
        <KBtn variant="secondary">]</KBtn>
        <KBtn variant="secondary">\</KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn className="w-14" variant="secondary">
          caps
        </KBtn>
        <KBtn>A</KBtn>
        <KBtn>S</KBtn>
        <KBtn>D</KBtn>
        <KBtn>F</KBtn>
        <KBtn>G</KBtn>
        <KBtn>H</KBtn>
        <KBtn>J</KBtn>
        <KBtn>K</KBtn>
        <KBtn>L</KBtn>
        <KBtn variant="secondary">;</KBtn>
        <KBtn variant="secondary">'</KBtn>
        <KBtn className="w-[4.5rem]" variant="secondary">
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn className="w-20" variant="secondary">
          shift
        </KBtn>
        <KBtn>Z</KBtn>
        <KBtn>X</KBtn>
        <KBtn>C</KBtn>
        <KBtn>V</KBtn>
        <KBtn>B</KBtn>
        <KBtn>N</KBtn>
        <KBtn>M</KBtn>
        <KBtn variant="secondary">,</KBtn>
        <KBtn variant="secondary">.</KBtn>
        <KBtn variant="secondary">/</KBtn>
        <KBtn className="w-20" variant="secondary">
          shift
        </KBtn>
      </Row>

      {/* Sixth Row */}
      <Row>
        <KBtn variant="secondary">fn</KBtn>
        <KBtn variant="secondary">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
          </svg>
        </KBtn>
        <KBtn variant="secondary">⌥</KBtn>
        <KBtn className="w-8" variant="secondary">
          ⌘
        </KBtn>
        <KBtn className="w-[13rem]"> </KBtn>
        <KBtn className="w-8" variant="secondary">
          ⌘
        </KBtn>
        <KBtn variant="secondary">⌥</KBtn>
        <div className="flex gap-[2px] px-[2px]">
          <KBtn variant="secondary">◀</KBtn>
          <div className="flex flex-col gap-[2px]">
            <KBtn className="h-5" variant="secondary">
              ▲
            </KBtn>
            <KBtn className="h-5" variant="secondary">
              ▼
            </KBtn>
          </div>
          <KBtn variant="secondary">▶</KBtn>
        </div>
      </Row>
    </div>
  );
});

Keypad.displayName = "Keypad";

const KBtn = React.memo(({
  children,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "brightness";
}) => {
  return (
    <div
      className={cn(
        "p-[0.5px] rounded-[4px]",
        variant === "primary" && "bg-[#0A090D]",
        variant === "secondary" && "bg-[#0A090D]",
        variant === "brightness" && "bg-[#0A090D]"
      )}
    >
      <div
        className={cn(
          "h-8 w-8 bg-[#0F0E13] rounded-[4px] flex items-center justify-center text-[8px] text-neutral-200",
          className,
          variant === "primary" && "bg-[#0F0E13]",
          variant === "secondary" && "bg-[#0F0E13]/70",
          variant === "brightness" && "bg-[#0F0E13]/50"
        )}
      >
        {children}
      </div>
    </div>
  );
});

KBtn.displayName = "KBtn";

const Row = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-[2px] mb-[2px] w-full justify-center">
      {children}
    </div>
  );
});

Row.displayName = "Row";

const SpeakerGrid = React.memo(() => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-3"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
});

SpeakerGrid.displayName = "SpeakerGrid";

const AceternityLogo = React.memo(() => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
});

AceternityLogo.displayName = "AceternityLogo";