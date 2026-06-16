<script setup>
const projects = [
  {
    title: 'Possible Words',
    description: 'Generates and catalogues pronounceable words that aren\'t in the English dictionary yet. Users can suggest definitions and vote — like claiming uncharted linguistic territory.',
    url: 'https://possiblewords.jimtaylor.space',
    emoji: '🔤',
    status: 'Coming Soon',
  },
  {
    title: 'Slow Carb Randomizer',
    description: 'A mobile app that generates random food combinations following the slow carb diet popularised by Tim Ferriss. No thinking, just eating.',
    url: 'https://slowcarbrandomizer.jimtaylor.space',
    emoji: '🥗',
    status: 'Coming Soon',
  },
  {
    title: 'REGGULAR',
    description: 'A SaaS app for running an egg delivery business — customer ordering, admin dashboards, route planning, and subscription management all in one place.',
    url: 'https://reggular.jimtaylor.space',
    emoji: '🥚',
    status: 'Coming Soon',
  },
]
</script>

<template>
  <section id="projects" class="projects section">
    <div class="section-inner">
      <h2 class="section-label">Projects</h2>
      <div class="project-grid">
        <article v-for="p in projects" :key="p.title" class="project-card">
          <h3 class="project-title">
            <span aria-hidden="true">{{ p.emoji }}</span>
            {{ p.title }}
            <span v-if="p.status" class="status-badge">{{ p.status }}</span>
          </h3>
          <p class="project-desc">{{ p.description }}</p>
          <span v-if="p.status" class="project-link project-link--disabled">
            Visit <span aria-hidden="true">&rarr;</span>
          </span>
          <a v-else :href="p.url" class="project-link" target="_blank" rel="noopener">
            Visit <span aria-hidden="true">&rarr;</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 6rem 2rem;
  background: var(--color-bg-elevated);
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

.project-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.project-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent-glow);
}

.status-badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--color-accent);
  color: var(--color-bg);
  vertical-align: middle;
  margin-left: 0.5rem;
}

.project-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

.project-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-link {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.project-link--disabled {
  opacity: 0.45;
  cursor: not-allowed;
  user-select: none;
}
</style>
