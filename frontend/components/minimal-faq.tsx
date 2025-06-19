"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function MinimalFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is RavenSales safe for LinkedIn?",
      answer: "Yes! RavenSales uses cloud-based automation that mimics human behavior, staying within LinkedIn's limits. We've never had an account restricted in 5+ years.",
    },
    {
      question: "Does RavenSales work globally?",
      answer: "Absolutely! RavenSales supports multi-timezone scheduling and works with prospects worldwide. Our platform is designed for global B2B sales teams.",
    },
    {
      question: "How accurate is the email finder?",
      answer: "Our email finder has a 98% accuracy rate. We verify every email before adding it to your campaign to ensure high deliverability across all regions.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! Start with our 14-day free trial. No credit card required. Cancel anytime.",
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 chat support, phone support during business hours across multiple time zones, and dedicated account managers for enterprise plans.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Frequently asked
            <span className="font-medium text-primary block mt-2">
              questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about RavenSales
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <Minus className="h-5 w-5 text-gray-500" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}