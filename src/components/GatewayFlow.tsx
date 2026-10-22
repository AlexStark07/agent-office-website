import React, { useEffect, useRef } from 'react';
import { AgentRole } from '../types';

interface GatewayFlowProps {
  variant?: 'orchestration' | 'ambient' | 'matrix';
  activeAgent?: AgentRole | null;
  className?: string;
  height?: string | number;
  showNodes?: boolean;
  interactive?: boolean;
}

interface NodePoint {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  radius: number;
  pulsePhase: number;
}

interface Particle {
  pathIndex: number;
  t: number;
  speed: number;
  size: number;
  color: string;
  glowColor: string;
  trail: { x: number; y: number }[];
  trailLength: number;
  reverse: boolean;
}

export const GatewayFlow: React.FC<GatewayFlowProps> = ({
  variant = 'orchestration',
  activeAgent = null,
  className = '',
  height = '100%',
  showNodes = true,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let heightPx = 0;
    let dpr = 1;

    // Agent palette
    const colors = {
      manager: '#F59E0B',      // Gold
      research: '#A855F7',     // Purple
      analysis: '#06B6D4',     // Cyan
      development: '#10B981',  // Mint
      verification: '#F97316', // Orange
      neutral: 'rgba(255, 255, 255, 0.4)'
    };

    let nodes: NodePoint[] = [];
    let curves: {
      from: NodePoint;
      to: NodePoint;
      cp1: { x: number; y: number };
      cp2: { x: number; y: number };
      color: string;
      id: string;
    }[] = [];

    let particles: Particle[] = [];

    const setupDimensionsAndNodes = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 320);
      heightPx = typeof height === 'number' ? height : Math.max(rect.height, 280);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = heightPx * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${heightPx}px`;
      ctx.scale(dpr, dpr);

      // Define Node layout depending on variant
      if (variant === 'orchestration') {
        const managerNode: NodePoint = {
          id: 'manager',
          name: 'Manager Hub',
          x: width * 0.5,
          y: heightPx * 0.22,
          color: colors.manager,
          radius: 9,
          pulsePhase: 0
        };

        const researchNode: NodePoint = {
          id: 'research',
          name: 'Research',
          x: width * 0.15,
          y: heightPx * 0.74,
          color: colors.research,
          radius: 7,
          pulsePhase: 1.2
        };

        const analysisNode: NodePoint = {
          id: 'analysis',
          name: 'Analysis',
          x: width * 0.38,
          y: heightPx * 0.8,
          color: colors.analysis,
          radius: 7,
          pulsePhase: 2.4
        };

        const devNode: NodePoint = {
          id: 'development',
          name: 'Development',
          x: width * 0.62,
          y: heightPx * 0.8,
          color: colors.development,
          radius: 7,
          pulsePhase: 3.6
        };

        const verifierNode: NodePoint = {
          id: 'verification',
          name: 'Verification',
          x: width * 0.85,
          y: heightPx * 0.74,
          color: colors.verification,
          radius: 7,
          pulsePhase: 4.8
        };

        nodes = [managerNode, researchNode, analysisNode, devNode, verifierNode];

        // Curves linking Manager to each specialist
        const specialistNodes = [researchNode, analysisNode, devNode, verifierNode];
        curves = specialistNodes.map((spec) => {
          // Calculate curved control points
          const dx = spec.x - managerNode.x;
          const dy = spec.y - managerNode.y;
          return {
            id: spec.id,
            from: managerNode,
            to: spec,
            cp1: { x: managerNode.x + dx * 0.2, y: managerNode.y + dy * 0.6 },
            cp2: { x: spec.x - dx * 0.1, y: managerNode.y + dy * 0.8 },
            color: spec.color
          };
        });

        // Cross-flow between Research -> Analysis, Analysis -> Dev, Dev -> Verifier, Verifier -> Manager
        curves.push({
          id: 'res-ana',
          from: researchNode,
          to: analysisNode,
          cp1: { x: (researchNode.x + analysisNode.x) / 2, y: researchNode.y + 25 },
          cp2: { x: (researchNode.x + analysisNode.x) / 2, y: analysisNode.y + 25 },
          color: colors.research
        });
        curves.push({
          id: 'dev-ver',
          from: devNode,
          to: verifierNode,
          cp1: { x: (devNode.x + verifierNode.x) / 2, y: devNode.y + 25 },
          cp2: { x: (devNode.x + verifierNode.x) / 2, y: verifierNode.y + 25 },
          color: colors.verification
        });
      } else if (variant === 'ambient') {
        // Ambient flow: horizontal sinuous streams
        nodes = [
          { id: 'n1', name: '', x: width * 0.1, y: heightPx * 0.4, color: colors.research, radius: 5, pulsePhase: 0 },
          { id: 'n2', name: '', x: width * 0.35, y: heightPx * 0.25, color: colors.analysis, radius: 5, pulsePhase: 1 },
          { id: 'n3', name: '', x: width * 0.5, y: heightPx * 0.65, color: colors.manager, radius: 7, pulsePhase: 2 },
          { id: 'n4', name: '', x: width * 0.7, y: heightPx * 0.35, color: colors.development, radius: 5, pulsePhase: 3 },
          { id: 'n5', name: '', x: width * 0.9, y: heightPx * 0.55, color: colors.verification, radius: 5, pulsePhase: 4 },
        ];

        curves = [
          {
            id: 'amb1',
            from: nodes[0],
            to: nodes[2],
            cp1: { x: width * 0.2, y: heightPx * 0.7 },
            cp2: { x: width * 0.35, y: heightPx * 0.6 },
            color: colors.research
          },
          {
            id: 'amb2',
            from: nodes[1],
            to: nodes[2],
            cp1: { x: width * 0.4, y: heightPx * 0.4 },
            cp2: { x: width * 0.45, y: heightPx * 0.5 },
            color: colors.analysis
          },
          {
            id: 'amb3',
            from: nodes[2],
            to: nodes[3],
            cp1: { x: width * 0.55, y: heightPx * 0.5 },
            cp2: { x: width * 0.65, y: heightPx * 0.3 },
            color: colors.development
          },
          {
            id: 'amb4',
            from: nodes[2],
            to: nodes[4],
            cp1: { x: width * 0.65, y: heightPx * 0.8 },
            cp2: { x: width * 0.8, y: heightPx * 0.7 },
            color: colors.verification
          }
        ];
      } else {
        // Matrix flow: interlocking mesh for capabilities
        nodes = [
          { id: 'cap-m', name: 'Manager', x: width * 0.5, y: heightPx * 0.18, color: colors.manager, radius: 7, pulsePhase: 0 },
          { id: 'cap-r', name: 'Research', x: width * 0.2, y: heightPx * 0.5, color: colors.research, radius: 6, pulsePhase: 1 },
          { id: 'cap-a', name: 'Analysis', x: width * 0.4, y: heightPx * 0.8, color: colors.analysis, radius: 6, pulsePhase: 2 },
          { id: 'cap-d', name: 'Dev', x: width * 0.6, y: heightPx * 0.8, color: colors.development, radius: 6, pulsePhase: 3 },
          { id: 'cap-v', name: 'Verification', x: width * 0.8, y: heightPx * 0.5, color: colors.verification, radius: 6, pulsePhase: 4 },
        ];

        curves = [
          { id: 'c1', from: nodes[0], to: nodes[1], cp1: { x: width * 0.3, y: heightPx * 0.25 }, cp2: { x: width * 0.2, y: heightPx * 0.35 }, color: colors.research },
          { id: 'c2', from: nodes[0], to: nodes[2], cp1: { x: width * 0.45, y: heightPx * 0.4 }, cp2: { x: width * 0.38, y: heightPx * 0.6 }, color: colors.analysis },
          { id: 'c3', from: nodes[0], to: nodes[3], cp1: { x: width * 0.55, y: heightPx * 0.4 }, cp2: { x: width * 0.62, y: heightPx * 0.6 }, color: colors.development },
          { id: 'c4', from: nodes[0], to: nodes[4], cp1: { x: width * 0.7, y: heightPx * 0.25 }, cp2: { x: width * 0.8, y: heightPx * 0.35 }, color: colors.verification },
          { id: 'c5', from: nodes[1], to: nodes[2], cp1: { x: width * 0.25, y: heightPx * 0.65 }, cp2: { x: width * 0.35, y: heightPx * 0.75 }, color: colors.analysis },
          { id: 'c6', from: nodes[3], to: nodes[4], cp1: { x: width * 0.65, y: heightPx * 0.75 }, cp2: { x: width * 0.75, y: heightPx * 0.65 }, color: colors.verification }
        ];
      }

      // Generate particles
      const particleTotal = variant === 'orchestration' ? 36 : 24;
      particles = [];
      for (let i = 0; i < particleTotal; i++) {
        const pathIndex = i % curves.length;
        const curve = curves[pathIndex];
        particles.push({
          pathIndex,
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          size: 1.8 + Math.random() * 1.6,
          color: curve.color,
          glowColor: curve.color,
          trail: [],
          trailLength: 6 + Math.floor(Math.random() * 6),
          reverse: Math.random() > 0.75
        });
      }
    };

    setupDimensionsAndNodes();

    // Mouse interaction handler (subtle deflection)
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Bezier evaluation
    const getBezierPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number
    ) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
      };
    };

    // Render loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, heightPx);

      // Draw faint base pathways
      curves.forEach((curve) => {
        const isFocused = !activeAgent || activeAgent === 'manager' || curve.id === activeAgent || curve.from.id === activeAgent || curve.to.id === activeAgent;
        const baseAlpha = isFocused ? 0.18 : 0.06;

        ctx.beginPath();
        ctx.moveTo(curve.from.x, curve.from.y);
        ctx.bezierCurveTo(curve.cp1.x, curve.cp1.y, curve.cp2.x, curve.cp2.y, curve.to.x, curve.to.y);
        ctx.strokeStyle = curve.color;
        ctx.globalAlpha = baseAlpha;
        ctx.lineWidth = isFocused ? 1.5 : 1.0;
        ctx.stroke();

        // Secondary subtle glow line for active paths
        if (isFocused) {
          ctx.beginPath();
          ctx.moveTo(curve.from.x, curve.from.y);
          ctx.bezierCurveTo(curve.cp1.x, curve.cp1.y, curve.cp2.x, curve.cp2.y, curve.to.x, curve.to.y);
          ctx.strokeStyle = curve.color;
          ctx.globalAlpha = 0.08;
          ctx.lineWidth = 4.0;
          ctx.stroke();
        }
      });

      // Update and draw flowing particles
      if (!prefersReducedMotion) {
        particles.forEach((p) => {
          const curve = curves[p.pathIndex];
          if (!curve) return;

          const isFocused = !activeAgent || activeAgent === 'manager' || curve.id === activeAgent || curve.from.id === activeAgent || curve.to.id === activeAgent;
          const currentSpeed = isFocused ? p.speed : p.speed * 0.4;

          // Progress along curve
          if (p.reverse) {
            p.t -= currentSpeed;
            if (p.t <= 0) p.t = 1;
          } else {
            p.t += currentSpeed;
            if (p.t >= 1) p.t = 0;
          }

          let pt = getBezierPoint(curve.from, curve.cp1, curve.cp2, curve.to, p.t);

          // Subtle cursor deflection
          if (mouseRef.current.active) {
            const mdx = pt.x - mouseRef.current.x;
            const mdy = pt.y - mouseRef.current.y;
            const dist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (dist < 100 && dist > 1) {
              const push = (1 - dist / 100) * 12;
              pt.x += (mdx / dist) * push;
              pt.y += (mdy / dist) * push;
            }
          }

          // Maintain trail
          p.trail.unshift({ x: pt.x, y: pt.y });
          if (p.trail.length > p.trailLength) {
            p.trail.pop();
          }

          // Draw trail
          if (p.trail.length > 1) {
            for (let j = 0; j < p.trail.length - 1; j++) {
              const tp1 = p.trail[j];
              const tp2 = p.trail[j + 1];
              const trailAlpha = (1 - j / p.trail.length) * (isFocused ? 0.35 : 0.12);

              ctx.beginPath();
              ctx.moveTo(tp1.x, tp1.y);
              ctx.lineTo(tp2.x, tp2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = trailAlpha;
              ctx.lineWidth = p.size * (1 - j / p.trail.length);
              ctx.stroke();
            }
          }

          // Draw head particle
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = isFocused ? 0.9 : 0.4;
          ctx.fill();

          // Particle outer glow
          if (isFocused) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.glowColor;
            ctx.globalAlpha = 0.25;
            ctx.fill();
          }
        });
      }

      // Draw Nodes
      if (showNodes) {
        nodes.forEach((node) => {
          const isNodeActive = !activeAgent || activeAgent === node.id || (activeAgent === 'manager' && node.id === 'manager');
          const pulse = prefersReducedMotion ? 1 : 1 + Math.sin(time * 0.003 + node.pulsePhase) * 0.18;
          const r = node.radius * pulse;

          // Outer aura
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = isNodeActive ? 0.15 : 0.05;
          ctx.fill();

          // Core circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = isNodeActive ? 0.85 : 0.35;
          ctx.fill();

          // White center highlight
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = isNodeActive ? 0.95 : 0.4;
          ctx.fill();
        });
      }

      ctx.globalAlpha = 1.0;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(0);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(() => {
      setupDimensionsAndNodes();
      if (prefersReducedMotion) render(0);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [variant, activeAgent, height, showNodes, interactive]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`gateway-flow-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        overflow: 'hidden',
        pointerEvents: 'none', // Critical requirement: never block clicks or interactions
      }}
    >
      <canvas
        ref={canvasRef}
        className="gateway-flow-canvas"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
