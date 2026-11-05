<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import WorkshopHeader from './components/WorkshopHeader.vue'
import './workshop.css'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DesignPreview from './previews/DesignPreview.vue'
const route = useRoute()
const preview = computed(() => ['editorial', 'studio', 'workshop'].includes(route.params.style) ? route.params.style : null)
</script>

<template>
  <DesignPreview v-if="preview" :style-name="preview" />
  <template v-else-if="route.name === 'original'">
    <SiteHeader />
    <RouterView />
  </template>
  <DesignPreview v-else-if="route.name === 'home'" style-name="workshop" :comparison="false" />
  <div v-else class="design-preview workshop workshop-shell">
    <div class="preview-page">
      <WorkshopHeader />
      <RouterView />
    </div>
  </div>
</template>
