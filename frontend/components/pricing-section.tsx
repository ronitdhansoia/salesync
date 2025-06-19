"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card-container";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      description: "For individual sales reps",
      price: "₹2,999",
      period: "/month",
      features: [
        "500 LinkedIn connections/month",
        "1,000 WhatsApp messages",
        "Unlimited email finder",
        "Basic analytics",
        "Email support",
      ],
      cta: "Start Free Trial",
      href: "/register",
      popular: false,
    },
    {
      name: "Growth",
      description: "For growing sales teams",
      price: "₹7,999",
      period: "/month",
      features: [
        "2,000 LinkedIn connections/month",
        "5,000 WhatsApp messages",
        "Team collaboration (5 seats)",
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
      description: "For large sales teams",
      price: "Custom",
      period: "",
      features: [
        "Unlimited everything",
        "Unlimited team seats",
        "Custom integrations",
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
    <section id="pricing" className="py-20 px-6 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include multi-channel automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CardContainer className="inter-var">
                <CardBody
                  className={cn(
                    "relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border",
                    plan.popular
                      ? "bg-gradient-to-br from-primary/10 to-purple-600/10 border-primary/20"
                      : "bg-white"
                  )}
                >
                  {plan.popular && (
                    <CardItem
                      translateZ="50"
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                    >
                      <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </div>
                    </CardItem>
                  )}

                  <CardItem
                    translateZ="50"
                    className="text-2xl font-bold text-neutral-600 dark:text-white"
                  >
                    {plan.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                  >
                    {plan.description}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </CardItem>

                  <CardItem translateZ="80" className="w-full mt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardItem>

                  <CardItem translateZ={20} className="w-full mt-8">
                    <Link
                      href={plan.href}
                      className={cn(
                        "block w-full text-center py-3 rounded-lg font-medium transition-all duration-300",
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg"
                          : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800"
                      )}
                    >
                      {plan.cta}
                    </Link>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}