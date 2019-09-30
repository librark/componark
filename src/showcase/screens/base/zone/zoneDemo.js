import {
	Component
} from '../loader'

export class ZoneDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `<!--  -->

      <ark-zone
        listen
        on-zone:alter="_onZoneAlter"
        on-drop:clicked="_onDropClicked"
        on-drag:clicked="_onDragClicked"
      >
          <ark-grid cols="4" gap="15px">

            <ark-grid-item cols="4">
              <ark-zone-drop cols="5" value="Drop A" class="white">
                <ark-grid cols="5" gap="5px">

                  <ark-zone-drop value="Drop A 01">
                    <ark-zone-drag value="Drag A 01">drag 1</ark-zone-drag>
                  </ark-zone-drop>

                  <ark-zone-drop value="Drop A 02">
                    <ark-zone-drag value="Drag A 02">drag 2</ark-zone-drag>
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

            <ark-grid-item cols="4">
              <ark-zone-drop cols="5" value="Drop B" class="white">
                <ark-grid cols="5" gap="5px">

                  <ark-zone-drop value="Drop B 01"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 02"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 03"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 04"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 05"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 06"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 07"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 08"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 09"></ark-zone-drop>
                  <ark-zone-drop value="Drop B 010"></ark-zone-drop>

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
	_onZoneAlter (event) {
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
        demo-zone{
          height: 80vh;
          display: block;
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

        .white{
          background: white;
          outline: 1px solid;
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
