"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Globe, 
  Shield,
  TrendingUp,
  Users,
  CheckCircle2
} from "lucide-react";

// Throttle function to limit function calls
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let lastCall = 0;
  let timeout: NodeJS.Timeout | null = null;
  
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
        timeout = null;
      }, delay - (now - lastCall));
    }
  }) as T;
}

export function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    }, 50), // Throttle to 20fps max
    []
  );

  useEffect(() => {
    if (!isClient) return;
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove, isClient]);

  const stats = [
    { value: "100K+", label: "Active Users", icon: Users },
    { value: "2.5M+", label: "Connections Made", icon: Zap },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
    { value: "182%", label: "Average ROI", icon: CheckCircle2 }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated background - using CSS animations instead of Framer Motion for better performance */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-medium" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slower" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span>Trusted by 100,000+ Sales Teams in India</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-[#7760F9] via-[#6651E8] to-[#5541D8] bg-clip-text text-transparent">
              Automate Your B2B Sales
            </span>
            <br />
            <span>Like Never Before</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            The only platform that combines LinkedIn automation, WhatsApp Business, 
            and Email outreach with AI-powered personalization for the Indian market
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link 
              href="/register" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#7760F9] to-[#6651E8] rounded-xl overflow-hidden transition-transform hover:scale-105 duration-200"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#6651E8] to-[#5541D8] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-gray-300 duration-200">
              <span className="relative z-10 flex items-center gap-2">
                Watch Demo
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <div className="w-0 h-0 border-l-[6px] border-l-gray-900 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
                </div>
              </span>
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-20"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-600" />
              <span>LinkedIn Safe</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Cloud-Based</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="h-5 w-5 text-purple-600" />
              <span>AI-Powered</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <stat.icon className="h-8 w-8 text-[#7760F9] mb-3" />
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating elements - only render on client and with reduced complexity */}
        {isClient && (
          <>
            <div
              className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl animate-spin-slow will-change-transform"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
              }}
            />
            
            <div
              className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse-slow will-change-transform"
              style={{
                transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}