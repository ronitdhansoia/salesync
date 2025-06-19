"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export function WaitlistPricing() {
  const plans = [
    {
      name: "Basic",
      price: "$19",
      period: "/month",
      description: "Perfect for individual sales professionals",
      features: [
        "500 LinkedIn connections/month",
        "1,000 emails/month",
        "Basic analytics",
        "Email support",
        "LinkedIn automation",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "Ideal for growing sales teams",
      features: [
        "2,000 LinkedIn connections/month",
        "5,000 emails/month",
        "Advanced analytics",
        "Priority support",
        "Multi-channel campaigns",
        "Team collaboration",
        "CRM integration",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$99",
      period: "/month",
      description: "For power users and agencies",
      features: [
        "5,000 LinkedIn connections/month",
        "15,000 emails/month",
        "Advanced reporting",
        "Dedicated support",
        "Custom integrations",
        "White-label options",
        "API access",
      ],
      popular: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited connections",
        "Unlimited emails",
        "Enterprise reporting",
        "24/7 dedicated support",
        "Custom integrations",
        "Onboarding assistance",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 flex flex-col h-full ${
                plan.popular
                  ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-black scale-105"
                  : "border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-light text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-gray-900 dark:text-white flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                    : "border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                Join Waitlist
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Early bird pricing for waitlist members.
          </p>
        </div>
      </div>
    </section>
  );
}