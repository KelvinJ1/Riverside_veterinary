import { onMounted, onScopeDispose, type Ref } from 'vue'

export function useReveal(section: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const root = section.value
    if (!root) return

    const nodes = [...root.querySelectorAll<HTMLElement>('[data-reveal]')]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      nodes.forEach(node => node.classList.add('is-in'))
      return
    }

    document.documentElement.classList.add('motion')

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        observer?.unobserve(entry.target)
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })

    nodes.forEach(node => observer?.observe(node))
  })

  onScopeDispose(() => observer?.disconnect())
}
