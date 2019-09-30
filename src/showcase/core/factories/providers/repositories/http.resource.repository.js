/**
 * @typedef {import('../../../../../application/models').Resource} Resource
 * @typedef {import('../../../../../application/services').IdentityService}
 * IdentityService
 **/
import { HttpRepository } from './http.repository'
import { Repository } from '../../../../../application/repositories'

/** @extends Repository<Resource> */
export class ResourceRepository extends Repository {}

/** @extends HttpRepository<Resource> */
export class HttpResourceRepository extends HttpRepository {
  /** @param {{identityService: IdentityService}} Object */
  constructor ({ identityService }) {
    super({ identityService: identityService, urlBase: '/resources' })
  }
}
