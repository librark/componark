import {
  DragZone
} from '../../../src/components/zone/components/drag'
import {
  DropZone
} from '../../../src/components/zone/components/drop'

describe('Drop Zone', () => {
  it('Init', () => {
    const drop = new DropZone()
    drop.init().render().load()

    expect(drop.cols).toEqual('1')

    drop.init({ cols: 8 }).render().load()
    expect(drop.cols).toEqual('8')
  })

  it('get Selected Drags', () => {
    const drag1 = new DragZone()
    drag1.setAttribute('value', 'drag1')
    drag1.init().render().load()
    drag1.selected = true

    const drag2 = new DragZone()
    drag2.setAttribute('value', 'drag2')
    drag2.init().render().load()
    drag2.selected = true

    const drag3 = new DragZone()
    drag3.setAttribute('value', 'drag3')
    drag3.init().render().load()
    drag3.selected = true

    const drag4 = new DragZone()
    drag4.setAttribute('value', 'drag4')
    drag4.init().render().load()

    const drop = new DropZone()
    drop.appendChild(drag1)
    drop.appendChild(drag2)
    drop.appendChild(drag3)
    drop.appendChild(drag4)

    const drops = drop._getSelectedDrags()
    expect(drops.length).toEqual(3)
  })

  it('set Position', () => {
    const parent = new DropZone()
    const drop1 = new DropZone()
    const drop2 = new DropZone()
    const drop3 = new DropZone()

    parent.appendChild(drop1)
    parent.appendChild(drop2)
    parent.appendChild(drop3)

    drop1._setPosition(parent)
    drop2._setPosition(parent)
    drop3._setPosition(parent)

    expect(drop1.x).toEqual('0')
    expect(drop1.y).toEqual('0')

    expect(drop2.x).toEqual('1')
    expect(drop2.y).toEqual('0')

    expect(drop3.x).toEqual('2')
    expect(drop3.y).toEqual('0')
  })

  it('set Position with columns', () => {
    const parent = new DropZone()
    parent.setAttribute('cols', '2')

    const drop1 = new DropZone()
    const drop2 = new DropZone()
    const drop3 = new DropZone()
    const drop4 = new DropZone()

    parent.appendChild(drop1)
    parent.appendChild(drop2)
    parent.appendChild(drop3)
    parent.appendChild(drop4)

    drop1._setPosition(parent)
    drop2._setPosition(parent)
    drop3._setPosition(parent)
    drop4._setPosition(parent)

    expect(drop1.x).toEqual('0')
    expect(drop1.y).toEqual('0')

    expect(drop2.x).toEqual('0')
    expect(drop2.y).toEqual('1')

    expect(drop3.x).toEqual('1')
    expect(drop3.y).toEqual('0')

    expect(drop4.x).toEqual('1')
    expect(drop4.y).toEqual('1')
  })

  it('toggle selected', () => {
    const drop = new DropZone()
    drop.fixed = true

    expect(!drop.selected).toBeTruthy()
    drop.toggleSelected()
    expect(drop.selected).toBeTruthy()
    expect(drop.hasAttribute('selected')).toBeTruthy()
    drop.toggleSelected()
    expect(!drop.selected).toBeTruthy()
    expect(!drop.hasAttribute('selected')).toBeTruthy()
  })

  it('set fixed', () => {
    const drop = new DropZone()

    drop.fixed = false
    expect(!drop.hasAttribute('fixed')).toBeTruthy()

    drop.fixed = true
    expect(drop.hasAttribute('fixed')).toBeTruthy()
  })

  it('set Position with columns', () => {
    const parent = new DropZone()
    parent.setAttribute('cols', '3')

    const drop1 = new DropZone()
    const drop2 = new DropZone()
    const drop3 = new DropZone()
    const drop4 = new DropZone()
    const drop5 = new DropZone()
    const drop6 = new DropZone()
    const drop7 = new DropZone()
    const drop8 = new DropZone()
    const drop9 = new DropZone()

    parent.appendChild(drop1)
    parent.appendChild(drop2)
    parent.appendChild(drop3)
    parent.appendChild(drop4)
    parent.appendChild(drop5)
    parent.appendChild(drop6)
    parent.appendChild(drop7)
    parent.appendChild(drop8)
    parent.appendChild(drop9)

    drop1._setPosition(parent)
    drop2._setPosition(parent)
    drop3._setPosition(parent)
    drop4._setPosition(parent)
    drop5._setPosition(parent)
    drop6._setPosition(parent)
    drop7._setPosition(parent)
    drop8._setPosition(parent)
    drop9._setPosition(parent)

    expect(drop1.getPositions()).toEqual({
      x: 0,
      y: 0
    })

    expect(drop5.getPositions()).toEqual({
      x: 1,
      y: 1
    })

    expect(drop9.getPositions()).toEqual({
      x: 2,
      y: 2
    })

    const drag = new DragZone()
    drag.init().render().load()
    drag.x = 0
    drag.y = 0

    let difference = parent.getDifferenceDropsPositions(drop1, drag)
    expect(difference.x).toEqual(0)
    expect(difference.y).toEqual(0)

    let relativeDrop = parent.getRelativeDrop(drag, difference)
    expect(relativeDrop.id).toEqual(drop1.id)

    difference = parent.getDifferenceDropsPositions(drop5, drag)

    expect(difference.x).toEqual(1)
    expect(difference.y).toEqual(1)

    relativeDrop = parent.getRelativeDrop(drag, difference)
    expect(relativeDrop.id).toEqual(drop5.id)

    difference = parent.getDifferenceDropsPositions(drop9, drag)

    expect(difference.x).toEqual(2)
    expect(difference.y).toEqual(2)

    relativeDrop = parent.getRelativeDrop(drag, difference)
    expect(relativeDrop.id).toEqual(drop9.id)

    drag.x = 5
    drag.y = 0

    difference = parent.getDifferenceDropsPositions(drop1, drag)

    expect(difference.x).toEqual(-5)
    expect(difference.y).toEqual(0)

    relativeDrop = parent.getRelativeDrop(drag, difference)
    expect(relativeDrop.id).toEqual(drop1.id)

    expect(parent.isDestinationValid(drop1, [drag])).toBeTruthy()

    drag.x = null
    drag.y = 0
    expect(!parent.isDestinationValid(drop1, [drag])).toBeTruthy()

    expect(!parent.isDestinationValid(drop1, [])).toBeTruthy()
  })

  it('clean Selected Drags', () => {
    const parent = new DropZone()

    const drag1 = new DragZone()
    drag1.selected = true

    const drag2 = new DragZone()
    drag2.selected = true

    const drag3 = new DragZone()
    drag3.selected = true

    const drag4 = new DragZone()

    parent.appendChild(drag1)
    parent.appendChild(drag2)
    parent.appendChild(drag3)
    parent.appendChild(drag4)

    expect(parent._getSelectedDrags().length).toEqual(3)

    parent.cleanSelectedDrags()
    expect(parent._getSelectedDrags().length).toEqual(0)

    parent.setSelectedDrags(true)
    expect(parent._getSelectedDrags().length).toEqual(4)
  })

  it('get Parent Drop', () => {
    const drop1 = new DropZone()
    const parent = new DropZone()
    parent.appendChild(drop1)

    const drop2 = new DropZone()
    const div = document.createElement('div')
    const drag = new DragZone()

    drag.appendChild(div)
    div.appendChild(drop2)

    expect(!parent.getParentDrop()).toBeTruthy()
    expect(drop1.getParentDrop().id).toEqual(parent.id)
    expect(!drop2.getParentDrop()).toBeTruthy()
  })

  it('on Mouse Over', () => {
    const parent = new DropZone()

    const event = new MouseEvent('mouseover', {
      shiftKey: true
    })

    parent.addEventListener('drop:mouseover', event => {
      expect(event['detail'].value).toBeTruthy()
    })

    parent.onMouseOver(event)

    const event2 = new MouseEvent('mouseover', {
      shiftKey: false
    })
    parent.onMouseOver(event2)
  })

  it('on Click', () => {
    const parent = new DropZone()
    parent.setAttribute('value', '123')
    parent.fixed = true

    const event = new CustomEvent('click')

    parent.addEventListener('drop:clicked', event => {
      expect(event['detail'].value).toEqual('123')
    })

    // parent.onClick(event)

    // parent.fixed = false
    // parent.onClick(event)
  })

  it('on Dragenter, on Dragleave', () => {
    const parent = new DropZone()
    parent.setAttribute('value', '123')
    parent.fixed = true

    const dragenter = new CustomEvent('dragenter')
    parent.onDragenter(dragenter)
    expect(parent.classList.contains('ark-zone-drop--hover')).toBeTruthy()

    const dragleave = new CustomEvent('dragleave')
    parent.onDragleave(dragleave)
    expect(!parent.classList.contains('ark-zone-drop--hover')).toBeTruthy()

    parent.fixed = false
    parent.onDragenter(dragenter)
  })
})
