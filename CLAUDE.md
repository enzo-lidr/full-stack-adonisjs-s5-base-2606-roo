# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> En la Sesión 3 formalizamos esta memoria como `AGENTS.md` y la enlazamos con
> `ln -s AGENTS.md CLAUDE.md` para que sea agnóstica de la herramienta.

## Qué es este proyecto

Starter kit full-stack con autenticación por **access tokens**. Es el repo hilo
conductor del máster AI4Devs. Monorepo con dos apps independientes:

- `backend/` — API JSON en **AdonisJS 7** (TypeScript).
- `frontend/` — SPA en **React 19 + Vite**.

## Stack

| Capa | Tecnología |
|---|---|
| Backend framework | AdonisJS 7 (api starter kit) |
| ORM / DB | Lucid + SQLite (`better-sqlite3`) |
| Validación | VineJS |
| Auth | `@adonisjs/auth` · guard `api` (access tokens) |
| Frontend | React 19 + TypeScript + Vite |
| Routing FE | React Router |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| SDD | OpenSpec (`/opsx:*`) |

## Comandos

### Backend (`cd backend`)
- `npm run dev` — servidor con HMR en `http://localhost:3333`
- `npm run migration:run` — aplica migraciones
- `npm run migration:fresh` — recrea la BD desde cero
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm test` — corre los tests con Japa (suites `unit` y `functional` definidas en
  `adonisrc.ts`, sin ficheros todavía)
  - Un solo fichero: `node ace test --files="tests/functional/health.spec.ts"`
  - Una sola suite: `node ace test unit`
- `node ace list:routes` — inspecciona el árbol de rutas
- `node ace generate:key` — rellena `APP_KEY` en `.env`

### Frontend (`cd frontend`)
- `npm run dev` — Vite dev server en `http://localhost:5173`
- `npm run build` — `tsc -b && vite build`
- `npm run typecheck` — `tsc --noEmit`

## Arquitectura del backend

Flujo de una request en una ruta protegida (patrón a replicar para endpoints nuevos):

`start/routes.ts` (solo cablea, agrupa `/api/v1` y aplica `middleware.auth()`)
→ **controller** en `app/controllers/*_controller.ts` (lógica de negocio)
→ **validator** VineJS en `app/validators/*.ts` (valida `request.all()`/params)
→ **model** Lucid en `app/models/*.ts`
→ **transformer** en `app/transformers/*_transformer.ts` (da forma a la salida JSON)

Controllers existentes como referencia de este patrón: `new_accounts_controller.ts`
(registro), `access_tokens_controller.ts` (login/logout), `profiles_controller.ts`
(perfil autenticado), `users_controller.ts` (listado/detalle), `health_controller.ts`.

Auth: guard `api` basado en `DbAccessTokensProvider` (`config/auth.ts`), tokens
con prefijo `oat_`, expiración de 30 días, tabla `auth_access_tokens`. El
`AuthMiddleware` (`app/middleware/auth_middleware.ts`) autentica vía
`ctx.auth.authenticateUsing` y se aplica con `.use(middleware.auth())` a nivel de
grupo de rutas, no ruta a ruta.

## Arquitectura del frontend

- `src/services/authService.ts` centraliza las llamadas HTTP a `/api/v1/*` y
  persiste `token`/`user` en `localStorage`; es el único sitio que sabe hablar
  con el backend (no hacer `fetch` sueltos en componentes/páginas).
- `src/components/ProtectedRoute.tsx` guarda rutas comprobando
  `isAuthenticated()` (presencia de token en `localStorage`) y redirige a
  `/login` si no hay sesión; el enrutado vive en `src/App.tsx`.
- `src/pages/*` son las pantallas (Login, Signup, Dashboard); `src/components/ui/*`
  son primitivas shadcn/ui; `src/types/auth.ts` define los contratos compartidos
  con el backend (deben reflejar el shape que produce `UserTransformer`).

## Convenciones del backend

- Lógica **en controllers**, no en el archivo de rutas (`start/routes.ts` solo cablea).
- Validación de input **siempre** con un validator de VineJS (`app/validators/`).
- Serialización de salida **siempre** vía `UserTransformer` (`app/transformers/`),
  nunca devolviendo el modelo crudo (el `password` se excluye, pero el contrato
  de salida vive en un único sitio).
- Rutas bajo prefijo `/api/v1`. Las protegidas usan `middleware.auth()`.
- Imports con subpath imports (`#controllers/*`, `#models/*`, …), no rutas relativas.

## OpenSpec

Flujo spec-driven con los slash commands `/opsx:propose`, `/opsx:apply`,
`/opsx:archive`. La configuración vive en `openspec/config.yaml`; las specs
actuales están en `openspec/specs/authentication` y `openspec/specs/users`.
Convención de commits: conventional commits.

## No hacer

- No metas lógica de negocio en `start/routes.ts`.
- No devuelvas modelos Lucid directamente en las respuestas.
- No commitees `.env` ni `backend/tmp/db.sqlite3`.