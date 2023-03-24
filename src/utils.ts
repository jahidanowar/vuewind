export function removeElement(el: Element | undefined) {
  if (!el) return
  ;(el.parentNode as HTMLElement).remove()
}
