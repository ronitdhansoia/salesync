"use client";
import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";
import Link from "next/link";
import { FittedDashboard } from "./fitted-dashboard";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-gray-50 w-full">
      <MacbookScroll
        title={
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              See it in action
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              Real-time dashboard showing your LinkedIn, WhatsApp & Email campaigns
            </p>
          </div>
        }
        showGradient={false}
        badge={
          <Link href="/register">
            <Badge className="h-10 w-10 transform -rotate-12" />
          </Link>
        }
      >
        <FittedDashboard />
      </MacbookScroll>
    </div>
  );
}

const Badge = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="bg-gradient-to-br from-[#7760F9] to-[#6651E8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2">
        <span>Start Free Trial</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};