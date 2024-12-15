interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface WorkerConfig {
  width: number;
  height: number;
  density: number;
  speed: number;
  connectionDistance: number;
}

let points: Point[] = [];
let config: WorkerConfig;

// Calculate points positions and connections
function updatePoints() {
  points.forEach((point) => {
    // Update position
    point.x += point.vx;
    point.y += point.vy;

    // Bounce off walls
    if (point.x < 0 || point.x > config.width) point.vx *= -1;
    if (point.y < 0 || point.y > config.height) point.vy *= -1;
  });

  // Calculate connections
  const connections: Array<[number, number, number]> = [];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const otherPoint = points[j];
      const dx = point.x - otherPoint.x;
      const dy = point.y - otherPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.connectionDistance) {
        // Store indices and distance for WebGL rendering
        connections.push([i, j, distance]);
      }
    }
  }

  // Send updated data back to main thread
  self.postMessage({
    points: points.map((p) => ({ x: p.x, y: p.y })),
    connections,
  });
}

// Initialize points based on config
function initializePoints() {
  const area = config.width * config.height;
  const pointCount = Math.floor((area / 1000) * config.density);

  points = Array.from({ length: pointCount }, () => ({
    x: Math.random() * config.width,
    y: Math.random() * config.height,
    vx: (Math.random() - 0.5) * config.speed,
    vy: (Math.random() - 0.5) * config.speed,
  }));
}

// Handle messages from main thread
self.onmessage = (e: MessageEvent) => {
  switch (e.data.type) {
    case "init":
      config = e.data.config;
      initializePoints();
      break;
    case "update":
      updatePoints();
      break;
  }
};
