import { Component } from 'base/component'

import './detailDemo'


export class SplitViewDemo extends Component {
  render () {
    this.content = /* html */ `
      <ark-splitview>

        <ark-splitview-master resize master-event="list:selected"
         style="width: 40%">
          <ark-list data-list></ark-list>
        </ark-splitview-master>

        <ark-splitview-detail>
          <demo-splitview-detail></demo-splitview-detail>
        </ark-splitview-detail>

      </ark-splitview>
    `

    this.initSplitView()
    this.initList()

    return super.render()
  }

  initSplitView () {
    this.select('ark-splitview').init({
      title: 'Resultados',
      backButtonIcon: () => {
        return /* html */ `
          <ark-icon name='fas fa-chevron-left'></ark-icon>
        `
      }
    }).render()
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
Component.define('demo-splitview', SplitViewDemo)
