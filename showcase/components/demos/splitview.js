import { Component } from '@knowark/componarkjs'

let tag = 'demo-splitview'
export class SplitViewDemo extends Component {
  render () {
    this.content = /* html */ `
      <ark-splitview>
        <ark-splitview-master resize master-event="list:selected">
          <ark-list background='light' color='dark' data-list></ark-list>
        </ark-splitview-master>

        <ark-splitview-detail style="background:grey" title="Demo" hidden>
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

tag = "demo-splitview-detail"
export class SplitviewDetailDemo extends Component {
  init(context = {}) {
    if (!context.data) return super.init()

    const data = context.data
    this.first = data.first
    this.second = data.second
    this.year = data.year
    return super.init()
  }

  render() {
    this.content = this.first
      ? /* html */ `
      <button listen on-click="onClick"
        style="margin:8px; --display-large:none;"
        >Close</button>
        <h1>${this.year}</h1>
        <p>
          <span data-first>FIRST: ${this.first}</span>
          <span> | </span>
          <span data-second>SECOND: ${this.second}</span>
        </p>
      `
      : /* html */ `
        <h1>Ark Detail Example</h1>
      `
    return super.render()
  }

  onClick (event) {
    event.stopPropagation()
    this.emit('close')
  }
}
Component.define(tag, SplitviewDetailDemo)
