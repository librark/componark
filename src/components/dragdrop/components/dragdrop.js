import { uuidv4 } from '../../../utils'

export class DragDrop extends HTMLElement {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`${this.innerHTML}`

    this._setAttributeUUID()
    this._listen()
  }

  _setAttributeUUID () {
    this.id = uuidv4()
  }

  _listen () {
    if (this.hasAttribute('droppable')) {
      this.addEventListener('dragover', (event) => this.droppableOver(event))
      this.addEventListener('dragenter', (event) => this.droppableEnter(event))
      this.addEventListener('dragleave', (event) => this.droppableLeave(event))
      this.addEventListener('drop', (event) => this.droppableDrop(event))
      this._setAttributeDirection()
    } else {
      this.setAttribute('draggable', 'true')
      this.addEventListener('dragstart', this.draggableStart.bind(this))
      this.addEventListener('dragend', (event) => this.draggableEnd(event))
      this.addEventListener('dragenter', (event) => this.draggableEnter(event))
      this.addEventListener('dragleave', (event) => this.draggableLeave(event))
      this.addEventListener('drop', (event) => this.draggableDrop(event))
    }
  }

  _setAttributeDirection () {
    if (!this.hasAttribute('direction')) {
      const attr = document.createAttribute('direction')
      attr.value = 'column'
      this.setAttributeNode(attr)
    }
  }

  // --------------------------------------------------------------------------
  // Droppable
  // --------------------------------------------------------------------------
  droppableOver (event) {
    event.preventDefault()
  }

  droppableEnter (event) {
    event.preventDefault()

    const draggable = this._getElementByDataTransfer(
      event.dataTransfer.types[0]
    )

    if (this._dropAllowed(this, draggable)) {
      this.classList.add('ark-dragdrop--hover')
    }
  }

  droppableLeave (event) {
    event.preventDefault()
    this._droppableRemoveStyle()
  }

  droppableDrop (event) {
    event.preventDefault()
    this._droppableRemoveStyle()

    const draggable = this._getElementByDataTransfer(
      event.dataTransfer.types[0]
    )

    if (this._dropAllowed(this, draggable)) {
      this.appendChild(draggable)
    }
  }

  _droppableRemoveStyle () {
    this.classList.remove(`ark-dragdrop--hover`)
  }

  // --------------------------------------------------------------------------
  // Draggable
  // --------------------------------------------------------------------------

  draggableStart (event) {
    event.stopPropagation()
    event.dataTransfer.clearData()

    if (!this.id) return

    const data = {
      id: this.id,
      width: this.offsetWidth,
      height: this.offsetHeight
    }

    event.dataTransfer.setData(JSON.stringify(data), '')

    this.classList.add(`ark-dragdrop--dragging`)
    setTimeout(() => {
      this.classList.add(`ark-dragdrop--hidden`)
    })
  }

  draggableEnd (event) {
    this.classList.remove(`ark-dragdrop--dragging`)
    setTimeout(() => {
      this.classList.remove(`ark-dragdrop--hidden`)
    })
  }

  draggableEnter (event) {
    let data = this._parseData(event.dataTransfer.types[0])
    if (!data) return

    const draggable = this._getElementByDataTransfer(
      event.dataTransfer.types[0]
    )

    if (this._dropAllowed(this, draggable)) {
      if (this.parentElement.getAttribute('direction') === 'column') {
        this.style.paddingTop = `${data.height + 5}px`
      } else {
        this.style.paddingLeft = `${data.width + 5}px`
      }

      this.classList.add('ark-dragdrop--enter')
    }
  }

  draggableLeave (event) {
    event.preventDefault()
    this._draggableRemoveStyle()
  }

  draggableDrop (event) {
    event.preventDefault()
    this._draggableRemoveStyle()

    const draggable = this._getElementByDataTransfer(
      event.dataTransfer.types[0]
    )

    if (this._dropAllowed(this, draggable)) {
      this.parentElement.insertBefore(draggable, this)
    }
  }

  _draggableRemoveStyle () {
    this.style.padding = `0`
    this.classList.remove(`ark-dragdrop--enter`)
  }

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  _dropAllowed (
    /* @type {HTMLImageElement} */ destinationNode,
    /* @type {HTMLImageElement} */ draggable
  ) {
    if (!draggable) return false
    if (!draggable.hasAttribute('level')) return true

    let levelDestination = 0

    for (let item = destinationNode; item; item = item.parentNode) {
      if (item.tagName.toLowerCase() === 'html') break

      if (
        item.tagName.toLowerCase() === 'ark-dragdrop' &&
        item.hasAttribute('droppable')
      ) levelDestination++
    }

    return levelDestination <= parseInt(draggable.getAttribute('level'))
  }

  _getElementByDataTransfer (type) {
    let data = this._parseData(type)
    if (!data) return null

    return document.getElementById(data.id)
  }

  _parseData (content) {
    let data = null
    try {
      data = JSON.parse(content)
    } catch (e) {
      return ''
    }
    return data
  }
}
customElements.define('ark-dragdrop', DragDrop)
