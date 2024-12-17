"use client";

import React, { useEffect, useRef } from "react";
import { useThrottle } from "@/lib/hooks/useThrottle";
import { WebGLRenderer } from "./webgl-renderer";

interface NetworkBackgroundProps {
  className?: string;
  density?: number; // Points per 1000px²
  maxConnections?: number;
  connectionDistance?: number;
  speed?: number;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
  className = "",
  density = 1,
  connectionDistance = 150,
  speed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<WebGLRenderer>();
  const workerRef = useRef<Worker>();
  const rafIdRef = useRef<number>();
  const isRunningRef = useRef(false);

  // Initialize WebGL and Web Worker
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize WebGL renderer
    rendererRef.current = new WebGLRenderer(canvasRef.current);

    // Initialize Web Worker
    workerRef.current = new Worker(
      new URL("./network.worker.ts", import.meta.url)
    );

    // Handle worker messages
    workerRef.current.onmessage = (e: MessageEvent) => {
      if (!rendererRef.current || !isRunningRef.current) return;

      const { points, connections } = e.data;

      rendererRef.current.clear();
      rendererRef.current.renderPoints(points, [0.5, 0.7, 1.0]);
      rendererRef.current.renderConnections(
        points,
        connections,
        [0.4, 0.6, 1.0],
        connectionDistance
      );

      // Request next frame
      rafIdRef.current = requestAnimationFrame(() => {
        workerRef.current?.postMessage({ type: "update" });
      });
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [connectionDistance]);

  // Handle resize
  const handleResize = useThrottle(() => {
    if (!canvasRef.current || !rendererRef.current || !workerRef.current)
      return;

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    const rect = canvasRef.current.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    // Update WebGL viewport
    rendererRef.current.resize(width, height);

    // Reinitialize worker with new dimensions
    workerRef.current.postMessage({
      type: "init",
      config: {
        width,
        height,
        density,
        speed,
        connectionDistance,
      },
    });

    // Start animation if not running
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      workerRef.current.postMessage({ type: "update" });
    }
  }, 100);

  // Set up resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default NetworkBackground;
