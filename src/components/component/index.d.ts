export class Component extends HTMLElement {

    init(context: Object): Component

    render(): Component

    load(): void

    reflectedProperties(): string[]

    select(selectors: string): Component

    selectAll(selectors: string): NodeListOf<Component>

}