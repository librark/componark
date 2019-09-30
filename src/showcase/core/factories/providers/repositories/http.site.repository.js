/**
 * @typedef {import('../../../../../application/models').Site} Site
 * @typedef {import('../../../../../application/services').IdentityService}
 * IdentityService
 **/
import { HttpRepository } from './http.repository'
import { Repository } from '../../../../../application/repositories'

/** @extends Repository<Site> */
export class SiteRepository extends Repository {}

/** @extends HttpRepository<Site> */
export class HttpSiteRepository extends HttpRepository {
  /** @param {{identityService: IdentityService}} Object */
  constructor ({ identityService }) {
    super({ identityService: identityService, urlBase: '/sites' })
  }
}
