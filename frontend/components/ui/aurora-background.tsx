"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-gray-950 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 opacity-20",
              "bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]",
              "dark:bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent_50%)]"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 opacity-20",
              "bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]",
              "dark:bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.15),transparent_50%)]"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 opacity-30",
              "bg-[radial-gradient(circle_at_40%_40%,rgba(120,119,255,0.2),transparent_50%)]",
              "dark:bg-[radial-gradient(circle_at_40%_40%,rgba(120,119,255,0.1),transparent_50%)]"
            )}
          />
        </div>
        {children}
      </div>
    </main>
  );
};