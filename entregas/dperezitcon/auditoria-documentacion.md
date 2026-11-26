# Ejercicio previo S5 — Auditoría de documentación existente

Documento único de entrega: Parte A (revisión del backlog), Parte B (auditoría del repositorio) y exploración de formatos.

## 0. Prerrequisitos y alcance

| Prerrequisito del enunciado | Estado | Detalle |
|---|---|---|
| Crear copia del template («Use this template») | **No realizado; sustituido** | No se creó un repositorio propio. La auditoría se hizo sobre un clon **de solo lectura** del repositorio oficial de la cohorte, `enzo-lidr/full-stack-adonisjs-s5-base-2606-roo` (commit `49634b1`), en una copia aislada fuera de OneDrive. Es el mismo punto de partida para toda la cohorte. |
| Copia clonada y proyecto arrancable | **Realizado, con incidencias** | Backend y frontend instalados y comprobados. El backend **no arranca siguiendo solo el README** (ver tipo 1). Evidencia: [arranque-repo-oficial.md](evidencias/arranque-repo-oficial.md). |
| Entregable pre-S4 a mano | Completado | prompt, output y poke-holes del módulo 4 (entregados en el PR #29 de `enzo-lidr/ai4devs-s04-planificacion-ia-2606-roo`) |
| Backlog del mentor en Linear (S4) | **No disponible** | No consta ningún acceso ni copia. La comparación de la Parte A se hace solo con el PRD. |
| Acceso a un copiloto de IA | Completado | Claude Code |

**Método de la Parte B (2026-11-26):** lectura de los ficheros del repositorio, recuento de comentarios JSDoc con `grep`, y ejecución real de los pasos del README y de cada endpoint contra los escenarios de las specs OpenSpec. No se ha abierto `docs/NOTAS-FORMADOR.md` (instrucción de la persona usuaria) ni se ha modificado el código auditado.

**Histórico del bloqueo anterior:** hasta esta fecha el repositorio de la organización antigua devolvía 404 (evidencia del bloqueo anterior, no incluida en esta entrega). El repositorio oficial se localizó después en la cuenta pública `enzo-lidr`.

## Parte A — Revisión del backlog de historias de usuario

Base: `output.md` del módulo 4 (18 historias, sin modificar), el PRD y la revisión de historias del módulo 4 (no incluida en esta entrega).

### Paso 2 — Preguntas del enunciado

**¿Siguen teniendo sentido las historias? ¿Alcance ceñido al MVP?**
Sí en general. Ninguna historia corresponde al *out of scope* del PRD §1 (no hay sincronización inversa, notificaciones, equipos ni etiquetas). La IA no se salió del alcance, pero añadió comportamiento que el PRD no pide, aunque lo marcó como (asumido): confirmación antes de borrar (US-09) y sincronización retroactiva de tareas previas al conectar Google (US-14 AC4).

**¿Criterios incompletos o poco verificables?**
Sí. Ejemplos: «se abre sin desplazar columnas» (US-13 AC2: depende de codificación y delimitador), «mensaje comprensible» y «legible y operable» (US-06 AC3/AC4), falta la transición `pending → archived` (US-08), y el AC5 de US-13 («reviso el archivo») no indica cómo se comprueba. El poke-holes sobre US-13 añadió: inyección de fórmulas en el CSV, alcance de la exportación (¿filtrada? ¿archivadas?), formato de fecha/estado y fallos o volumen.

**¿Historias que han cambiado de naturaleza?**
- *Posible, **pendiente de verificar**:* el enunciado dice que el template «expone una API (auth, /health, etc.)». Si el template ya trae autenticación, US-01 a US-04 pasarían de «construir» a «verificar y ajustar» lo existente. No se puede confirmar sin acceso al repositorio.
- El PRD (§3.5 y §7) recomienda un spike técnico antes de descomponer la sincronización con Google. Mi backlog compromete US-14 a US-18 sin spike, así que esas cinco historias dependen en realidad de una decisión previa.

**¿Historias nuevas que ahora deberían estar?**
Un spike de sincronización con Google Calendar, el setup de OAuth en Google Cloud (riesgo de PRD §7), y una historia para el mecanismo de reintento de la sincronización, que el PRD menciona («se reintenta más tarde») y que mi backlog solo trata como criterio repetido dentro de US-15, US-16 y US-17.

**¿Qué priorizaste distinto al backlog del mentor en Linear? ¿Quién acertó?**
**No se puede responder.** No hay acceso al backlog del mentor. Esta limitación queda registrada y no se inventa ninguna comparación.

### Paso 3 — Ajustes concretos

**Ajuste 1:** Añadir una historia habilitadora «Spike técnico de sincronización con Google Calendar» antes de US-14 a US-18, con salida esperada: política de zona horaria, evento de todo el día frente a hora concreta, rate limits y alcance de la sincronización inversa.
**Motivo:** el PRD §3.5 y §7 recomiendan el spike antes de comprometer la descomposición, y el análisis del PRD reveló la contradicción entre §1 («ambas direcciones») y §3.5 («primariamente FlowSync → Google»). Comprometer cinco historias sin resolverlo es el mayor riesgo del backlog.

**Ajuste 2:** Extraer una historia propia «Reintento y registro de la sincronización» y quitar el criterio repetido de fallo/log de US-15, US-16 y US-17.
**Motivo:** el comportamiento se repetía en tres historias y la política (nº de reintentos, intervalo, qué es un fallo «no recuperable» según PRD §6) quedaba sin definir. Es una dependencia compartida que merece su propia historia.

**Ajuste 3:** Reescribir los criterios no verificables e incorporar los hallazgos del poke-holes: fijar UTF-8, delimitador y programa de referencia (US-13), mitigación de inyección de fórmulas, alcance (filtradas/archivadas), formato de fecha y estado, y transición `pending → archived` (US-08).
**Motivo:** el poke-holes sobre US-13 encontró huecos que una lectura por estructura no revelaba. Un criterio que QA no puede comprobar objetivamente no es un criterio.

**Ajuste 4:** Regenerar US-04 sin ejemplo en el prompt y marcar de forma uniforme como (asumido) todas las inferencias, resolviendo antes con producto las que cambian el comportamiento (US-17: borrar o marcar el evento; US-09 y US-18: confirmaciones).
**Motivo:** US-04 reproduce casi literal el ejemplo del prompt (sesgo de anclaje) y la revisión encontró inferencias sin marcar y marcado inconsistente entre US-09 y US-18. Un backlog con decisiones implícitas obliga al equipo a adivinar.

> No se han aplicado los ajustes (el enunciado no lo pide) y los entregables del módulo 4 no se han modificado.

> **Actualización tras acceder al repositorio (2026-11-26):** la Parte A se conserva tal como se redactó. Con el repositorio ya revisado, lo que figuraba como *posible, pendiente de verificar* queda **confirmado**: el template ya implementa registro, login, logout y perfil (`start/routes.ts`, controllers y spec `authentication`), por lo que US-01 a US-04 pasarían de «construir» a «verificar y ajustar». El backlog del mentor en Linear sigue sin estar disponible.


## Parte B — Auditoría de documentación del proyecto

Artefacto consultable en tabla. **Repositorio auditado:** `enzo-lidr/full-stack-adonisjs-s5-base-2606-roo` @ `49634b1`. Estados según el enunciado: Completa · Parcial o pobre · Inexistente. Cada estado se apoya en una comprobación concreta; los resultados de ejecución están literales en [arranque-repo-oficial.md](evidencias/arranque-repo-oficial.md). **Los estados se basan en esas comprobaciones y han sido revisados y aprobados por la persona autora (2026-11-26).**

| # | Tipo de documentación | Estado | Observación | Ubicación |
|---|---|---|---|---|
| 1 | README de proyecto | **Parcial o pobre** | Describe bien el stack, la estructura y los 7 endpoints, pero **seguirlo literalmente no arranca el backend**: (a) `npm run migration:run` falla con «Cannot open database because the directory does not exist» porque `backend/tmp/` no existe y está en `.gitignore`; (b) tras crearlo, `npm run dev` y `npm run test` fallan con `ERR_MODULE_NOT_FOUND: @poppinss/ts-exec` (no está en `package.json`; en este entorno hubo que instalarlo aparte). Con ambas correcciones, el servidor arrancó y el frontend compiló. El README tampoco menciona `typecheck`, `lint` ni `test`. | `README.md`, `backend/README.md` |
| 2 | Arquitectura general | **Parcial o pobre** | No hay documento de arquitectura ni diagrama. Solo hay un árbol del monorepo (`README.md`) y la estructura de carpetas del backend (`backend/README.md`); la relación frontend↔backend se reduce a `VITE_API_URL`. `docs/README.md` anuncia que el PRD incluye «diseño de alto nivel» y «diagrama C4», pero `docs/PRD.md` (secciones 1–8) no los contiene. | `README.md`, `backend/README.md`, `docs/README.md` |
| 3 | Documentación de la API | **Parcial o pobre** | El README tiene una tabla de 7 rutas (método, ruta, auth, descripción) que coincide con `start/routes.ts`. Los cuerpos y los códigos de error solo están en las specs OpenSpec. No hay OpenAPI/Swagger ni ejemplos de petición. Para integrarse hay que leer las specs o el código. Detalle: el registro devuelve el usuario sin `fullName` y el login lo devuelve con `fullName: null`. | `README.md`, `openspec/specs/` |
| 4 | Docstrings y comentarios (TSDoc/JSDoc) | **Parcial o pobre** | Los 5 controllers tienen JSDoc corto (ruta + propósito), sin `@param`, `@returns` ni errores posibles. `models/user.ts`, `config/auth.ts`, `config/database.ts`, `config/encryption.ts` y `start/*` no tienen ninguno. En el frontend hay **0 bloques JSDoc en 17 ficheros** `.ts`/`.tsx`. | `backend/app/controllers/`, `backend/app/models/`, `frontend/src/` |
| 5 | Decisiones técnicas (ADR) | **Inexistente** | No hay ADRs ni equivalente. `README.md` y `docs/README.md` hablan de ADRs en `docs/`, pero ese directorio solo contiene `PRD.md` y `README.md` (más un fichero de notas del formador, no auditado). `docs/README.md` dice que se añadirán «en sesiones posteriores». | — |
| 6 | Guía operacional | **Inexistente** | No hay guía de despliegue, runbooks ni troubleshooting. No hay Dockerfile, CI ni scripts de despliegue. Existen los scripts `build` y `start` del backend, pero no están documentados. La ausencia de troubleshooting se notó al arrancar (dos fallos sin documentar). | — |
| 7 | Convenciones de código | **Completa** | `CLAUDE.md` (stack, comandos, convenciones y «No hacer»), `backend/README.md` y `openspec/config.yaml` coinciden entre sí y con el código revisado: lógica en controllers, validación con VineJS, salida vía `UserTransformer`, prefijo `/api/v1`, `middleware.auth()`, subpath imports. Salvedades: no hay convenciones de frontend, y el propio `CLAUDE.md` anuncia su evolución a `AGENTS.md`, que aún no existe. | `CLAUDE.md`, `backend/README.md`, `openspec/config.yaml` |
| 8 | OpenSpec y trazabilidad con el código | **Parcial o pobre** | Hay 2 specs (`authentication`, `users`) con escenarios WHEN/THEN. Probados en vivo, coinciden: registro 201/422 (email duplicado, password corta), login 200/400, perfil 200/401, listado 200/401, `/users/:id` 200, logout 200 con `{revoked:true}` y 401 tras revocar. **Divergencia:** la spec `users` dice que documenta comportamiento «ya implementado» y define `GET /api/v1/users/active`, pero esa ruta **no existe** en `start/routes.ts` ni en `users_controller.ts`; la petición se interpreta como `/users/:id` con id «active» y devuelve 404 `E_ROW_NOT_FOUND`. Al revés: `GET /api/v1/health` y `GET /` existen en el código y no tienen spec. No hay `openspec/changes/`. | `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`, `backend/start/routes.ts` |

**Tipos adicionales detectados**

| # | Tipo | Estado | Observación | Ubicación |
|---|---|---|---|---|
| 9 | Documentación de producto (PRD) | **Completa** | PRD de FlowSync con visión, alcance y fuera de alcance, usuario objetivo, requisitos funcionales y no funcionales, stack, criterios de éxito, riesgos y glosario (8 secciones). Salvedad: `docs/README.md` lo describe con contenidos que no tiene (ver tipo 2). | `docs/PRD.md` |
| 10 | README del frontend | **Inexistente** | `frontend/` no tiene README. El arranque del frontend solo figura en el README raíz, y con esos pasos instaló y compiló sin problemas. | `frontend/` |

**Tipos que no aplican:** ninguno.

### Top 3 carencias que más duelen

1. **El README no permite arrancar el backend desde cero.** Falta `backend/tmp/` (la migración falla) y `@poppinss/ts-exec` (fallan `dev` y `test`). Es la primera barrera para cualquier persona nueva y no hay troubleshooting que la compense.
2. **No hay ADRs ni arquitectura documentada.** Las decisiones (AdonisJS 7, SQLite, access tokens, monorepo) no tienen justificación registrada, y la documentación anuncia ADRs y un diagrama C4 que no existen.
3. **La spec OpenSpec no refleja el código y la API no tiene contrato formal.** `GET /users/active` está especificado como implementado y devuelve 404; `/health` no tiene spec; no hay OpenAPI ni ejemplos de errores.

### Top 3 cosas que ya están bien

1. **Convenciones de código claras y coherentes.** `CLAUDE.md`, `backend/README.md` y `config.yaml` dicen lo mismo, y el código revisado las cumple.
2. **Las specs que existen son verificables y casi todas coinciden con el comportamiento real.** Los escenarios WHEN/THEN de autenticación y consulta de usuarios se reprodujeron con las respuestas esperadas (salvo `/users/active`).
3. **README con tabla de endpoints exacta y base técnica sana.** Las 7 rutas del README coinciden con `start/routes.ts`; `typecheck` del backend y del frontend pasa y el frontend compila.

## Paso 7 — Exploración de tres formatos

Fuentes leídas el 2026-11-26: c4model.com, el repositorio público `joelparkerhenderson/architecture-decision-record` y `docs.github.com/en/rest`.

- **C4:** da un vocabulario compartido y niveles de zoom (sistema, contenedores, componentes, código) con tipos de diagrama definidos, algo que unas notas sueltas no estructuran. Cita de la fuente: «The C4 model is an easy to learn, developer friendly approach to software architecture diagramming».
- **ADR:** registra cada decisión importante junto con su contexto y sus consecuencias, y el repositorio ofrece plantillas (Nygard, MADR…) y un ciclo de vida. En unas notas sueltas el porqué se pierde. Cita: «a document that captures an important architecture decision made along with its context and consequences».
- **OpenAPI:** describe la API en un documento estándar y verificable por máquina, no en prosa. La página de GitHub afirma que su API «is fully described in an OpenAPI compliant document».

*Nota de precisión:* la página principal del REST de GitHub es un índice por recursos; el enlace a la descripción OpenAPI aparece solo en un resumen de otra página, y no se ha abierto el documento OpenAPI en sí.
