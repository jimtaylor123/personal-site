<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()
const heroImage = computed(() =>
  theme.value === 'dark' ? '/images/not-smiling.webp' : '/images/smiling.webp'
)
</script>

<template>
  <section class="hero" :class="theme">
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
  padding-bottom: 4rem;
  transition: background 0.3s;
}

.hero.dark {
  background:
    radial-gradient(60% 60% at 50% 0%, rgba(245, 158, 76, 0.08), transparent 70%),
    radial-gradient(80% 80% at 50% 50%, #10101a 0%, #08080f 72%);
}

.hero.light {
  background:
    radial-gradient(60% 60% at 50% 0%, rgba(217, 119, 6, 0.06), transparent 70%),
    radial-gradient(80% 80% at 50% 40%, #ffffff 0%, #f2f2f7 75%);
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
