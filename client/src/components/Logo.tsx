"use client";

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
  showBadge?: boolean;
  href?: string;
  onClick?: () => void;
}

export function Logo3DMark({ size = 46, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none flex-shrink-0 logo-3d-wrapper ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full logo-3d-mark transition-all duration-300 ease-out"
        style={{ filter: 'drop-shadow(0 10px 18px rgba(5, 150, 105, 0.28))' }}
      >
        <defs>
          {/* Ambient 3D Occlusion & Ground Shadow */}
          <radialGradient id="ambGroundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#022c22" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#047857" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </radialGradient>

          {/* 3D Top Face: Saturated Luminous Mint/Emerald */}
          <linearGradient id="topFaceGlow" x1="14" y1="12" x2="106" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="30%" stopColor="#34d399" />
            <stop offset="80%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* 3D Left Face: Front Key-Light Vibrant Emerald */}
          <linearGradient id="leftFaceVibrant" x1="14" y1="34" x2="60" y2="106" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="45%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* 3D Right Face: Deep Contrast Isometric Shadow */}
          <linearGradient id="rightFaceShadow" x1="60" y1="58" x2="106" y2="106" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="40%" stopColor="#065f46" />
            <stop offset="85%" stopColor="#022c22" />
            <stop offset="100%" stopColor="#011b14" />
          </linearGradient>

          {/* 3D Express Delivery Tape */}
          <linearGradient id="expressTapeGrad" x1="50" y1="14" x2="70" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
          </linearGradient>

          {/* Glass Specular Glint */}
          <linearGradient id="specularGlint" x1="20" y1="14" x2="60" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Sculpted 3D "U" Left Pillar Gradient */}
          <linearGradient id="uPillarLeft" x1="26" y1="46" x2="44" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>

          {/* Sculpted 3D "U" Right Pillar Gradient */}
          <linearGradient id="uPillarRight" x1="74" y1="62" x2="94" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d1fae5" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Sculpted 3D "U" Bottom Arc */}
          <linearGradient id="uBaseArc" x1="36" y1="78" x2="84" y2="102" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* 3D Deep Monogram Shadow */}
          <linearGradient id="uCavityShadow" x1="30" y1="58" x2="60" y2="102" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#011b14" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
          </linearGradient>

          {/* Core Pulse Glow */}
          <filter id="coreNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Ground Contact Shadow */}
        <ellipse cx="60" cy="111" rx="42" ry="7.5" fill="url(#ambGroundShadow)" />

        {/* 2. 3D Isometric Parcel Container */}
        {/* Left Front Facet */}
        <path
          d="M14 34 L60 58 L60 106 L14 82 Z"
          fill="url(#leftFaceVibrant)"
        />

        {/* Right Front Facet (Shadowed) */}
        <path
          d="M60 58 L106 34 L106 82 L60 106 Z"
          fill="url(#rightFaceShadow)"
        />

        {/* Top Facet (Illuminated) */}
        <path
          d="M60 10 L106 34 L60 58 L14 34 Z"
          fill="url(#topFaceGlow)"
        />

        {/* Top Face Specular Glaze Reflection */}
        <path
          d="M60 12 L96 31 L60 48 L24 30 Z"
          fill="url(#specularGlint)"
        />

        {/* Top Center Express Velocity Tape */}
        <path
          d="M54 13.2 L66 19.5 L66 48.5 L54 42.2 Z"
          fill="url(#expressTapeGrad)"
        />
        {/* Forward Express Arrows on Tape */}
        <path
          d="M58 24 L62 26.2 L58 28.5"
          stroke="#064e3b"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58 33 L62 35.2 L58 37.5"
          stroke="#064e3b"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Outer 3D Crisp Bevel Edges */}
        {/* Top-Left Ridge */}
        <line x1="14" y1="34" x2="60" y2="10" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
        {/* Top-Right Ridge */}
        <line x1="60" y1="10" x2="106" y2="34" stroke="#a7f3d0" strokeWidth="1.6" strokeOpacity="0.7" />
        {/* Center Vertical Corner Ridge */}
        <line x1="60" y1="58" x2="60" y2="106" stroke="#34d399" strokeWidth="1.8" strokeOpacity="0.5" />

        {/* 4. SCULPTED 3D "U" MONOGRAM */}
        {/* Monogram Cast Depth Shadow */}
        <path
          d="M30 48 L42 54.5 L42 78 Q42 87 60 93 Q78 87 78 78 L78 54.5 L90 48 L90 78 Q90 98 60 104 Q30 98 30 78 Z"
          fill="url(#uCavityShadow)"
        />

        {/* Left Arm of 3D "U" (Illuminated 3D facet) */}
        <path
          d="M29 46 L41 52.5 L41 77 Q41 83 52 87.5 L52 94.5 Q38 91 29 80 Z"
          fill="url(#uPillarLeft)"
        />

        {/* Right Arm of 3D "U" (Shadowed 3D facet) */}
        <path
          d="M79 52.5 L91 46 L91 80 Q82 91 68 94.5 L68 87.5 Q79 83 79 77 Z"
          fill="url(#uPillarRight)"
        />

        {/* Bottom Connecting 3D Arc of "U" */}
        <path
          d="M41 77 Q41 88 60 93.5 Q79 88 79 77 L91 80 Q91 97 60 103 Q29 97 29 80 Z"
          fill="url(#uBaseArc)"
        />

        {/* Inner Highlight Rim along "U" */}
        <path
          d="M33 48 L38 51 L38 76 Q38 85 60 90 Q82 85 82 76 L82 51 L87 48"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />

        {/* 5. Glowing Express Commuter Delivery Core */}
        <circle cx="60" cy="74" r="5" fill="#34d399" filter="url(#coreNeonGlow)" />
        <circle cx="60" cy="74" r="2.8" fill="#ffffff" />

        {/* Top-Left Ambient Flare */}
        <path
          d="M17 32 L18.5 27 L20 32 L25 33.5 L20 35 L18.5 40 L17 35 L12 33.5 Z"
          fill="#ffffff"
          opacity="0.95"
        />
      </svg>

      {/* Network Live Pulse Node */}
      <span 
        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300 shadow-md animate-pulse" 
        title="Network Live" 
      />
    </div>
  );
}

export default function Logo({
  variant = 'full',
  size = 'md',
  theme = 'light',
  className = '',
  showBadge = true,
  href = '/',
  onClick
}: LogoProps) {
  // Dimensions
  const dimensions = {
    sm: { icon: 36, text: 'text-lg', sub: 'text-[8.5px]', badge: 'text-[8px] px-1.5 py-0.2' },
    md: { icon: 46, text: 'text-xl sm:text-2xl', sub: 'text-[9.5px]', badge: 'text-[9px] px-2 py-0.5' },
    lg: { icon: 54, text: 'text-2xl sm:text-3xl', sub: 'text-[11px]', badge: 'text-[9.5px] px-2.5 py-0.5' },
    xl: { icon: 66, text: 'text-3xl sm:text-4xl', sub: 'text-[12.5px]', badge: 'text-[10px] px-3 py-0.5' },
  }[size];

  const isDark = theme === 'dark';

  const content = (
    <div className={`inline-flex items-center space-x-3.5 group focus:outline-none select-none cursor-pointer ${className}`}>
      {/* 3D Vector Emblem */}
      <div className="transform group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 ease-out flex-shrink-0">
        <Logo3DMark size={dimensions.icon} />
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col text-left">
          {/* Brand Name Lockup - ALWAYS IN ENGLISH */}
          <div className="flex items-center space-x-2">
            <span 
              className={`font-black tracking-tight leading-none transition-colors duration-200 ${dimensions.text} ${
                isDark 
                  ? 'text-white group-hover:text-emerald-400' 
                  : 'text-slate-900 group-hover:text-emerald-700'
              }`}
              style={{ letterSpacing: '-0.035em' }}
            >
              Ushol Mama
            </span>

            {/* Standard Version Badge */}
            {showBadge && (
              <span className={`hidden md:inline-flex rounded-md font-extrabold uppercase tracking-wider ${dimensions.badge} ${
                isDark 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200/80 shadow-xs'
              }`}>
                P2P v2.4
              </span>
            )}
          </div>

          {/* Subtitle / Tagline - ALWAYS IN ENGLISH */}
          <span 
            className={`font-extrabold tracking-wider uppercase block mt-1 transition-colors duration-200 ${dimensions.sub} ${
              isDark ? 'text-emerald-400' : 'text-emerald-600'
            }`}
            style={{ letterSpacing: '0.09em' }}
          >
            COMMUTER CROWD-SHIPPING
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  );
}
