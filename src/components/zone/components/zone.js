/**
 * @typedef {import('./drop').DropZone} DropZone
 * @typedef {import('./drag').DragZone} DragZone
 * */
import { Component } from '../../component'

export class Zone extends Component {}
customElements.define('ark-zone', Zone)
