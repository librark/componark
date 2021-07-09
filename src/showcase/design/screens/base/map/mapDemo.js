import { Component } from 'base/component'

export class MapDemo extends Component {
  render() {
    this.content = /* html */ `

    <h1>Normal map</h1>
      <div class="ark-map-main">
        <ark-map 
          lat="2.441838" 
          lon="-76.606804" 
          height="60vh" 
          token="${this.token}" 
          zoom="16">
          </ark-map>
      </div>
      
      <h1>Map inside a modal</h1>
      <ark-button background="primary" btn-open>open</ark-button>
      
      <ark-modal 
      round="md" 
      title="Prueba mapa" 
      subtitle="Mi mapa"
      width="60%">
        <ark-map 
          widht="100%"
          lat="2.440363"
          lon="-76.611944" 
          token="${this.token}" 
          zoom="30">
        </ark-map>
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
    this.modalMap = this.querySelector('.ark-modal .ark-map')

    this.modalMap.addMarker('2.440363', '-76.611944')
    this.map.addMarker(
      '2.441838',
      '-76.606804',
      'https://xavierferras.com/wp-content/uploads/2019/02/266-Persona.jpg'
    )
    this.map.addMarker(
      '2.443839',
      '-76.607905',
      'https://www.isesinstituto.com/sites/default/files/istock-1158245282.jpg'
    )

    const mapMarkers = this.querySelectorAll('.leaflet-marker-icon')
    mapMarkers[0].addEventListener('click', () => {
      console.log('Marker works')
    })

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
