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
            <ark-zone-drop detail="Drop A1">
              <ark-zone-drag detail="Drag 1">drag 1</ark-zone-drag>
              <ark-zone-drag detail="Drag 2">drag 2</ark-zone-drag>
            </ark-zone-drop>
          </ark-zone>

        </ark-grid-item>
        <ark-grid-item cols="3" rows="1">

          <ark-zone listen on-drag:dropped="_onDragDropped">
            <ark-zone-drop detail="Drop A2" direction="row"></ark-zone-drop>
          </ark-zone>

        </ark-grid-item>
        <ark-grid-item cols="3" rows="2">

            <ark-zone cols="3" listen on-drag:dropped="_onDragDropped"
            style="background: white;">
              <ark-grid cols="3" rows="4" gap="5px">
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 1">
                    <ark-zone-drag detail="Drag 3">
                      <p>===== Drag 3 =====</p>
                    </ark-zone-drag>
                  </ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 2">
                    <ark-zone-drag detail="Drag 4">
                      <p>===== Drag 4 =====</p>
                    </ark-zone-drag>
                  </ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 3"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 4"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 5"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 6"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 7"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 8"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 9"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 10"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 11"></ark-zone-drop>
                </ark-grid-item>
                <ark-grid-item>
                  <ark-zone-drop detail="Drop 12"></ark-zone-drop>
                </ark-grid-item>
              </ark-grid>
            </ark-zone>

        </ark-grid-item>
      </ark-grid>
    `

		this._appendStyle()
		return super.render()
	}

	/** @param {event} event */
	_onDragDropped (event) {
		console.log(event['detail'])
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
