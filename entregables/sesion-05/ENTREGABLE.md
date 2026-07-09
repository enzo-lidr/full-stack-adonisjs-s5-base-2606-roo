MODULO 5
EJERCICIO PREVIO A LA SESION EN VIVO

ALUMNO: Jaime Pinal
FECHA: julio 8 de 2026


DESCRIPCIÓN: Este ejercicio del módulo 5 tiene como objetivo principal auditar documentación del proyecto FlowSync, trabajando directamente sobre el temnplate: full-stack-adonisjs-s5-base


=======================================================================
PARTE A
Revisión de tu backlog de historias de usuario

-----------------------------------------------------------------------
Paso 1 - Recupera tu entregable del ejercicio pre-S4

Archivos consultados:
* /entegables/sesion-04/prompt.md
* /entegables/sesion-04/output.md

-----------------------------------------------------------------------
Paso 2 - Contrástalo con lo que sabes ahora

Por una falta de concentración al leer las instrucciones del ejercicio de la sesión 4, construí mi prompt de manera más narrativa que estructurada y sin ser suficientemente explícito en los non-goals. Aunque me generó suficientes y compeltas user stories, aprendí que un prompt adecuadamente estructurado y suficientemente explícito, genera un backlog de usert stories con más completez y menos ambigüedad, listo ptambién para generar test cases.

|_____________

¿Siguen teniendo sentido las historias tal como las generaste? ¿El alcance sigue ceñido al MVP del PRD, o se coló alguna que la IA "inventó" fuera de scope?

Mis observaciones:

Sí, mis user stories siguen teniendo sentido y están alineadas al alcance del PRD. Yo explícitamente pedí que cada user story cumpliera con el criterion INVEST. Eso ayudó. Pero se quedaron especificaciones menciondas en el PRD fuera del backlog, como un spike y requerimienbtos no funcionales.

|_____________
¿Hay historias cuyos criterios de aceptación ahora ves incompletos o poco verificables?

Mis observaciones:

Las user stories de mi backlog son verificables y están completas, pero no contienen contexto técnico y los non-goals. En una segunda corrida después de la revisión, las agregué, y me parece que hace más robusta la user story para testing.

|_____________
¿Hay historias que han cambiado de naturaleza desde entonces? (porque descubriste una dependencia, porque la spec evolucionó, porque entiendes mejor el dominio).

Mis observaciones: 

Después de revisar el backlog del mentor, me dí cuenta que faltaron algunas cosas, que explícitamente se mencionaban en el PRD. Ahora, con un mejor entendmiento del dominio, encuentro que se perdieron los requerimientos no funcionales de rendimiento.

|_____________
¿Hay historias nuevas que no aparecieron cuando lo generaste y que ahora sí deberían estar?

Mis observaciones: 

Sí, en la Epic de Organización y filtrado, solo había obtenido una user story con mi prompt, para filtrar tareas por estado.


Estás dos también deberían haber estado (las tuve que agregar después):

- Como usuario autenticado, quiero que mi listado de tareas muestre primero las más relevantes para hoy para priorizar visualmente lo que debo atender sin ordenar manualmente
- Como usuario autenticado sin tareas visibles, quiero ver un mensaje que me invite a crear mi primera tarea para saber cuando no tengo pendientes en mi vista actual.


|_____________
Al contrastar con el backlog que el mentor construyó en el directo de S4 sobre Linear: ¿qué priorizaste distinto tú? ¿Quién acertó y por qué?

Mis observaciones:

* Suposiciones (asumnido): yo lo tengo más granular (aparece en cada lugar necesario) mientras que el mentor lo tiene como un comentario al final de cada Criterio de Aceptación donde aplica.
* Requerimientos no funcionales: Mi backlog no tiene AC para esto. El backlog del mentor sí.
* Roadmap: Mi backlog no tiene, el del mentor sí.
* Mi backlog está más orientado a escnearios de prueba. El backlog del mentor está más listo para plafinicación de sprints.


-----------------------------------------------------------------------
Paso 3 - Anota los ajustes

Ajuste 1: Incluir lo que faltó: requerinmientos no funcionales de desempeño y el spike de sincronización inversa, porque están explícitamente mendionados en el PRD.

Ajuste 2: Incluir IDs para las user stories, porque ayudaría cuando sean trasladadas al backlog en Linear.

Ajuste 3: Agregar hints para estimación

Ajuste 4: Indicar cuando alguna user story requiere split, porque eso ayudaría a que el equipo la discuta y decida cómo dividirla y de tal manera dejar items menos dependientes y más fácilment estimables.



=======================================================================
PARTE B
Auditoría de documentación del proyecto

-----------------------------------------------------------------------
Paso 4 - Decide el formato del artefacto de auditoría

Decidí crear un formato de informe estructurado por secciones, ya que me pareció más cómodo visualmente. Probé primero con un formato con una tabla y columnas, pero a simple vista, en un markdown, no me pareció tan fáácil de ubicar cada tipo de documentación a simple vista.


-----------------------------------------------------------------------
Paso 5 - Audita cada tipo de documentación


# Auditoría de Documentación de Proyecto

**Proyecto:** full-stack-adonisjs-master (FlowSync) — monorepo backend AdonisJS 7 + frontend React 19
**Fecha de auditoría:** 2026-07-07

---

## Leyenda de Estados

- **✅ Completa**: Existe, está actualizada, clara y cumple completamente su función
- **⚠️ Parcial/Pobre**: Existe, pero está incompleta, desactualizada, mal organizada o no cumple adecuadamente su función
- **❌ Inexistente**: No existe documentación que cubra este aspecto

---

## 1. README de Proyecto

**Estado:** ☒ ✅ Completa | ☐ ⚠️ Parcial/Pobre | ☐ ❌ Inexistente

**Ubicación del archivo:**
`README.md` (raíz, monorepo) + `backend/README.md` (specifico de la API). No existe `frontend/README.md` propio, pero el README raíz cubre el arranque del frontend.

**Observaciones específicas:**

- ¿Permite que alguien nuevo inicie el proyecto desde cero?
  - Instalar dependencias: ☒ Sí | ☐ No | ☐ Parcial
  - Configurar `.env` o variables de entorno: ☒ Sí | ☐ No | ☐ Parcial
  - Correr migraciones/seeds: ☒ Sí | ☐ No | ☐ Parcial
  - Levantar el servidor: ☒ Sí | ☐ No | ☐ Parcial

**Notas:**
- El README raíz da un "arranque rápido" completo y correcto para ambas apps, siempre y cuando cree el folder /bckend/tmp/ que necesita SQLite y que instale @poppinss/ts-exec y se agregue a "devDependencies", porque en el repo no existen.


---

## 2. Descripción de la Arquitectura General

**Estado:** ☐ ✅ Completa | ☒ ⚠️ Parcial/Pobre | ☐ ❌ Inexistente

**Ubicación del documento:**
Árbol de carpetas en `README.md` (raíz) + sección "Estructura" en `backend/README.md`. No hay documento dedicado a arquitectura.

**Observaciones específicas:**

- ¿Existe un documento que explique cómo está organizado el sistema?
  - Estructura de carpetas/módulos: ☒ Sí | ☐ No | ☐ Parcial
  - Componentes principales: ☐ Sí | ☐ No | ☒ Parcial
  - Relaciones entre componentes: ☐ Sí | ☒ No | ☐ Parcial
  - Diagramas (C4, flujo, dependencias): ☐ Sí | ☒ No | ☐ Parcial

**Notas:**
La estructura de carpetas está bien listada (backend: controllers/models/validators/transformers/middleware; frontend: componentes/páginas/servicios), pero no hay explicación de cómo se relacionan capa a capa (p. ej. flujo request → validator → controller → transformer → response), ni cómo el frontend consume la API. `docs/README.md` menciona que un "diagrama C4" se genera a partir del PRD, pero `docs/PRD.md` no contiene ningún diagrama — solo texto. No hay diagramas de ningún tipo en el repo.

---

## 3. Documentación de API / Endpoints

**Estado:** ☐ ✅ Completa | ☒ ⚠️ Parcial/Pobre | ☐ ❌ Inexistente

**Ubicación del documento o herramienta (Swagger, OpenAPI, etc.):**
No hay Swagger/OpenAPI (ni siquiera como dependencia real del proyecto — la única mención de "openapi" en el repo aparece incidentalmente en `backend/package-lock.json`, no como herramienta configurada). La documentación de API vive repartida en dos sitios de calidad muy distinta: la tabla de endpoints de `README.md` (raíz) y las specs de OpenSpec (`openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`).

**Observaciones específicas:**

- ¿Está documentada de forma que otro equipo puede integrarse sin leer código?
  - Endpoints listados: ☒ Sí | ☐ No | ☐ Parcial
  - Métodos HTTP (GET, POST, etc.): ☒ Sí | ☐ No | ☐ Parcial
  - Parámetros (query, path, body): ☐ Sí | ☐ No | ☒ Parcial
  - Esquemas de request/response: ☐ Sí | ☐ No | ☒ Parcial
  - Códigos de error documentados: ☐ Sí | ☐ No | ☒ Parcial
  - Ejemplos de uso: ☐ Sí | ☒ No | ☐ Parcial

**Divergencias encontradas:**
**Crítica:** la spec `openspec/specs/users/spec.md` (requirement "Listado de usuarios activos") documenta `GET /api/v1/users/active` afirmando explícitamente que "esta spec documenta el comportamiento **ya implementado**". Verificado en código: `backend/start/routes.ts` solo registra `GET /users` y `GET /users/:id`; `backend/app/controllers/users_controller.ts` solo implementa `index` y `show` (el propio archivo tiene un comentario reconociendo que el endpoint se implementará más adelante). El campo de datos que la spec necesita (`last_seen_at`) sí existe en el modelo `User` y en la migración `..._create_users_table.ts`, y el login sí lo actualiza — es decir, la capa de datos soporta la funcionalidad pero el endpoint HTTP no existe. Cualquier equipo o agente que integre contra la spec sin leer el código fallará en esta llamada.

Adicional (menor): `GET /api/v1/health` está implementado en código y listado en el README, pero no tiene una spec de OpenSpec propia — no hay forma de rastrear su origen/requisitos salvo el comentario inline en `health_controller.ts`.

**Notas:**
Las specs de OpenSpec (auth/users) son, en calidad, muy superiores a la tabla del README: usan formato Gherkin (`WHEN/THEN`), documentan códigos de error (`401`, `422`, `400`, `404` con sus códigos internos `E_UNAUTHORIZED_ACCESS`, etc.) y forma de la respuesta (`{ user, token }`). Sin embargo no hay un contrato machine-readable (OpenAPI/JSON Schema) ni ejemplos de payload reales (curl/HTTPie).

---

## 4. Docstrings y Comentarios en Código (TSDoc/JSDoc)

**Estado:** ☐ ✅ Completa | ☒ ⚠️ Parcial/Pobre | ☐ ❌ Inexistente

**Lenguaje/Estándar utilizado:** Comentarios de bloque estilo JSDoc informal (sin tags `@param`/`@returns`), TypeScript.

**Observaciones específicas:**

- Controllers/Handlers documentados: ☐ Sí | ☐ No | ☒ Parcial
  - Descripción de qué hacen: ☒ Sí | ☐ No | ☐ Parcial
  - Parámetros documentados: ☐ Sí | ☒ No | ☐ Parcial
  - Retorno documentado: ☐ Sí | ☒ No | ☐ Parcial

- Services/Lógica de negocio documentados: ☐ Sí | ☐ No | ☒ Parcial
  - Descripción de responsabilidad: ☒ Sí | ☐ No | ☐ Parcial
  - Casos especiales o edge cases: ☐ Sí | ☒ No | ☐ Parcial

- Modelos/Entidades documentados: ☐ Sí | ☒ No | ☐ Parcial
  - Propiedades explicadas: ☐ Sí | ☒ No | ☐ Parcial
  - Restricciones o validaciones: ☐ Sí | ☒ No | ☐ Parcial

- Calidad general de comentarios:
  - Comentarios genéricos o irrelevantes: ☐ Muchos | ☐ Algunos | ☒ Pocos
  - Comentarios inline explicativos: ☐ Abundantes | ☒ Regulares | ☐ Insuficientes

**Notas:**
Todos los controladores tienen un comentario de una o dos líneas por método (ruta + qué hace), lo cual es útil y consistente, pero ninguno documenta parámetros, tipos de retorno o casos de error mediante tags formales — no hay valor añadido de TSDoc real (autocompletado enriquecido, generación de docs). El modelo `User` (`backend/app/models/user.ts`) no tiene ningún comentario pese a mezclar `withAuthFinder` y `DbAccessTokensProvider`, que no son obvios para alguien nuevo en AdonisJS. `UserTransformer` sí tiene un buen comentario de clase explicando el "por qué" (fuente única de verdad del shape de salida). 

---

## 5. Decisiones Técnicas Registradas (ADRs)

**Estado:** ☐ ✅ Completa | ☐ ⚠️ Parcial/Pobre | ☒ ❌ Inexistente

**Ubicación del archivo o carpeta ADR:**
No existe. `docs/README.md` menciona textualmente: "ADRs y diagramas de arquitectura se añaden en sesiones posteriores" — es decir, están planificados pero no presentes.

**Observaciones específicas:**

- ¿Existen Architecture Decision Records o equivalentes?
  - Formato utilizado (RFC 2119, ADR clásico, otro): N/A — no existen
  - Número de ADRs registrados: 0
  - ¿Están relacionados con decisiones críticas del proyecto?: ☐ Sí | ☒ No | ☐ Parcial

- Decisiones registradas incluyen:
  - Problema o contexto: ☐ Sí | ☒ No | ☐ Parcial
  - Alternativas consideradas: ☐ Sí | ☒ No | ☐ Parcial
  - Decisión y justificación: ☐ Sí | ☒ No | ☐ Parcial
  - Consecuencias o trade-offs: ☐ Sí | ☒ No | ☐ Parcial

**Decisiones críticas no documentadas que deberían estarlo:**
- Elección de SQLite (`better-sqlite3`) como base de datos frente a Postgres/MySQL, y sus implicaciones para producción/escalado.
- Elección de access tokens (`@adonisjs/auth` guard `api`) frente a sesiones/cookies o JWT, y su relación con el requisito de privacidad del PRD.
- Decisión de mantener la lógica de negocio en controllers (sin capa de servicios) — está declarada como convención pero no justificada como decisión de arquitectura.
- Estrategia de sincronización con Google Calendar descrita en el PRD (§3.5, dirección primaria FlowSync → Google) es una decisión de producto de alto riesgo (según el PRD) que aún no tiene ADR ni spike documentado.

**Notas:**
Ninguna.

---

## 6. Guía Operacional

**Estado:** ☐ ✅ Completa | ☐ ⚠️ Parcial/Pobre | ☒ ❌ Inexistente

**Ubicación del documento:**
No existe ningún documento operacional en el repo.

**Observaciones específicas:**

- ¿Existen instrucciones de despliegue?
  - Despliegue a staging: ☐ Sí | ☒ No | ☐ Parcial
  - Despliegue a producción: ☐ Sí | ☒ No | ☐ Parcial
  - Rollback procedures: ☐ Sí | ☒ No | ☐ Parcial

- ¿Hay runbooks para incidencias típicas?
  - Base de datos caída: ☐ Sí | ☒ No | ☐ Parcial
  - Cache invalidación: ☐ Sí | ☒ No | ☐ Parcial (no aplica: no hay caché en el sistema actual)
  - Recuperación de errores comunes: ☐ Sí | ☒ No | ☐ Parcial

- ¿Existe troubleshooting o FAQ?
  - Problemas comunes listados: ☐ Sí | ☒ No | ☐ Parcial
  - Pasos para diagnosticar: ☐ Sí | ☒ No | ☐ Parcial

- Monitoreo y alertas documentados:
  - Métricas clave identificadas: ☐ Sí | ☒ No | ☐ Parcial
  - Umbrales de alerta: ☐ Sí | ☒ No | ☐ Parcial

**Notas:**
Como es un ejercicio de práctica, es entendible que no estén los elementos para una guía operacional. El PRD sí menciona un requisito no funcional de observabilidad ("las operaciones de sincronización con Google se registran para poder diagnosticar fallos"), pero todavía no tiene contraparte operacional (qué logs, dónde se consultan, qué hacer si fallan). 

---

## 7. Convenciones de Código del Proyecto

**Estado:** ☐ ✅ Completa | ☒ ⚠️ Parcial/Pobre | ☐ ❌ Inexistente

**Ubicación del documento (CLAUDE.md, AGENTS.md, CONTRIBUTING.md, etc.):**
`CLAUDE.md` (raíz) + sección "Convenciones" de `backend/README.md`. No existe `CONTRIBUTING.md`.

**Observaciones específicas:**

- ¿Hay un documento de convenciones?
  - Nombrado (variables, funciones, clases): ☐ Sí | ☐ No | ☒ Parcial
  - Estructura de carpetas: ☒ Sí | ☐ No | ☐ Parcial
  - Patrones de arquitectura (MVC, servicios, etc.): ☒ Sí | ☐ No | ☐ Parcial

- Guía de código limpio:
  - Máxima complejidad o longitud de funciones: ☐ Sí | ☒ No | ☐ Parcial
  - Estándares de logging: ☐ Sí | ☒ No | ☐ Parcial
  - Manejo de errores: ☐ Sí | ☐ No | ☒ Parcial

- Flujo de desarrollo:
  - Branching strategy (GitFlow, trunk-based, etc.): ☐ Documentado | ☒ No documentado
  - Convenciones de commits: ☐ Sí | ☐ No | ☒ Parcial
  - Proceso de code review: ☐ Sí | ☒ No | ☐ Parcial

**Desviaciones encontradas entre la documentación y el código:**
Ninguna desviación material: las convenciones documentadas (lógica en controllers, validación con VineJS, salida vía `UserTransformer`, subpath imports `#controllers/*`/`#models/*`) se verificaron línea por línea contra los 5 controladores, el validador y el transformer, y **se cumplen consistentemente**. Este es uno de los pocos puntos del proyecto donde documentación y código están perfectamente alineados.

**Notas:**
`openspec/config.yaml` declara "Usamos conventional commits" pero esto está en un archivo de configuración de una herramienta, no en un `CONTRIBUTING.md` visible. No hay guía de manejo de errores más allá de lo que se infiere del código (excepciones de AdonisJS + VineJS). No hay política de longitud/complejidad de funciones ni de logging.

---

## 8. Especificación OpenSpec y Trazabilidad

**Estado:** ☐ ✅ Completa | ☒ ⚠️ Parcial/Pobre | ☐ ❌ Inexistente

**Ubicación del OpenSpec:**
`openspec/` — `config.yaml` + `specs/authentication/spec.md` + `specs/users/spec.md`.

**Versión del OpenSpec:** No versionado explícitamente (no hay changelog ni carpeta `changes/`/`archive/` con historial de cambios aplicados).

**Observaciones específicas:**

- ¿Existe una especificación OpenSpec (o equivalente)?
  - Formato: Gherkin-like (`## Requirement` con `SHALL`, `#### Scenario` con `WHEN/THEN/AND`), siguiendo el schema `spec-driven` declarado en `config.yaml`.
  - Endpoints listados: ✓ Cantidad: 7 requirements descritos (registro, login, logout, perfil, listado de usuarios, usuario por id, usuarios activos) cubriendo 6 endpoints reales + 1 endpoint inexistente.
  - Esquemas de datos: ☐ Sí | ☐ No | ☒ Parcial (formas de respuesta descritas en prosa, sin JSON Schema formal)

- ¿La especificación está al día respecto al código?
  - Endpoints en spec pero no en código: **`GET /api/v1/users/active`** (spec `users/spec.md`, requirement "Listado de usuarios activos") — no implementado en `users_controller.ts` ni registrado en `routes.ts`.
  - Endpoints en código pero no en spec: `GET /api/v1/health` (implementado, sin spec de OpenSpec propia) y `GET /` raíz (health-check informal, sin documentar en ningún sitio).
  - Cambios en esquemas no reflejados: ☐ Sí | ☒ No | ☐ Parcial (el esquema de `users` sí incluye `last_seen_at`, coherente con la migración y el modelo)

- Trazabilidad entre spec y código:
  - ¿Se puede mapear cada endpoint de spec a su implementación?: ☐ Sí | ☐ No | ☒ Parcial (6 de 7 requirements sí mapean 1:1 a un controlador citado explícitamente en la spec; 1 no mapea a nada)
  - ¿Se puede rastrear cambios en spec al código?: ☐ Sí | ☒ No | ☐ Parcial (no existe carpeta de `changes`/histórico de propuestas OpenSpec aplicadas; solo quedan las specs "finales", sin rastro de cómo evolucionaron)

**Divergencias críticas encontradas:**
La divergencia principal es la ya descrita en la Sección 3: `openspec/specs/users/spec.md` afirma en su propio encabezado ("Purpose") que documenta "el comportamiento **ya implementado**" y sin embargo el requirement "Listado de usuarios activos" (`GET /api/v1/users/active`) no tiene ninguna implementación en el backend. Esto es más grave que una spec simplemente desactualizada: la spec hace una afirmación explícita y verificable ("ya implementado") que es falsa para ese requirement concreto, lo que socava la confianza en el resto del documento si no se audita con cuidado.

**Notas:**
Salvo por esa divergencia, la calidad de las dos specs existentes es alta: referencian archivos concretos de implementación, incluyen escenarios de error con códigos internos de AdonisJS/VineJS, y están bien alineadas con el PRD (`docs/PRD.md` §3.1). El principal riesgo estructural es la falta de una carpeta de `changes`/archivo histórico que permita trazar *por qué* y *cuándo* se añadió cada requirement.


-----------------------------------------------------------------------
Paso 6 — Cierra la auditoría con dos Top 3


### Top 3 de Carencias (Prioridades más altas)

**1. Divergencia crítica spec ↔ código: `GET /api/v1/users/active`**
   - Qué falta o está mal: La especificación de OpenSpec afirma explícitamente que documenta comportamiento "ya implementado", pero el endpoint no existe en `routes.ts` ni en `users_controller.ts`. Quien construya contra la spec sin leer el código tendrá errores en producción. Esta divergencia es crítica porque la documentación está desactualizada.
   - Por qué es importante: Habría que implementar el endpoint para que coincida con la spec, o marcar el requiremento como pendiente.


**2. Ausencia de documentación operacional y de ADRs**
   - Qué falta o está mal: No hay forma de saber por qué se tomaron decisiones técnicas clave (SQLite, access tokens vs. sesiones, controllers sin capa de servicios) ni cómo desplegar, hacer rollback o diagnosticar incidentes. *** Entendible en este momento, siendo un ejercicio de práctica. ***
   - Por qué es importante: para mantenimiento, continuidad de negocio y onboarding de nuevos miembros del equipo, es importante contar con documentos que describan por qué el sistema está diseñado como está y qué cambios ha sufrido y por qué, tanto para entender como para poder transferir conocimiento sin perder tanto tiempo así como para poder tomar decisiones acertadas al evolucionar el sistema en el futuro.

**3. Documentación de API fragmentada y sin contrato formal**
   - Qué falta o está mal: La documentación de API vive repartida entre una tabla simple en el README (sin esquemas ni errores) y las specs de OpenSpec (ricas pero no machine-readable ni pensadas como contrato de integración). No hay una única fuente de verdad consultable por un equipo externo o por herramientas (Swagger UI, Postman, generación de clientes).
   - Por qué es importante: para tener una sola fuente de la verdad y que sea entendible y que se ligue adecuadamente con las specs existentes y el README y evitar discrepancia. Se podría generar un OpenAPI spec (aunque sea manual al principio) a partir de las specs de OpenSpec existentes.

### Top 3 de Fortalezas

**1. README de arranque rápido**
   - Descripción: El README raíz permite a alguien nuevo clonar el repo y tener ambas apps corriendo sin fricción — instalación, `.env`, generación de `APP_KEY`, migraciones y servidor de desarrollo, todo verificado contra los scripts reales de `package.json`. Solamente hay que crear el folder /tmp pra SQLite e instalar @poppinss/ts-exec.

**2. Specs de OpenSpec de autenticación y usuarios**
   - Descripción: Formato Gherkin consistente, con escenarios de éxito y error, códigos de error internos de AdonisJS/VineJS, y referencias explícitas a los archivos de implementación. 

**3. Convenciones arquitectónicas documentadas y realmente cumplidas**
   - Descripción: Las reglas declaradas en `CLAUDE.md` y `backend/README.md` (lógica en controllers, validación VineJS, salida vía transformer, subpath imports).




-----------------------------------------------------------------------
Paso 7 - Exploración rápida de tres formatos de documentación


¿qué aporta a primera vista que no aporten unas notas sueltas en Markdown?

* Diagrama C4: permite visualizar al arquitectura del software a diferentes niveles (contexto del sistema, contenedores, componentes, y código)

* ADR: permite capturar información sobre las decisiones técnicas de manera estándar, estructurada y ordenada, exigiendo al equipo que argumente esas decisiones.

* Especificación OpenAPI pública: es formal y la puede validar una herramienta, como adonis-autoswagger.