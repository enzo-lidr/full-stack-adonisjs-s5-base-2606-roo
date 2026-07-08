import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { UserTransformer } from '#transformers/user_transformer'

export default class UsersController {
  /**
   * @index
   * @summary Listar usuarios
   * @responseBody 200 - { "users": [] } - Directorio completo (orden por created_at desc)
   * @responseBody 401 - { "errors": [{ "message": "Unauthorized access" }] } - Sin token válido
   */
  /**
   * `GET /api/v1/users`
   *
   * Devuelve el directorio completo de usuarios, ordenado por fecha de alta
   * descendente (el más reciente primero).
   *
   * @remarks Requiere Bearer token válido (`middleware.auth()` en las rutas);
   * si falta o es inválido, la petición nunca llega a este método — la
   * responde el middleware con `401 E_UNAUTHORIZED_ACCESS`.
   */
  async index({ response }: HttpContext) {
    const users = await User.query().orderBy('created_at', 'desc')
    return response.ok({ users: UserTransformer.collection(users) })
  }

  /**
   * @show
   * @summary Obtener usuario por id
   * @responseBody 200 - { "user": {} } - Usuario encontrado
   * @responseBody 404 - { "errors": [{ "message": "Row not found" }] } - No existe ese id
   * @responseBody 401 - { "errors": [{ "message": "Unauthorized access" }] } - Sin token válido
   */
  /**
   * `GET /api/v1/users/:id`
   *
   * Devuelve un único usuario por su id.
   *
   * @throws {E_ROW_NOT_FOUND} 404 si no existe un usuario con ese id
   * (`User.findOrFail`).
   * @remarks Requiere Bearer token válido; sin token o con uno inválido, el
   * middleware responde `401 E_UNAUTHORIZED_ACCESS` antes de llegar aquí.
   */
  async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.ok({ user: UserTransformer.toJSON(user) })
  }

  /*
  |----------------------------------------------------------------------
  | NOTA PARA EL FORMADOR:
  | El endpoint GET /api/v1/users/active (usuarios vistos en las
  | últimas 24h) se implementa EN VIVO durante la demo de la Sesión 3
  | aplicando el flujo Explore-Plan-Execute. No lo pre-implementes aquí.
  |----------------------------------------------------------------------
  */
}
