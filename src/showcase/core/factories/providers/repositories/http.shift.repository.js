/**
 * @typedef {import('../../../../../application/models').Shift} Shift
 * @typedef {import('../../../../../application/services').IdentityService}
 * IdentityService
 **/
import { HttpRepository } from './http.repository'
import { Repository } from '../../../../../application/repositories'

/** @extends Repository<Shift> */
export class ShiftRepository extends Repository {}

/** @extends HttpRepository<Shift> */
export class HttpShiftRepository extends HttpRepository {
  /** @param {{identityService: IdentityService}} Object */
  constructor ({ identityService }) {
    super({ identityService: identityService, urlBase: '/shifts' })
  }
}
