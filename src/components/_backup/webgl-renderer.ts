import {
  vertexShader,
  fragmentShader,
  lineVertexShader,
  lineFragmentShader,
} from "./shaders";

export class WebGLRenderer {
  private gl: WebGLRenderingContext;
  private pointProgram: WebGLProgram;
  private lineProgram: WebGLProgram;
  private projectionMatrix: Float32Array;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!gl) throw new Error("WebGL not supported");
    this.gl = gl;

    // Create shader programs
    this.pointProgram = this.createProgram(vertexShader, fragmentShader);
    this.lineProgram = this.createProgram(lineVertexShader, lineFragmentShader);

    // Initialize projection matrix
    this.projectionMatrix = new Float32Array(16);
    this.updateProjectionMatrix(canvas.width, canvas.height);

    // Set initial GL state
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);
    if (!shader) throw new Error("Failed to create shader");

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const info = this.gl.getShaderInfoLog(shader);
      this.gl.deleteShader(shader);
      throw new Error("Shader compilation error: " + info);
    }

    return shader;
  }

  private createProgram(
    vertexSource: string,
    fragmentSource: string
  ): WebGLProgram {
    const program = this.gl.createProgram();
    if (!program) throw new Error("Failed to create program");

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentSource
    );

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const info = this.gl.getProgramInfoLog(program);
      throw new Error("Program linking error: " + info);
    }

    return program;
  }

  private updateProjectionMatrix(width: number, height: number) {
    // Create orthographic projection matrix
    const left = 0;
    const right = width;
    const bottom = height;
    const top = 0;
    const near = -1;
    const far = 1;

    const w = right - left;
    const h = bottom - top;
    const d = far - near;

    this.projectionMatrix[0] = 2 / w;
    this.projectionMatrix[1] = 0;
    this.projectionMatrix[2] = 0;
    this.projectionMatrix[3] = 0;
    this.projectionMatrix[4] = 0;
    this.projectionMatrix[5] = -2 / h;
    this.projectionMatrix[6] = 0;
    this.projectionMatrix[7] = 0;
    this.projectionMatrix[8] = 0;
    this.projectionMatrix[9] = 0;
    this.projectionMatrix[10] = -2 / d;
    this.projectionMatrix[11] = 0;
    this.projectionMatrix[12] = -(right + left) / w;
    this.projectionMatrix[13] = -(bottom + top) / h;
    this.projectionMatrix[14] = -(far + near) / d;
    this.projectionMatrix[15] = 1;
  }

  public resize(width: number, height: number) {
    this.gl.viewport(0, 0, width, height);
    this.updateProjectionMatrix(width, height);
  }

  public clear() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public renderPoints(
    points: Array<{ x: number; y: number }>,
    color: [number, number, number]
  ) {
    const gl = this.gl;
    gl.useProgram(this.pointProgram);

    // Create buffer data
    const positions = new Float32Array(points.length * 2);
    const alphas = new Float32Array(points.length);

    points.forEach((point, i) => {
      positions[i * 2] = point.x;
      positions[i * 2 + 1] = point.y;
      alphas[i] = 0.8;
    });

    // Set uniforms
    const projectionLocation = gl.getUniformLocation(
      this.pointProgram,
      "uProjectionMatrix"
    );
    const colorLocation = gl.getUniformLocation(this.pointProgram, "uColor");
    const pointSizeLocation = gl.getUniformLocation(
      this.pointProgram,
      "uPointSize"
    );

    gl.uniformMatrix4fv(projectionLocation, false, this.projectionMatrix);
    gl.uniform3fv(colorLocation, new Float32Array(color));
    gl.uniform1f(pointSizeLocation, 4.0);

    // Set attributes
    const positionLocation = gl.getAttribLocation(
      this.pointProgram,
      "position"
    );
    const alphaLocation = gl.getAttribLocation(this.pointProgram, "alpha");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const alphaBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(alphaLocation);
    gl.vertexAttribPointer(alphaLocation, 1, gl.FLOAT, false, 0, 0);

    // Draw points
    gl.drawArrays(gl.POINTS, 0, points.length);
  }

  public renderConnections(
    points: Array<{ x: number; y: number }>,
    connections: Array<[number, number, number]>,
    color: [number, number, number],
    maxDistance: number
  ) {
    const gl = this.gl;
    gl.useProgram(this.lineProgram);

    // Create buffer data
    const positions = new Float32Array(connections.length * 4);
    const alphas = new Float32Array(connections.length * 2);

    connections.forEach((connection, i) => {
      const [pointIndex1, pointIndex2, distance] = connection;
      const point1 = points[pointIndex1];
      const point2 = points[pointIndex2];

      positions[i * 4] = point1.x;
      positions[i * 4 + 1] = point1.y;
      positions[i * 4 + 2] = point2.x;
      positions[i * 4 + 3] = point2.y;

      const alpha = 1 - distance / maxDistance;
      alphas[i * 2] = alpha;
      alphas[i * 2 + 1] = alpha;
    });

    // Set uniforms
    const projectionLocation = gl.getUniformLocation(
      this.lineProgram,
      "uProjectionMatrix"
    );
    const colorLocation = gl.getUniformLocation(this.lineProgram, "uColor");

    gl.uniformMatrix4fv(projectionLocation, false, this.projectionMatrix);
    gl.uniform3fv(colorLocation, new Float32Array(color));

    // Set attributes
    const positionLocation = gl.getAttribLocation(this.lineProgram, "position");
    const alphaLocation = gl.getAttribLocation(this.lineProgram, "alpha");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const alphaBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(alphaLocation);
    gl.vertexAttribPointer(alphaLocation, 1, gl.FLOAT, false, 0, 0);

    // Draw lines
    gl.drawArrays(gl.LINES, 0, connections.length * 2);
  }
}
