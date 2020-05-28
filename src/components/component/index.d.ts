export class Component extends HTMLElement {
  init(context?: object): this

  render(): this

  load(): void

  reflectedProperties(): string[]

  connectedCallback(): void

  disconnectedCallback(): void

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void

  adoptedCallback(): void

  select(selectors: string): Component

  selectAll(selectors: string): NodeListOf<Component>
}
