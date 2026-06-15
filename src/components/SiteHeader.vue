<script setup>
import { RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="logo">Jim Taylor</RouterLink>
    <nav class="nav">
      <RouterLink to="/#about">About</RouterLink>
      <RouterLink to="/#projects">Projects</RouterLink>
      <RouterLink to="/#links">Links</RouterLink>
      <RouterLink to="/uses">Uses</RouterLink>
      <RouterLink to="/personal">Personal</RouterLink>
    </nav>
    <button class="theme-toggle" @click="toggle" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`">
      <svg v-if="theme === 'dark'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  z-index: 100;
  transition: background-color 0.3s, border-color 0.3s;
}

@media (min-width: 768px) {
  .site-header {
    padding: 0 2rem;
  }
}

.logo {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--nav-text);
  letter-spacing: -0.02em;
  justify-self: start;
  transition: color 0.3s;
  white-space: nowrap;
}

@media (min-width: 480px) {
  .logo {
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .logo {
    font-size: 1.15rem;
  }
}

.logo:hover {
  color: var(--color-accent);
}

.nav {
  display: flex;
  gap: 0.5rem;
  justify-self: center;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav::-webkit-scrollbar {
  display: none;
}

@media (min-width: 480px) {
  .nav {
    gap: 1rem;
  }
}

@media (min-width: 768px) {
  .nav {
    gap: 1.75rem;
  }
}

.nav a {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--nav-text-muted);
  transition: color 0.2s;
}

@media (min-width: 480px) {
  .nav a {
    font-size: 0.875rem;
  }
}

.nav a:hover {
  color: var(--nav-text);
}

.theme-toggle {
  background: var(--nav-toggle-bg);
  border: 1px solid var(--nav-toggle-border);
  border-radius: 8px;
  padding: 0.4rem;
  cursor: pointer;
  color: var(--nav-text-muted);
  display: flex;
  align-items: center;
  justify-self: end;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}

.theme-toggle:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-accent-glow);
}
</style>
