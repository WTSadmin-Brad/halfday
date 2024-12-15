export const vertexShader = `
  attribute vec2 position;
  attribute float alpha;
  
  uniform mat4 uProjectionMatrix;
  uniform float uPointSize;
  
  varying float vAlpha;
  
  void main() {
    gl_Position = uProjectionMatrix * vec4(position, 0.0, 1.0);
    gl_PointSize = uPointSize;
    vAlpha = alpha;
  }
`;

export const fragmentShader = `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uColor;
  
  void main() {
    float distance = length(gl_PointCoord - vec2(0.5));
    if (distance > 0.5) {
      discard;
    }
    float alpha = smoothstep(0.5, 0.0, distance) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export const lineVertexShader = `
  attribute vec2 position;
  attribute float alpha;
  
  uniform mat4 uProjectionMatrix;
  
  varying float vAlpha;
  
  void main() {
    gl_Position = uProjectionMatrix * vec4(position, 0.0, 1.0);
    vAlpha = alpha;
  }
`;

export const lineFragmentShader = `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uColor;
  
  void main() {
    gl_FragColor = vec4(uColor, vAlpha);
  }
`;
