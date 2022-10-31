import { Component } from 'base/component/index.js'
import './detailDemo.js'

const tag = 'demo-splitview'

export class SplitViewDemo extends Component {
  render () {
    this.content = /* html */ `
      <ark-splitview>
        <ark-splitview-master resize master-event="list:selected">
          <ark-list background='light' color='dark' data-list></ark-list>
        </ark-splitview-master>

        <ark-splitview-detail title="Demo">
          <ark-icon slot="icon" name='fas fa-chevron-left'></ark-icon>
          <demo-splitview-detail></demo-splitview-detail>
        </ark-splitview-detail>

      </ark-splitview>

      <a 
        target="_blank"
        href="https://github.com/knowark/componark/blob/master/lib/components/splitview/README.md" 
        class="reference">
      * Reference
      </a>
    `

    this.initList()

    return super.render()
  }


  initList () {
    const template = item => /* html */ `
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

    const source = [
      { first: 'Colombia', second: 'Argentina', year: 2016 },
      { first: 'Uruguay', second: 'Colombia', year: 2017 },
      { first: 'Brasil', second: 'Argentina', year: 2018 },
      { first: 'Perú', second: 'Bolivia', year: 2019 }
    ]

    this.select('[data-list]').init({
      source: source,
      template: template
    }).render()

  }
}

Component.define(tag, SplitViewDemo)
