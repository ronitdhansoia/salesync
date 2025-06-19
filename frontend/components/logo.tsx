import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({ 
  size = 40, 
  showText = true, 
  className = "", 
  href = "/" 
}: LogoProps) {
  const content = (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Image
        src="/ravensales-logo.jpeg"
        alt="RavenSales Logo"
        width={size}
        height={size}
        className="rounded-lg"
      />
      {showText && (
        <span className="text-xl font-medium text-gray-900 dark:text-white">
          RavenSales
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}