import { options as SwaggerOptions } from 'adonis-autoswagger/dist/types.js'

/**
 * Configuración de adonis-autoswagger.
 *
 * @remarks La spec generada solo describe lo que existe hoy en
 * `start/routes.ts` (auth, users, health) — el resto del dominio de FlowSync
 * descrito en `docs/PRD.md` (tareas, sincronización con Google Calendar)
 * todavía no está implementado y por lo tanto no aparece aquí.
 */
const swaggerConfig: SwaggerOptions = {
  path: './',
  title: 'FlowSync API (starter)',
  version: '1.0.0',
  description:
    'Auth + directorio de usuarios del starter full-stack-adonisjs (AdonisJS 7). ' +
    'No incluye el dominio de tareas ni la sincronización con Google Calendar del PRD: ' +
    'ese código todavía no existe en este repo.',
  tagIndex: 2,
  snakeCase: false,

  ignore: ['/swagger', '/docs', '/openapi', '/'],
  preferredPutPatch: 'PUT',

  common: {
    parameters: {},
    headers: {},
  },

  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      description: 'Access token opaco de AdonisJS (prefijo oat_), emitido en login/registro.',
    },
  },
  defaultSecurityScheme: 'bearerAuth',
  persistAuthorization: true,
}

export default swaggerConfig
