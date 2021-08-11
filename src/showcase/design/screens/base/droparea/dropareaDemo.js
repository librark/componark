import { Component } from 'base/component'

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
            <ark-droparea listen on-alter="onFileList></ark-droparea>

            <h4>Output as objectURL:</h4>
            <div data-file-multi></div>
        </div>
        <div class="droparea-demo">
           <p>Single</p>
           <ark-droparea single accept="image" max-size="5"></ark-droparea>
       </div>

     <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/droparea/README.rst">
      * Reference
      </a>
        `
    return super.render()
  }

  async onFileList(event) {
    const element = this.querySelector('[data-file-multi]')
    const droparea = this.select('.ark-droparea')
    const urlList = []
    // await event.detail.forEach((blobUrl) => {
    //   let blob = fetch(blobUrl).then((r) => r.blob())
    //   blob.then((data) => console.log(data))
    // })
    if (element) {
      droparea.fileList.forEach((file, index) =>
        urlList.push(
          `
          <p>
          <strong>${index}</strong> : ${file.name} 
          <strong>url:</strong>"${droparea.urlList[index]}"
          <a href="${droparea.urlList[index]}" target="_blank">link</a>
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
        color: var(--primary);
    }
    .droparea-demo{
        max-width: 80%;
        min-width: 250px
    }
`

Component.define(tag, DropareaDemo, styles)
