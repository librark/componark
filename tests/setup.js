// Mock implementation of the customElements window attribute as JSDOM
// doesn't support it yet.
// Issue: https://github.com/jsdom/jsdom/issues/1030

const customElements = {
  define: (element, selector) => {}
}

Object.defineProperty(window, 'customElements', { value: customElements })
