import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'jimtaylor-theme'

const preferredDark = window.matchMedia('(prefers-color-scheme: dark)')

function resolveTheme(saved) {
  if (saved) return saved
  return preferredDark.matches ? 'dark' : 'light'
}

const theme = ref(resolveTheme(localStorage.getItem(STORAGE_KEY)))

function apply(t) {
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem(STORAGE_KEY, t)
}

watch(theme, apply, { immediate: true })

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  onMounted(() => {
    const handler = () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        theme.value = preferredDark.matches ? 'dark' : 'light'
      }
    }
    preferredDark.addEventListener('change', handler)
  })

  return { theme, toggle }
}
