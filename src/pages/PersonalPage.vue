<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import SiteFooter from '../components/SiteFooter.vue'
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()

const places = [
  { name: 'Busan, South Korea', coords: [35.1796, 129.0756] },
  { name: 'Florianópolis, Brazil', coords: [-27.5973, -48.5496] },
  { name: 'Shenzhen, China', coords: [22.5431, 114.0579] },
  { name: 'Oxford, England', coords: [51.7520, -1.2577] },
  { name: 'London, England', coords: [51.5074, -0.1278] },
  { name: 'Manchester, England', coords: [53.4808, -2.2426] },
  { name: 'Clitheroe, England', coords: [53.8709, -2.3925] },
]

const mapContainer = ref(null)
let map = null
let tileLayer = null
let markers = []

function initMap() {
  const isDark = theme.value === 'dark'
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  if (map) {
    if (tileLayer) {
      map.removeLayer(tileLayer)
    }
    tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map)

    markers.forEach(m => {
      const icon = m.getIcon()
      const newColor = isDark ? '#f59e4c' : '#d97706'
      const newIcon = L.divIcon({
        className: 'custom-marker',
        html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${newColor}" stroke="white" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -28],
      })
      m.setIcon(newIcon)
    })
    return
  }

  map = L.map(mapContainer.value, {
    attributionControl: false,
    scrollWheelZoom: false,
  }).setView([35, 20], 2)

  tileLayer = L.tileLayer(tileUrl, {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  }).addTo(map)

  const markerColor = isDark ? '#f59e4c' : '#d97706'

  const bounds = L.latLngBounds()
  places.forEach((p) => {
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${markerColor}" stroke="white" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -28],
    })

    const m = L.marker(p.coords, { icon }).addTo(map)
    m.bindPopup(`<b>${p.name}</b>`, { closeButton: false, className: 'map-popup' })
    markers.push(m)
    bounds.extend(p.coords)
  })

  if (places.length > 1) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 })
  } else {
    map.setZoom(4)
  }

  map.on('click', () => {
    map.scrollWheelZoom.enable()
    mapContainer.value.classList.add('zoom-active')
  })
}

onMounted(() => {
  initMap()
})

watch(theme, () => {
  nextTick(initMap)
})

</script>

<template>
  <main class="personal-page">
    <section class="personal-hero">
      <h1 class="personal-title">/personal</h1>
      <p class="personal-subtitle">The bits between the commits.</p>
    </section>

    <section class="section family-section">
      <div class="section-inner">
        <h2 class="section-label">Family & Home</h2>
        <p class="personal-text">
          I'm married with four kids, living in <a href="http://www.visitclitheroe.co.uk/" target="_blank" rel="noopener"><strong>Clitheroe</strong></a> — a
          market town in the Ribble Valley, North West England. It's the kind of
          place where the hills start and the pace slows down. Good for raising a
          family, good for thinking.
        </p>
      </div>
    </section>

    <section class="section hobbies-section">
      <div class="section-inner">
        <h2 class="section-label">Hobbies</h2>
        <ul class="hobby-list">
          <li class="hobby-item">
            <span class="hobby-emoji" aria-hidden="true">✏️</span>
            <div>
              <span class="hobby-name">Cryptic Crosswords</span>
              <span class="hobby-desc">Guardian, Times &amp; Telegraph, usually with a coffee</span>
            </div>
          </li>
          <li class="hobby-item">
            <span class="hobby-emoji" aria-hidden="true">📚</span>
            <div>
              <span class="hobby-name">Fiction</span>
              <span class="hobby-desc">Reading mostly — literary, sci-fi, and the odd thriller</span>
            </div>
          </li>
          <li class="hobby-item">
            <span class="hobby-emoji" aria-hidden="true">🥾</span>
            <div>
              <span class="hobby-name">Hill Walking</span>
              <span class="hobby-desc">The Lake District, the Dales, and Pendle Hill on a Sunday</span>
            </div>
          </li>
          <li class="hobby-item">
            <span class="hobby-emoji" aria-hidden="true">🌆</span>
            <div>
              <span class="hobby-name">Manchester</span>
              <span class="hobby-desc">Great music, great food, great vibe</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="section church-section">
      <div class="section-inner">
        <h2 class="section-label">Church</h2>
        <p class="personal-text">
          I'm a committed Christian — I believe Jesus is returning soon, and pray and read the bible daily. I am part of the congregation at Holden Chapel
          <a href="https://www.holdenchapel.org.uk/" target="_blank" rel="noopener">find out more here</a>.
          <br><br>
          I did a Theology degree at Oxford University to try and test and develop my faith. I remained convinced that the Bible is the word of God.
        </p>
      </div>
    </section>

    <section class="section map-section">
      <div class="section-inner">
        <h2 class="section-label">Places I've Lived</h2>
      </div>
      <div ref="mapContainer" class="map-container">
        <div class="map-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Click to explore
        </div>
      </div>
      <div class="section-inner">
        <ul class="places-list">
          <li v-for="p in places" :key="p.name" class="places-list-item">{{ p.name }}</li>
        </ul>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.personal-page {
  padding-top: var(--nav-height);
}

.personal-hero {
  padding: 6rem 2rem 3rem;
  text-align: center;
}

.personal-title {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.personal-subtitle {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.section {
  padding: 4rem 2rem;
  background: var(--color-bg);
  transition: background-color 0.3s;
}

.section-inner {
  max-width: 620px;
  margin: 0 auto;
}

.section-label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  margin-bottom: 1.25rem;
}

.personal-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-text);
}

.personal-text a {
  color: var(--color-accent);
  font-weight: 600;
}

.personal-text a:hover {
  text-decoration: underline;
}

.hobby-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hobby-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.hobby-emoji {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.hobby-name {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 0.1rem;
}

.hobby-desc {
  display: block;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.map-section {
  padding-bottom: 2rem;
}

.map-container {
  position: relative;
  width: 100%;
  height: 380px;
  margin: 1rem 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.map-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--nav-bg);
  border: 1px solid var(--color-border);
  pointer-events: none;
  z-index: 10;
  opacity: 0.9;
  transition: opacity 0.3s;
}

.map-container.zoom-active .map-hint {
  opacity: 0;
}

.places-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.places-list-item {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
</style>

<style>
.custom-marker {
  background: none !important;
  border: none !important;
}

.map-popup .leaflet-popup-content-wrapper {
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}

.map-popup .leaflet-popup-tip {
  display: none;
}

.leaflet-control-zoom a {
  color: var(--color-text) !important;
  background: var(--color-surface) !important;
  border-color: var(--color-border) !important;
  transition: background-color 0.2s, color 0.2s;
}

.leaflet-control-zoom a:hover {
  background: var(--color-bg-elevated) !important;
  color: var(--color-accent) !important;
}

.leaflet-control-zoom {
  border: 1px solid var(--color-border) !important;
  border-radius: 8px !important;
  overflow: hidden;
}

.leaflet-control-zoom a {
  width: 32px !important;
  height: 32px !important;
  line-height: 32px !important;
  font-size: 1rem !important;
}
</style>
