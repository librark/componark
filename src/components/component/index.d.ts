export class Component extends HTMLElement {

  defaultContent: string

  init(context?): Component

  render(): Component

  load(): Component

  reflectedProperties(): string[]

  connectedCallback(): void

  disconnectedCallback(): void

  attributeChangedCallback(
    name: string, oldValue: string, newValue: string): void

  adoptedCallback(): void

  select(selectors: string): Component

  selectAll(selectors: string): NodeListOf<Component>

}
