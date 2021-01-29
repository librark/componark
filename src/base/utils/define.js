// @ts-nocheck

/** @param {string} tag
 * @param {CustomElementConstructor} element
 * @param {string} styles **/
export function define(tag, element, styles=null) {
  customElements.define(tag, element)
  if (!styles) return

  console.log(styles)
  try {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(styles)
    return document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets, sheet]
  } catch (error) {
    const style = document.createElement('style')
    style.textContent = styles
    document.head.appendChild(style);
  }

}
