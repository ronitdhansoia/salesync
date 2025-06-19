"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MessageSquare, BarChart3, Users, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function WaitlistFeatures() {
  const features = [
    {
      name: "LinkedIn Automation",
      description: "Automate connection requests, messages, and follow-ups with intelligent sequencing.",
      icon: Linkedin,
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    },
    {
      name: "Email Outreach",
      description: "Find verified emails and run personalized cold email campaigns at scale.",
      icon: Mail,
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    },
    {
      name: "Multi-Channel Campaigns",
      description: "Coordinate outreach across LinkedIn, email, and social media platforms.",
      icon: MessageSquare,
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    },
    {
      name: "Sales Analytics",
      description: "Track performance metrics and optimize your sales process with detailed insights.",
      icon: BarChart3,
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    },
    {
      name: "Team Management",
      description: "Collaborate with your sales team and manage campaigns together efficiently.",
      icon: Users,
      area: "md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/11]"
    },
    {
      name: "AI-Powered Insights",
      description: "",
      icon: Zap,
      area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/11/3/13]"
    },
  ];

  return (
    <section id="features" className="py-32 bg-gray-50 dark:bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-100/20 to-transparent dark:from-transparent dark:via-gray-900/20 dark:to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Everything you need to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                automate your sales
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Scale your outreach efforts with intelligent tools designed for modern sales teams
            </p>
          </motion.div>
        </div>

        {/* Grid Layout with Glowing Effects */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[34rem] xl:grid-rows-2">
          {features.map((feature, index) => (
            <GridItem
              key={feature.name}
              area={feature.area}
              icon={<feature.icon className="h-4 w-4 text-gray-300 dark:text-neutral-400" />}
              title={feature.name}
              description={feature.description}
              index={index}
            />
          ))}
        </ul>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to transform your sales process?
          </p>
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Start Free Trial</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  index: number;
}

const GridItem = ({ area, icon, title, description, index }: GridItemProps) => {
  return (
    <motion.li 
      className={`min-h-[14rem] list-none ${area}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative h-full rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-black dark:bg-black dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 dark:border-gray-600 p-2 bg-gray-800 dark:bg-gray-800">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-lg/[1.25rem] font-semibold text-balance text-white md:text-xl/[1.5rem] dark:text-white">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] text-gray-300 md:text-base/[1.375rem] dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};