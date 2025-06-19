"use client";

import React from "react";
import { MinimalNav } from "@/components/minimal-nav";
import { MinimalHero } from "@/components/minimal-hero";
import { MinimalFeatures } from "@/components/minimal-features";
import { MinimalTestimonials } from "@/components/minimal-testimonials";
import { MinimalPricing } from "@/components/minimal-pricing";
import { MinimalFAQ } from "@/components/minimal-faq";
import { MinimalCTA } from "@/components/minimal-cta";
import { MinimalFooter } from "@/components/minimal-footer";

export default function MinimalLandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <MinimalNav />
      <MinimalHero />
      <MinimalFeatures />
      <MinimalTestimonials />
      <MinimalPricing />
      <MinimalFAQ />
      <MinimalCTA />
      <MinimalFooter />
    </main>
  );
}