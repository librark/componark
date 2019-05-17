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

    expect(element._getElementByDataTransfer(
      new Event('drop')) === null
    ).toBeTruthy()

    // expect(
    //   element._getElementByDataTransfer('{"id":123}') === null
    // ).toBeTruthy()
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

  it('draggableStart draggableEnd', () => {
    const draggable = document.createElement('ark-dragdrop')
    draggable.connectedCallback()
    draggable.draggableStart()

    expect(
      draggable.classList.contains('ark-dragdrop--dragging')
    ).toBeTruthy()

    draggable.draggableEnd()
    expect(
      !draggable.classList.contains('ark-dragdrop--dragging')
    ).toBeTruthy()
  })

  it('insert before draggable element', () => {
    const droppable = document.createElement('ark-dragdrop')
    droppable.setAttribute('droppable', '')
    droppable.setAttribute('direction', 'row')
    droppable.connectedCallback()

    const draggable = document.createElement('ark-dragdrop')
    draggable.connectedCallback()
    droppable.appendChild(draggable)

    const newDraggable = document.createElement('ark-dragdrop')
    newDraggable.connectedCallback()

    draggable.draggableDrop(newDraggable)

    expect(newDraggable.id === droppable.firstChild.id).toBeTruthy()
  })

  it('draggableEnter droppable [direction=column]', () => {
    const droppable = document.createElement('ark-dragdrop')
    droppable.setAttribute('droppable', '')
    droppable.connectedCallback()

    const draggable1 = document.createElement('ark-dragdrop')
    draggable1.connectedCallback()
    droppable.appendChild(draggable1)

    const draggable2 = document.createElement('ark-dragdrop')
    draggable2.connectedCallback()

    draggable1.draggableEnter(draggable2, draggable2.generateDataTransfer())
    expect(draggable1.classList.contains('ark-dragdrop--enter')).toBeTruthy()

    draggable1.draggableLeave()
    expect(!draggable1.classList.contains('ark-dragdrop--enter')).toBeTruthy()
  })

  it('draggableEnter droppable [direction=row]', () => {
    const droppable = document.createElement('ark-dragdrop')
    droppable.setAttribute('droppable', '')
    droppable.setAttribute('direction', 'row')
    droppable.connectedCallback()

    const draggable1 = document.createElement('ark-dragdrop')
    draggable1.connectedCallback()
    droppable.appendChild(draggable1)

    const draggable2 = document.createElement('ark-dragdrop')
    draggable2.connectedCallback()

    draggable1.draggableEnter(draggable2, draggable2.generateDataTransfer())
    expect(draggable1.classList.contains('ark-dragdrop--enter')).toBeTruthy()

    draggable1.draggableLeave()
    expect(!draggable1.classList.contains('ark-dragdrop--enter')).toBeTruthy()
  })

  it('draggableStart - draggableEnd', () => {
    const draggable1 = document.createElement('ark-dragdrop')
    draggable1.connectedCallback()

    draggable1.draggableStart()
    expect(
      draggable1.classList.contains('ark-dragdrop--dragging')
    ).toBeTruthy()

    draggable1.draggableEnd()
    expect(
      !draggable1.classList.contains('ark-dragdrop--dragging')
    ).toBeTruthy()
  })

  it('dispatchEvent draggable, droppable', () => {
    // -----------------------------------
    // draggable
    // -----------------------------------
    const draggable = document.createElement('ark-dragdrop')
    draggable.connectedCallback()

    draggable.dispatchEvent(new Event('drop'))
    draggable.dispatchEvent(new Event('dragleave'))
    draggable.dispatchEvent(new Event('dragenter'))
    draggable.dispatchEvent(new Event('dragend'))
    // draggable.dispatchEvent(new Event('dragstart'))

    // -----------------------------------
    // droppable
    // -----------------------------------
    const droppable = document.createElement('ark-dragdrop')
    droppable.setAttribute('droppable', '')
    droppable.connectedCallback()

    droppable.dispatchEvent(new Event('dragover'))
    droppable.dispatchEvent(new Event('dragenter'))
    droppable.dispatchEvent(new Event('dragleave'))
    droppable.dispatchEvent(new Event('drop'))
  })

  it('>>>> droppableEnter', () => {
    const droppable = document.createElement('ark-dragdrop')
    droppable.setAttribute('droppable', '')
    droppable.connectedCallback()

    const draggable = document.createElement('ark-dragdrop')
    draggable.connectedCallback()

    droppable.droppableEnter(draggable)

    expect(
      droppable.classList.contains('ark-dragdrop--hover')
    ).toBeTruthy()

    droppable.droppableDrop(draggable)

    expect(
      droppable.querySelector('[draggable]')
    ).toBeTruthy()

    droppable.droppableLeave()
    expect(
      !droppable.classList.contains('ark-dragdrop--hover')
    ).toBeTruthy()
  })
})
