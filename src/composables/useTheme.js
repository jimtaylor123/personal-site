import { ref, watch } from 'vue'

const STORAGE_KEY = 'jimtaylor-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  return localStorage.getItem(STORAGE_KEY) || 'dark'
}

const theme = ref(getInitialTheme())

function apply(t) {
  if (typeof window === 'undefined') return
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem(STORAGE_KEY, t)
}

watch(theme, apply, { immediate: true })

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggle }
}
