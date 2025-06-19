"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MessageSquare, BarChart3, Users, Zap } from "lucide-react";

export function WaitlistFeatures() {
  const features = [
    {
      name: "LinkedIn Automation",
      description: "Automate connection requests, messages, and follow-ups with intelligent sequencing.",
      icon: Linkedin,
    },
    {
      name: "Email Outreach",
      description: "Find verified emails and run personalized cold email campaigns at scale.",
      icon: Mail,
    },
    {
      name: "Multi-Channel Campaigns",
      description: "Coordinate outreach across LinkedIn, email, and social media platforms.",
      icon: MessageSquare,
    },
    {
      name: "Sales Analytics",
      description: "Track performance metrics and optimize your sales process with detailed insights.",
      icon: BarChart3,
    },
    {
      name: "Team Management",
      description: "Collaborate with your sales team and manage campaigns together efficiently.",
      icon: Users,
    },
    {
      name: "AI-Powered Insights",
      description: "Get intelligent recommendations to improve conversion rates and engagement.",
      icon: Zap,
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to automate your sales process and scale your outreach efforts
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-900/50 hover:border-gray-300 dark:hover:border-gray-800 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}