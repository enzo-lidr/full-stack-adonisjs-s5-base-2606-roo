# CLAUDE.md — Memoria del proyecto

> Contexto base para copilotos de IA (Claude Code / Cursor) sobre este repo.
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
| API docs | `adonis-autoswagger` + Scalar (`GET /openapi`, `GET /docs`) — generado desde las rutas reales |

## Comandos

### Backend (`cd backend`)

- `npm run dev` — servidor con HMR en `http://localhost:3333`
- `npm run migration:run` — aplica migraciones
- `npm run migration:fresh` — recrea la BD desde cero
- `npm run typecheck` — `tsc --noEmit`
- `node ace list:routes` — inspecciona el árbol de rutas

### Frontend (`cd frontend`)

- `npm run dev` — Vite dev server en `http://localhost:5173`
- `npm run build` — build de producción

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
`/opsx:archive`. La configuración vive en `openspec/config.yaml`.

> ⚠️ Al tocar una ruta/controller, actualiza también su requirement en
> `openspec/specs/`. La auditoría de S5 (`entregables/sesion-05/`) encontró
> una spec que documentaba un endpoint (`/users/active`) que el código no
> implementa — nadie lo valida automáticamente todavía.

## Arquitectura y decisiones

- Diagramas de arquitectura (contexto C4 + secuencia de login) en
  [`README.md`](./README.md#arquitectura), formato Mermaid.
- Decisiones técnicas significativas se registran como ADR en `docs/adr/`
  (formato MADR: contexto, opciones consideradas, decisión, consecuencias).
  No documentes ahí decisiones triviales — solo las que un developer nuevo
  cuestionaría ("¿por qué se hizo así?").

## Librerías del proyecto

Si tienes Context7 MCP conectado, úsalo al generar código con AdonisJS 7,
Lucid ORM, VineJS o React 19 (añade `use context7` al prompt). AdonisJS 7 es
muy reciente; sin Context7, un agente de IA puede generar código válido para
AdonisJS 6 que no funciona en la v7.

> Limitación conocida: la precisión de Context7 baja en queries que cruzan
> varias librerías a la vez (ej. "cómo interactúan VineJS y Lucid"). Si la
> pregunta es de integración compleja, prefiere un turno por librería en vez
> de mezclarlas en el mismo prompt.

## No hacer

- No metas lógica de negocio en `start/routes.ts`.
- No devuelvas modelos Lucid directamente en las respuestas.
- No commitees `.env` ni `backend/tmp/db.sqlite3`.
