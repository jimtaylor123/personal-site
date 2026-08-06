<script setup>
import { ref, computed } from 'vue'

const tech = [
  { label: 'PHP / Laravel', category: 'earning' },
  { label: 'React', category: 'earning' },
  { label: 'Vue / Nuxt', category: 'earning' },
  { label: 'JavaScript / TypeScript', category: 'earning' },
  { label: 'Python', category: 'learning' },
  { label: 'Linux / Docker', category: 'earning' },
  { label: 'Penetration Testing', category: 'learning' },
  { label: 'Cloud (AWS / DigitalOcean)', category: 'earning' },
  { label: 'Codex', category: 'earning' },
  { label: 'Figma', category: 'earning' },
  { label: 'Jira', category: 'earning' },
  { label: 'PKI', category: 'earning' },
  { label: 'Business Analysis', category: 'earning' },
  { label: 'Playwright', category: 'earning' },
  { label: 'Behaviour Driven Development', category: 'earning' },
  { label: 'Security Hardening', category: 'learning' },
  { label: 'Claude', category: 'learning' },
  { label: 'Opencode', category: 'learning' },
]

const filter = ref(null)

const filtered = computed(() => {
  if (!filter.value) return tech
  return tech.filter(t => t.category === filter.value)
})

function setFilter(cat) {
  filter.value = filter.value === cat ? null : cat
}
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
      <div class="tech-filter">
        <button
          class="filter-btn earning"
          :class="{ active: filter === 'earning' }"
          @click="setFilter('earning')"
        >
          <span aria-hidden="true">💼</span> Earning
        </button>
        <button
          class="filter-btn learning"
          :class="{ active: filter === 'learning' }"
          @click="setFilter('learning')"
        >
          <span aria-hidden="true">📖</span> Learning
        </button>
      </div>
      <ul class="tech-list">
        <li
          v-for="t in filtered"
          :key="t.label"
          class="tech-item"
          :class="t.category"
        >{{ t.label }}</li>
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

.tech-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}

.filter-btn.earning {
  background: transparent;
  color: var(--color-text-muted);
}

.filter-btn.earning:hover {
  border-color: #65a30d;
  color: #65a30d;
}

.filter-btn.earning.active {
  background: rgba(101, 163, 13, 0.15);
  border-color: #65a30d;
  color: #65a30d;
}

.filter-btn.learning {
  background: transparent;
  color: var(--color-text-muted);
}

.filter-btn.learning:hover {
  border-color: #0ea5e9;
  color: #0ea5e9;
}

.filter-btn.learning.active {
  background: rgba(14, 165, 233, 0.15);
  border-color: #0ea5e9;
  color: #0ea5e9;
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
  transition: border-color 0.2s, color 0.2s;
}

.tech-item.earning {
  color: #65a30d;
  border-color: rgba(101, 163, 13, 0.3);
}

.tech-item.earning:hover {
  border-color: #65a30d;
  background: rgba(101, 163, 13, 0.1);
}

.tech-item.learning {
  color: #0ea5e9;
  border-color: rgba(14, 165, 233, 0.3);
}

.tech-item.learning:hover {
  border-color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
}
</style>
