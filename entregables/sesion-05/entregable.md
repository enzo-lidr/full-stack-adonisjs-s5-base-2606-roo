# Ejercicio pre-S5 — Entrega única

> Documento único de entrega: revisión del backlog de S4 (Parte A) y auditoría
> de documentación del repositorio (Parte B), tal como pide el enunciado del
> ejercicio pre-sesión de la S5.
>
> Insumos usados:
> - PRD de FlowSync: [`docs/PRD.md`](../../docs/PRD.md) (sin cambios respecto
>   al usado en el ejercicio pre-S4).
> - Entregable propio de la pre-S4 (prompt, output crudo, poke-holes,
>   reflexión) en `ai4devs-s04-planificacion-ia-2606-roo/entregables/sesion-04/`.
> - Backlog construido por el mentor en el directo de S4
>   (`BACKLOG MENTOR.md`, misma carpeta).
> - Auditoría directa del código del backend (`backend/app/`,
>   `backend/database/migrations/`, `openspec/specs/`) para verificar qué de
>   lo asumido en ambos backlogs ya existe o no en el repo real.

---

## Parte A — Revisión del backlog de historias de usuario

### Paso 2 — Contraste con lo aprendido desde la S4

#### ¿Siguen teniendo sentido las historias? ¿El alcance sigue ceñido al MVP?

Sí, el alcance se mantiene ceñido. Repasando las 14 stories de `output.md`
contra las 5 áreas funcionales del PRD, no hay ninguna que se salga de scope
— las `(asumido)` que sí se marcaron explícitamente eran inferencias
razonables sobre comportamiento dentro de una feature ya incluida (p. ej.
"la bienvenida no reaparece en logins posteriores"), no features nuevas. El
prompt fue efectivo poniendo el listado de *non-goals* de forma explícita.

Lo que **sí cambia** con la información que no tenía en el ejercicio pre-S4:
al auditar el repo real, el backend del starter kit ya expone un directorio
de usuarios completo (`GET /api/v1/users`, `/users/:id`, documentado en
`openspec/specs/users/spec.md`) que **no aparece en el PRD de FlowSync en
ningún sitio**. No es que el backlog "inventara" algo fuera de scope — es
que el código base ya trae fuera de scope instalado de fábrica. Es un riesgo
distinto al que buscaba la pregunta original, pero de la misma familia:
superficie de API que un agente (o una persona nueva) puede confundir con un
requisito real si decompone mirando el código en vez del PRD.

#### ¿Hay historias cuyos criterios de aceptación ahora se ven incompletos o poco verificables?

Dos casos concretos:

- **FLOW-06 / FLOW-10 (orden por relevancia)**: el AC dice *"ordenadas por
  relevancia para hoy (asumido: tareas con fecha límite más próxima aparecen
  primero)"*. Es una frase, no una regla de orden total — no dice qué pasa
  con tareas sin fecha, ni cómo se resuelven empates. Comparado con el
  backlog del mentor (`US-O2`, que sí propone una regla completa: *vencidas >
  hoy > futuras > sin fecha > archivadas*), mi versión no se puede convertir
  en un test determinista tal como está escrita.
- **FLOW-13, Escenario 5 (fallo de la API de Google)**: *"reintenta la
  sincronización más tarde (asumido: mecanismo de retry a definir en spike)"*
  es correcto como *placeholder* antes del spike, pero no es un AC
  verificable — no dice cuántos reintentos, con qué backoff, ni cuándo se
  considera fallo definitivo. El backlog del mentor resuelve esto de forma
  más robusta: bloquea con `needs-splitting` **todas** las stories del Epic 5
  hasta que el spike (`US-S5`) se complete, en vez de dejar la advertencia
  solo como nota narrativa a nivel de épica (que es lo que hice yo).

#### ¿Hay historias que han cambiado de naturaleza desde entonces?

La más significativa: **FLOW-01 y FLOW-02 (registro e inicio de sesión) ya
no son historias "por construir".** Auditando el backend real
(`backend/app/controllers/new_accounts_controller.ts`,
`access_tokens_controller.ts`, `profiles_controller.ts`,
`openspec/specs/authentication/spec.md`), el starter kit ya implementa:

- `POST /api/v1/account/register` — mismo contrato que asumí (email único,
  password ≥ 8 caracteres, respuesta `{ user, token }`).
- `POST /api/v1/account/login` — mismos códigos de error (`400` en
  credenciales inválidas, `422` en payload inválido).
- `POST /api/v1/account/logout` y `GET /api/v1/account/profile`.
- El formato de token (`oat_*`) coincide con lo que ambos backlogs asumieron
  sin haber visto el código.

Lo único del alcance de "Autenticación y cuenta" que el backend **no** cubre
es la pantalla de bienvenida post-registro (FLOW-04), que es puramente
frontend y sigue sin existir. Esto cambia FLOW-01/FLOW-02 de "implementar" a
"verificar contra spec + cerrar el hueco de frontend", y libera esfuerzo real
de la Épica 1 hacia la Épica 2 (CRUD de tareas), que sigue en cero: no hay
modelo `Task`, ni migración, ni controller, ni endpoint alguno todavía.

También cambia de naturaleza **FLOW-13/Épica 5** a la luz del material de
S5: la decisión técnica que resulte del spike (polling vs. webhooks, cómo
tratar `archived`, formato de evento all-day vs. timed) ahora tiene un lugar
natural donde vivir — un ADR en `docs/adr/` — en vez de quedar solo como
resultado de un ticket de spike que nadie vuelve a consultar.

#### ¿Hay historias nuevas que no aparecieron y que ahora sí deberían estar?

- Una historia (o spike corto) para **decidir qué hacer con el directorio de
  usuarios heredado** (`/api/v1/users*`): ¿se elimina por no ser parte del
  MVP de FlowSync, se mantiene como utilidad interna y se documenta como
  fuera de alcance del PRD, o se reutiliza para algo? Sin esta decisión
  explícita, queda como deuda documental desde el día uno.
- Una historia para **documentar la API con `adonis-autoswagger` + Scalar**
  (visto en S5). Ahora que sé que la auditoría de la Parte B probablemente
  marca "documentación de API" como inexistente, tiene sentido que sea
  backlog explícito y no una tarea implícita dentro de cada endpoint.
- Formalizar el entregable del spike de sincronización (`US-S5` del mentor)
  como **"spike produce un ADR en formato MADR"**, no solo "un documento de
  spike" — mismo contenido, pero con un formato y ubicación estándar
  (`docs/adr/`) que sí se audita y se referencia después.

#### Contraste con el backlog del mentor: ¿qué se priorizó distinto? ¿quién acertó?

- **Estimación**: mi prompt prohibía explícitamente estimar (`No estimes
  tiempos ni story points`); el mentor sí añadió tamaños (S/M/L) y labels de
  Linear. Son apuestas distintas para audiencias distintas — la mía optimiza
  un backlog "limpio" a nivel de producto, la del mentor optimiza para entrar
  directo a sprint. Ninguna es incorrecta en sí misma.
- **Contexto técnico anticipado**: el mentor añadió una sección "Technical
  Context" por story con rutas de archivo concretas (p. ej.
  `app/controllers/TasksController.ts`). Mi prompt prohibía esto a propósito
  (`No propongas arquitectura ni nombres de clases, endpoints, tablas...`).
  Con el repo real delante, esto se puede verificar: **el mentor acertó en
  anticipar contexto técnico, pero erró en la convención de nombres** — el
  proyecto usa snake_case en los controllers (`new_accounts_controller.ts`),
  no PascalCase (`TasksController.ts`) como escribió el backlog del mentor.
  Es un ejemplo concreto de por qué mi restricción (no inventar nombres de
  archivo sin conocer el código) evitó introducir una convención incorrecta
  por diseño, aunque a costa de dar menos contexto inmediato al equipo.
- **Control de scope técnico en el epic de riesgo**: el mecanismo del mentor
  (`needs-splitting` + bloqueo explícito de todo el Epic 5 hasta que el spike
  se apruebe) es más accionable en una herramienta real que mi advertencia
  narrativa (`⚠ CANDIDATA A SPLITTING`) a nivel de épica. Aquí el mentor
  acertó: una nota de texto se puede pasar por alto arrastrando una story a
  sprint por error; un estado bloqueante en el board, no.
- **Verificación final**: el backlog del mentor cierra con una sección
  explícita que confirma que ninguna story toca la lista de *out-of-scope*
  del PRD. Mi output no incluyó ese paso de auto-verificación, aunque el
  prompt sí pedía transparencia con `(asumido)`. Es una práctica a adoptar.

### Paso 3 — Ajustes

```
Ajuste: Retirar FLOW-01 y FLOW-02 como historias "por implementar" y
reescribirlas como historias de verificación + cierre del hueco de frontend
(pantalla de bienvenida).
Motivo: El backend de auth ya está implementado en el starter kit casi 1:1
con lo que ambos backlogs (el mío y el del mentor) asumieron construir desde
cero. Mantenerlas como historias de implementación completa desperdicia foco
del equipo que debería estar en la Épica 2 (CRUD de tareas), que sí está en
cero.
```

```
Ajuste: Añadir una historia corta para decidir y documentar qué hacer con el
directorio de usuarios heredado (`/api/v1/users*`) antes de empezar la Épica 2.
Motivo: Es superficie de API real en el repo que no aparece en el PRD de
FlowSync. Ni mi backlog ni el del mentor pudieron preverlo porque ambos se
generaron sin mirar el código. Sin una decisión explícita, queda ambigüedad
sobre si es parte del producto o deuda del template.
```

```
Ajuste: Formalizar el entregable del spike de Google Calendar (US-S5) como un
ADR en formato MADR en `docs/adr/`, no solo como "documento de spike".
Motivo: El material de S5 muestra que las decisiones técnicas no registradas
se convierten en conversaciones perdidas. La sincronización es, según el
propio PRD, el mayor riesgo técnico del MVP — exactamente el tipo de decisión
que un developer nuevo se preguntaría "por qué se hizo así".
```

```
Ajuste: Reescribir el AC de "orden por relevancia" (FLOW-06/FLOW-10) con una
regla de orden total y verificable (p. ej. vencidas > hoy > futuras > sin
fecha > archivadas, con criterio de desempate), en vez de dejarlo como una
frase `(asumido)` sin caso de prueba determinista.
Motivo: Un AC no verificable no se puede convertir en test automatizado ni en
criterio de "hecho". El backlog del mentor (US-O2) ya propone una regla
completa que se puede tomar como punto de partida, pendiente de confirmar con
producto.
```

---

## Parte B — Auditoría de documentación del proyecto

> Auditoría realizada sobre la copia del template `full-stack-adonisjs-s5-base`
> (este mismo repositorio), no sobre un FlowSync propio, tal como pide el
> enunciado. Estados usados: **Completa** / **Parcial o pobre** / **Inexistente**.

| # | Tipo de documentación | Estado | Observación |
|---|---|---|---|
| 1 | **README de proyecto** | Completa | El [`README.md`](../../README.md) raíz permite arrancar el proyecto desde cero sin preguntar: requisitos (Node 24+), pasos de instalación, `.env`, `generate:key`, migraciones, arranque de backend y frontend, y hasta una tabla de endpoints. Es de los mejores artefactos del repo. Como observación (no baja el estado, pero vale la pena vigilarlo): está **repartido en tres niveles** ([`backend/README.md`](../../backend/README.md) repite parte de la info del raíz; **el frontend no tiene ningún `README.md`**), y la tabla de endpoints es texto manual — no se genera desde las rutas reales, así que hoy coincide con el código pero no hay ningún mecanismo que avise si mañana cambia una ruta y nadie actualiza la tabla. |
| 2 | **Descripción de la arquitectura general** | Inexistente | No hay ningún documento que explique cómo se organizan los componentes (backend/frontend/DB) más allá del árbol de carpetas de una línea en el README raíz. [`docs/README.md`](../../docs/README.md) dice literalmente *"ADRs y diagramas de arquitectura se añaden en sesiones posteriores"* — es una promesa, no un artefacto. No hay diagrama C4, ni Mermaid, ni Structurizr `.dsl` en ningún sitio del repo. |
| 3 | **Documentación de la API / endpoints** | Parcial o pobre | La única documentación de API es la tabla manual del README raíz (7 filas). No hay spec OpenAPI, no hay `adonis-autoswagger` ni `@foadonis/openapi` instalado (`package.json` del backend no tiene ninguna dependencia de swagger/scalar/openapi), no hay `/docs` ni `/openapi` servidos. Un integrador externo (o un agente IA) tendría que leer `start/routes.ts` y los controllers directamente — exactamente lo que este tipo de documentación debería evitar. |
| 4 | **Docstrings / comentarios significativos (TSDoc/JSDoc)** | Parcial o pobre | Los 5 controllers sí tienen un bloque `/** ... */` encima de cada acción, pero son de una o dos líneas (`"GET /api/v1/users — Lista todos los usuarios. Requiere autenticación."`) — repiten la ruta y una frase, sin `@param`, `@returns` ni `@throws`. Es más un "encabezado de sección" que TSDoc real; no ayudaría a un agente a inferir comportamiento no obvio (p. ej. que `login` actualiza `lastSeenAt`, o que el `password` nunca se serializa). Modelos (`user.ts`), validators (`auth.ts`) y el transformer no tienen ningún comentario. |
| 5 | **Decisiones técnicas registradas (ADRs)** | Inexistente | No existe `docs/adr/`, no hay `log4brains` instalado, no hay ningún registro de por qué se eligió SQLite sobre Postgres, VineJS sobre Zod, o access tokens sobre sesiones — todas decisiones ya tomadas y visibles en el código, pero sin el "por qué" en ningún sitio. Un developer nuevo no tiene forma de saber si son decisiones deliberadas o defaults sin cuestionar. |
| 6 | **Guía operacional** | Inexistente | No hay instrucciones de despliegue, no hay Dockerfile ni `docker-compose`, no hay runbooks de incidencias, no hay pipeline de CI (no existe carpeta `.github/workflows`). El README cubre "cómo arrancar en local", pero nada sobre "cómo se despliega" o "qué hacer si falla en producción". Coherente con el estado actual del proyecto (aún no hay despliegue real), pero es un vacío total, no parcial. |
| 7 | **Convenciones de código del proyecto** | Completa | [`CLAUDE.md`](../../CLAUDE.md) cubre stack, comandos, convenciones de backend (lógica en controllers, validación siempre con VineJS, serialización siempre vía transformer, subpath imports, prefijo `/api/v1`) y una sección explícita de "no hacer". Es el artefacto de documentación más sólido y accionable del repo — y el `backend/README.md` lo refuerza con una sección "Convenciones" redundante pero consistente (no contradictoria). Único hueco: no menciona convenciones de nombres para el frontend (aún incipiente, pero ya tiene `components/`, `pages/`, `services/`, `types/` sin ninguna nota sobre cómo se espera que crezcan). |
| 8 | **Especificación OpenSpec y su trazabilidad con el código** | Parcial o pobre | Hay dos specs (`openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`) bien escritas, en formato SHALL/Scenario, y ambas se declaran explícitamente como documentación de "comportamiento ya implementado". La de `authentication` está al día. La de `users` **diverge del código**: el requirement "Listado de usuarios activos" documenta `GET /api/v1/users/active` con tres escenarios completos, pero ese endpoint **no existe** — `users_controller.ts` solo implementa `index` y `show`, y no hay ruta `/users/active` en `start/routes.ts` (hay un comentario indicando que se implementará más adelante). Es una divergencia spec→código real y verificable: la spec promete una capability que el backend no expone. Además, no hay ninguna spec de OpenSpec para tareas, filtrado, exportación o sincronización con Calendar — normal dado que ese código tampoco existe, pero significa que el 80% del PRD (Épicas 2 a 5) no tiene ninguna spec, viva o no. |

### Tipo adicional detectado

| # | Tipo de documentación | Estado | Observación |
|---|---|---|---|
| 9 | **Documentación del PRD / producto** (no estaba en la lista original) | Completa | [`docs/PRD.md`](../../docs/PRD.md) es un documento sólido: usuario objetivo, job-to-be-done, requisitos funcionales por área, no-funcionales, stack, criterios de éxito, riesgos y glosario. Es, junto con `CLAUDE.md`, el artefacto más maduro del repo. Se incluye porque es la fuente de la que derivan tanto el backlog (Parte A) como las specs de OpenSpec (punto 8), y su calidad condiciona la de todo lo demás. |

### Top 3 carencias que más duelen

1. **No hay documentación de API real (#3)** — con cero endpoints de tareas/calendario todavía, es el momento más barato de instalarla (p. ej. `adonis-autoswagger` + Scalar). Esperar a tener 20+ endpoints multiplica el coste de retrofit y, según el material de S5, la mitad del tráfico de docs ya es de agentes IA que la consumirían directamente si existiera.
2. **Cero ADRs (#5)** — ya hay al menos tres decisiones técnicas tomadas y sin justificar (SQLite, VineJS, access tokens vs. sesiones), y la próxima decisión grande (arquitectura de sync con Google Calendar) es, según el propio PRD, el mayor riesgo técnico del MVP. Sin el hábito de ADR instalado desde ya, esa decisión se va a perder en una conversación de Slack.
3. **La spec de `users` diverge del código (#8)** — es la prueba de que "documentación viva" en este repo todavía no tiene ningún mecanismo de validación automatizada (nada en CI compara specs contra rutas reales). Si esto pasa con 2 endpoints, va a ser mucho más difícil de detectar con 20.

### Top 3 cosas que ya están bien

1. **`CLAUDE.md` (#7)** — convenciones claras, accionables y con una sección explícita de "no hacer". No hace falta rehacer nada aquí en el directo; al contrario, es el patrón a extender al resto de tipos de documentación.
2. **El README raíz (#1)** — de verdad permite arrancar el proyecto sin preguntar a nadie (requisitos, `.env`, migraciones, arranque de ambos servicios). Vale la pena preservar ese nivel de detalle cuando se actualice, en vez de dejarlo degradar a medida que crezca el proyecto.
3. **El PRD y las specs de OpenSpec existentes (#8 y #9)** — donde hay spec, está bien escrita (formato SHALL/Scenario consistente, escenarios concretos). El problema no es la calidad de lo que existe, es la cobertura: falta extenderlo al resto del backlog a medida que se implementa.

---

## Paso 7 — Exploración rápida de tres formatos de documentación

- **C4 model** ([c4model.com](https://c4model.com)): aporta una jerarquía visual de niveles (Context → Container → Component → Code) que unas notas sueltas en Markdown no pueden replicar — el lector elige su nivel de zoom en segundos, mientras que un documento de texto obliga a leer todo para extraer la misma estructura, o mezcla niveles de detalle distintos en un solo bloque de prosa.
- **ADR** ([`joelparkerhenderson/architecture-decision-record`](https://github.com/joelparkerhenderson/architecture-decision-record)): aporta una estructura fija (contexto → opciones consideradas → decisión → consecuencias) que obliga a dejar constancia de las alternativas descartadas y el porqué, algo que unas notas sueltas casi nunca capturan porque se centran solo en lo que se hizo, no en lo que se decidió no hacer.
- **OpenAPI** (ejemplo: [GitHub REST API](https://docs.github.com/en/rest)): aporta un contrato machine-readable (tipos, códigos de estado, ejemplos) que se puede validar automáticamente y generar clientes/SDKs desde él — algo que un Markdown descriptivo nunca puede ofrecer porque no es una fuente estructurada que otra herramienta pueda consumir.
