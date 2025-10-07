import React from "react";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Shunya AI logo"
      className={className}
    >
      <title>Shunya AI</title>
      <defs />
      <rect width="64" height="64" rx="12" fill="url(#g)" />
      <g>
        <path
          d="M20 40c6-8 16-12 24-8"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.98"
        />
        <path
          d="M28 18c6 2 10 8 12 14"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3BFCFF" />
          <stop offset="50%" stopColor="#8C4BFF" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Logo;
