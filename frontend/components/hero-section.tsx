"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <AuroraBackground>
      <div className="relative flex flex-col gap-8 items-center justify-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center"
        >
          {/* Badge */}
          <div className="border border-gray-700 bg-gray-900/50 backdrop-blur-sm px-5 py-2 rounded-full flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-300">
              Built for Indian B2B Market
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
              Transform Your B2B Sales with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                AI-Powered
              </span>{" "}
              Multi-Channel Automation
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl text-center mt-4">
            Automate LinkedIn outreach, WhatsApp Business, and Email campaigns. 
            Close more deals with less effort using India's most powerful sales automation platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="px-8 py-4 bg-gray-900/50 border border-gray-700 text-white rounded-full font-medium hover:bg-gray-900/70 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
              Watch Demo
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">95%</h3>
              <p className="text-gray-400 text-sm">Success Rate</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">30%</h3>
              <p className="text-gray-400 text-sm">Time Saved</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}