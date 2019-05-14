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
    } else {
      this.setAttribute('draggable', 'true')
      this.addEventListener('dragstart', this.draggableStart.bind(this))
      this.addEventListener('dragend', (event) => this.draggableEnd(event))
      this.addEventListener('dragenter', (event) => this.draggableEnter(event))
      this.addEventListener('dragleave', (event) => this.draggableLeave(event))
      this.addEventListener('drop', (event) => this.draggableDrop(event))
    }
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

  // --------------------------------------------------------------------------
  // Droppable
  // --------------------------------------------------------------------------
  droppableOver (event) {
    event.preventDefault()
  }

  droppableEnter (event) {
    event.preventDefault()
    this.classList.add('ark-dragdrop--hover')
  }

  droppableLeave (event) {
    event.preventDefault()
    this._droppableRemoveStyle()
  }

  droppableDrop (event) {
    event.preventDefault()
    this._droppableRemoveStyle()

    let data = this._parseData(event.dataTransfer.types[0])
    if (!data) {
      return
    }

    const dragged = document.getElementById(data.id)
    if (dragged) {
      this.appendChild(dragged)
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

    if (!this.id) {
      return
    }

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
    if (!data) {
      return
    }

    this.style.paddingTop = `${data.height}px`
    this.classList.add('ark-dragdrop--enter')
  }

  draggableLeave (event) {
    event.preventDefault()
    this._draggableRemoveStyle()
  }

  draggableDrop (event) {
    event.preventDefault()
    this._draggableRemoveStyle()

    let data = this._parseData(event.dataTransfer.types[0])
    if (!data) {
      return
    }

    const dragged = document.getElementById(data.id)
    if (dragged) {
      this.parentElement.insertBefore(dragged, this)
    }
  }

  _draggableRemoveStyle () {
    this.style.paddingTop = `0`
    this.classList.remove(`ark-dragdrop--enter`)
  }
}
customElements.define('ark-dragdrop', DragDrop)
