"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { 
  Linkedin, 
  MessageSquare, 
  Mail, 
  BarChart3, 
  Bot, 
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      title: "LinkedIn Automation",
      description: "Smart connection requests, automated follow-ups, and InMail campaigns that mimic human behavior.",
      header: <FeatureCard1 />,
      icon: <Linkedin className="h-6 w-6 text-primary" />,
      className: "md:col-span-2",
    },
    {
      title: "WhatsApp Business",
      description: "Reach Indian prospects where they respond - bulk messaging with template management.",
      header: <FeatureCard2 />,
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Email Finder & Outreach",
      description: "Find verified emails with 98% accuracy and run personalized drip campaigns.",
      header: <FeatureCard3 />,
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      className: "md:col-span-1",
    },
    {
      title: "AI-Powered Analytics",
      description: "Track every interaction, conversion, and ROI with real-time dashboards.",
      header: <FeatureCard4 />,
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-white dark:bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              10x Your Sales
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Multi-channel automation designed specifically for Indian B2B sales teams
          </p>
        </motion.div>

        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </BentoGrid>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mt-12"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300">
            <Bot className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI Personalization
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Craft unique messages for each prospect using AI
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300">
            <Shield className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              DPDPA Compliant
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              100% compliant with Indian data protection laws
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300">
            <Clock className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Smart Scheduling
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send messages at optimal times for better engagement
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300">
            <Users className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Team Collaboration
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Work together with shared campaigns and analytics
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Feature Cards with Animations
const FeatureCard1 = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
      >
        <Linkedin className="h-20 w-20 text-white" />
      </motion.div>
    </div>
  );
};

const FeatureCard2 = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
      >
        <MessageSquare className="h-20 w-20 text-white" />
      </motion.div>
    </div>
  );
};

const FeatureCard3 = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center"
      >
        <Mail className="h-20 w-20 text-white" />
      </motion.div>
    </div>
  );
};

const FeatureCard4 = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center"
      >
        <BarChart3 className="h-20 w-20 text-white" />
      </motion.div>
    </div>
  );
};