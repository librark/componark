import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
  url: 'http://localhost'
})

const { window } = dom

globalThis.window = window
globalThis.document = window.document
globalThis.self = window
globalThis.global = globalThis
globalThis.addEventListener = window.addEventListener.bind(window)
globalThis.removeEventListener = window.removeEventListener.bind(window)
globalThis.dispatchEvent = window.dispatchEvent.bind(window)

Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: window.navigator
})

const forceGlobals = [
  'Event',
  'CustomEvent',
  'InputEvent',
  'MouseEvent',
  'KeyboardEvent',
  'EventTarget',
  'HTMLElement',
  'Element',
  'Node',
  'NodeList',
  'DocumentFragment',
  'DOMParser',
  'MutationObserver',
  'CustomElementRegistry',
  'CSSStyleSheet',
  'URL',
  'File',
  'Blob',
  'MediaStream'
]

for (const key of forceGlobals) {
  if (!window[key]) continue
  globalThis[key] = window[key]
}

for (const key of Object.getOwnPropertyNames(window)) {
  if (key in globalThis) continue
  globalThis[key] = window[key]
}

if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback) => {
    return setTimeout(() => callback(Date.now()), 0)
  }
}

if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
}

if (globalThis.HTMLCanvasElement) {
  globalThis.HTMLCanvasElement.prototype.getContext = () => ({
    drawImage: () => {},
    clearRect: () => {},
    fillRect: () => {},
    getImageData: () => ({ data: [] }),
    putImageData: () => {},
    createImageData: () => [],
    setTransform: () => {},
    resetTransform: () => {},
    fillText: () => {},
    measureText: () => ({ width: 0 }),
    save: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    arc: () => {},
    fill: () => {}
  })
  globalThis.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,mock'
}

if (!globalThis.URL.createObjectURL) {
  globalThis.URL.createObjectURL = () => 'mock://data/url'
}
