import React from 'react';
import { motion } from 'framer-motion';

export const SemiCircleArcGauge = ({
  value = 16,
  total = 20,
  label = "OUT OF",
  size = 210,
  strokeWidth = 14,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // length of half-circle
  const percentage = Math.min(Math.max(value / total, 0), 1);
  const strokeDashoffset = circumference * (1 - percentage);
  const cy = radius + strokeWidth / 2; // vertical center of arc
  const svgHeight = cy + strokeWidth / 2 + 4;

  return (
    <div className="flex flex-col items-center justify-center relative my-1">
      <svg
        width={size}
        height={svgHeight}
        viewBox={`0 0 ${size} ${svgHeight}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="purpleArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6E44FF" />
          </linearGradient>
        </defs>

        {/* Background track arc */}
        <path
          d={`M ${strokeWidth / 2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${cy}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated fill arc */}
        <motion.path
          d={`M ${strokeWidth / 2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${cy}`}
          fill="none"
          stroke="url(#purpleArcGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>

      {/* Center text display positioned inside arc dome */}
      <div className="absolute bottom-2 flex flex-col items-center select-none pointer-events-none">
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-extrabold tracking-tight text-neutral-900 leading-none"
        >
          {value}
        </motion.span>
        <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mt-1">
          {label} {total}
        </span>
      </div>
    </div>
  );
};

export const MiniCircularGauge = ({
  value = 8,
  total = 10,
  color = "#6E44FF",
  size = 46,
  strokeWidth = 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value / total, 0), 1);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90 block">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-neutral-800 leading-none">
        {Math.round((value / total) * 100)}%
      </div>
    </div>
  );
};
