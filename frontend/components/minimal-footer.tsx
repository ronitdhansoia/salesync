"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Linkedin, MessageSquare, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { waitlistApi } from "@/lib/api";

export function MinimalFooter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await waitlistApi.addToWaitlist(email, 'footer');
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
    <footer className="relative bg-white dark:bg-black">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-24">
          <div className="text-center space-y-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <Logo size={52} showText={true} />
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                The AI-powered B2B sales automation platform that transforms how teams connect, engage, and convert prospects globally.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center justify-center space-x-6">
              <a 
                href="#" 
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-white transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-white transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
              </a>
              <a 
                href="#" 
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-white transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Waitlist CTA Section */}
        <div className="border-t border-gray-100 dark:border-gray-900 py-12">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Ready to transform your sales process?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Join thousands of sales professionals already on the waitlist.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-xl text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : isSubmitted ? "Added!" : "Join Waitlist"}
              </button>
            </form>
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-3 text-center">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-gray-900 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                © 2025 RavenSales. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link 
                href="#" 
                className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="#" 
                className="text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}