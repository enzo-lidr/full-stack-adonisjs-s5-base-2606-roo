# Entrega — Ejercicio previo S5: Auditoría de documentación existente

> **Repositorio auditado**: `full-stack-adonisjs-s5-base-2606-roo` (copia del template `LIDR-academy/full-stack-adonisjs-s5-base`), rama `solved-sesion-05`.
> **Fecha de auditoría**: 6 de julio de 2026.
> **Veredicto de un vistazo**: de los 9 tipos de documentación auditados (8 del enunciado + 1 adicional), 1 está completa, 5 son parciales o pobres y 3 son inexistentes.

## Parte A — Revisión del backlog de historias de S4

### 1. ¿Siguen teniendo sentido las historias? ¿El alcance sigue ceñido al MVP?

Sí, el alcance se mantiene ceñido al MVP. Las restricciones del prompt (derivar solo de las secciones 3.1–3.5 del PRD, no incluir funcionalidades out of scope, no convertir los requisitos no funcionales en historias propias) se cumplieron: ninguna de las 12 historias añade nada que no esté en el PRD.

Lo que cambiaría no es el alcance sino la granularidad. US-07 agrupa listado, filtrado, orden por relevancia, estado vacío y responsive en una sola historia. Es necesario separar esas responsabilidades en historias independientes (filtrar por estado, ordenar por relevancia, estado vacío) — el mismo problema que mi propio poke-holes señaló en US-11 (Hallazgo 4: agrupar operaciones independientes viola el criterio INVEST de independencia). No lo apliqué de vuelta a mi propio backlog al revisarlo por primera vez.

Es, de hecho, el mismo patrón que ya nombré en mi reflexión de S4 sin saber que tenía nombre: una historia "se ve" completa por su redacción prolija, no porque lo esté — lo que Módulo 4 llama la trampa de la *false completeness*.

### 2. ¿Hay historias cuyos criterios de aceptación ahora ves incompletos o poco verificables?

US-11 ya tiene sus incompletudes documentadas en `poke-holes.md` (fecha límite eliminada, estado `archived`, cambio de título, conflicto con ediciones externas no marcado como out-of-scope).

Con la perspectiva de S5 añado una más: ninguna de mis historias de sincronización especifica qué identificador usa FlowSync para localizar el evento correspondiente en Google Calendar al actualizarlo o borrarlo. Falta nombrar en el contexto técnico que se necesita persistir un identificador (`google_event_id`) por cada tarea sincronizada — sin él no es posible actualizar o borrar el evento correcto, y mi backlog no lo menciona en ningún lado, ni siquiera como `(asumido)`.

### 3. ¿Hay historias que han cambiado de naturaleza desde entonces?

El módulo de sincronización con Google Calendar (US-09 a US-12) es el que más cambiaría — y no solo de detalle, sino de naturaleza: dejaron de parecerme historias funcionales normales, listas para pasar a un sprint, y pasaron a ser trabajo de alto riesgo que debería tratarse primero como spike. Las escribí con criterios de aceptación detallados y supuestos `(asumido)` para cubrir el comportamiento incierto: reintentos, qué pasa si la API falla, zonas horarias — es decir, las trabajé como si el riesgo se pudiera resolver a base de especificar más, en vez de reconocer que el riesgo pedía investigar antes de especificar. Con lo aprendido después del directo de S4 y del contenido de este módulo, ya no las trataría como listas para implementar: aislaría toda la épica detrás de un spike explícito que bloquee esas cuatro historias hasta resolverlo.

Mi prompt pedía explícitamente "no proponer arquitectura técnica" y "no estimar" — correcto para el objetivo del ejercicio de S4 — pero como consecuencia el backlog no deja ninguna señal de que ese módulo necesita un tratamiento distinto antes de entrar a sprint.

### 4. ¿Hay historias nuevas que no aparecieron y que ahora sí deberían estar?

Un spike explícito para validar el enfoque técnico de sincronización antes de comprometer US-09 a US-12.

También falta una historia o criterio para el escenario en que el usuario revoca el acceso de FlowSync *desde el lado de Google* (no desde FlowSync) — un caso de token revocado externamente que el PRD insinúa al pedir manejar "de forma razonable" los errores de la API, pero que no llegué a convertir en historia ni en criterio.

### 5. Comparación con el backlog del mentor: ¿qué priorizaste distinto? ¿Quién acertó y por qué?

Comparo contra el backlog de referencia del mentor (`entregables/sesion-04/backlog-flowsync.md` de su repo), no contra la sesión de Linear en vivo, a la que no tengo acceso.

Diferencias principales:

- **Granularidad**: el mentor generó 16 historias en 5 épicas; yo generé 12 en 5 módulos. La diferencia se concentra en Organización (3 historias suyas vs. 1 mía) y en el CRUD de tareas (5 vs. 4).
- **Tratamiento del riesgo**: el mentor aísla toda la sincronización detrás de un spike (US-S5) y aplica `needs-splitting` de forma proactiva a US-S1–US-S4. Yo traté la sincronización como una épica funcional más, cubriendo la incertidumbre con `(asumido)` en lugar de bloquearla explícitamente.
- **Estimación**: el backlog del mentor incluye tamaño (S/M/L) y una nota de estimación por historia. El enunciado oficial del ejercicio de S4 pedía explícitamente "no estimar tiempos" como restricción de la Parte 1 — mi prompt siguió esa instrucción al pie de la letra. El backlog del mentor va deliberadamente más allá del mínimo pedido, no es que yo haya omitido una buena práctica.
- **Secuenciación**: el mentor propone un orden de sprints explícito; mi backlog no llega a ese nivel porque no era parte del alcance que le pedí al prompt ni del enunciado del ejercicio.

¿Quién acertó? Ninguno "falló" — cada backlog responde a un objetivo distinto. El mío cumple exactamente lo que pedía el ejercicio de S4: extraer historias de un PRD aplicando INVEST, sin estimar ni proponer arquitectura. El del mentor es un ejemplo de referencia que va más allá del mínimo pedido, para mostrar cómo se ve un backlog ya listo para sprint.

La diferencia de fondo está en cómo cada uno trata la incertidumbre de Google Calendar (la "nueva geometría del riesgo" de Módulo 4): el mentor separa la decisión de "qué construir" de "qué tan seguros estamos de poder estimarlo", usando `needs-splitting` — el mismo término que la skill `expand-issue` de Módulo 4 (Lección 5) usa para marcar issues que necesitan descomposición antes de entrar a sprint. Ahí hay algo genuinamente para llevarme: usar esa misma señal en vez de solo describir el problema en prosa, como hice en `poke-holes.md`.

Donde mi versión es más consistente es en marcar explícitamente cada supuesto dentro del AC correspondiente. El backlog del mentor deja alguna ambigüedad sin marcar como tal — por ejemplo, "se elimina el evento al completar" en US-S3 aparece como nota aparte, no como `(asumido)` dentro del AC.

### Ajustes a mi backlog

**Ajuste 1**: Dividir US-07 en tres historias independientes (filtrar por estado, ordenar por relevancia, estado vacío).
**Motivo**: Viola el mismo criterio de independencia (INVEST) que mi propio poke-holes señaló en US-11; no lo apliqué de vuelta a mi propio backlog al revisarlo.

**Ajuste 2**: Añadir una historia de spike explícito antes de US-09–US-12, marcándolas con `needs-splitting` hasta resolverlo.
**Motivo**: Tratar la incertidumbre técnica con un spike y una etiqueta explícita (`needs-splitting`, el término que usa la skill `expand-issue` de Módulo 4 para issues que necesitan descomposición) es más honesto que cubrirla solo con `(asumido)` en los AC.

**Ajuste 3**: Documentar en el contexto técnico de US-11 que se necesita persistir el `google_event_id` de cada tarea sincronizada.
**Motivo**: Sin ese identificador no es posible actualizar o borrar el evento correcto; es un prerrequisito de implementación que ni mi backlog ni mi prompt mencionan.

**Ajuste 4**: Aplicar una marca visible de "necesita dividirse" directamente sobre US-11 en vez de dejarlo solo como hallazgo de poke-holes.
**Motivo**: Convierte un hallazgo de revisión en una señal dentro del propio backlog, evitando que se pierda si alguien lo lee sin leer también `poke-holes.md`.

---

## Parte B — Auditoría de documentación del proyecto

| # | Tipo de documentación | Estado | Observación | Ubicación |
|---|---|---|---|---|
| 1 | README de proyecto | Completa | Cubre instalación, `.env`, migraciones y arranque de ambas apps sin pasos ambiguos. | `README.md` |
| 2 | Arquitectura general | Parcial o pobre | Información dispersa (stack, carpetas) pero ningún documento explica cómo se relacionan los componentes; `docs/README.md` confirma que ADRs y diagramas "se añaden en sesiones posteriores". | `README.md`, `CLAUDE.md`, `docs/PRD.md` §5 |
| 3 | API / endpoints | Parcial o pobre | No hay OpenAPI/Swagger (`package.json` no tiene `adonis-autoswagger` ni similar, no existe ruta `/docs`). Solo hay una tabla en el README (método, ruta, auth, descripción) sin schemas de request/response. | `README.md` |
| 4 | Docstrings / TSDoc | Parcial o pobre | Los 5 controllers tienen comentarios de 2 líneas que solo repiten la ruta, sin `@param`/`@returns`/`@throws`. El único modelo (`User`) no tiene ningún comentario. Aún no existe capa `app/services/`, así que la evaluación se limita a controllers y modelo. | `backend/app/controllers/*.ts`, `backend/app/models/user.ts` |
| 5 | ADRs / decisiones técnicas | Inexistente | `docs/README.md` confirma explícitamente que aún no existen. La elección de SQLite sobre PostgreSQL, fijada en `CLAUDE.md` y el PRD §5, no tiene ninguna justificación registrada en el repo. | `CLAUDE.md`, `docs/PRD.md` §5 |
| 6 | Guía operacional | Inexistente | No hay Dockerfile, workflows de CI/CD, instrucciones de despliegue ni runbooks en el repo. | — |
| 7 | Convenciones de código | Parcial o pobre | `CLAUDE.md` cubre bien las convenciones de backend, pero no tiene ninguna sección de convenciones de frontend. Además, afirma en su encabezado que la memoria se formalizó como `AGENTS.md` enlazado por symlink (`ln -s AGENTS.md CLAUDE.md`), pero ese `AGENTS.md` no existe en el repo: la propia doc describe un archivo que no está. | `CLAUDE.md` |
| 8 | OpenSpec ↔ código | Parcial o pobre | La spec de `authentication` es completamente trazable al código (validaciones, respuestas y efectos secundarios coinciden). La de `users` documenta `GET /api/v1/users/active` (con 3 escenarios) que no existe en `users_controller.ts` ni en `routes.ts`, y contradice su propio "Purpose" ("documenta el comportamiento ya implementado"). Existe un comentario inline en `users_controller.ts` que anuncia ese endpoint como pendiente de implementar en vivo; aun así se cuenta como divergencia, porque una spec que documenta comportamiento inexistente induce a error a quien la consulte, independientemente de la razón. | `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`, `backend/app/controllers/*`, `backend/start/routes.ts` |
| 9 | Preparación de docs para agentes IA (tipo adicional) | Inexistente | Módulo 5 (L1) insiste en que la documentación ya no es solo para humanos, sino contexto para agentes. El repo no tiene `llms.txt` — la Lección 4 lo describe como no obligatorio pero de "costo cero", que "reduce alucinaciones cuando agentes externos generan código para el proyecto" y es "buen hábito a instalar" en "un proyecto interno del máster" como este. Tampoco `CLAUDE.md` incluye la regla de usar Context7 para AdonisJS 7 (L3) — versión de feb-2026 que los modelos no conocen bien, pese a que el módulo la recomienda explícitamente para este stack. Nada guía a un agente sobre qué leer ni cómo evitar alucinar la API. | raíz del repo (sin `llms.txt`), `CLAUDE.md` |

### Paso 6 — Cierra la auditoría con dos Top 3

#### Top 3 carencias que más duelen

1. **La spec de `users` documenta un endpoint que no existe, y se contradice a sí misma.** `openspec/specs/users/spec.md` describe `GET /api/v1/users/active` con tres escenarios completos en Given/When/Then — pero ese endpoint no está en `users_controller.ts` ni registrado en `routes.ts`. La propia spec declara en su "Purpose" que documenta "el comportamiento ya implementado", así que no es solo un pendiente: es una contradicción interna. Importa porque OpenSpec es la fuente de verdad del trabajo spec-driven de este curso desde S2 — si diverge sin que nadie lo marque, cualquier desarrollador o agente de IA que planifique un cambio a partir de la spec parte de una premisa falsa. No es un caso aislado: `CLAUDE.md` tiene el mismo problema en miniatura (afirma que la memoria del proyecto se enlaza vía symlink a un `AGENTS.md` que no existe en el repo) — dos documentos distintos, el mismo patrón de "la doc afirma algo que la realidad no respalda".

2. **La API solo tiene una tabla de una línea por endpoint, sin schemas.** No hay OpenAPI/Swagger (`adonis-autoswagger` no está instalado, no existe ruta `/docs`) — solo el `README.md` con método, ruta, auth y una descripción corta. El frontend (`LoginForm.tsx`, `SignupForm.tsx`) ya consume esta API; cualquiera que necesite integrarse tiene que leer directamente `routes.ts` y los validators de VineJS para saber qué campos espera cada endpoint y qué forma tiene la respuesta.

3. **No existe ningún ADR, y hay una decisión concreta sin justificar.** `CLAUDE.md` y el PRD §5 fijan SQLite (`better-sqlite3`) en lugar de PostgreSQL sin ninguna justificación en ningún lugar del repo. No es una carencia abstracta: el criterio que da Módulo 5 para decidir si algo merece un ADR es "¿un developer nuevo se preguntaría por qué lo hicieron así?" — y esta es exactamente esa pregunta, sin responder. De hecho, el ejemplo canónico de ADR que usa el propio Módulo 5 es "Uso de SQLite + better-sqlite3 en lugar de PostgreSQL": el hueco real de este proyecto y el ejemplo del curso son el mismo caso.

#### Top 3 cosas que ya están bien

1. **El README de arranque no deja huecos.** Cubre requisito de Node 24+, instalación, `.env`, `generate:key`, migraciones y arranque — para backend y frontend, sin pasos ambiguos.

2. **La spec de `authentication` es 100% trazable al código, verificado línea por línea.** Los rangos de validación (password 8-180, `fullName` 2-100 opcional, email único/normalizado), los códigos de respuesta (201, 400, 422, 401) y los efectos secundarios (actualizar `last_seen_at` en login, revocar token en logout) coinciden exactamente entre la spec y `access_tokens_controller.ts`, `profiles_controller.ts` y `validators/auth.ts`.

3. **La sección de convenciones de backend de `CLAUDE.md` se sigue de verdad, no es solo una declaración.** Lógica en controllers (no en `routes.ts`), validación siempre con VineJS, serialización siempre vía transformer — lo verificamos contra el código real, no contra lo que `CLAUDE.md` dice que debería pasar. (Esta fiabilidad es específica de esa sección: el encabezado del mismo archivo tiene el problema señalado en el tipo 7 — no todo `CLAUDE.md` pesa igual.)

## Paso 7 — Exploración rápida de formatos de documentación

- **C4**: Un diagrama C4 aporta niveles de zoom (Contexto → Contenedores → Componentes → Código) que permiten explicar la misma arquitectura a audiencias distintas sin reescribir el documento — algo que unas notas sueltas en Markdown no pueden hacer sin volverse confusas.
- **ADR**: Un ADR aporta estructura obligatoria (contexto, opciones consideradas, decisión, consecuencias) que fuerza a registrar el *por qué* y las alternativas descartadas — una nota suelta rara vez incluye las opciones que se rechazaron.
- **OpenAPI**: Una spec OpenAPI (como la de Stripe) aporta schemas de request/response verificables y ejemplos ejecutables por endpoint — una tabla en Markdown solo describe la ruta, no garantiza que el schema documentado sea el que realmente espera la API.
