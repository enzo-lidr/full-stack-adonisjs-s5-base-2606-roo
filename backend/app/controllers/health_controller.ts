import type { HttpContext } from '@adonisjs/core/http'

export default class HealthController {
  /**
   * @index
   * @summary Liveness check
   * @responseBody 200 - { "status": "ok" } - El servicio responde
   */
  /**
   * GET /api/v1/health
   * Endpoint de liveness. Creado en la Sesión 2 mediante el flujo OpenSpec.
   */
  async index({ response }: HttpContext) {
    return response.ok({ status: 'ok' })
  }
}
