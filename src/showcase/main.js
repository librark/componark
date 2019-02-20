import './screens/base/base.component.js'
import './styles/main.scss'

/** @param {string} target */
export function main (target) {
  const baseComponent = document.createElement('app-base')
  baseComponent.init()

  const mainComponent = document.querySelector('body')

  setMainComponent(mainComponent, baseComponent)
}

function setMainComponent (mainComponent, screenComponent) {
  while (mainComponent.firstChild) mainComponent.firstChild.remove()
  mainComponent.appendChild(screenComponent)
}
