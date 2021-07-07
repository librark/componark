import { Component } from 'base/component'

export class MapDemo extends Component {
  render() {
    this.content = /* html */ `

    <h1>Normal map</h1>
      <div class="ark-map-main">
        <ark-map height="60vh" token="${this.token}" zoom="8"></ark-map>
      </div>
      
      <h1>Map inside a modal</h1>
      <ark-button background="primary" btn-open>open</ark-button>
      
      <ark-modal 
      round="md" 
      title="Prueba mapa" 
      subtitle="Mi mapa"
      width="60%">
        <ark-map widht="100%" token="${this.token}" zoom="30"></ark-map>
      </ark-modal>

      <br>  
      <br>

      <div>
        <a href="https://leafletjs.com//">leafletjs</a>
        <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/map/README.rst">
        * Reference
        </a>
      </div>
      
    `
    this.map = this.querySelector('.ark-map')
    return super.render()
  }

  async load() {
    const open = this.querySelector('[btn-open]')
    const modal = this.querySelector('.ark-modal')
    open.addEventListener('click', (_) => {
      modal['open']()
      this.map.refreshMap()
    })
  }

  get token() {
    return (
      'pk.eyJ1IjoiaXRudWJhcmsiLCJhIjoiY2trcHlwMXlm' +
      'MGRrNjJ4bnlzbzRoZ2E3dCJ9.3fFQAbt-mME6ZizosagKEA'
    )
  }
}

const styles = /*css*/ `
  .ark-map-main {
    position: relative;
    z-index: 1;
  }
  .ark-modal .ark-map {
    z-index: 1000;
  }
`

Component.define('demo-map', MapDemo, styles)
