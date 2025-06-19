"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Globe, Mail, BarChart3, Shield, Clock } from "lucide-react";

export function MinimalFeatures() {
  const features = [
    {
      icon: Linkedin,
      title: "LinkedIn Automation",
      description: "Smart connection requests and automated follow-ups that mimic human behavior.",
    },
    {
      icon: Globe,
      title: "Multi-Channel Outreach",
      description: "Reach prospects across LinkedIn, Email, and multiple social platforms worldwide.",
    },
    {
      icon: Mail,
      title: "Email Outreach",
      description: "Find verified emails with 98% accuracy and run personalized campaigns.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track every interaction, conversion, and ROI with real-time insights.",
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "100% compliant with global data protection laws and privacy regulations.",
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Send messages at optimal times across different time zones for better engagement.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Everything you need to
            <span className="font-medium text-primary block mt-2">
              scale your sales
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Multi-channel automation designed for global B2B sales teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg dark:hover:shadow-gray-800/25 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                {feature.title}
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