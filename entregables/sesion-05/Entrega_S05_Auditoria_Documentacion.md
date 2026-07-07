# Entrega S05 — Revisión de backlog y auditoría de documentación

> **Proyecto:**  full-stack-adonisjs-s5-base-2606-roo (starter FlowSync, archivos de output, poke-holes)
> **Fecha:** 2026-07-07 · **Autora:** Verónica Zacarías

---

## Parte A — Revisión de tu backlog de historias de usuario

### Paso 2 — Contraste con lo aprendido desde la S4

**¿Siguen teniendo sentido las historias tal como las generaste? ¿El alcance sigue ceñido al MVP del PRD, o se coló alguna que la IA "inventó" fuera de scope?**

En general sí, las 20 US siguen teniendo sentido y el alcance se mantiene ceñido al PRD. Sin embargo, encontré dos puntos de scope creep, ambos marcados como (asumido) por el propio modelo pero igual cuestionables:

- **US-04 (Cerrar sesión), AC3:** asume una disposición concreta de UI ("sin necesidad de acceder a secciones avanzadas de configuración"). El PRD no dice nada sobre dónde debe ubicarse la opción de logout, y el prompt pedía explícitamente no proponer decisiones de implementación ni UI. Es un caso claro de la IA rellenando un vacío con una decisión de diseño que no le correspondía tomar.
- **US-05 (Pantalla de bienvenida), AC3:** introduce una regla de negocio no mencionada en el PRD ("la bienvenida no se repite en logins posteriores"), lo cual implica persistir un flag de "onboarding visto" que no está especificado en ningún lado. Es razonable como supuesto, pero es exactamente el tipo de invención que había pedido evitar.

Además, noté que varias US podrían haberse consolidado: cuando el Given/When es idéntico y solo cambia el Then (por ejemplo, los tres filtros de estado en US-11, o los tres casos de sincronización de US-16 a US-19), tiene más sentido un único AC con estructura Given-When-Then-And-And que fragmentarlo en historias separadas. Esto lo resolvería agregando un ejemplo de ese formato directamente en el prompt original.

**¿Hay historias cuyos criterios de aceptación ahora ves incompletos o poco verificables?**

Sí. Le agregaría a cada AC:

- El status code HTTP esperado en cada Then (200, 201, 400, 401, 409, etc.), algo que resolvería siendo más específica en la US de ejemplo dentro del prompt original.
- Cantidades concretas de datos en el Given, en vez de descripciones vagas como "con tareas en distintos estados". Por ejemplo: "usuario con 3 tareas pending, 2 completed y 1 archived" en vez de "usuario con tareas en distintos estados". Esto no solo hace el AC más verificable, sino que el caso de test derivado queda con datos de entrada y salida exactos, sin que QA tenga que inventarlos.

**¿Hay historias que han cambiado de naturaleza desde entonces?**

No cambiaron de naturaleza — el problema que resuelven sigue siendo el mismo. Lo que sí identifiqué fueron dependencias de construcción entre ellas que no estaban explícitas en el backlog original: por ejemplo, US-01 depende de que US-05 exista para que su AC1 se pueda dar por completado, y toda la épica de sincronización (US-16 a US-20) depende de que US-15 (conectar cuenta de Google) esté implementada primero. Estas relaciones deberían quedar declaradas como dependencias en Linear, no solo mencionadas en el análisis de gaps.

**¿Hay historias nuevas que no aparecieron cuando lo generaste y que ahora sí deberían estar?**

Sí: falta una US que defina el comportamiento esperado para tareas con fecha límite vencida (¿se marcan visualmente distinto en el listado? ¿generan algún estado o solo es un tema de presentación? ¿afecta al evento ya sincronizado en Google Calendar?). El PRD no lo menciona explícitamente, pero es un caso de uso natural una vez que existe fecha límite y estados, y detecté el vacío releyendo el resto de las US.

**Al contrastar con el backlog que el mentor construyó en el directo de S4 sobre Linear: ¿qué priorizaste distinto tú? ¿Quién acertó y por qué?**

*Comparación con el backlog del mentor (S4)*

Comparé mi backlog (US-01 a US-20, 5 épicas) contra `backlog-flowsync.md` del mentor (US-A1 a US-S5, también 5 épicas). Mismo PRD, descomposición bastante distinta.

Resumen rápido: él tiene 16 historias, yo 20. Los dos cubrimos el MVP completo sin colarnos en el "out of scope", pero gestionamos el riesgo de forma muy distinta.

| Épica | Mi backlog | Backlog del mentor |
|---|---|---|
| Auth | 5 stories (US-01 a US-05: registro, email duplicado, login, logout, bienvenida — cada una separada) | 2 stories (US-A1, US-A2). El aviso de email duplicado y la redirección post-registro van como ACs dentro de US-A1, no como stories propias |
| Tareas (CRUD) | 5 stories (US-06 a US-10) | 5 stories (US-T1 a US-T5), casi 1 a 1 |
| Organización | 3 stories (US-11 a US-13) | 3 stories (US-O1 a US-O3), casi 1 a 1 |
| Export | 1 story (US-14), 3 AC | 1 story (US-E1), 4 AC — incluye caso de export vacío (CSV con headers sin filas) y caracteres especiales escapados, que yo no cubrí |
| Google Calendar | 6 stories (US-15 a US-20), todas escritas como listas para implementar | 5 stories (US-S1 a US-S4 + spike US-S5). Todo el epic está marcado needs-splitting y bloqueado: ninguna entra a sprint hasta que el spike (US-S5) se complete |
| Spike de reverse-sync | No lo tengo como story; lo mencioné como ajuste al hacer el poke-holes | Story propia (US-S5), con AC que define qué debe entregar el spike (opciones técnicas, costo, casos límite, recomendación go/no-go) |
| Status codes / autorización | No especifiqué códigos HTTP ni ACs de autorización cruzada | US-T1 incluye AC de 401 para no autenticado; US-T3 y US-T4 incluyen AC de 403 al intentar editar/borrar una tarea de otro usuario |
| Extras | Non-goals y (asumido) explícitos en cada AC dudoso | Labels (module:, type:, size:S/M/L), needs-splitting, Technical Context por story, tabla resumen, orden de sprints sugerido |

*Qué prioricé distinto yo*

- Traté los 6 stories de Calendar como si ya estuvieran listos para sprint, sin marcar el epic como bloqueado ni exigir un spike previo — a pesar de que yo mismo había identificado en el poke-holes que la sync es "el mayor riesgo técnico" según la sección 7 del PRD. Lo detecté como riesgo pero no lo traduje en una decisión de backlog.
- Separé onboarding (US-05) y el aviso de email duplicado (US-02) en stories propias; el mentor los dejó como ACs dentro de US-A1. Esto conecta directo con algo que ya había señalado: varias de mis stories comparten Given/When y podrían consolidarse con Given-When-Then-And-And.
- No incluí códigos de status HTTP ni ACs de autorización cruzada (¿qué pasa si intento editar la tarea de otro usuario?) — el mentor sí, y es un gap real que yo mismo había anotado como ajuste a futuro.
- No apliqué labels ni tallas (size:S/M/L) a mis stories ni un orden de sprint por riesgo; organicé todo en el orden del PRD (3.1 → 3.5), no en un orden de ejecución.

*Quién acertó y por qué*

- El mentor acertó en no comprometer el epic de Calendar sin el spike previo. El PRD dice textualmente que la sincronización inversa "debe validarse con un spike técnico antes de comprometerla" (sección 3.5) y que es el mayor riesgo técnico del MVP (sección 7). Su backlog refleja esa advertencia estructuralmente: needs-splitting en las 4 stories de sync y ningún ingreso a sprint sin la salida del spike. Yo tenía la misma información y no actué en consecuencia.
- Yo acerté en el nivel de detalle de los ACs de sync: cada operación (crear, actualizar, completar, borrar) tiene su propio AC explícito de "se guarda igual aunque la API de Google falle, y se reintenta después" — el mentor lo cubre también pero de forma más agrupada. También fui más explícita marcando (asumido) en cada supuesto puntual (más de 15 en total), mientras que el mentor concentra las asunciones a confirmar en una sección final aparte.
- Los dos dejamos abierto el criterio exacto de "relevante para hoy" (mi US-11 / su US-O2), aunque el mentor fue un paso más allá y propuso un algoritmo concreto (vencidas y hoy primero, después futuras ordenadas cronológicamente, sin fecha al final) marcándolo como interpretación a confirmar — algo que yo dejé completamente sin especificar.
- Sobre el gap de "tareas vencidas" que yo había señalado como faltante: el mentor lo cubre parcialmente en US-O2 (las vencidas aparecen primero en el orden), pero ninguno de los dos define qué pasa con el evento de Google Calendar de una tarea que ya venció (¿se marca distinto?, ¿se actualiza algo?). Ese vacío sigue siendo válido para agregar como ajuste.

### Paso 3 — Ajustes al backlog

1. **Ajuste:** Agregar el status code HTTP esperado en cada AC.
   **Motivo:** Hace que los criterios sean directamente trazables a un caso de test automatizable, sin que QA tenga que inferir qué código de respuesta corresponde a cada escenario.

2. **Ajuste:** Sumar una US que describa el comportamiento esperado para tareas con fecha límite vencida.
   **Motivo:** Es un vacío detectado al releer el resto de las historias; el PRD no lo cubre explícitamente pero es un caso de uso natural del dominio (fecha límite + estados). Además, contrastando con el backlog del mentor, su US-O2 solo lo resuelve parcialmente (orden de listado), pero ninguno de los dos define qué pasa con el evento ya sincronizado en Google Calendar de una tarea vencida.

3. **Ajuste:** En el prompt original, incluir un ejemplo de AC con estructura Given-When-Then-And-And además del Given-When-Then simple.
   **Motivo:** Evita que el modelo fragmente en múltiples US casos que comparten el mismo Given/When y solo difieren en el resultado (como los filtros por estado o los distintos triggers de sincronización), reduciendo el ruido del backlog sin perder cobertura.

4. **Ajuste:** Marcar el epic de Google Calendar como bloqueado (needs-splitting) y agregar una story de spike previa (tipo US-S5 del mentor) que valide alcance y viabilidad antes de comprometer las 6 stories de sync a sprint.
   **Motivo:** El PRD indica explícitamente en la sección 3.5 y en la sección de riesgos que la sincronización con Google Calendar es el mayor riesgo técnico del MVP y que la sincronización inversa "debe validarse con un spike técnico antes de comprometerla". Yo había identificado ese riesgo en el poke-holes pero no lo traduje en una decisión estructural del backlog; el mentor sí lo hizo, bloqueando el epic completo hasta tener la salida del spike. Es el ajuste más importante de los cuatro porque cambia el orden de trabajo real del equipo, no solo el formato de las historias.

---

## Parte B — Auditoría de documentación del proyecto

### Paso 4 — Formato del artefacto de auditoría

**Decisión: tabla en Markdown (tipo · estado · observación), con una sección complementaria "Dónde mirar" por tipo.**

Elegí la tabla porque es el artefacto **consultable** que mejor cumple los requisitos del ejercicio con el mínimo esfuerzo de mantenimiento:

1. **Escaneable de un vistazo:** el estado por tipo se lee en segundos, sin tener que recorrer prosa.
2. **Estructura fija = cobertura garantizada:** una fila por tipo obliga a cubrir los 8 tipos pedidos (más los adicionales que detecté), cada uno con su estado y su observación.
3. **Vive junto al repo:** al ser Markdown, versiona en Git y se revisa como cualquier otro archivo del proyecto.
4. **Complementé la tabla con "Dónde mirar":** la observación de una o dos líneas alcanza para el vistazo general, pero para los hallazgos más concretos (errores reproducidos, divergencias spec↔código) necesitaba más espacio del que una celda de tabla permite sin romper la legibilidad. Por eso separé el detalle en una sección aparte, tipo por tipo.

### Paso 5 — Auditoría por tipo de documentación

| # | Tipo de documentación | Estado | Observación |
|---|---|---|---|
| 1 | README de proyecto | Parcial o Pobre | Cubre bien la instalación, .env, migraciones y arranque de ambos servicios, pero falla en la práctica: no menciona crear `backend/tmp/` antes de `migration:run` (falla con "Cannot open database because the directory does not exist"), sería agregar "mkdir -p tmp", y el frontend no tiene README propio (solo un párrafo breve en el raíz). Sí exige "Node.js 24 o superior", pero no advierte que incumplirlo produce un error totalmente críptico (falta un paquete que ni siquiera aparece en package.json), en vez de un aviso claro de versión incompatible. |
| 2 | Descripción de la arquitectura general | Parcial o Pobre | No hay documentación que explique cómo se comunican frontend y backend (protocolo, auth, dónde vive cada responsabilidad). No hay explicaciones de decisiones de alto nivel (por qué SQLite, por qué access tokens y no JWT/sesiones, por qué monorepo). |
| 3 | Documentación de la API / endpoints | Parcial o Pobre | La tabla de rutas está actualizada y coincide con el código, pero no documenta bodies, errores ni status codes — insuficiente para integrarse sin leer el código fuente. |
| 4 | Docstrings / comentarios significativos (TSDoc/JSDoc) | Parcial o Pobre | Los controllers tienen JSDoc, pero es superficial: repite la firma del método (ruta + una línea de qué hace) sin documentar errores, validaciones o casos límite. `user_transformer.ts` es el único archivo que explica el por qué de su existencia; `models/user.ts` — que concentra la lógica más compleja (auth mixin, hashing, tokens con expiración) — no tiene ni un comentario. |
| 5 | Decisiones técnicas registradas (ADRs) | Inexistentes | No es solo que falten ADRs formales — no hay ni rastro informal de justificación en ningún lado. Hay decisiones técnicas reales tomadas (SQLite en vez de Postgres, access tokens en vez de JWT/sesiones, monorepo en vez de repos separados) que aparecen listadas como hechos en la tabla de stack del README, pero sin ningún "por qué se eligió esto y qué se descartó". |
| 6 | Guía operacional (deploy, runbooks, troubleshooting) | Parcial o Pobre | El README cubre arranque en local, pero no hay instrucciones de despliegue a un entorno real, ni runbooks, ni troubleshooting — confirmado en la práctica: dos errores de arranque (falta de `tmp/`, dependencia rota de `@poppinss/ts-exec`) no tenían ninguna documentación de referencia. |
| 7 | Convenciones de código del proyecto | Parcial o Pobre | Existen convenciones explícitas para el backend (`CLAUDE.md` y `backend/README.md`: lógica en controllers, validación con VineJS, serialización vía transformer, imports con subpath, aunque le faltarían convenciones de naming) pero no hay ninguna para el frontend — pese a que `frontend/src/` ya tiene una estructura de carpetas establecida (`components/`, `pages/`, `services/`, `lib/`, `types/`), nada documenta qué va en cada una ni convenciones de naming. |
| 8 | Especificación OpenSpec y su trazabilidad con el código | Parcial o pobre | La mayoría de la spec está sincronizada con el código, pero hay un requirement completo (con scenarios) que promete un endpoint inexistente. |
| 9 | README de frontend *(tipo adicional)* | Inexistente | — |
| 10 | Changelog *(tipo adicional)* | Inexistente | — |
| 11 | Tests como documentación viva *(tipo adicional)* | Inexistente | El backend tiene `npm run test` configurado (Japa) pero no existe ningún archivo de test real — solo `tests/bootstrap.ts` (configuración vacía de infraestructura). El frontend no tiene ningún test. No hay comportamiento documentado a través de tests en ningún lado. Un test bien escrito documenta comportamiento esperado mejor que un comentario. |
| 12 | Documentación de variables de entorno *(tipo adicional)* | Parcial o Pobre | `.env.example` existe tanto en backend como en frontend, pero casi ninguna variable explica su propósito o efecto (TZ, LOG_LEVEL, PORT, etc. no tienen comentario). La única excepción es APP_KEY, que sí trae una línea indicando cómo generarla. |

#### Dónde mirar (detalle por tipo)

**1. README de proyecto**
- `README.md` (raíz), `backend/README.md`.
- Nota: no hay `frontend/README.md`.

*Problema reproducido: `npm run dev` falla con `ERR_MODULE_NOT_FOUND`*

Síntoma: al ejecutar `npm run dev` en `backend/`, el servidor imprime "starting HTTP server..." pero nunca llega a escuchar; lanza `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@poppinss/ts-exec'` y la conexión a `http://localhost:3333` se rechaza.

Causa raíz (dos capas, confirmadas reproduciendo el error en un entorno limpio):
- Bug de empaquetado en `@adonisjs/assembler@8.4.0`: su modo `--hmr` necesita `@poppinss/ts-exec` en tiempo de ejecución (hardcodeado como `--import=@poppinss/ts-exec`), pero el paquete lo declara solo como devDependency, nunca como dependency. npm nunca lo instala de forma transitiva, así que falta sin importar cuántas veces reinstales `node_modules`.
- Requisito de Node 24+ no cumplido: `@poppinss/ts-exec` exige `node >=24`. Con Node 22 (versión activa en la máquina donde se probó), aunque se instale el paquete a mano, el loader de ts-exec falla con un segundo error de resolución de módulos.

Fix que funcionó: actualizar a Node 24+ y añadir `@poppinss/ts-exec` como dependencia explícita (`npm install @poppinss/ts-exec`) en `backend/`. Con ambas cosas, `npm run dev` levanta correctamente y `GET /api/v1/health` responde `200 {"status":"ok"}`.

Relevancia para la auditoría (tipo 1 — README): el README raíz sí exige "Node.js 24 o superior", pero no advierte que incumplirlo produce un error totalmente críptico (falta un paquete que ni siquiera aparece en package.json), en vez de un aviso claro de versión incompatible.

Pasos finales agregados al README:

```markdown
nvm install 24 && nvm use 24

cd backend
rm -rf node_modules package-lock.json
npm install
npm install @poppinss/ts-exec
cp .env.example .env
node ace generate:key      # rellena APP_KEY en .env
mkdir -p tmp
npm run migration:run      # crea las tablas users + auth_access_tokens
npm run dev                # servidor con HMR
```

**2. Descripción de la arquitectura general**
- `docs/README.md`, `docs/PRD.md` (es un PRD de producto, no de arquitectura).
- Árbol de carpetas en `README.md` raíz.
- Sección "Estructura" en `backend/README.md`.

**3. Documentación de la API / endpoints**
- Tabla "Endpoints del backend" en `README.md` raíz.
- Contrástala contra `backend/start/routes.ts` y `node ace list:routes` (ejecútalo en `backend/`).
- ¿Coinciden método, ruta y auth de cada fila? Si coinciden, pero:
  - No especifica el **body de request** de cada endpoint (ej. qué campos exactos exige `register`/`login`, solo dice "→ `{ user, token }`" para la respuesta).
  - No documenta **errores** (¿qué devuelve si el email ya existe, si el password es muy corto, si el token es inválido? ¿qué status codes?).
  - No hay contrato formal (OpenAPI/Swagger) ni ejemplos de payload — quien se integre igual necesita mirar `validators/auth.ts` o los controllers para saber qué mandar.

**4. Docstrings / comentarios significativos (TSDoc/JSDoc)**

Revisa uno a uno:
- `backend/app/controllers/users_controller.ts`
- `backend/app/controllers/new_accounts_controller.ts`
- `backend/app/controllers/access_tokens_controller.ts`
- `backend/app/controllers/profiles_controller.ts`
- `backend/app/controllers/health_controller.ts`
- `backend/app/models/user.ts`
- `backend/app/transformers/user_transformer.ts`
- `backend/app/validators/auth.ts`

**5. Decisiones técnicas registradas (ADRs)**
- Busca una carpeta `adr/`, `docs/adr/` o `docs/decisions/`.

**6. Guía operacional (deploy, runbooks, troubleshooting)**
- Busca `CONTRIBUTING.md`, `docs/deploy*`, `docs/runbook*`.
- Sección de despliegue en cualquier README.
- En el README raíz ("Arranque rápido") es **arranque en local para desarrollo** (`npm run dev` con HMR), no instrucciones de **despliegue** real (no hay build de producción, gestor de procesos, variables de entorno para prod, ni dónde/cómo hostear). Son cosas distintas: no es que el despliegue esté documentado a medias, es que **no hay documentación de despliegue en absoluto**, solo de arranque local; y tampoco hay runbooks ni troubleshooting.

**7. Convenciones de código del proyecto**
- `CLAUDE.md` (raíz — que según su propia cabecera es symlink de `AGENTS.md`).
- Sección "Convenciones" en `backend/README.md`.

**8. Especificación OpenSpec y su trazabilidad con el código**
- `openspec/specs/users/spec.md` y `openspec/specs/authentication/spec.md`.
- Contrasta con `backend/start/routes.ts` y los controllers correspondientes.
- Para cada *requirement* de la spec, busca su ruta+método real.

`authentication/spec.md` → 100% coincide con el código. Los 4 requirements (registro, login, logout, perfil) están todos implementados en `new_accounts_controller.ts`, `access_tokens_controller.ts` y `profiles_controller.ts`, con las rutas correctas bajo `/api/v1/account/*`. Sin divergencias.

`users/spec.md` → aquí hay una divergencia clara:
- Requirement "Listado de usuarios" (`GET /api/v1/users`) → ✅ implementado en `users_controller.ts` (método `index`).
- Requirement "Consulta de usuario por id" (`GET /api/v1/users/:id`) → ✅ implementado (método `show`).
- Requirement **"Listado de usuarios activos"** (`GET /api/v1/users/active`) → ❌ **la spec lo documenta con SHALL y 3 scenarios completos, pero no existe en el código**. `users_controller.ts` solo tiene `index` y `show`; no hay método `active` ni ruta `/users/active` en `routes.ts`.

Dato curioso que refuerza el hallazgo: el campo `last_seen_at` que ese endpoint necesitaría **sí existe** en el modelo `User` y en la migración, y el login sí lo actualiza — o sea, los datos están, pero el endpoint que los expondría no está construido. Es una divergencia real spec→código, no al revés (no hay rutas implementadas que falten en las specs).

### Paso 6 — Cierre de la auditoría

#### 🔴 Top 3 carencias que más duelen

1. **Guía operacional / troubleshooting inexistente** — no hay runbooks ni documentación de incidencias típicas. Importa porque lo viví en carne propia dos veces (falta de `backend/tmp/`, bug de `@poppinss/ts-exec`): cualquier persona nueva pierde tiempo real resolviendo a ciegas errores que ya son conocidos.
2. **Decisiones técnicas de alto nivel no registradas (ADRs inexistentes)** — no hay ni un ADR ni un párrafo suelto que explique por qué SQLite, por qué access tokens en vez de JWT/sesiones, por qué monorepo. Importa porque sin esto, cualquier revisión o refactor futuro corre el riesgo de deshacer decisiones deliberadas sin saber que lo eran.
3. **Divergencia entre la especificación OpenSpec y el código real** — `openspec/specs/users/spec.md` documenta con SHALL y 3 scenarios completos el endpoint `GET /api/v1/users/active`, pero no existe ni la ruta ni el método en el controller. Es una promesa activa incumplida: alguien podría construir una integración confiando en algo que la spec dice que existe y no existe, lo cual es más grave que una simple carencia de completitud.

#### 🟢 Top 3 cosas que ya están bien

1. **La tabla de endpoints del README coincide 100% con el código real** (`routes.ts`) — no hay endpoints fantasma ni rutas sin documentar. Es confiable como mapa, aunque le falten detalles de payload/errores.
2. **La spec OpenSpec de `authentication` está perfectamente sincronizada con el código** — los 4 requirements (registro, login, logout, perfil) tienen implementación exacta, sin divergencias. Buena disciplina spec-driven en esa área concreta.
3. **Las convenciones de backend son explícitas y se respetan** — `CLAUDE.md` + `backend/README.md` documentan el patrón (lógica en controllers, validación VineJS, serialización vía transformer) y el código real lo sigue de forma consistente en los 5 controllers.

### Paso 7 — Vocabulario básico: qué aporta cada formato

- **Diagrama C4:** a simple vista se ven qué componentes integran la arquitectura y cómo se relacionan — algo que en Markdown habría que reconstruir leyendo prosa.
- **ADR:** aporta una estructura fija por decisión (contexto → decisión → alternativas descartadas y por qué → consecuencias), fechada e inmutable — un registro histórico que unas notas sueltas no ofrecen porque se editan y mezclan todo.
- **Especificación OpenAPI:** es machine-readable — de la misma spec se genera automáticamente documentación interactiva, SDKs de cliente y validación de requests, algo que un Markdown, por bien escrito que esté, no puede ejecutar.
