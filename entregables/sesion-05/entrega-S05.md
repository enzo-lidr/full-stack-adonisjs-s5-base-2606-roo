# Entrega S05 — Revisión de backlog y auditoría de documentación

**Proyecto:** FlowSync (repo base `full-stack-adonisjs-s5-base`)  
**Fecha:** 6 de julio de 2026  
**Material que he usado:** `prompt-S04.md`, `backlog-S04.md`, `docs/PRD.md`, mi copia local del repo, y el backlog del profesor en `ai4devs-s04-planificacion-ia-main/entregables/sesion-04/backlog-flowsync.md`

---

## Objetivo

En este documento junto las dos cosas que pide el ejercicio:

1. Una revisión de mi backlog de la S04, con lo que cambiaría hoy.
2. Una auditoría de la documentación del repo, viendo qué hay, qué falta y qué no cumple su función.

---

## Prerrequisitos

| Qué pedía el ejercicio | Cómo lo tengo |
|---|---|
| Fork del repo base | Hecho — tengo la copia en local |
| Backend y frontend arrancando | Hecho — `localhost:3333` y `localhost:5173`. Tuve que crear la carpeta `backend/tmp/` para SQLite y instalar `@poppinss/ts-exec` porque con solo seguir el README no me arrancaba |
| Mi entregable de la S04 | `prompt-S04.md` + `backlog-S04.md` |
| PRD en `docs/PRD.md` | Localizado |

---

## Parte A — Revisión del backlog

### Paso 1 — Lo que recuperé de la S04

| Qué | Dónde está |
|---|---|
| El prompt que escribí | `prompt-S04.md` |
| Las historias generadas | `backlog-S04.md` — 19 historias en 5 épicas |
| El PRD | `docs/PRD.md` |

### Paso 2 — Qué pienso ahora

Lo he vuelto a leer después del directo de la S4, con lo visto en la S5, y después de clonar el repo y mirar cómo está hecho de verdad.

#### ¿Siguen teniendo sentido las historias? ¿Van acordes al MVP?

En general **sí**. Las 19 historias cubren lo del PRD (auth, tareas, filtros, exportar CSV, Google Calendar) y no metí cosas que el PRD deja fuera (equipos, app móvil, etiquetas, etc.).

Lo que veo distinto ahora:

- En el backlog puse rutas como `/api/auth/register` o `/api/tasks`, pero en el repo real las rutas de auth son `/api/v1/account/...` y de tareas aún no hay nada.
- En la Story 4 asumí guardar si el usuario ya vio el onboarding (`onboarded_at`), y el PRD solo pide una pantalla de bienvenida, no guardar eso en base de datos.
- Las historias de Google Calendar encajan con el PRD, pero el propio PRD dice que ahí hay mucho riesgo y que conviene hacer un spike antes de meterlo todo en sprint.

No veo historias inventadas fuera del PRD.

#### ¿Hay criterios de aceptación flojos o difíciles de comprobar?

Sí, en varias:

| Historia | Qué he encontrado |
|---|---|
| Auth · Story 1 | El AC habla de un mensaje concreto en pantalla si el email ya existe, pero el backend devuelve un 422 de VineJS. Habría que acordar qué ve el usuario. |
| Auth · Story 2 | Tras el login redirige al listado de tareas, que en el template todavía no existe. |
| Filter · Story 11 | La ordenación “lo más relevante para hoy” quedó para decidir en refinamiento. Un QA no sabría si está bien o mal. El PRD tampoco lo cierra del todo. |
| GCal · Story 17 | Al completar una tarea: ¿se borra el evento del calendario o se actualiza? Quedó abierto. |
| GCal · Story 18 | Habla de reintentos y logs pero sin concretar cuántos ni si el usuario se entera de algo. |

#### ¿Alguna historia ha cambiado de “tipo”?

Sí:

1. **Auth (1–3):** Cuando las escribí pensaba en implementarlo todo. Ahora el repo ya tiene auth hecha; tocaría más bien ajustar rutas, mensajes y pantallas.
2. **GCal:** Antes de las stories 15–18 metería una de spike (probar OAuth, zonas horarias, etc.).
3. **Filter · Story 12 (pantalla vacía):** Sigue teniendo sentido para el producto, pero el dashboard del template ahora no es un listado de tareas.

#### ¿Faltaría alguna historia nueva?

Yo añadiría:

- Una de **spike de Google Calendar** (el PRD lo avisa en la sección de riesgos).
- Alguna story técnica del **health check** si hace falta para desplegar (`GET /api/v1/health` ya está en el código).

#### Comparación con el backlog del mentor (S4)

No tengo acceso a Linear, pero he mirado el repo de la sesión del profesor (`ai4devs-s04-planificacion-ia-main`) y sobre todo el archivo `entregables/sesion-04/backlog-flowsync.md`, que es el backlog que construyó en el directo a partir del mismo PRD.

**Resumen rápido:** él tiene **16 historias** en 5 épicas; yo **19**. Los dos cubrimos el MVP del PRD, pero él organizó el trabajo de otra forma.

| | Mi backlog (`backlog-S04.md`) | Backlog del profesor (`backlog-flowsync.md`) |
|---|---|---|
| **Auth** | 4 stories (registro, login, logout, onboarding aparte) | 2 stories (US-A1, US-A2). El onboarding va dentro del registro, no en una story suelta |
| **Tareas** | 5 stories (CRUD + cambio de estado) | 5 stories parecidas (US-T1 a US-T5) |
| **Filtros / organización** | 3 stories en épica Filter | 3 stories en épica “Organización” (US-O1, O2, O3) — muy parecido |
| **Export CSV** | 1 story | 1 story (US-E1) |
| **Google Calendar** | 6 stories listas para implementar | Épica 5 **bloqueada**: todas llevan `needs-splitting` y no entran a sprint hasta el spike US-S5 |
| **Spike de Calendar** | Lo puse yo como ajuste al revisar | Ya lo tiene como story propia (US-S5: validar sync inversa y decidir alcance) |
| **Orden de trabajo** | Todo el MVP en un bloque lógico (auth → tareas → … → GCal) | Orden por sprints sugerido: primero auth + CRUD básico, luego UX/filtros/export, y **solo después** el spike y el sync |
| **Extras** | Non-goals y asunciones al final de cada épica | Labels (`module:`, `size:S/M/L`), estimation hints, hipótesis por épica, tabla resumen |

**Qué prioricé distinto yo**

- Metí **más historias de golpe**, sobre todo en Google Calendar (6 frente a 4 de sync + 1 spike), como si ya fueran para sprint.
- Separé el **onboarding en una story propia** (Story 4); el profesor lo dejó dentro del registro (US-A1).
- No marqué el epic de Calendar como **bloqueado** ni puse `needs-splitting` en las stories grandes de sync.
- No añadí **tallas ni labels** para Linear; él sí pensó en eso desde el principio.

**Quién acertó y por qué**

- **El profesor** en no comprometer Google Calendar sin el spike (US-S5) y en proponer un orden por sprints. El PRD ya avisaba de que la sync es lo más arriesgado; su backlog lo refleja con el epic 5 bloqueado.
- **Yo** en cubrir el PRD con detalle (más AC por story, non-goals explícitos) y en no dejarme fuera casos como el reintento si falla Google (GCal Story 18), que él reparte entre varias stories de sync.
- **Los dos** dejamos abierto el criterio exacto de ordenación “relevante para hoy” (mi Filter · Story 11 / su US-O2), alineado con el PRD 3.3.

En la práctica, el template de código (`full-stack-adonisjs-s5-base`) encaja más con el enfoque del profesor: hoy solo hay auth y users hechos; tareas y Calendar vendrían en fases posteriores, no todo a la vez.

### Paso 3 — Ajustes que haría hoy (2–4)

```
Ajuste 1: En Auth (stories 1–3), poner en el contexto técnico las rutas reales del repo: POST /api/v1/account/register, login, logout y GET /api/v1/account/profile.
Motivo: Al abrir start/routes.ts vi que lo que puse en el backlog no coincide. Alguien podría duplicar cosas sin querer.
```

```
Ajuste 2: Meter una story de spike de Google Calendar antes de las stories de sync (como hace el profesor con US-S5 en su backlog S4), y marcar el epic GCal como bloqueado hasta tener esa salida.
Motivo: El PRD dice que la sincronización es lo más arriesgado. En mi backlog las 6 stories de GCal parecían listas para sprint; en el del profesor todo el epic 5 va con `needs-splitting`.
```

```
Ajuste 3: En Filter · Story 11, cerrar cómo se ordenan las tareas (por ejemplo: primero las que tienen fecha, de más cercana a más lejana, y las sin fecha al final).
Motivo: Si el criterio queda abierto, no se puede testear bien ni revisar en un PR.
```

```
Ajuste 4: En Auth · Story 4, quitar lo de guardar onboarded_at en base de datos; con mostrar la pantalla tras el registro basta para el MVP.
Motivo: El PRD pide onboarding corto, no un campo extra en la tabla users.
```

---

## Parte B — Auditoría de documentación

### Paso 4 — Formato

He usado una **tabla en Markdown** con tipo, estado, dónde está y una observación. Me parece lo más claro para consultar después.

### Paso 5 — Qué he encontrado en el repo

He leído el README, la carpeta `docs/`, OpenSpec, `AGENTS.md`, los controllers y `start/routes.ts`, y he arrancado backend y frontend en local.

| # | Tipo | Estado | Dónde | Observación |
|---|---|---|---|---|
| 1 | **README** | Parcial o pobre | `README.md`, `backend/README.md` | Con los pasos del README sí pude instalar y arrancar. Pero no explica problemas que me pasaron (carpeta `tmp/`, paquete `@poppinss/ts-exec`), ni testing ni deploy. En el árbol del README dice que hay ADRs y diagramas en `docs/` y no están. En `frontend/` no hay README. |
| 2 | **Arquitectura general** | Parcial o pobre | `docs/README.md`, `docs/PRD.md` | El PRD explica el producto y el stack, pero no hay un diagrama ni un doc que diga cómo se relacionan backend y frontend. En `docs/README.md` dicen que los diagramas vendrán más adelante. |
| 3 | **API / endpoints** | Parcial o pobre | `README.md`, `openspec/specs/` | Hay una tabla con 7 rutas que ayuda. No hay OpenAPI ni Postman; para saber más hay que leer el código. Los comentarios en controllers no ponen el prefijo `/api/v1`. La ruta `GET /` no sale en el README. |
| 4 | **Comentarios en código** | Parcial o pobre | Controllers, validators, transformers | Hay comentarios cortos encima de los métodos, pero poco más. No hay carpeta `services/`. Los modelos y el frontend casi sin comentar. |
| 5 | **ADRs** | Inexistente | — | No hay carpeta `docs/adr/`. Las decisiones (SQLite, VineJS, tokens…) están repartidas entre el PRD y AGENTS.md, sin explicar qué otras opciones se descartaron. |
| 6 | **Guía operacional** | Inexistente | `.env.example` | Solo los `.env.example` con lo básico. Nada de desplegar, Docker, CI ni qué hacer si algo falla. |
| 7 | **Convenciones de código** | Completa | `AGENTS.md`, `CLAUDE.md` | Está claro cómo organizar controllers, validators, rutas `/api/v1`, etc. Me ha servido para entender el repo. |
| 8 | **OpenSpec vs código** | Parcial o pobre | `openspec/specs/authentication/`, `openspec/specs/users/` | Auth cuadra con el código. En users la spec dice que existe `GET /api/v1/users/active` pero en `routes.ts` no está (sí existe el campo `last_seen_at` en el modelo). El health está en código y README pero no en OpenSpec. |

**Extra que he visto:**

| Tipo | Estado | Observación |
|---|---|---|
| PRD (`docs/PRD.md`) | Completo como doc de producto | Habla del FlowSync entero; el template solo tiene auth y users. Es normal en un starter, no lo contaría como error. |

### Paso 6 — Top 3 carencias y Top 3 fortalezas

#### Top 3 carencias importantes

1. **No hay documentación formal de la API (tipo OpenAPI)** — Solo la tabla del README y parte de OpenSpec. Cualquiera que quiera integrarse tiene que leer el código.
2. **Falta documentación de arquitectura y ADRs** — No hay un sitio donde ver cómo está montado el sistema ni por qué se eligió SQLite, VineJS, etc.
3. **Nada de guía operacional** — El README sirve para arrancar en local, pero si algo falla (como me pasó a mí) no está explicado.

#### Top 3 cosas que ya están bien

1. **README de arranque** — Los pasos para levantar backend y frontend son claros y la tabla de endpoints ayuda.
2. **AGENTS.md** — Resume bien las reglas del proyecto y ayuda a no liarse con el código.
3. **OpenSpec de auth** — La spec de autenticación coincide con lo que hace el código; podría servir de modelo para el resto.

### Paso 7 — Exploración rápida de tres formatos

He mirado un poco cada formato (unos 5 minutos cada uno, como pide el ejercicio). Para cada uno, una línea sobre qué aporta que no aportan unas notas sueltas en Markdown:

- **Diagrama C4** ([c4model.com](https://c4model.com)): me ayuda a ver el sistema por capas (contexto, contenedores, componentes…) sin tener que leer todo el código.
- **ADR** ([joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record)): deja escrito por qué se tomó una decisión técnica y qué otras opciones se descartaron.
- **OpenAPI** ([Stripe API](https://docs.stripe.com/api)): es como un contrato de la API (rutas, parámetros, respuestas) que puedes consultar sin abrir los controllers.
