import styles from './accordion.css'

export class Accordion extends HTMLElement {
  connectedCallback () {
    // this.root = this.attachShadow({ 'mode': 'open' })
    this.root = this
    this.render()
  }

  //   _renderSlots()

  render () {
    const child = this.root.querySelector('[slot]').outerHTML
    console.log('Children::::', child)

    this.root.innerHTML = /* html */`
    <style>
        ${styles.toString()}
    </style>
    <div class="ark-accordion">
        <hr>
        <p>PARENT</p>
        ${child}
        <slot name="tabs"></slot>
    </div>
    `
    return this.root.outerHTML
  }
}
customElements.define('ark-accordion', Accordion)
