import { Component } from '../../../base/component'
import {styles} from '../styles'
// @ts-ignore
const tag = 'ark-droparea'

export class Droparea extends Component {
  init (context = {}) {
        return super.init()
  }

  render () {
    this.content = /* html */`
      <form class="ark-droparea__form">
          <ark-icon type="mat" name="cloud_upload"></ark-icon>
          <h1 class="ark-droparea__message">
          Drag & Drop multiple files or click to upload
        </h1>
        <input type="file" 
               class="ark-droparea__input"
               id="fileElem" 
               multiple 
               accept="image/*" 
               onchange="handleFiles(this.files)">
        <div class="ark-droparea__gallery"></div>
      </form>
  `
    
      this.dragDropEvents =['dragenter','dragover','dragleave','drop']
      this.dragEvents = this.dragDropEvents.slice(0,2)
      this.dropEvents = this.dragDropEvents.slice(2)

    /* Progress bar variables */
    //<progress max="100" value="0" class="ark-droparea__progress"></progress>

    // this.filesDone = 0
    // this.filesToDo = 0
    return super.render()
    }
    
    async load () {
        this.dragDropEvents.forEach(eventName => {
            this.addEventListener(eventName, this.preventDefaults, false)
        })
      
        this.dragEvents.forEach(eventName => {
            this.addEventListener(eventName, this.highlight, false)
        })
    
        this.dropEvents.forEach(eventName => {
            this.addEventListener(eventName, this.unhighlight, false)
        })
    
        // this.addEventListener('drop', this.handleDrop, false)
  }

    preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    highlight (e){
        this.dropZone.classList.add('highlight')
    }
    
    unhighlight(e){
        this.dropZone.classList.remove('highlight')
    }
    
    
    // handleDrop(e){
    //     let data = e.dataTransfer
    //     let files = data.files
    //     this.handleFiles(files)
    // }
    
    // handleFiles(files){
    //     files = [...files]
    //     // this.initializeProgress(files.lenght)
    //     // files.forEach(this.uploadFile)
    //     files.forEach(this.previewFile)
        
    //     // let formData =  new FormData
    //     // for(let file in files){
    //     //     formData.append('file', files[file])
    //     // }
    //     // let fileList = formData.getAll('file')
    //     // return fileList
    // }
    
    // uploadFile(file){  
    //     let url = 'YOUR URL HERE'
    //     let formData = new FormData()

    //     formData.append('file', file)

    //     fetch(url,{
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then(()=>{
    //             /* Done. Inform the user*/ 
    //             //this.progressDone
    //         })
    //         .catch(()=>{
    //             /* Error, Inform the user */
    //         })
    // }

    // previewFile(file){
    //     const gallery = document.querySelector('.ark-droparea__gallery')
    //     let reader = new FileReader()
    //     let fileType = file.type.split('/')[0]
    //     reader.readAsDataURL(file)
    //     reader.onloadend = ()=>{
    //         let picture = document.createElement('picture')
    //         let p = document.createElement('p')
    //         p.innerText = file.name
    //         picture.style.backgroundImage = `url('${reader.result}')`
    //         fileType != 'image' ? gallery.appendChild(p) : gallery.appendChild(picture)
    //     }    
    // }    

    // initializeProgress(numFiles){
    //     this.progressBar.value = 0
    //     this.filesDone = 0
    //     this.filesToDo = numFiles
    // }

    // progressDone(){
    //     this.filesDone++
    //     this.progressBar.value = this.filesDone / this.filesToDo * 100
    // }

    // get progressBar () {
    //     return this.select('.ark-droparea__progress')
    // }

    get dropZone(){
        return this.select('.ark-droparea__form')
    }
}
Component.define(tag, Droparea, styles)
