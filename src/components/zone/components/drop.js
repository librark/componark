/**
 * @typedef {import('./drag').DragZone} DragZone
 * */

import { Component } from '../../../base/component/index.js'
import { uuid } from '../../../base/utils/index.js'

export class DropZone extends Component {
  init (context = {}) {
    this.cols = context.cols || this.cols || 1
    this.value = this.value || context.value

    // Local
    this.x = this.x || undefined
    this.y = this.y || undefined
    this.id = uuid()
    this.sequence = 0
    this.selected = false

    return super.init()
  }

  reflectedProperties () {
    return ['x', 'y', 'value', 'cols']
  }

  render () {
    return super.render()
  }

  async load () {
    // drag
    this.addEventListener('dragenter', this.onDragenter.bind(this))
    this.addEventListener('dragleave', this.onDragleave.bind(this))

    // click
    // this.addEventListener('click', this.onClick.bind(this))
    this.addEventListener('mouseover', this.onMouseOver.bind(this))

    this._setPosition(this.getParentDrop())
  }

  /** @param {event} event */
  onDragenter (event) {
    event.stopImmediatePropagation()

    if (!this.fixed) return

    this.classList.add('ark-zone-drop--hover')

    this.dispatchEvent(new CustomEvent('drop:dragenter', {
      bubbles: true
    }))
  }

  /** @param {event} event */
  onDragleave (event) {
    event.stopImmediatePropagation()

    this._droppableRemoveStyle()
  }

  /** @param {MouseEvent} event */
  onMouseOver (event) {
    event.stopImmediatePropagation()

    if (!event.shiftKey) return

    this.dispatchEvent(
      new CustomEvent('drop:mouseover', {
        bubbles: true,
        detail: {
          id: this.id,
          value: true,
          origin: event,
          selected: this.selected
        }
      })
    )
  }

  /** @returns {DropZone} */
  getParentDrop () {
    let node = null
    node = this

    while (node) {
      node = node.parentElement
      const nodeName = node ? node.nodeName.toLowerCase() : null

      if (!node || nodeName === 'ark-zone-drag') {
        return null
      } else if (nodeName === 'ark-zone-drop') {
        return /** @type {DropZone} */ (node)
      }
    }
  }

  /** @returns {{x:number, y:number}} */
  getPositions () {
    return {
      x: parseInt(this.x) || 0,
      y: parseInt(this.y) || 0
    }
  }

  /** @param {string} x @param {string} y @returns {DropZone} */
  selectDropByPosition (x, y) {
    return /** @type {DropZone} */ (
      this.select(`ark-zone-drop[x="${x}"][y="${y}"]`)
    )
  }

  /** @param {boolean} selected */
  setSelectedDrags (selected) {
    this.selectAll('ark-zone-drag').forEach(
      (/** @type {DragZone} */ drap) => {
        drap.selected = selected
      })
  }

  cleanSelectedDrags () {
    this._getSelectedDrags().forEach(drag => {
      drag.selected = false
    })
  }

  /**
   * @param {DropZone} selectedDrop
   * @param {DragZone[]} drags
   * @returns {boolean}
   * */
  isDestinationValid (selectedDrop, drags) {
    if (!drags.length) return

    const difference = this.getDifferenceDropsPositions(selectedDrop, drags[0])

    for (const drag of drags) {
      const relativeDrop = this.getRelativeDrop(drag, difference)
      if (!relativeDrop) return false
    }

    return true
  }

  /**
   * @param {DropZone} selectedDrop
   * @param {DragZone} drag
   * @returns {{x:number, y:number}}
   * */
  getDifferenceDropsPositions (selectedDrop, drag) {
    return {
      x: parseInt(selectedDrop.x) - parseInt(drag.x),
      y: parseInt(selectedDrop.y) - parseInt(drag.y)
    }
  }

  /**
   * @param {DragZone} drag
   * @param {{x:number, y:number}} differenceDropsPositions
   * @returns {DropZone}
   * */
  getRelativeDrop (drag, differenceDropsPositions) {
    const x = parseInt(drag.x) + differenceDropsPositions.x
    const y = parseInt(drag.y) + differenceDropsPositions.y

    return this.selectDropByPosition(x.toString(), y.toString())
  }

  get fixed () {
    return this.hasAttribute('fixed')
  }

  set fixed (value) {
    if (value) {
      this.setAttribute('fixed', 'true')
    } else {
      this.removeAttribute('fixed')
    }
  }

  get selected () {
    return this.hasAttribute('selected')
  }

  /** @param {boolean} value */
  set selected (value) {
    if (!this.fixed) value = false

    if (value) {
      this.setAttribute('selected', 'selected')
    } else {
      this.removeAttribute('selected')
    }
  }

  toggleSelected () {
    this.selected = !this.selected
  }

  _droppableRemoveStyle () {
    this.classList.remove('ark-zone-drop--hover')
    this.classList.remove('ark-zone-drop--hover_disabled')
  }

  /** @param {DropZone} parent */
  _setPosition (parent) {
    if (!parent) return

    const sequence = parent.sequence
    const cols = parseInt(parent.cols)

    this.x = Math.floor(sequence / cols)
    this.y = sequence % cols
    this.fixed = true

    parent.sequence += 1
  }

  /** @returns {DragZone[]} */
  _getSelectedDrags () {
    return /** @type {DragZone[]} */ ([
      ...this.selectAll('ark-zone-drag[selected]')
    ])
  }
}
customElements.define('ark-zone-drop', DropZone)
