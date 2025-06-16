"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Linkedin, 
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
  Activity,
  User,
  BarChart3
} from "lucide-react";

export const MacbookScrollV2 = ({
  showGradient,
  title,
  badge,
}: {
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[200vh] flex flex-col items-center py-10 md:py-20 justify-start flex-shrink-0 [perspective:800px] transform scale-[0.5] sm:scale-[0.65] md:scale-[0.8] lg:scale-95 xl:scale-100"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="dark:text-white text-neutral-800 text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-20 text-center"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      
      {/* Macbook Container */}
      <div className="relative">
        {/* Screen/Lid */}
        <div
          style={{
            transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Back of lid */}
          <div className="h-[16rem] w-[47.5rem] bg-[#010101] rounded-2xl p-2 relative">
            <div
              style={{
                boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
              }}
              className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
            >
              <span className="text-white">
                <AppleLogo />
              </span>
            </div>
          </div>
          
          {/* Screen */}
          <motion.div
            style={{
              scaleX: scaleX,
              scaleY: scaleY,
              rotateX: rotate,
              translateY: translate,
              transformStyle: "preserve-3d",
              transformOrigin: "top",
            }}
            className="h-[30rem] w-[47.5rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
          >
            {/* Screen bezel */}
            <div className="absolute inset-0 bg-[#010101] rounded-2xl p-[0.125rem]">
              {/* Screen content */}
              <div className="relative h-full w-full bg-white rounded-xl overflow-hidden">
                <ScreenContent />
                {/* Screen glare effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Keyboard Base */}
        <div className="h-[32rem] w-[47.5rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
          {/* Above keyboard bar */}
          <div className="h-16 w-full relative">
            <div className="absolute inset-x-0 mx-auto w-[80%] h-6 bg-[#050505]" />
          </div>
          <div className="flex relative">
            <div className="mx-auto w-[10%] overflow-hidden h-full">
              <SpeakerGrid />
            </div>
            <div className="mx-auto w-[80%] h-full">
              <SimpleKeyboard />
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
    </div>
  );
};

// Dashboard that fits perfectly in the screen
const ScreenContent = () => {
  return (
    <>
      {/* Safari Browser Chrome */}
      <div className="h-11 bg-gradient-to-b from-[#e8e8e8] to-[#d6d6d6] flex items-center px-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/80 rounded px-20 py-0.5 text-xs text-gray-700">
            app.salesync.in
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SaleSync</span>
          </div>
          <nav className="flex items-center gap-6">
            <a className="text-sm font-medium text-[#7760F9]">Dashboard</a>
            <a className="text-sm text-gray-600">Campaigns</a>
            <a className="text-sm text-gray-600">Leads</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Activity className="h-5 w-5 text-gray-600" />
          <div className="w-9 h-9 bg-gradient-to-br from-[#7760F9] to-[#6651E8] rounded-full"></div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 bg-[#f8f9fa] p-8 overflow-hidden">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Rajesh!</h1>
          <p className="text-gray-600">Your campaigns are performing 23% better this week</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#0077B5]/10 rounded-lg flex items-center justify-center">
                <Linkedin className="h-5 w-5 text-[#0077B5]" />
              </div>
              <span className="text-sm text-green-600">+23%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">3,847</p>
            <p className="text-sm text-gray-600">Connections</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-green-600">+9%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">41.2%</p>
            <p className="text-sm text-gray-600">Accept Rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#25D366]" />
              </div>
              <span className="text-sm text-green-600">+45%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">2,156</p>
            <p className="text-sm text-gray-600">Messages</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#FD6098]/10 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-[#FD6098]" />
              </div>
              <span className="text-sm text-green-600">+37%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">287</p>
            <p className="text-sm text-gray-600">Leads</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h2>
          <div className="h-32 flex items-end justify-between gap-3">
            {[65, 45, 78, 52, 89, 72, 91].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-[#7760F9] to-[#9b8afc] rounded-t" 
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-48 rounded-xl my-2"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

const SimpleKeyboard = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-2 p-4">
      <div className="grid grid-cols-12 gap-2">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-[#0A090D] rounded border border-gray-800"
            style={{
              boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-3 h-60"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.8px, transparent 0.8px)",
        backgroundSize: "4px 4px",
      }}
    ></div>
  );
};

const AppleLogo = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path
        d="M22.5 23.25C21.45 24.3 20.325 24.15 19.275 23.625C18.15 23.1 17.1 23.1 15.9 23.625C14.4 24.375 13.575 24.15 12.675 23.25C7.275 17.7 7.95 9.375 14.025 9.075C15.375 9.15 16.35 9.825 17.175 9.9C18.375 9.675 19.5 8.925 20.775 9C22.35 9.15 23.55 9.75 24.375 10.875C21.075 12.975 21.825 17.325 24.75 18.525C24.15 20.025 23.4 21.525 22.5 23.25ZM17.025 9C16.875 6.6 18.675 4.65 20.85 4.5C21.15 7.125 18.45 9.15 17.025 9Z"
        fill="currentColor"
      />
    </svg>
  );
};