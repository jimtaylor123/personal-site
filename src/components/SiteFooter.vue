<template>
  <footer class="site-footer">
    <p class="footer-text">
      <span class="built-with">Built with Vue</span>
      <span class="sep">&middot;</span>
      <span class="csp">Hardened with CSP</span>
    </p>
    <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Jim Taylor</p>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 2.5rem 2rem;
  text-align: center;
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
  transition: background-color 0.3s, border-color 0.3s;
}

.footer-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.sep {
  margin: 0 0.5rem;
  opacity: 0.4;
}

.built-with,
.csp {
  font-family: var(--font-heading);
  font-weight: 500;
}

.footer-copy {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  opacity: 0.6;
}
</style>
