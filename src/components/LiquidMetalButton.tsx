import React, { useEffect, useRef, useState } from 'react';
import { ShaderMount, liquidMetalFragmentShader } from '@paper-design/shaders';

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  glowColor?: 'gold' | 'silver' | 'purple' | 'cyan' | 'mint';
}

export const LiquidMetalButton: React.FC<LiquidMetalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ariaLabel,
  disabled = false,
  type = 'button',
  glowColor = 'gold'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shaderMountRef = useRef<ShaderMount | null>(null);
  const [shaderFailed, setShaderFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || variant !== 'primary') {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    try {
      // Color tint configurations matching our brand aesthetic
      const tintMap: Record<string, [number, number, number, number]> = {
        gold: [0.96, 0.72, 0.22, 0.85],
        silver: [0.85, 0.88, 0.95, 0.8],
        purple: [0.72, 0.45, 0.98, 0.85],
        cyan: [0.15, 0.78, 0.92, 0.85],
        mint: [0.22, 0.85, 0.62, 0.85]
      };

      const selectedTint = tintMap[glowColor] || tintMap.gold;

      const uniforms = {
        u_colorBack: [0.08, 0.09, 0.14, 1.0],
        u_colorTint: selectedTint,
        u_softness: 0.35,
        u_repetition: 2.2,
        u_shiftRed: 0.04,
        u_shiftBlue: -0.04,
        u_distortion: 0.28,
        u_contour: 0.45,
        u_angle: 45.0,
        u_shape: 0.0,
        u_isImage: false
      };

      // Mount the WebGL liquid metal shader with low speed for calm, premium feel
      const mount = new ShaderMount(
        container,
        liquidMetalFragmentShader,
        uniforms,
        { alpha: true, antialias: true },
        0.35, // calm, refined animation speed
        0,
        Math.min(window.devicePixelRatio || 1, 2)
      );

      shaderMountRef.current = mount;
    } catch {
      // Graceful fallback to CSS liquid metal gradient
      setShaderFailed(true);
    }

    return () => {
      try {
        if (shaderMountRef.current) {
          shaderMountRef.current.dispose();
          shaderMountRef.current = null;
        }
      } catch {
        // Safe disposal
      }
    };
  }, [variant, glowColor]);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-lg',
    md: 'px-6 py-3 text-sm font-semibold rounded-xl',
    lg: 'px-8 py-4 text-base font-bold rounded-2xl'
  }[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`liquid-metal-btn liquid-metal-btn--${variant} liquid-metal-btn--${size} liquid-metal-btn--${glowColor} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Background shader container (only for primary variant) */}
      {variant === 'primary' && !shaderFailed && (
        <div
          ref={containerRef}
          aria-hidden="true"
          className="liquid-metal-canvas-container"
        />
      )}

      {/* Polish CSS fallback / overlay layer */}
      <div
        aria-hidden="true"
        className={`liquid-metal-sheen ${isHovered ? 'is-active' : ''}`}
      />

      {/* Button Content */}
      <span className="liquid-metal-content">
        {children}
        {icon && <span className="liquid-metal-icon" aria-hidden="true">{icon}</span>}
      </span>
    </button>
  );
};
