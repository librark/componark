import { Component } from '../components'

export class DragDropDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <ark-grid cols="4">
        <ark-grid-item cols="1" rows="3">
          <ark-dragdrop droppable>
            <ark-dragdrop>draggable 1</ark-dragdrop>
            <ark-dragdrop>draggable 2</ark-dragdrop>

            <ark-dragdrop level="1">
              <h4>Container 2</h4>
              <ark-dragdrop droppable>
                <ark-dragdrop draggable>
                  <h4>dragdrop 7</h4>
                </ark-dragdrop>
              </ark-dragdrop>
            </ark-dragdrop>

          </ark-dragdrop>
        </ark-grid-item>
        <ark-grid-item cols="3" rows="1">
          <ark-dragdrop droppable direction="row">
            <ark-dragdrop>draggable 3</ark-dragdrop>
            <ark-dragdrop>draggable 4</ark-dragdrop>
            <ark-dragdrop>draggable 5</ark-dragdrop>

            <ark-dragdrop level="1">
              <h4>Container 1</h4>
              <ark-dragdrop droppable>
                <ark-dragdrop draggable>
                  <h4>dragdrop 6</h4>
                </ark-dragdrop>
              </ark-dragdrop>
            </ark-dragdrop>

        </ark-grid-item>
        <ark-grid-item>
          <ark-dragdrop droppable></ark-dragdrop>
        </ark-grid-item>
        <ark-grid-item>
          <ark-dragdrop droppable></ark-dragdrop>
        </ark-grid-item>
        <ark-grid-item>
          <ark-dragdrop droppable></ark-dragdrop>
        </ark-grid-item>
        <ark-grid-item>
          <ark-dragdrop droppable></ark-dragdrop>
        </ark-grid-item>
        <ark-grid-item>
          <ark-dragdrop droppable></ark-dragdrop>
        </ark-grid-item>
        <ark-grid-item>
          <ark-dragdrop droppable></ark-dragdrop>
        </ark-grid-item>
      </ark-grid>
    `
		// ${this._setupContent()}
		// ${this._getDoc()}

		this._appendStyle()
		return super.render()
	}

	_appendStyle () {
		const style = document.createElement('style')
		style.innerHTML = /* css */ `
        ark-grid{
          height: 80vh;
        }
        ark-grid-item{
          background: rgba(0, 0, 255, .1);
        }
      `

		this.appendChild(style)
	}

	_getDoc () {
		return /* html */ `
      <h4>default</h4>
      <ul>
        <li>[draggable] ark-dragdrop</li>
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
customElements.define('demo-dragdrop', DragDropDemo)
