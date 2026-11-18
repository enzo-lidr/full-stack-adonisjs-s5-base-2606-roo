# M05 · Sesión 5 — Ejercicio

## Parte A — Revisión de backlog de historias de usuario

Revisión crítica de prompt y user stories del Módulo 04.

**1. ¿Siguen teniendo sentido las historias? ¿El alcance sigue ceñido al MVP o se coló algo fuera de scope?**
Sí, en general. Las 13 historias salen de las secciones 3 y 4 del PRD y dejan fuera lo excluido. No veo funciones inventadas. Lo único dudoso: el orden «relevante para hoy» y los reintentos están abiertos y podrían leerse como cerrados.

**2. ¿Hay criterios de aceptación incompletos o poco verificables?**
Sí. Varios no se pueden comprobar: por ejemplo: "se elimina o se marca", "almacenamiento seguro" y "la sesión se mantiene" no dicen qué mirar. Faltan casos de error, como contraseña incorrecta al entrar, y límites de reintentos o tiempos.

**3. ¿Hay historias que han cambiado de naturaleza?**
Sí. El registro y el inicio de sesión ya están construidos y especificados, así que pasan de "crear" a "verificar". Las historias de Google (US-10 a US-13) dependen unas de otras y de un estudio previo, por lo que conviene tratarlas juntas.

**4. ¿Hay historias nuevas que ahora sí deberían estar?**
Sí: ver mi perfil y el fallo de credenciales existen en el código pero no tienen historia. Además, el listado de todos los usuarios choca con la privacidad del PRD: habría que justificarlo o retirarlo, y hoy no tiene historia.

---

## Parte B — Auditoría de documentación

**Repositorio auditado:** copia local `full-stack-adonisjs-s5-base-2606-roo` · **Rama:** `main` · **Commit base:** `49634b1` (único commit; el árbol de trabajo tiene cambios sin commitear en `backend/.env.example` y `backend/package.json`/`package-lock.json`, ninguno afecta a la documentación) · **Fecha:** 2026-11-18

---

## 1. Resumen ejecutivo

- La documentación **de arranque y de convenciones del backend es sólida y coherente con el código**; el resto del ciclo (API, arquitectura, decisiones, operación, tests) está ausente o a medio hacer.
- **Riesgo principal:** la spec de OpenSpec `users` promete `GET /api/v1/users/active` y el código **no lo implementa** (divergencia spec ↔ código). Además no hay OpenAPI, así que la única "verdad" de contrato es la spec, y esa miente en un endpoint.
- Conteo sobre 14 tipos auditados: **1 Completa · 8 Parcial o pobre · 4 Inexistente · 1 No aplica · 0 No verificable**.

---

## 2. Tabla de auditoría

| # | Tipo de documentación | Estado | Observación específica (con evidencia) | Ubicación |
|---|---|---|---|---|
| 1 | README de proyecto | Parcial o pobre | Los pasos (`npm install` → `cp .env.example .env` → `node ace generate:key` → `npm run migration:run` → `npm run dev`) existen y casan con los scripts de `backend/package.json`, con `APP_KEY` vacío en `.env.example` y con las 2 migraciones reales. Fallos: (a) afirma que `docs/` contiene "ADRs, diagramas" y no existen; (b) exige "Node.js 24 o superior" pero `package.json` no tiene `engines` y declara `@types/node ^22.15.18`; (c) `backend/README.md` anuncia `npm run test` (Japa) y no hay ningún test. Pasos de instalación **no ejecutados** (ver Anexo). | `README.md#arranque-rápido`, `backend/README.md#scripts`, `backend/package.json` |
| 2 | Descripción de la arquitectura general | Parcial o pobre | Solo hay árboles de carpetas: `README.md` (monorepo) y `backend/README.md#estructura`, que coincide con `backend/app/` salvo que omite `exceptions/`. No existe documento que explique componentes y relaciones (flujo FE↔BE, guard `api`, dónde vive el token: `localStorage` en `frontend/src/services/authService.ts`). `docs/README.md` promete "modelo de datos, diseño de alto nivel, diagrama C4" dentro del PRD y `docs/PRD.md` no contiene ninguno de los tres. | `README.md`, `backend/README.md`, `docs/README.md`, `docs/PRD.md` |
| 3 | Documentación de la API / endpoints | Parcial o pobre | No hay OpenAPI/Swagger ni colección Postman (`git ls-files` sin ninguno). Lo más cercano: tabla de 7 endpoints en `README.md#endpoints-del-backend` (método, ruta, auth; sin request, sin errores) y los scenarios con códigos 200/201/400/401/404/422 en `openspec/specs/*/spec.md`. Cubre auth y `/users`; `/health` solo aparece en la tabla. No documenta el formato real de los errores 422. | `README.md`, `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md` |
| 4 | Docstrings y comentarios (TSDoc/JSDoc) | Parcial o pobre | Muestreados 10 archivos de `backend/app/` (5 controllers, `models/user.ts`, `validators/auth.ts`, `transformers/user_transformer.ts`, `middleware/auth_middleware.ts`, `exceptions/handler.ts`): 8/10 con JSDoc de 1–3 líneas (ruta + propósito, p. ej. `access_tokens_controller.ts:8-11`); 0/10 con `@param`/`@returns`/`@throws`. No documentan errores: `AccessTokensController.store` lanza `E_INVALID_CREDENTIALS` y 422 y el comentario no lo dice. `User` (modelo) sin docs; `handler.ts` es el boilerplate de Adonis. Comentario con ruido de sesión: `health_controller.ts:7` ("Creado en la Sesión 2"). | `backend/app/**` |
| 5 | Decisiones técnicas registradas | Inexistente | No hay ADRs ni equivalente. `docs/README.md` dice "ADRs … se añaden en sesiones posteriores". Las decisiones están dispersas, sin alternativas descartadas: stack en `CLAUDE.md#stack`, `openspec/config.yaml` (context) y `docs/PRD.md#5`. Sin registrar: access tokens vs sesión, scrypt, SQLite, token en `localStorage`, expiración 30 días (`models/user.ts`). | `CLAUDE.md`, `openspec/config.yaml`, `docs/PRD.md` |
| 6 | Guía operacional | Inexistente | No existe `Dockerfile`, `.github/` (CI/CD), runbook ni troubleshooting. `backend/package.json` define `build` y `start` pero ningún documento explica cómo desplegar ni qué variables exige producción (`start/env.ts` obliga a `APP_KEY`, `PORT`, `HOST`, `LOG_LEVEL`, `NODE_ENV`). `DB_DATABASE` está en `start/env.ts` y no en `.env.example`; `config/database.ts` no lo usa (ruta fija `tmp/db.sqlite3`). | (no existe) |
| 7 | Convenciones de código | Parcial o pobre | `CLAUDE.md#convenciones-del-backend` + `backend/README.md#convenciones`: lógica en controllers, VineJS siempre, `UserTransformer` siempre, prefijo `/api/v1`, subpath imports. **El código las respeta** (muestreo 5/5 controllers): `start/routes.ts` solo cablea (salvo el closure de `/`), `request.validateUsing(...)` en register/login, los 4 controllers que devuelven usuario usan `UserTransformer`, imports `#models/*`, `#validators/*`. Huecos: nomenclatura no documentada, `params.id` de `users/:id` sin validator (`users_controller.ts:25`), cero convenciones de frontend, y `CLAUDE.md` anuncia un `AGENTS.md` que no existe. | `CLAUDE.md`, `backend/README.md`, `backend/app/controllers/*` |
| 8 | Especificación OpenSpec y trazabilidad con el código | Parcial o pobre | `openspec/specs/authentication` (4 requirements) casa con el código; `openspec/specs/users` **no**: el requirement "Listado de usuarios activos" describe un endpoint inexistente. Faltan además `/health` y `/` en la spec. No hay `openspec/changes/` (ni archivo) aunque el código dice que `/health` se creó "vía OpenSpec". Detalle en la sección 3. | `openspec/specs/**`, `backend/start/routes.ts` |
| 9 | PRD (adicional) | Parcial o pobre | `docs/PRD.md` v1.0 "aprobado para MVP" describe tareas CRUD, CSV y Google Calendar (§3.2–3.5); el repo implementa solo §3.1 (auth) + directorio de usuarios: no hay modelo, migración ni ruta de tareas. Sigue siendo válido como objetivo, pero nada indica qué parte está hecha. Faltan las secciones que `docs/README.md` le atribuye (C4, modelo de datos). | `docs/PRD.md`, `docs/README.md` |
| 10 | Documentación de testing (adicional) | Inexistente | No hay guía de tests. `backend/README.md` presenta `npm run test` como "Suite de tests (Japa)" pero `backend/tests/` contiene solo `bootstrap.ts`; `adonisrc.ts` apunta a `tests/unit/**` y `tests/functional/**`, que no existen. Documentación que promete algo que no hay. | `backend/README.md`, `backend/tests/`, `backend/adonisrc.ts` |
| 11 | Documentación del frontend (adicional) | Parcial o pobre | Sin `frontend/README.md` ni `components.json`. Solo cubre: arranque en `README.md`, `VITE_API_URL` en `frontend/.env.example` (coincide con `authService.ts`) y la mención de shadcn/ui (3 componentes en `components/ui/`). Sin estructura, rutas ni gestión del token. 0 archivos de `frontend/src` (fuera de `ui/`) con JSDoc. | `README.md`, `frontend/.env.example`, `frontend/src/` |
| 12 | Changelog, CONTRIBUTING, SECURITY, plantillas PR/issues (adicional) | Inexistente | No existe `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (`package.json` declara `UNLICENSED`) ni `.github/`. Historial de un solo commit; `openspec/config.yaml` dice "Usamos conventional commits" y eso no está en una guía de contribución. | (no existe) |
| 13 | Documentación del flujo OpenSpec (adicional) | Completa | `README.md#workflow-con-openspec` explica `/opsx:propose → apply → archive`, dice dónde está la config (`openspec/config.yaml`) y dónde se instalaron comandos (`.claude/`, `.cursor/`): verificado, los 5 comandos y 5 skills existen en ambos. Menor: omite `/opsx:explore` y `/opsx:sync`, que sí existen. | `README.md`, `openspec/config.yaml`, `.claude/commands/opsx/`, `.cursor/commands/` |
| 14 | `docs/NOTAS-FORMADOR.md` (adicional) | No aplica | Documento interno del mentor sobre la divergencia plantada; no documenta el producto. Su contenido coincide con lo que verifiqué en código (ver Anexo). Conviene sacarlo del repo que ven los alumnos. | `docs/NOTAS-FORMADOR.md` |

---

## 3. Divergencias spec ↔ código

**Método:** (a) requisitos/endpoints extraídos de `openspec/specs/authentication/spec.md` y `users/spec.md`; (b) rutas reales de `backend/start/routes.ts`, contrastadas con la salida de `node ace list:routes`; (c) cruce en ambas direcciones; (d) tabla.

| # | Endpoint | En spec | En código | Divergencia | Gravedad |
|---|---|---|---|---|---|
| 1 | `GET /api/v1/users/active` | Sí (`users` · "Listado de usuarios activos", 3 scenarios, `{ users }`, últimas 24 h, orden `last_seen_at` desc, 401 sin token) | **No** (`UsersController` solo tiene `index` y `show`; sin ruta en `routes.ts`; `list:routes` no la devuelve) | Spec promete un endpoint inexistente. El dato sí existe: `last_seen_at` en `models/user.ts` y en la migración `1700000000000_create_users_table.ts`, y `AccessTokensController.store` lo actualiza. Si se implementa, debe registrarse **antes** de `/users/:id` o `:id` capturaría `active`. | Alta |
| 2 | `GET /api/v1/health` | No (no hay spec de health) | Sí (`HealthController.index` → `{ status: 'ok' }`) | Endpoint en código sin spec. Solo documentado en `README.md`. | Media |
| 3 | `GET /` | No | Sí (closure en `routes.ts:10` → `{ app, status: 'running' }`) | Ruta en código ausente de spec y de README; además es lógica inline en el archivo de rutas. | Baja |
| 4 | `POST /api/v1/account/register` | Sí (201, `{ user, token }`, 422 email duplicado/pass corta/email inválido) | Sí | Coincide: `response.created`, validator `signupValidator` (email único y normalizado, password 8–180, fullName 2–100), token `oat_`, `password` fuera del JSON. | — |
| 5 | `POST /api/v1/account/login` | Sí (200, `{ user, token }`, 400 `E_INVALID_CREDENTIALS`, 422 payload) | Sí | Coincide: `verifyCredentials`, actualiza `lastSeenAt`, `response.ok`. El 400/422 se deduce del código de Adonis/VineJS, **no se ejecutó**. | — |
| 6 | `POST /api/v1/account/logout` | Sí (200 `{ revoked: true }`, 401) | Sí | Coincide (`auth` middleware + `{ revoked: true }`). | — |
| 7 | `GET /api/v1/account/profile` | Sí (200 `{ user }`, 401) | Sí | Coincide. | — |
| 8 | `GET /api/v1/users` | Sí (orden `created_at` desc, `{ users }`, 401) | Sí | Coincide (`orderBy('created_at', 'desc')`). | — |
| 9 | `GET /api/v1/users/:id` | Sí (200 `{ user }`, 404 `E_ROW_NOT_FOUND`, 401) | Sí | Coincide (`findOrFail`). La spec no define el comportamiento con `id` no numérico. | Baja |

**Resultado:** 8 rutas en código frente a 7 endpoints en spec → **1 endpoint en spec sin código** (#1), **2 en código sin spec** (#2, #3), 6 coincidentes. Sin divergencias de método o parámetros en los coincidentes. Los códigos de respuesta de los coincidentes se verificaron **por lectura de código**, no en ejecución.

Divergencia secundaria README ↔ spec: `README.md` dice que `/users/active` "se implementa en vivo en la Sesión 3", lo que contradice a la spec (la da por implementada: "documenta el comportamiento **ya implementado**").

---

## 4. Top 3 carencias / Top 3 fortalezas

```
Top 3 carencias que más duelen:
1. Spec desalineada con el código: openspec/specs/users/spec.md exige GET /api/v1/users/active
   (SHALL, 3 scenarios) y el backend no lo expone (users_controller.ts solo tiene index/show;
   list:routes no lo devuelve). Es la única fuente de contrato y miente; quien integre contra
   la spec recibe un 404. A la vez /health y / existen sin spec.
2. Sin documentación de API integrable: no hay OpenAPI/Postman; el README solo da método/ruta/auth
   y las specs dan códigos sueltos. Faltan request/response de /health y el formato de los errores
   422. Un consumidor (p. ej. el frontend) tiene que leer routes.ts y los controllers.
3. Cero guía operacional ni de testing: no hay Dockerfile, CI, runbook ni guía de despliegue;
   build/start existen sin documentar y DB_DATABASE está en env.ts pero no en .env.example.
   Además el README anuncia una suite de tests (npm run test) que no existe (backend/tests solo
   tiene bootstrap.ts), y nada registra decisiones (sin ADRs) ni arquitectura (sin C4 ni
   explicación de componentes).

Top 3 cosas que ya están bien:
1. CLAUDE.md + backend/README.md#convenciones y el código real: las reglas (lógica en controllers,
   VineJS siempre, UserTransformer siempre, /api/v1, subpath imports) se cumplen en los 5
   controllers muestreados. Es lo que mantiene coherente al repo; no tocarlo.
2. Las specs de authentication (y las partes de users salvo /active): requirements con scenarios
   WHEN/THEN y códigos de respuesta que casan con el código en 6 de 6 endpoints coincidentes,
   incluida la cadena validador→controller→transformer. Conservar el formato al corregir la divergencia.
3. README.md#arranque-rápido: pasos ordenados, coherentes con los scripts de package.json, con
   .env.example (APP_KEY) y las 2 migraciones, más una tabla de endpoints que cubre las 7 rutas
   de /api/v1. Es lo que permite arrancar sin preguntar; corregir las menciones erróneas sin rehacerlo.
```

---

## 5. Vocabulario de tres formatos (Parte C)

Una línea por formato: qué aporta a primera vista que no aporten unas notas sueltas en Markdown.

| Formato | Fuente consultada | Qué aporta a primera vista |
|---|---|---|
| Diagrama C4 | [c4model.com](https://c4model.com/) y [c4model.com/diagrams](https://c4model.com/diagrams) (accesibles) | Fija un nivel de zoom y un límite visual (sistema de contexto, contenedores, componentes, código), para que cada diagrama muestre de un vistazo qué sistema está en foco, con quién se relaciona y en qué contenedores se agrupa; según la propia web, contexto y contenedores bastan para la mayoría de equipos. |
| ADR | [joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record) y la [plantilla de Michael Nygard](https://github.com/architecture-decision-record/architecture-decision-record/blob/main/locales/en-001/templates/decision-record-template-by-michael-nygard) (accesibles) | Estructura fija de Título, Estado (propuesta, aceptada, rechazada, obsoleta, sustituida), Contexto, Decisión y Consecuencias: deja escrito el porqué de la decisión, su ciclo de vida y los costes asumidos, y los ADR se enmiendan o sustituyen en lugar de reescribirse. |
| OpenAPI pública | [stripe/openapi](https://github.com/stripe/openapi) y [github/rest-api-description](https://github.com/github/rest-api-description) (accesibles) | Contrato legible por máquina (OpenAPI 3, `spec3.json/yaml` en Stripe) que permite generar SDKs, validar peticiones y ejecutar tests de contrato (GitHub lo usa así). Solo leí los README: **no abrí los ficheros de especificación**, así que paths, esquemas y errores concretos son "No verificable" por mi parte. |

---

## 6. Anexo de método

**Qué revisé (lectura completa):** `README.md`, `backend/README.md`, `CLAUDE.md`, `docs/{README,PRD,NOTAS-FORMADOR}.md`, `openspec/config.yaml`, `openspec/specs/{authentication,users}/spec.md`, `backend/start/routes.ts`, `backend/start/env.ts`, `backend/start/kernel.ts`, 5 controllers, `models/user.ts`, `validators/auth.ts`, `transformers/user_transformer.ts`, `middleware/auth_middleware.ts`, `exceptions/handler.ts`, 2 migraciones, `config/{auth,cors,database}.ts`, `adonisrc.ts`, `backend/package.json`, `backend/.env.example`, `frontend/package.json`, `frontend/.env.example`, `frontend/src/services/authService.ts`, `git ls-files`, `git log`, `git diff`.

**Comandos ejecutados:**
- `git ls-files`, `git log --oneline`, `git diff --stat` / `git diff` (estructura, historial, cambios locales).
- `node -v` → `v24.14.0` (cumple lo que dice el README).
- `node ace list:routes` (backend) → 8 rutas, base de la sección 3.
- `npm run typecheck` (backend) → `tsc --noEmit` sin errores.
- Búsquedas de existencia: Dockerfile, `.github/`, OpenAPI/Postman, ADRs, `CHANGELOG`/`CONTRIBUTING`/`SECURITY`/`LICENSE`, `AGENTS.md`, `components.json`, `frontend/README.md`, `openspec/changes/`.

**No verificable / no ejecutado:**
- **Instalación desde cero** (`npm install`, `generate:key`, `migration:run`, `npm run dev`) y el arranque del frontend: no se ejecutaron para no tocar `node_modules`, el `.env` ni `backend/tmp/db.sqlite3` del usuario. La coherencia de los pasos se comprobó leyendo scripts, `.env.example` y migraciones, no corriéndolos.
- **Códigos de respuesta de error** (400, 401, 404, 422): deducidos del código y del comportamiento estándar de Adonis; no se levantó el servidor ni se hicieron peticiones.
- **"Node 24 requerido por AdonisJS 7":** no se pudo confirmar offline; solo se detectó la inconsistencia con `@types/node ^22` y la ausencia de `engines`.
- **CI/CD y despliegue:** "Inexistente" se basa en la ausencia de archivos en el árbol versionado; no se puede descartar infraestructura externa al repo.

**Limitaciones y transparencia:**
- Muestreo de docstrings: 10 archivos de `backend/app/` (≈100 % de los controllers/modelo/validators/transformer/middleware presentes) y 0 de `frontend/src` fuera de `components/ui/`.
- `docs/NOTAS-FORMADOR.md` es un documento interno que describe la divergencia plantada. Lo leí durante la exploración; la divergencia de la sección 3 **la verifiqué de forma independiente** contra `routes.ts`, `users_controller.ts` y `list:routes`, y la fila 14 de la tabla la trata como un hallazgo más (material a retirar del repo de alumnos).
- Parte C: las 3 fuentes se consultaron vía web (6 URLs, todas HTTP 200). Una URL de plantilla ADR que probé primero dio 404 (ruta mal construida) y se sustituyó por la enlazada desde el README. Del README del repo ADR, la parte posterior a ~39k caracteres llegó resumida, no literal; la plantilla de Nygard sí se leyó literal.
