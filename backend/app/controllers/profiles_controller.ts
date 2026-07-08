import type { HttpContext } from '@adonisjs/core/http'
import { UserTransformer } from '#transformers/user_transformer'

export default class ProfilesController {
  /**
   * @show
   * @summary Perfil del usuario autenticado
   * @responseBody 200 - { "user": {} } - Usuario del token actual
   * @responseBody 401 - { "errors": [{ "message": "Unauthorized access" }] } - Sin token válido
   */
  /**
   * `GET /api/v1/account/profile`
   *
   * Devuelve el usuario asociado al access token de la petición actual.
   *
   * @remarks Requiere Bearer token válido; sin él, el middleware responde
   * `401 E_UNAUTHORIZED_ACCESS` antes de llegar aquí.
   */
  async show({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.ok({ user: UserTransformer.toJSON(user) })
  }
}
