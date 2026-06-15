<script setup>
const categories = [
  {
    title: 'Editor & Terminal',
    items: [
      { label: 'VS Code', desc: 'Primary editor — One Dark Pro theme' },
      { label: 'Codex', desc: 'AI-assisted coding in the terminal' },
      { label: 'Vim', desc: 'Quick edits and config files' },
      { label: 'Zsh', desc: 'Default shell in VS Code — aliases and git shortcuts' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { label: 'Vue 3', desc: 'Composition API, Vite, Pinia' },
      { label: 'Vuetify', desc: 'Material component library for Vue' },
      { label: 'shadcn/vue', desc: 'Component primitives, copy-paste style' },
      { label: 'Tailwind CSS', desc: 'Rapid prototyping' },
      { label: 'Playwright', desc: 'E2E tests that don\'t flake' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { label: 'Laravel', desc: 'Daily driver — APIs, queues, auth' },
      { label: 'PHP 8.4', desc: 'With strict types everywhere' },
      { label: 'MySQL / PostgreSQL', desc: 'Relational, always' },
      { label: 'SQLite', desc: 'Lightweight dev and testing' },
      { label: 'Redis', desc: 'Caching, sessions, queues' },
    ],
  },
  {
    title: 'Security & Infra',
    items: [
      { label: 'Burp Suite', desc: 'Web app pentesting' },
      { label: 'Wireshark', desc: 'Network analysis' },
      { label: 'Docker', desc: 'Local dev, CI, deployment' },
      { label: 'DigitalOcean', desc: 'Primary cloud provider' },
      { label: 'Cloudflare', desc: 'DNS, WAF, CDN' },
    ],
  },
  {
    title: 'AI Tools',
    items: [
      { label: 'Opencode', desc: 'Primary AI harness — terminal-native, agent-driven' },
      { label: 'Big Pickle', desc: 'Default model — strong reasoning, no fluff' },
      { label: 'SuperWhisper', desc: 'AI voice transcription for notes and dictation' },
    ],
  },
  {
    title: 'Refreshments',
    items: [
      { label: 'French Press', desc: 'Morning ritual, never instant' },
      { label: 'Brazilian Coffee', desc: 'Single origin, medium roast' },
      { label: 'Pain au Chocolat', desc: 'The reason I go to the bakery' },
    ],
  },
  {
    title: 'Hardware',
    items: [
      { label: 'MacBook Pro M3', desc: '16", 36GB RAM — daily driver' },
      { label: 'LG 27" 4K', desc: 'Main monitor' },
      { label: 'Apple Magic Keyboard', desc: 'Low profile, reliable' },
      { label: 'Logitech MX Master 3S', desc: 'Ergo, silent clicks' },
      { label: 'YoYo Standing Desk', desc: 'Standing desk for focus sessions' },
    ],
  },
]
</script>

<template>
  <main class="uses-page">
    <section class="uses-hero">
      <h1 class="uses-title">/uses</h1>
      <p class="uses-subtitle">The tools and gear I use daily.</p>
      <p class="uses-quote">"Less, but better." — Dieter Rams</p>
    </section>
    <section class="uses-content section">
      <div class="section-inner">
        <div v-for="cat in categories" :key="cat.title" class="cat">
          <h2 class="cat-title">{{ cat.title }}</h2>
          <ul class="cat-list">
            <li v-for="item in cat.items" :key="item.label" class="cat-item">
              <span class="item-label">{{ item.label }}</span>
              <span class="item-desc">{{ item.desc }}</span>
            </li>
          </ul>
        </div>
        <p class="uses-footnote">
          Inspired by
          <a href="https://uses.tech" target="_blank" rel="noopener">uses.tech</a>.
        </p>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.uses-page {
  padding-top: var(--nav-height);
}

.uses-hero {
  padding: 6rem 2rem 3rem;
  text-align: center;
}

.uses-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.uses-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.uses-quote {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-style: italic;
  color: var(--color-text-muted);
  opacity: 0.7;
}

.section {
  padding: 2rem 2rem 6rem;
  background: var(--color-bg);
  transition: background-color 0.3s;
}

.section-inner {
  max-width: 600px;
  margin: 0 auto;
}

.cat {
  margin-bottom: 2.5rem;
}

.cat-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.cat-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cat-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  transition: border-color 0.2s, background-color 0.2s;
}

.cat-item:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-glow);
}

.item-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
}

.item-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: right;
  max-width: 50%;
}

.uses-footnote {
  margin-top: 3rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
