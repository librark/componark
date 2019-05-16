import '../../../src/components/dragdrop'

describe('Drag and Drop', () => {
  it('can be instantiated', () => {
    const element = document.createElement('ark-dragdrop')
    expect(element).toBeTruthy()

    var init = element.init()
    expect(element === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const element = document.createElement('ark-dragdrop')
    const att = document.createAttribute('droppable')
    element.setAttributeNode(att)
    element.connectedCallback()
  })

  it('is draggable by default', function () {
    const element = document.createElement('ark-dragdrop')
    element.connectedCallback()
    expect(element.hasAttribute('draggable')).toBeTruthy()
  })

  it('get Element By DataTransfer', () => {
    const element = document.createElement('ark-dragdrop')
    element.connectedCallback()

    expect(element._getElementByDataTransfer(null) === null).toBeTruthy()

    expect(
      element._getElementByDataTransfer('{"id":123}') === null
    ).toBeTruthy()
  })

  it('parse Data', () => {
    const element = document.createElement('ark-dragdrop')
    element.connectedCallback()

    expect(element._parseData(null) === null).toBeTruthy()
    expect(element._parseData('') === null).toBeTruthy()

    let data = '{"id":123}'
    expect(element._parseData(data).id === 123).toBeTruthy()
  })

  it('drop Allowed', () => {
    // >>>>>> level 1
    const draggableL1 = document.createElement('ark-dragdrop')
    draggableL1.connectedCallback()

    const droppableL1 = document.createElement('ark-dragdrop')
    droppableL1.setAttribute('droppable', '')
    droppableL1.connectedCallback()
    droppableL1.appendChild(draggableL1)

    // >>>>>> level 2
    const droppableL2 = document.createElement('ark-dragdrop')
    droppableL2.setAttribute('droppable', '')
    droppableL2.connectedCallback()

    draggableL1.appendChild(droppableL2)

    // >>>>>> new
    const newDrag = document.createElement('ark-dragdrop')
    newDrag.setAttribute('level', '1')

    expect(droppableL1._dropAllowed(droppableL1, newDrag)).toBeTruthy()
    expect(!droppableL1._dropAllowed(droppableL2, newDrag)).toBeTruthy()
  })

  it('droppable Events', () => {
    // >>>>>> level 1
    const draggableL1 = document.createElement('ark-dragdrop')
    draggableL1.connectedCallback()

    const droppableL1 = document.createElement('ark-dragdrop')
    droppableL1.setAttribute('droppable', '')
    droppableL1.connectedCallback()
    droppableL1.appendChild(draggableL1)

    // ------------------------------------------------------------
    // ------------------------------------------------------------
    const dataTransfer = new DataTransfer()

    const data = {
      id: draggableL1.id,
      width: draggableL1.offsetWidth,
      height: draggableL1.offsetHeight
    }
    dataTransfer.setData(JSON.stringify(data), '')

    droppableL1.click()

    droppableL1.dispatchEvent(
      new Event(('dragover'
      , { dataTransfer: dataTransfer }
      ))
    )

    // droppableL1.dispatchEvent(
    //   new Event(('dragenter'
    //   , { dataTransfer: dataTransfer }
    //   ))
    // )

    // droppableL1.dispatchEvent(
    //   new Event(('dragleave'
    //   , { dataTransfer: dataTransfer }
    //   ))
    // )

    // droppableL1.dispatchEvent(
    //   new Event(('drop'
    //   , { dataTransfer: dataTransfer }
    //   ))
    // )
  })

  it('draggable Events', () => {
    // >>>>>> level 1
    const draggableL1 = document.createElement('ark-dragdrop')
    draggableL1.connectedCallback()

    const droppableL1 = document.createElement('ark-dragdrop')
    droppableL1.setAttribute('droppable', '')
    droppableL1.connectedCallback()
    droppableL1.appendChild(draggableL1)

    // ------------------------------------------------------------
    // ------------------------------------------------------------
    const dataTransfer = new DataTransfer()

    const data = {
      id: draggableL1.id,
      width: draggableL1.offsetWidth,
      height: draggableL1.offsetHeight
    }
    dataTransfer.setData(JSON.stringify(data), '')

    draggableL1.dispatchEvent(
      new Event(('dragstart'
      , { dataTransfer: dataTransfer }
      ))
    )

    draggableL1.dispatchEvent(
      new Event(('dragend'
      , { dataTransfer: dataTransfer }
      ))
    )

    draggableL1.dispatchEvent(
      new Event(('dragenter'
      , { dataTransfer: dataTransfer }
      ))
    )

    draggableL1.dispatchEvent(
      new Event(('dragleave'
      , { dataTransfer: dataTransfer }
      ))
    )

    draggableL1.dispatchEvent(
      new Event(('drop'
      , { dataTransfer: dataTransfer }
      ))
    )
  })

  // ------------------------------------------------------------
  // DataTransfer
  // ------------------------------------------------------------
  class DataTransfer {
    constructor () {
      this.data = {}
      this.types = []
      this.files = []
    }

    setData (format, data) {
      this.data[format] = data
    }

    getData (format) {
      return this.data[format]
    }
  }
})
