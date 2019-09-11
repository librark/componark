import { Component } from '../components'

export class ZoneDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `<!--  -->
      <ark-grid cols="4" gap="5px" class="container">
        <ark-grid-item cols="1" rows="3">

          <ark-zone listen on-drag:dropped="_onDragDropped">
            <ark-grid cols="1" rows="2" gap="5px">
              <ark-zone-drop value="Drop A1">
                <ark-zone-drag value="Drag 1">drag 1</ark-zone-drag>
                <ark-zone-drag value="Drag 2">drag 2</ark-zone-drag>
              </ark-zone-drop>
              <ark-zone-drop value="Drop A2"></ark-zone-drop>
            </ark-grid>
          </ark-zone>

        </ark-grid-item>
        <ark-grid-item cols="3" rows="1">

          <ark-zone listen on-drag:dropped="_onDragDropped">
            <ark-grid cols="4" gap="5px">
              <ark-zone-drop value="Drop A01"></ark-zone-drop>
              <ark-zone-drop value="Drop A02"></ark-zone-drop>
              <ark-zone-drop value="Drop A03"></ark-zone-drop>
              <ark-zone-drop value="Drop A04"></ark-zone-drop>
            </ark-grid>
          </ark-zone>

        </ark-grid-item>
        <ark-grid-item cols="3" rows="2">

            <ark-zone cols="3" listen
              on-drag:dropped="_onDragDropped"
              on-drop:clicked="_onDropClicked"
              on-drag:clicked="_onDragClicked"
            >
              <ark-grid cols="3" rows="4" gap="5px">
                <ark-grid-item>
                  <ark-zone-drop value="Drop 1">
                    <ark-zone-drag value="Drag 3">
                      <p>===== Drag 3 =====</p>
                    </ark-zone-drag>
                  </ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 2">
                    <ark-zone-drag value="Drag 4">
                      <p>===== Drag 4 =====</p>
                    </ark-zone-drag>
                  </ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 3"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 4"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 5"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 6"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 7"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 8"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 9"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 10"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 11"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop value="Drop 12"></ark-zone-drop>
                </ark-grid-item>
              </ark-grid>
            </ark-zone>

        </ark-grid-item>
      </ark-grid>

      <p>
        Elemento Arrastrados: <span data-drags></span>
      </p>
      <p>
        Elementos Seleccionado: <span data-detail></span>
      </p>
    `

		this._appendStyle()
		return super.render()
	}

	/** @param {event} event */
	_onDragDropped (event) {
		const value = event['detail']['value']
		this.select('[data-drags]').innerHTML = JSON.stringify(value)
	}

	/** @param {event} event */
	_onDropClicked (event) {
		this.select('[data-detail]').innerHTML = event['detail']['value']
	}

	/** @param {event} event */
	_onDragClicked (event) {
		this.select('[data-detail]').innerHTML = event['detail']['value']
	}

	_appendStyle () {
		const style = document.createElement('style')
		style.innerHTML = /* css */ `
        .container{
          height: 80vh;
        }

        ark-grid ark-grid-item{
          background: #E5E5FF;
        }

        ark-zone-drag{
          min-height: 100px;
          min-width: 100px;
          border: 1px solid;
        }

        ark-zone-drop{
          background: #E5E5FF;
        }

        ark-zone{
          background: white;
        }
        ark-zone[selected]{
          background: blue;
        }
      `

		this.appendChild(style)
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
customElements.define('demo-zone', ZoneDemo)
