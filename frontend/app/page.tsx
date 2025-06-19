"use client";

import React from "react";
import { MinimalNav } from "@/components/minimal-nav";
import { WaitlistHeroBeams } from "@/components/waitlist-hero-beams";
import { WaitlistFeatures } from "@/components/waitlist-features";
import { WaitlistPricing } from "@/components/waitlist-pricing";
import { WaitlistAbout } from "@/components/waitlist-about";
import { MinimalFooter } from "@/components/minimal-footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <MinimalNav />
      <WaitlistHeroBeams />
      <WaitlistFeatures />
      <WaitlistPricing />
      <WaitlistAbout />
      <MinimalFooter />
    </main>
  );
}