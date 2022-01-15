import { Component } from 'base/component/index.js'

export class ZoneDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <ark-zone
        listen
        on-zone:alter="_onZoneAlter"
        on-zone:selecteddrags="_onZoneSelectedDrags"
        on-drop:clicked="_onDropClicked"
        on-drag:clicked="_onDragClicked"
      >
          <ark-grid cols="4" gap="15px">

            <ark-grid-item cols="4">
              <ark-zone-drop cols="5" value="Drop A" class="white">
                <ark-grid cols="5" gap="5px">

                  <ark-zone-drop value="Drop A 01">
                    <ark-zone-drag value="Drag A 01">
                      <ark-card title="Drag 1"></ark-card>
                    </ark-zone-drag>
                  </ark-zone-drop>

                  <ark-zone-drop value="Drop A 02">
                    <ark-zone-drag value="Drag A 02">
                      <ark-card title="Drag 2"></ark-card>
                    </ark-zone-drag>
                  </ark-zone-drop>

                  <ark-zone-drop value="Drop A 03"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 04"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 05"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 06"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 07"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 08"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 09"></ark-zone-drop>
                  <ark-zone-drop value="Drop A 010"></ark-zone-drop>

                </ark-grid>
              </ark-zone-drop>
            </ark-grid-item>

            <ark-grid-item cols="2">
              <ark-zone-drop cols="2" value="Drop C" class="white">
                <ark-grid cols="2" gap="5px">

                  <ark-zone-drop value="Drop C 01"></ark-zone-drop>
                  <ark-zone-drop value="Drop C 02"></ark-zone-drop>
                  <ark-zone-drop value="Drop C 03"></ark-zone-drop>
                  <ark-zone-drop value="Drop C 04"></ark-zone-drop>

                </ark-grid>
              </ark-zone-drop>
            </ark-grid-item>

            <ark-grid-item cols="2">
              <ark-zone-drop cols="2" value="Drop D" class="white">
                <ark-grid cols="2" gap="5px">

                  <ark-zone-drop value="Drop D 01"></ark-zone-drop>
                  <ark-zone-drop value="Drop D 02"></ark-zone-drop>
                  <ark-zone-drop value="Drop D 03"></ark-zone-drop>
                  <ark-zone-drop value="Drop D 04"></ark-zone-drop>

                </ark-grid>
              </ark-zone-drop>
            </ark-grid-item>

          </ark-grid>
      </ark-zone>

      <ark-button background="primary" listen on-click="_selectAll">
        Select all
      </ark-button>

      <p>
        Elemento Arrastrados: <span data-drags></span>
      </p>
      <p>
        Elementos Seleccionado: <span data-detail></span>
      </p>
      <p>
        Total Elementos Seleccionado: <span data-total-selected></span>
      </p>
    `
    return super.render()
  }

  /** @param {CustomEvent} event */
  _onZoneAlter (event) {
    const value = event.detail.value
    this.select('[data-drags]').innerHTML = JSON.stringify(value)
  }

  /** @param {CustomEvent} event */
  _onZoneSelectedDrags (event) {
    const drags = /** @type {DragZone[]} */ (event.detail)
    this.select('[data-total-selected]').innerHTML = `${drags.length}`
  }

  /** @param {CustomEvent} event */
  _onDropClicked (event) {
    this.select('[data-detail]').innerHTML = event.detail.value
  }

  /** @param {CustomEvent} event */
  _onDragClicked (event) {
    this.select('[data-detail]').innerHTML = event.detail.value
  }

  _selectAll () {
    const zone = /** @type {Zone} */ (this.select('ark-zone'))
    zone.setSelectedDrags('', true)

    const drags = zone.getSelectedDrags()

    this.select('[data-total-selected]').innerHTML = `
      ${drags.length}
    `

    this.select('[data-detail]').innerHTML = `
      ${drags.map(drag => drag.value)}
    `
  }

  get styles () {
    return /* html */ `
      <style>
        demo-zone demo-zone{
          height: initial;
          display: block;
        }

        demo-zone ark-grid ark-grid-item{
          background: #E5E5FF;
        }

        demo-zone ark-zone-drag{
          margin: 5px;
          /* border: 1px solid; */
          /* min-height: 100px;
          min-width: 100px;
          border: 1px solid; */
        }

        demo-zone ark-zone-drop{
          background: #E5E5FF;
        }

        .white{
          background: white;
          outline: 1px solid;
        }

        demo-zone ark-zone[selected]{
          background: blue;
        }

        demo-zone ark-card p{
          margin: 0px;
        }
      </style>
    `
  }

  _getDoc () {
    return /* html */ `
      <h4>default</h4>
      <ul>
        <li>[draggable] ark-zone-drop</li>
        <li>[direction] column</li>
      </ul>

      <h4>Attributes</h4>
      <ul>
        <li>draggable || droppable</li>
        <li>[direction]: column || row </li>
      </ul>
    `
  }
}
Component.define('demo-zone', ZoneDemo)
