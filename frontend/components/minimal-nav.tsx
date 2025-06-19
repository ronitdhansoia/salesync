"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Linkedin, Mail, MessageSquare, BarChart3, Users, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

export function MinimalNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [softwareDropdownOpen, setSoftwareDropdownOpen] = useState(false);

  const navItems = [];

  const softwareItems = [
    {
      name: "LinkedIn Automation",
      description: "Automate LinkedIn outreach and connection requests",
      href: "/software/linkedin-automation",
      icon: Linkedin,
    },
    {
      name: "Email Outreach",
      description: "Find emails and run personalized campaigns",
      href: "/software/email-outreach",
      icon: Mail,
    },
    {
      name: "Multi-Channel Campaigns",
      description: "Coordinate outreach across multiple platforms",
      href: "/software/multi-channel",
      icon: MessageSquare,
    },
    {
      name: "Sales Analytics",
      description: "Track performance and optimize your sales process",
      href: "/software/analytics",
      icon: BarChart3,
    },
    {
      name: "Team Management",
      description: "Collaborate with your sales team effectively",
      href: "/software/team-management",
      icon: Users,
    },
    {
      name: "AI-Powered Insights",
      description: "Get intelligent recommendations for better results",
      href: "/software/ai-insights",
      icon: Zap,
    },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-black backdrop-blur-md z-50 border-b border-gray-200/20 dark:border-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size={48} showText={true} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {/* Navigation Links */}
            <a href="#features" className="text-sm font-medium text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white">
              About
            </a>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10">
              <ThemeToggle />
            </div>
            <button
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white bg-gray-900 dark:text-black dark:bg-white rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white rounded-2xl hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md">
          <div className="px-6 py-8 space-y-8">
            <div className="space-y-6">
              <a
                href="#features"
                className="block text-lg font-medium text-white/80 hover:text-white py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-lg font-medium text-white/80 hover:text-white py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#about"
                className="block text-lg font-medium text-white/80 hover:text-white py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </div>
            
            <div className="pt-6 border-t border-white/20">
              <button
                className="w-full inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-2xl hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}