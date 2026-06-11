<script setup>
const social = [
  { label: 'GitHub', url: 'https://github.com/jimtaylor' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/jimtaylor' },
]

const community = [
  { label: 'My Church', url: 'https://church.jimtaylor.space' },
]
</script>

<template>
  <section id="links" class="links section">
    <div class="section-inner">
      <h2 class="section-label">Links</h2>
      <div class="link-groups">
        <div class="link-group">
          <h3 class="link-group-title">Professional</h3>
          <ul class="link-list">
            <li v-for="l in social" :key="l.label">
              <a :href="l.url" target="_blank" rel="noopener" class="link-item">
                <span class="link-label">{{ l.label }}</span>
                <span class="link-arrow">&rarr;</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="link-group">
          <h3 class="link-group-title">Community</h3>
          <ul class="link-list">
            <li v-for="l in community" :key="l.label">
              <a :href="l.url" target="_blank" rel="noopener" class="link-item">
                <span class="link-label">{{ l.label }}</span>
                <span class="link-arrow">&rarr;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
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

.link-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.link-group-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: border-color 0.2s, background-color 0.2s;
}

.link-item:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-glow);
}

.link-label {
  font-weight: 500;
  font-size: 0.95rem;
}

.link-arrow {
  color: var(--color-text-muted);
  transition: transform 0.2s;
}

.link-item:hover .link-arrow {
  transform: translateX(4px);
  color: var(--color-accent);
}
</style>
