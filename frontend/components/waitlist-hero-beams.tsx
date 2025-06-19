"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { waitlistApi } from "@/lib/api";

export function WaitlistHeroBeams() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await waitlistApi.addToWaitlist(email, 'hero');
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError("You're already on our waitlist!");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-white dark:bg-neutral-950 flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 dark:from-neutral-200 dark:to-neutral-600 text-center font-sans font-bold mb-4">
            Join the waitlist
          </h1>
          
          <p className="text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto my-6 text-sm md:text-sm text-center relative z-10 leading-relaxed">
            Welcome to RavenSales, the best sales automation platform on the web.
            We provide reliable, scalable, and customizable sales solutions for
            your business. Whether you&apos;re sending LinkedIn connections,
            cold emails, or multi-channel campaigns, RavenSales has got you
            covered.
          </p>

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 group whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : isSubmitted ? "Added!" : "Join Waitlist"}
                {!isSubmitted && !isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-3 text-center relative z-10">
                {error}
              </p>
            )}
            {!error && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center relative z-10">
                Be the first to know when we launch. No spam, unsubscribe anytime.
              </p>
            )}
          </form>
        </motion.div>
      </div>
      <BackgroundBeams />
    </section>
  );
}