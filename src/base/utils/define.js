/** @param {string} tag
 * @param {CustomElementConstructor} element
 * @param {string} styles **/
export function define(tag, element, styles=null) {
  customElements.define(tag, element)
  if (!styles) return

  const style = document.createElement('style')
  style.id = `${tag}-style`
  document.head.appendChild(style);

  const rules = styles.trim().split(/(?<=})/)
  for (const rule of rules) {
    style.sheet.insertRule(rule)
  }
}
