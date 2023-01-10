import { Component } from 'base/component/index.js'

const tag = 'demo-droparea'
export class DropareaDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
      <h1 class="title">
        This is a drop area
      </h1>
      <div class="droparea-demo">
        <p>Default(multi)</p>
        <ark-droparea listen on-alter="onFileList"></ark-droparea>

        <h4>Output as objectURL:</h4>
        <div data-file-multi></div>
      </div>
      <div class="droparea-demo">
        <p>Single</p>
        <ark-droparea single accept="image" max-size="5"></ark-droparea>
      </div>
      <div class="droparea-demo">
        <p>Single</p>
        <ark-droparea data-load single accept="image" max-size="5"></ark-droparea>
      </div>

      <a
        class="reference"
        target="_blank"
        href="https://github.com/knowark/componark/tree/master/lib/components/droparea/README.md"
      >
        * Reference
      </a>
    `
    return super.render()
  }

  async load() {
    const myUrl =
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1888&q=80'

    const myFile = await this.getFileFromUrl(myUrl, 'Dogo.jpeg')
    this.select('ark-droparea[data-load]').update({ contextFiles: [myFile] })
  }

  async getFileFromUrl(url, name, defaultType = 'image/jpeg') {
    const response = await fetch(url)
    const data = await response.blob()
    return new File([data], name, {
      type: response.headers.get('content-type') || defaultType,
    })
  }

  async onFileList(event) {
    const element = this.querySelector('[data-file-multi]')
    const droparea = this.select('.ark-droparea')
    const urlList = []
    if (element) {
      droparea.fileList.forEach((file, index) =>
        urlList.push(
          `
          <p>
          <strong>${index}</strong> : ${file.name} 
          <strong>url:</strong>"${droparea.mediaList[index].url}"
          <a href="${droparea.mediaList[index].url}" target="_blank">link</a>
          </p>
          `
        )
      )
      element.innerHTML = urlList.join('')
    }
  }
}

const styles = /* css */ `
    .title{
        color: (var(--primary));
    }
    .droparea-demo{
        max-width: 80%;
        min-width: 250px
    }
`

Component.define(tag, DropareaDemo, styles)
