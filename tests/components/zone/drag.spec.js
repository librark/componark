import {
  DragZone
} from '../../../src/components/zone/components/drag'
import {
  DropZone
} from '../../../src/components/zone/components/drop'

describe('Drag Zone', () => {
  it('new drag', () => {
    const drag = new DragZone()

    expect(!drag.x.length).toBeTruthy()
    expect(!drag.y.length).toBeTruthy()
    expect(drag.id.length).toBeTruthy()
  })

  it('change position regarding father', () => {
    const drop = new DropZone()
    drop.x = 5
    drop.y = 2

    const drag = new DragZone()
    drop.append(drag)

    drag.setPosition()

    expect(drag.x).toEqual('5')
    expect(drag.y).toEqual('2')
  })

  it('get Parent Drop', () => {
    const drop = new DropZone()
    const drag = new DragZone()
    drop.append(drag)

    const parent = drag.getParentDrop()

    expect(parent.id).toEqual(drop.id)
  })

  it('has no valid parent drop', () => {
    const container = document.createElement('div')
    const drag = new DragZone()
    container.appendChild(drag)

    const parent = drag.getParentDrop()

    expect(!parent).toBeTruthy()
  })

  it('toggle selected', () => {
    const drag = new DragZone()
    expect(!drag.selected).toBeTruthy()
    drag.toggleSelected()
    expect(drag.selected).toBeTruthy()
    expect(drag.hasAttribute('selected')).toBeTruthy()
    drag.toggleSelected()
    expect(!drag.selected).toBeTruthy()
    expect(!drag.hasAttribute('selected')).toBeTruthy()
  })

  it('toggle selected', () => {
    const drag = new DragZone()

    const dragstart = new CustomEvent('dragstart')
    drag.onDraggableStart(dragstart)
    expect(drag.hasAttribute('selected')).toBeTruthy()

    const dragend = new CustomEvent('dragend')
    drag.onDraggableEnd(dragend)
    expect(!drag.hasAttribute('selected')).toBeTruthy()

    const dragenter = new CustomEvent('dragenter')
    drag.onDraggableEnter(dragenter)
  })

  it('onClick event', () => {
    const drag = new DragZone()
    drag.setAttribute('value', '123')

    drag.init().render().load()

    drag.addEventListener('drag:clicked', event => {
      expect(event['detail'].value).toEqual('123')
    })

    drag.click()
  })

  it('onDraggableLeave event', () => {
    const drag = new DragZone()

    const dragenter = new CustomEvent('dragenter')
    drag.onDraggableEnter(dragenter)

    expect(drag.classList.contains('ark-zone-drag--enter')).toBeTruthy()

    const dragleave = new CustomEvent('dragleave')
    drag.onDraggableLeave(dragleave)

    expect(!drag.classList.contains('ark-zone-drag--enter')).toBeTruthy()
  })
})
