import { Component } from '../component'

export class Paginator extends Component {

  collectionSize: number
  pageSize: number
  currentPage: number

  init (context?: {
    collectionSize: number,
    pageSize?: number,
    currentPage?: number,
  }): this
}

