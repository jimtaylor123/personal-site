<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="preview-header">
    <RouterLink to="/" class="wordmark" aria-label="Jim Taylor home">jim taylor<span class="wordmark-dot">.</span></RouterLink>
    <nav aria-label="Main navigation">
      <RouterLink to="/#work">Work</RouterLink>
      <RouterLink to="/#about">About</RouterLink>
      <RouterLink to="/uses">Uses</RouterLink>
      <RouterLink to="/personal">Personal</RouterLink>
      <RouterLink to="/#links">Contact <span aria-hidden="true">↗</span></RouterLink>
    </nav>
  </header>
</template>
