"use client";

import React from "react";
import { motion } from "framer-motion";

export function MinimalTestimonials() {
  const testimonials = [
    {
      quote: "RavenSales helped us scale from 10 to 100 enterprise clients in just 6 months. The multi-channel automation is incredibly powerful.",
      author: "Sarah Johnson",
      role: "VP Sales, TechCorp San Francisco",
    },
    {
      quote: "The LinkedIn automation saved our team 30 hours per week. We're now closing 3x more deals with the same team size.",
      author: "Marcus Chen",
      role: "Sales Director, CloudScale Ltd",
    },
    {
      quote: "RavenSales' global approach and multi-timezone scheduling has transformed our international outreach. Perfect for our distributed team.",
      author: "Emma Rodriguez",
      role: "Founder, B2B Solutions Inc",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Trusted by
            <span className="font-medium text-primary block mt-2">
              10,000+ sales teams
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what global B2B sales teams are saying about RavenSales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-gray-50 dark:bg-gray-900 rounded-xl"
            >
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}