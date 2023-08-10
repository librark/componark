// @ts-nocheck

/** @param {string} tag
 * @param {CustomElementConstructor} element
 * @param {string} styles **/
export function define (tag, element, styles = '') {
  globalThis.customElements.define(tag, element)
  if (!styles?.trim()) return

  try {
    const sheet = new globalThis.CSSStyleSheet()
    sheet.replaceSync(styles)
    return (document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets, sheet])
  } catch (error) {
    const style = document.createElement('style')
    style.textContent = styles
    document.head.appendChild(style)
  }
}
