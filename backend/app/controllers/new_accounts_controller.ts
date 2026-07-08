import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator } from '#validators/auth'
import { UserTransformer } from '#transformers/user_transformer'

export default class NewAccountsController {
  /**
   * @store
   * @summary Registrar cuenta
   * @requestBody { "email": "user@example.com", "password": "secret123", "fullName": "Ada Lovelace" }
   * @responseBody 201 - { "user": {}, "token": "oat_..." } - Cuenta creada
   * @responseBody 422 - { "errors": [{ "message": "...", "rule": "..." }] } - Email duplicado / inválido o password corta
   */
  /**
   * `POST /api/v1/account/register`
   *
   * Crea una cuenta nueva a partir de `email` + `password` (y `fullName`
   * opcional) y responde con el usuario creado más un access token nuevo.
   *
   * @throws {E_VALIDATION_ERROR} 422 si el email ya existe, tiene formato
   * inválido, o la password mide menos de 8 caracteres (ver
   * `signupValidator`).
   * @remarks El `password` se hashea con scrypt (`AuthFinder` en
   * `app/models/user.ts`) antes de persistirse; nunca se expone en la
   * respuesta (`UserTransformer` lo excluye).
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(signupValidator)

    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    return response.created({
      user: UserTransformer.toJSON(user),
      token: token.value!.release(),
    })
  }
}
