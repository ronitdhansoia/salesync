"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export function MinimalPricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "For individual sales reps",
      features: [
        "1,000 LinkedIn connections/month",
        "Unlimited email outreach",
        "Basic analytics dashboard",
        "Email support",
        "CRM integrations",
      ],
      cta: "Start Free Trial",
      href: "/register",
      popular: false,
    },
    {
      name: "Growth",
      price: "$149",
      period: "/month",
      description: "For growing sales teams",
      features: [
        "5,000 LinkedIn connections/month",
        "Multi-channel campaigns",
        "Team collaboration (10 seats)",
        "Advanced analytics & reports",
        "Priority support",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      href: "/register",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large sales teams",
      features: [
        "Unlimited everything",
        "Unlimited team seats",
        "White-label solutions",
        "Dedicated account manager",
        "SLA & priority support",
        "On-premise deployment",
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Simple,
            <span className="font-medium text-primary block mt-2">
              transparent pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include multi-channel automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 bg-white dark:bg-gray-900 rounded-xl ${
                plan.popular
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-lg dark:hover:shadow-gray-800/25"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-light text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}