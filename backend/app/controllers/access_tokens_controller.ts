import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { UserTransformer } from '#transformers/user_transformer'

export default class AccessTokensController {
  /**
   * @store
   * @summary Iniciar sesión
   * @responseBody 200 - { "user": {}, "token": "oat_..." } - Login correcto
   * @responseBody 400 - { "errors": [{ "message": "Invalid user credentials" }] } - Credenciales inválidas
   * @responseBody 422 - { "errors": [{ "message": "...", "rule": "..." }] } - Error de validación
   */
  /**
   * `POST /api/v1/account/login`
   *
   * Verifica credenciales, actualiza `lastSeenAt` del usuario y emite un
   * access token nuevo (prefijo `oat_`, expira a los 30 días — ver
   * `User.accessTokens` en `app/models/user.ts`).
   *
   * @throws {E_INVALID_CREDENTIALS} 400 si el email no existe o la password
   * no coincide (`User.verifyCredentials`) — el mensaje no distingue cuál de
   * los dos falló, a propósito, para no dar pistas de seguridad.
   * @throws {E_VALIDATION_ERROR} 422 si el payload omite `email`/`password`
   * o el email tiene formato inválido (ver `loginValidator`).
   */
  async store({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    user.lastSeenAt = DateTime.now()
    await user.save()

    const token = await User.accessTokens.create(user)

    return response.ok({
      user: UserTransformer.toJSON(user),
      token: token.value!.release(),
    })
  }

  /**
   * @destroy
   * @summary Cerrar sesión
   * @responseBody 200 - { "revoked": true } - Token revocado
   * @responseBody 401 - { "errors": [{ "message": "Unauthorized access" }] } - Sin token válido
   */
  /**
   * `POST /api/v1/account/logout`
   *
   * Revoca el access token con el que se autenticó esta misma petición
   * (`auth.getUserOrFail().currentAccessToken`) — no afecta otros tokens del
   * mismo usuario emitidos desde otras sesiones/dispositivos.
   *
   * @remarks Requiere Bearer token válido; sin él, el middleware responde
   * `401 E_UNAUTHORIZED_ACCESS` antes de llegar aquí.
   */
  async destroy({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = user.currentAccessToken
    await User.accessTokens.delete(user, token.identifier)

    return response.ok({ revoked: true })
  }
}
