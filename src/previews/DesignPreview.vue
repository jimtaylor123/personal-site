<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import WorkshopHeader from '../components/WorkshopHeader.vue'
import LinksSection from '../components/LinksSection.vue'
import './preview.css'
const props = defineProps({ styleName: { type: String, default: 'editorial' }, comparison: { type: Boolean, default: true } })
const styles = [{ id: 'editorial', label: '01 Editorial' }, { id: 'studio', label: '02 Studio' }, { id: 'workshop', label: '03 Workshop' }]
const direction = computed(() => ({
  editorial: { label: 'Independent developer / curious by nature', line1: 'Thoughtful interfaces.', line2: 'Carefully built.', note: 'A little clarity goes a long way.' },
  studio: { label: 'Jim Taylor — design & development', line1: 'Good design.', line2: 'Solid foundations.', note: 'From the first interaction to the last detail.' },
  workshop: { label: 'The personal workshop of Jim Taylor', line1: 'Useful things.', line2: 'Unexpected ideas.', note: 'A bit of curiosity. A lot of care.' },
}[props.styleName]))
const projects = [
  { id: 'words', name: 'Possible Words', category: 'Language / Community', description: "Generates and catalogues pronounceable words that aren't in the English dictionary yet. Suggest a definition. Find a new favourite word.", url: 'https://possiblewords.jimtaylor.space', number: '01' },
  { id: 'food', name: 'Slow Carb Randomizer', category: 'Food / Mobile application', description: 'Random food combinations following the slow carb diet. A small tool to take the thinking out of what to eat next.', url: 'https://slowcarbrandomizer.jimtaylor.space', number: '02' },
  { id: 'eggs', name: 'REGGULAR', category: 'Commerce / Coming soon', description: 'In development: an app for running an egg delivery business, with customer ordering, route planning and subscription management. Not available yet.', url: null, number: '03' },
]
</script>

<template>
  <div class="design-preview" :class="styleName">
    <aside v-if="comparison" class="preview-switcher" aria-label="Compare design directions">
      <span>Design studies</span>
      <RouterLink v-for="s in styles" :key="s.id" :to="`/preview/${s.id}`" :aria-current="s.id === styleName ? 'page' : undefined">{{ s.label }}</RouterLink>
      <RouterLink to="/preview/original">Original ↗</RouterLink>
    </aside>
    <div class="preview-page">
      <WorkshopHeader v-if="!comparison" />
      <header v-else class="preview-header">
        <a href="#" class="wordmark" aria-label="Jim Taylor home">jim taylor<span class="wordmark-dot">.</span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#links">Contact <span aria-hidden="true">↗</span></a></nav>
      </header>
      <main>
        <section class="preview-hero">
          <p class="eyebrow"><span class="tiny-symbol" aria-hidden="true">✳</span> {{ direction.label }}</p>
          <h1>{{ direction.line1 }}<br><span>{{ direction.line2 }}</span></h1>
          <div class="hero-bottom"><p>I’m Jim, a full stack developer who loves turning a fresh idea into something you can actually use. I build, experiment and ship with Laravel, Vue and AI-assisted development.</p><a href="#work" class="work-cta">Explore selected work <span aria-hidden="true">↙</span></a></div>
          <div v-if="styleName === 'workshop'" class="workshop-stamp" aria-hidden="true">IDEAS<br>INTO<br><b>THINGS ↗</b></div>
          <div v-if="styleName === 'studio'" class="studio-index" aria-hidden="true">DESIGN<br>DEVELOP<br>REFINE<span>↘</span></div>
        </section>
        <section id="work" class="preview-work">
          <div class="section-heading"><h2>Selected work <sup>(03)</sup></h2><p>{{ direction.note }}</p></div>
          <div class="work-grid">
            <article v-for="p in projects" :key="p.id" class="work-item" :class="p.id">
              <component :is="p.url ? 'a' : 'div'" :href="p.url || undefined" :target="p.url ? '_blank' : undefined" :rel="p.url ? 'noopener' : undefined" :aria-label="p.url ? `Visit ${p.name} (opens in a new tab)` : undefined" class="project-art">
                <span class="art-caption">{{ p.category }}</span>
                <div v-if="p.id === 'words'" class="word-study"><div class="study-nav">possible words <span>Discover ↗</span></div><p>A word waiting<br>for a meaning.</p><strong>sonderly<span>↗</span></strong><div class="definition">/ ˈsɒn.də.li / &nbsp; adjective<br><br>The feeling of finding something<br>you didn't know you were looking for.</div><div class="study-footer">Discover a new word <span>+ Add a definition</span></div></div>
                <div v-if="p.id === 'food'" class="food-study"><div class="food-title">Less thinking.<br><i>More eating.</i></div><div class="phone-study"><div class="phone-top">9:41 <span>● ▰</span></div><small>SLOW CARB / DAILY MIX</small><div class="plate"><span>🥬</span><span>🍗</span><span>🫘</span></div><h3>Your next good meal.</h3><p>Chicken · greens · black beans</p><div class="fake-button">Mix it up ↻</div></div><span class="food-scribble" aria-hidden="true">A fresh combination ↗</span></div>
                <div v-if="p.id === 'eggs'" class="egg-study"><div class="egg-brand">reggular<span>®</span></div><div class="egg-shape"></div><p>Good eggs.<br>Great routine.</p><div class="egg-bottom">Fresh thinking for egg delivery <span>↗</span></div></div>
                <span class="study-label">Interface study</span><span v-if="p.url" class="project-open" aria-hidden="true">↗</span><span v-else class="coming-soon-badge">Coming soon</span>
              </component>
              <div class="project-meta"><div><span class="project-number">{{ p.number }} /</span><h3>{{ p.name }}</h3></div><span>{{ p.category }}</span></div>
              <p class="project-description">{{ p.description }}</p>
            </article>
          </div>
        </section>
        <section id="about" class="preview-about">
          <div class="about-portrait"><img src="/images/jim-posterized.webp" alt="Posterized portrait of Jim Taylor smiling" width="800" height="800" loading="lazy" decoding="async"><span>Jim Taylor / Behind the work</span></div>
          <div class="about-copy"><p class="eyebrow">A little about me</p><h2>An idea is just<br><span>the beginning.</span></h2><p>I love building new things: taking an idea, working out what it could become, and getting a working version into the world. My focus is full stack development, with Laravel and Vue at the core of how I build.</p><p>AI-assisted development is a big part of that process. I enjoy seeing how far a clear idea and a focused session can take a project, then testing, refining and making it useful. Good design and security are part of the craft along the way.</p><div class="skills"><span>Laravel</span><span>Vue / Nuxt</span><span>React</span><span>TypeScript</span><span>AI-assisted development</span></div><div class="about-extras"><RouterLink to="/uses">Tools I use ↗</RouterLink><RouterLink to="/personal">Outside the code ↗</RouterLink></div></div>
        </section>
        <div class="preview-contact"><p class="eyebrow">Have something in mind?</p><h2>Let’s make it <span>happen ↗</span></h2><LinksSection /></div>
      </main>
      <footer class="preview-footer"><a href="#" class="wordmark">jim taylor.</a><span>Ideas into working things. Built with Vue.</span><span>© {{ new Date().getFullYear() }} Jim Taylor</span></footer>
    </div>
  </div>
</template>
