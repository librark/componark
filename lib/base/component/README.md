# Component

`Component` is the base class for Componark custom elements. It extends `HTMLElement` with:

- Declarative event bindings (`listen` + `on-*` attributes)
- Attribute-to-property reflection
- Dependency resolution through bubbling `resolve` events
- Cleanup registration for disconnect lifecycle

## Usage

```javascript
import { Component } from 'base/component'

class MyComponent extends Component {
  reflectedProperties () {
    return ['title']
  }

  init (context = {}) {
    this.local.count = this.local.count ?? 0
    return super.init(context)
  }

  increment () {
    this.local.count += 1
    this.render()
  }

  render () {
    this.content = `
      <button listen on-click="increment">
        ${this.title}: ${this.local.count}
      </button>
    `
    return super.render()
  }

  async load (_context = {}) {
    // Optional async work after render.
  }
}

Component.define('my-component', MyComponent)
```

## Lifecycle

1. `constructor()`
   - Initializes internal state (`binding`, `local`, cleanup registry, etc.).
   - Applies reflected properties using `reflectedProperties()`.
2. `connectedCallback()`
   - Marks the component as connected.
   - Calls `init({})` only when `local` is empty.
   - Calls `render()`.
   - Calls `load({})` (sync or async).
3. `disconnectedCallback()`
   - Marks the component as disconnected.
   - Runs registered cleanup callbacks.

Errors from `init`/`render`, `load`, and cleanup callbacks are emitted as bubbling `error` events. Enhanced errors include:

- `phase`: `init-render`, `load`, or `cleanup`
- `component`: current tag name (for example, `MY-COMPONENT`)

## Public API

### Static API

| Method | Description |
| --- | --- |
| `Component.define(tagName, element, styles?)` | Registers a custom element. If `styles` are provided, they are registered for that tag. |

### Instance API

| Member | Returns | Description |
| --- | --- | --- |
| `init(context = {})` | `this` | Component state initialization hook. |
| `reflectedProperties()` | `string[]` | Attribute names to expose as reflected properties. |
| `slots` | `Record<string, HTMLElement[]>` | Child elements grouped by `slot` (`general` by default). |
| `content` | `string` | Proxy for `innerHTML`. Setting it flags listeners for re-binding. |
| `render()` | `this` | Adds the tag-name class and binds declarative listeners when needed. |
| `load(context = {})` | `void \| Promise<void>` | Async hook called after `render()`. |
| `registerCleanup(callback)` | `() => void` | Registers disconnect cleanup and returns an unregister function. |
| `select(selector)` | `Component` | `querySelector` helper. |
| `selectAll(selector)` | `NodeListOf<Component>` | `querySelectorAll` helper. |
| `emit(type, detail)` | `void` | Dispatches a bubbling, cancelable event with `detail`. |
| `resolve(resource)` | `any` | Requests a dependency through a bubbling `resolve` event. |
| `styleNames(styleMap)` | `string` | Returns truthy class names from an object map. |

## Declarative listeners

`render()` triggers listener wiring on descendants marked with `listen`.

```html
<input listen on-input="{{ local.query = data }}">
<input listen on-input="{{ local.total = data | number }}">
<button listen on-click="submit"></button>
<button listen on-click="submit@#child"></button>
<div listen on-change="replaceChildren%detail.name@#target"></div>
```

Rules:

- Use `on-<event>` attributes to define handlers.
- `{{ ... }}` expressions perform state assignment.
- Pipes support `string`, `number`, `boolean`, and `object`.
- `handler@<selector>` routes execution to another element/component.
- Handler failures emit bubbling `error` events.

## Dependency resolution

`resolve(resource)` dispatches a bubbling `resolve` event with `{ resource }`. Ancestors can provide values by implementing `provide(resource)`.

```javascript
class ParentComponent extends Component {
  provide (resource) {
    if (resource === 'state') return this.local
  }
}
```

Then in a child:

```javascript
const state = this.resolve('state')
```
