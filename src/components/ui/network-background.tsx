"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
  connections: number[];
}

interface Connection {
  start: number;
  end: number;
}

interface Dimensions {
  width: number;
  height: number;
}

const generatePoints = (count: number, width: number, height: number): Point[] => {
  const points: Point[] = [];
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    const randomX = (Math.random() - 0.5) * (cellWidth * 0.7);
    const randomY = (Math.random() - 0.5) * (cellHeight * 0.7);
    
    points.push({
      x: (col * cellWidth) + (cellWidth / 2) + randomX,
      y: (row * cellHeight) + (cellHeight / 2) + randomY,
      connections: []
    });
  }

  return points;
};

const generateConnections = (points: Point[]): Connection[] => {
  const connections: Connection[] = [];
  
  points.forEach((point, i) => {
    const otherIndices = Array.from(
      { length: points.length }, 
      (_, index) => index
    ).filter(j => j !== i);

    const others = otherIndices
      .map(j => ({
        index: j,
        distance: Math.hypot(points[j].x - point.x, points[j].y - point.y)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2 + Math.floor(Math.random() * 2)); // Reduced from 3 to 2 for cleaner look

    others.forEach(other => {
      if (other.distance < 350 && !connections.some(c => 
        (c.start === i && c.end === other.index) || 
        (c.start === other.index && c.end === i)
      )) {
        connections.push({ start: i, end: other.index });
        points[i].connections.push(other.index);
      }
    });
  });

  return connections;
};

interface DotGridProps {
  width: number;
  height: number;
}

const DotGridTexture: React.FC<DotGridProps> = ({ width, height }) => {
  const spacing = 24; // Increased from 12 to 24 for sparser dots
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  
  const dots: JSX.Element[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const centerX = width / 2;
      const centerY = height / 2;
      const distanceFromCenter = Math.hypot(
        (x * spacing) - centerX,
        (y * spacing) - centerY
      );
      const maxDistance = Math.hypot(width / 2, height / 2);
      
      const random = Math.random();
      
      const opacity = Math.max(0, Math.min(1, 
        (1 - (distanceFromCenter / maxDistance)) * 0.4 * (random > 0.3 ? 1 : 0)
      ));

      if (opacity > 0) {
        dots.push(
          <circle
            key={`${x}-${y}`}
            cx={x * spacing}
            cy={y * spacing}
            r={0.6} // Reduced from 0.8 to 0.6 for more delicate dots
            fill="#93C5FD"
            fillOpacity={opacity * 0.15}
          />
        );
      }
    }
  }

  return (
    <svg
      className="absolute inset-0"
      width={width}
      height={height}
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    >
      {dots}
    </svg>
  );
};

export const NetworkBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 1920, height: 1080 });
  const [points, setPoints] = useState<Point[]>(() => generatePoints(25, dimensions.width, dimensions.height)); // Reduced from 35 to 25
  const [connections, setConnections] = useState<Connection[]>(() => generateConnections(points));
  const [activeLines, setActiveLines] = useState<number[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.round(window.innerWidth);
      const height = Math.round(window.innerHeight);
      setDimensions({ width, height });
      setPoints(generatePoints(25, width, height));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    setConnections(generateConnections(points));
  }, [points]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveLines = Array.from({ length: 2 }, () => 
        Math.floor(Math.random() * connections.length)
      );
      setActiveLines(newActiveLines);
    }, 2000);

    return () => clearInterval(interval);
  }, [connections.length]);

  return (
    <div 
      className="fixed inset-0 w-full h-full"
      style={{
        transform: 'translate3d(0,0,0)',
      }}
    >
      {/* Rich gradient background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 80% -10%, #0A1445, #050B2E)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(100% 100% at 50% 50%, transparent 35%, rgba(5,11,46,0.8))',
          transform: 'translate3d(0,0,0)',
        }}
      />

      <DotGridTexture width={dimensions.width} height={dimensions.height} />

      <svg 
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.4)" />
            <stop offset="100%" stopColor="rgba(196, 181, 253, 0.4)" />
          </linearGradient>
        </defs>
        <g>
          {connections.map((connection, i) => {
            const start = points[connection.start];
            const end = points[connection.end];
            const isActive = activeLines.includes(i);

            return (
              <motion.line
                key={`${connection.start}-${connection.end}`}
                x1={Math.round(start.x)}
                y1={Math.round(start.y)}
                x2={Math.round(end.x)}
                y2={Math.round(end.y)}
                stroke={isActive ? "url(#lineGradient)" : "rgba(147, 197, 253, 0.15)"}
                strokeWidth={isActive ? "1.2" : "0.8"}
                initial={false}
                animate={isActive ? {
                  stroke: ["rgba(147, 197, 253, 0.15)", "url(#lineGradient)", "rgba(147, 197, 253, 0.15)"],
                } : {}}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {points.map((point, i) => (
            <circle
              key={i}
              cx={Math.round(point.x)}
              cy={Math.round(point.y)}
              r="1"
              fill="#93C5FD"
              fillOpacity="0.2"
            />
          ))}
        </g>
      </svg>

      {/* Light source effect */}
      <div 
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.15), transparent 50%)',
          transform: 'translate3d(0,0,0)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};