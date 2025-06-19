"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, TrendingUp, Globe, Shield } from "lucide-react";

export function WaitlistAbout() {

  const values = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Advanced algorithms to identify and reach your ideal prospects with laser-focused accuracy.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Built-in optimization tools that learn from your campaigns and improve results over time.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Expand your sales reach across multiple platforms and geographical markets seamlessly.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with full compliance to data protection regulations.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-6">
              Built for the Future of Sales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              RavenSales was born from the frustration of manual, time-consuming sales processes. 
              We believe that sales professionals should focus on building relationships, not on 
              repetitive tasks.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our AI-powered platform automates the heavy lifting while maintaining the personal 
              touch that makes sales effective. Join thousands of sales professionals who have 
              transformed their workflow with RavenSales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src="/ravensales-logo.jpeg"
                  alt="RavenSales Logo"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-semibold">RavenSales</h3>
                  <p className="text-gray-300">Sales Automation Platform</p>
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                "We're not just building software – we're revolutionizing how sales teams 
                approach outreach, making it more efficient, effective, and human."
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-300">Founded in 2025</p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Values */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              Our Values
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <value.icon className="h-8 w-8 text-white dark:text-gray-900" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}