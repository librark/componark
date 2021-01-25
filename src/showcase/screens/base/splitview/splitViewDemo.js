import './detail.example'

import { Component } from 'base/component'

export class SplitViewDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-splitview>

        <ark-splitview-master resize master-event="list:selected"
         style="width: 40%">
          <ark-list></ark-list>
        </ark-splitview-master>

        <ark-splitview-detail>
          <ark-detail-example></ark-detail-example>
        </ark-splitview-detail>

      </ark-splitview>
    `

    this.initSplitView()
    this.initList()

    return super.render()
  }

  get splitview () {
    return this.select('ark-splitview')
  }

  initSplitView () {
    this.splitview.init({
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

    const list = this.splitview['master'].select('ark-list')
    list
      .init({
        source: source,
        template: template
      })
      .render()
  }
}
Component.define('demo-splitview', SplitViewDemo)
