import { Component } from '../../../base/component'
import {styles} from '../styles'

const tag = 'ark-droparea'

export class Droparea extends Component {
  init (context = {}) {
        return super.init()
  }

  render () {
    this.content = /* html */`
      <form class="ark-droparea__form">
        <p class="ark-droparea__message">
          Drag & Drop multiple files or click to upload
        </p>
        <input type="file" 
               class="ark-droparea__input"
               id="fileElem" 
               multiple 
               accept="image/*" 
               onchange="handleFiles(this.files)">
        <label class="ark-droparea__button"
               for="fileElem">
          Select some files
        </label>
      </form>
   `
    return super.render()
  }


}
Component.define(tag, Droparea, styles)
