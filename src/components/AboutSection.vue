<script setup>
const tech = [
  'PHP / Laravel',
  'Vue / Nuxt',
  'JavaScript / TypeScript',
  'Python',
  'Linux / Docker',
  'Penetration Testing',
  'Cloud (AWS / DigitalOcean)',
  'Security Hardening',
]
</script>

<template>
  <section id="about" class="about section">
    <div class="section-inner">
      <h2 class="section-label">About</h2>
      <div class="about-content">
        <p class="about-text">
          Full stack developer focused on Laravel and Vue, with a deep
          interest in cybersecurity. I build clean, secure applications
          and spend my free time studying system hardening, network
          security, and offensive-defense tooling.
        </p>
        <p class="about-text">
          I believe in writing software that's not only functional but
          resilient — code that holds up under scrutiny.
        </p>
      </div>
      <ul class="tech-list">
        <li v-for="t in tech" :key="t" class="tech-item">{{ t }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 6rem 2rem;
  background: var(--color-bg);
  transition: background-color 0.3s;
}

.section-inner {
  max-width: 720px;
  margin: 0 auto;
}

.section-label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text);
  max-width: 580px;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}

.tech-item {
  font-size: 0.8rem;
  padding: 0.35rem 0.85rem;
  border-radius: 100px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: border-color 0.2s, color 0.2s;
}

.tech-item:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
