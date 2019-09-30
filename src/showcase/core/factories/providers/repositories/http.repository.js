import { Filtrark, ServerError } from '../../../../../application/utilities'

import { Repository } from '../../../../../application/repositories'

/**
 * @typedef {import('../../../../../application/services').IdentityService}
 * IdentityService
 * @typedef {import('../../../../../application/services').AuthService}
 * AuthService
 * @typedef {Object} Entity
 * @property {string} id
 */

const SYNC = 'http://192.168.0.49:8090'
const AUTH = 'https://authproser.dev.nubark.cloud'
let TOKEN = null

/**
 * @template {Entity} T
 * @extends Repository<T>
 */
export class HttpRepository extends Repository {
  /** @param {{identityService: IdentityService, urlBase: string}} Object */
  constructor ({ identityService, urlBase }) {
    super()
    this.items = {}
    this.parser = new Filtrark()
    this.identityService = identityService
    this.urlBase = urlBase
  }

  /**
   * @param {Array<string | Array<any>>} domain
   * @return {Promise<Array<T>>}
   **/
  async search (domain) {
    let url = SYNC + this.urlBase
    const filter = JSON.stringify(domain)
    url = url + `?filter=${filter}`
    const records = await this._GET(url)
    const arrayElements = []
    for (const record of records) {
      arrayElements.push(record)
    }
    return Promise.resolve(arrayElements)
  }

  /** @param {T} item @return {Promise<>} */
  async add (item) {
    let url = SYNC + this.urlBase
    const records = await this._POST(url, item)
    return Promise.resolve(records)
  }

  /** @param {T} item  @return {Promise<boolean>} */
  async update (item) {
    let url = SYNC + this.urlBase
    if (await this._PUT(url, item)) return Promise.resolve(true)
    return Promise.resolve(false)
  }

  /** @param {T} item  @return {Promise<boolean>} */
  async remove (item) {
    let url = SYNC + this.urlBase
    if (await this._DELETE(url, item)) return Promise.resolve(true)
    return Promise.resolve(false)
  }

  /** @param {RequestInfo} url */
  async _GET (url) {
    if (TOKEN === null) TOKEN = await this._getToken()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN['access_token']}`
    }
    const response = await fetch(url, { method: 'GET', headers: headers })
    if (!response.ok) {
      const result = await response.json()
      const error = result.error
      throw new ServerError(`${error.exception}: ${error.message}`)
    }
    return response.json()
  }

  /**
   * @param {RequestInfo} url
   * @param {T} data
   */
  async _POST (url, data) {
    if (TOKEN === null) TOKEN = await this._getToken()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN['access_token']}`
    }
    const response = await fetch(url, {
      method: 'POST', body: JSON.stringify(data), headers: headers })
    if (!response.ok) {
      const result = await response.json()
      const error = result.error
      throw new ServerError(`${error.exception}: ${error.message}`)
    }
    return response
  }

  /**
   * @param {RequestInfo} url
   * @param {T} data
   */
  async _PUT (url, data) {
    if (TOKEN === null) TOKEN = await this._getToken()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN['access_token']}`
    }
    const response = await fetch(url, {
      method: 'PUT', body: JSON.stringify(data), headers: headers })
    if (!response.ok) {
      const result = await response.json()
      const error = result.error
      throw new ServerError(`${error.exception}: ${error.message}`)
    }
    return response
  }

  /**
   * @param {RequestInfo} url
   * @param {T} data
   */
  async _DELETE (url, data) {
    if (TOKEN === null) TOKEN = await this._getToken()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN['access_token']}`
    }
    const response = await fetch(url, {
      method: 'DELETE', body: JSON.stringify(data), headers: headers })
    if (!response.ok) {
      const result = await response.json()
      const error = result.error
      throw new ServerError(`${error.exception}: ${error.message}`)
    }
    return response
  }

  async _getToken () {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>> Se actualizo el TOKEN')
    const body = JSON.stringify({
      username: 'etlbot',
      password: 'minbot',
      tenant: 'servagro'
    })
    const headers = { 'Content-Type': 'application/json' }
    const url = AUTH + '/auth'
    const response = await fetch(url,
      { method: 'POST', body: body, headers: headers })
    if (!response.ok) {
      const result = await response.json()
      const error = result.error
      throw new ServerError(`${error.exception}: ${error.message}`)
    }
    const data = await response.json()
    return Promise.resolve(data)
    // const data = {
    //   access_token: 'aquí va el token'
    // }
    // return data
  }
}
