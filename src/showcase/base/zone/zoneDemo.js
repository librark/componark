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
          <ark-zone>
            <ark-zone-drop>
              <ark-zone-drag>drag 1</ark-zone-drag>
              <ark-zone-drag>drag 2</ark-zone-drag>
            </ark-zone-drop>
          </ark-zone>
        </ark-grid-item>
        <ark-grid-item cols="3" rows="1">
          <ark-zone>
            <ark-zone-drop></ark-zone-drop>
          </ark-zone>
        </ark-grid-item>
        <ark-grid-item cols="3" rows="2">
          <ark-zone cols="2" rows="2" style="background: white;">
            <ark-grid cols="2" gap="5px">
              <ark-grid-item>
                <ark-zone-drop>

                  <ark-zone-drag>
                    <p>===== Drag =====</p>
                    <!-- <ark-zone-drop>
                      <p>Drop</p>
                    </ark-zone-drop> -->
                  </ark-zone-drag>

                </ark-zone-drop>
              </ark-grid-item>
              <ark-grid-item>
                <ark-zone-drop></ark-zone-drop>
              </ark-grid-item>
              <ark-grid-item>
                <ark-zone-drop></ark-zone-drop>
              </ark-grid-item>
              <ark-grid-item>
                <ark-zone-drop></ark-zone-drop>
              </ark-grid-item>
            </ark-grid>
          </ark-zone>
        </ark-grid-item>
      </ark-grid>
      <!--  -->
    `
		// ${this._setupContent()}
		// ${this._getDoc()}

		this._appendStyle()
		return super.render()
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
