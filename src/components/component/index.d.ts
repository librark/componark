export class Component extends HTMLElement {
  init (context?): this

  render (): this

  load (): this | Promise<this>

  reflectedProperties (): string[]

  connectedCallback (): void

  disconnectedCallback (): void

  attributeChangedCallback (
    name: string,
    oldValue: string,
    newValue: string,
  ): void

  adoptedCallback (): void

  select (selectors: string): Component

  selectAll (selectors: string): NodeListOf<Component>
}
