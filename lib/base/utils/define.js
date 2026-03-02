// @ts-nocheck

const stylesheetRegistry = new Map()
const fallbackRegistry = new Map()

/** @param {string} tag
 * @param {CustomElementConstructor} element
 * @param {string} styles **/
export function define (tag, element, styles = '') {
  const definedElement = globalThis.customElements.get(tag)
  if (!definedElement) {
    globalThis.customElements.define(tag, element)
  }
  if (!styles?.trim()) return
  if (typeof document === 'undefined') return

  try {
    let sheet = stylesheetRegistry.get(tag)
    if (!sheet) {
      sheet = new globalThis.CSSStyleSheet()
      stylesheetRegistry.set(tag, sheet)
    }
    sheet.replaceSync(styles)

    const adopted = document.adoptedStyleSheets || []
    if (!adopted.includes(sheet)) {
      document.adoptedStyleSheets = [...adopted, sheet]
    }

    return sheet
  } catch (error) {
    let style = fallbackRegistry.get(tag)
    if (!style) {
      style = document.createElement('style')
      style.setAttribute('data-componark-tag', tag)
      fallbackRegistry.set(tag, style)
      document.head.appendChild(style)
    }
    style.textContent = styles
    return style
  }
}
