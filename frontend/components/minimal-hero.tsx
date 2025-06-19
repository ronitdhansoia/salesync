"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function MinimalHero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/ravensales-logo.jpeg"
              alt="RavenSales Logo"
              width={80}
              height={80}
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-full">
            Trusted by 10,000+ Sales Teams Worldwide
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
            Automate Your
            <span className="font-medium text-primary block mt-2">
              Sales Process
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Multi-channel outreach for LinkedIn, Email, and Social Media. 
            The AI-powered sales automation platform for global B2B teams.
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto mb-16" id="waitlist">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 group whitespace-nowrap">
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
              Be the first to know when we launch. No spam, unsubscribe anytime.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl font-medium text-gray-900 dark:text-white">10K+</div>
              <div className="text-sm text-gray-500 dark:text-gray-500">Users</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-gray-900 dark:text-white">95%</div>
              <div className="text-sm text-gray-500 dark:text-gray-500">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-gray-900 dark:text-white">30h</div>
              <div className="text-sm text-gray-500 dark:text-gray-500">Time Saved</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}