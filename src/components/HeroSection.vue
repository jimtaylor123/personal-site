<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()
const canvasRef = ref(null)
let animId = null

const heroImage = computed(() =>
  theme.value === 'dark' ? '/images/not-smiling.webp' : '/images/smiling.webp'
)

const vertexSrc = `attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragmentSrc = `precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uIsLight;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= aspect;

  float t = uTime * 0.06;

  vec3 dDark = vec3(0.015, 0.015, 0.025);
  vec3 dMid  = vec3(0.03, 0.025, 0.05);
  vec3 dAcc  = vec3(0.045, 0.035, 0.08);

  vec3 lDark = vec3(0.96, 0.94, 0.90);
  vec3 lMid  = vec3(0.90, 0.88, 0.84);
  vec3 lAcc  = vec3(0.84, 0.80, 0.75);

  vec3 dark  = mix(dDark, lDark, uIsLight);
  vec3 mid   = mix(dMid,  lMid,  uIsLight);
  vec3 acc   = mix(dAcc,  lAcc,  uIsLight);

  float n1 = noise(p * 1.8 + t * 0.5);
  float n2 = noise(p * 2.5 - t * 0.3 + 10.0);
  float n3 = noise(p * 3.2 + t * 0.7 + 20.0);

  float blend = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
  vec3 col = mix(dark, mid, blend);
  col = mix(col, acc, smoothstep(0.4, 0.8, n2));

  float vig = 1.0 - length(p) * 0.6;
  col *= vig;

  float glow = exp(-length(p) * 2.5) * 0.15;
  col += vec3(0.8, 0.5, 0.2) * glow;

  gl_FragColor = vec4(col, 1.0);
}`

function compileShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function createProgram(gl, vs, fs) {
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  return prog
}

function initGL(canvas) {
  const gl = canvas.getContext('webgl', { alpha: false })
  if (!gl) return null

  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)
  const prog = createProgram(gl, vs, fs)
  gl.useProgram(prog)

  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  const aLoc = gl.getAttribLocation(prog, 'aPosition')
  gl.enableVertexAttribArray(aLoc)
  gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'uResolution')
  const uTime = gl.getUniformLocation(prog, 'uTime')
  const uIsLight = gl.getUniformLocation(prog, 'uIsLight')

  return { gl, prog, uRes, uTime, uIsLight }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = initGL(canvas)
  if (!ctx) return

  const { gl, uRes, uTime, uIsLight } = ctx

  function resize() {
    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)
  }

  resize()
  window.addEventListener('resize', resize)

  let start = performance.now()

  function frame() {
    gl.uniform1f(uTime, (performance.now() - start) / 1000)
    gl.uniform1f(uIsLight, theme.value === 'light' ? 1.0 : 0.0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animId = requestAnimationFrame(frame)
  }

  animId = requestAnimationFrame(frame)

  onBeforeUnmount(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <section class="hero" :class="theme">
    <canvas ref="canvasRef" class="hero-canvas" />
    <div class="hero-overlay">
      <img :src="heroImage" alt="Jim Taylor" class="hero-portrait" />
      <h1 class="hero-title">Jim Taylor</h1>
      <p class="hero-subtitle">Full Stack Developer / Cybersecurity</p>
      <div class="hero-cta">
        <a href="#about" class="btn btn-primary">About Me</a>
        <a href="#projects" class="btn btn-outline">Projects</a>
      </div>
    </div>
    <div class="scroll-indicator">
      <span class="scroll-text">Scroll</span>
      <span class="scroll-line"></span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.hero-overlay {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
}

.hero-portrait {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 1.5rem;
  border: 2px solid rgba(245, 158, 76, 0.3);
  box-shadow: 0 0 40px rgba(245, 158, 76, 0.15);
  transition: border-color 0.3s, box-shadow 0.3s;
}

@media (min-width: 768px) {
  .hero-portrait {
    width: 160px;
    height: 160px;
  }
}

.hero-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(3rem, 8vw, 7rem);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.hero.dark .hero-title {
  color: #fff;
  text-shadow: 0 0 60px rgba(245, 158, 76, 0.1);
}

.hero.light .hero-title {
  color: #1a1a2e;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  transition: color 0.3s;
}

.hero.dark .hero-subtitle {
  color: rgba(255, 255, 255, 0.6);
}

.hero.light .hero-subtitle {
  color: rgba(26, 26, 46, 0.5);
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--color-accent);
  color: #08080f;
  border: 1px solid var(--color-accent);
}

.btn-primary:hover {
  background: transparent;
  color: var(--color-accent);
}

.hero.dark .btn-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero.dark .btn-outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.hero.light .btn-outline {
  background: transparent;
  color: rgba(26, 26, 46, 0.7);
  border: 1px solid rgba(26, 26, 46, 0.2);
}

.hero.light .btn-outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.hero.dark .scroll-text {
  color: rgba(255, 255, 255, 0.35);
}

.hero.light .scroll-text {
  color: rgba(26, 26, 46, 0.25);
}

.hero.dark .scroll-line {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.35), transparent);
}

.hero.light .scroll-line {
  background: linear-gradient(to bottom, rgba(26, 26, 46, 0.25), transparent);
}

.scroll-text {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: color 0.3s;
}

.scroll-line {
  width: 1px;
  height: 40px;
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
