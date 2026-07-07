# Ejercicio previo — Auditoría de documentación existente (S5)

> Entrega: Parte A (revisión del backlog pre-S4) + Parte B (auditoría de
> documentación del repositorio `full-stack-adonisjs-s5-base`).

---

# Parte A — Revisión del backlog de historias de usuario

## Paso 2 — Preguntas de contraste

### Q1 — ¿Siguen teniendo sentido las historias? ¿El alcance sigue ceñido al MVP?

Revisé las 5 épicas contra la lista explícita de exclusiones del PRD (equipos/tareas
compartidas, Outlook/iCal, notificaciones push/email, app móvil nativa,
etiquetas/proyectos/subtareas, recordatorios extra, sincronización inversa
Google→FlowSync). **No se encontró ninguna historia que viole una exclusión
explícita.** La Épica 5 respeta el límite de "solo sincronización hacia
adelante" (FlowSync → Google) en las cuatro historias, sin inventar la
sincronización inversa.

Se evaluó un punto gris: la historia "Aislamiento de datos entre usuarios"
(Épica 1) no está pedida literalmente como historia de usuario en el PRD —
vive en la sección de Requisitos No Funcionales (Privacidad), no en
Requisitos Funcionales. Se resolvió con evidencia real: el evaluador
automatizado del PR #20 de S4 señaló explícitamente esta historia (junto con
"Manejo resiliente de errores de sincronización") como diseño correcto,
bien inferido del PRD **aunque no pedido explícitamente**. Conclusión:
convertir un NFR en historia testeable con AC propios fue una decisión
acertada, no scope creep.

### Q2 — ¿Hay criterios de aceptación incompletos o poco verificables?

Sí, uno relevante: **"Story: Eliminar o marcar el evento al completar o
borrar una tarea", AC2** — *"el evento se elimina o se marca como
completado (asumido)"*. Este AC describe dos comportamientos mutuamente
excluyentes a la vez, heredando sin resolver la ambigüedad del propio PRD
("se elimina o se marca según corresponda"). Un AC así no es testeable: no
se puede escribir una prueba que sepa qué esperar.

De forma más amplia, el documento tiene ~12 marcas `(asumido)` dispersas
dentro de los criterios de aceptación. Individualmente cada una es
razonable, pero en conjunto son decisiones de producto tomadas sin registro
ni validación explícita del PO — el mismo patrón de convenciones implícitas
sin justificación rastreable que ya audité en mi propio codebase de trabajo durante S3.

### Q3 — ¿Hay historias que cambiaron de naturaleza desde S4?

Sí: **"Story: Eliminar o marcar el evento..."** cambió de naturaleza. En S4
el AC2 ambiguo se sentía como un detalle menor de implementación. Visto hoy
con el lente de S5 sobre decisiones documentadas (criterio de ADR: "¿alguien
se preguntaría por qué se hizo así?"), esta historia pasa de ser "un AC con
un detalle pendiente" a ser **una decisión de negocio no tomada** que
determina cómo se comporta el calendario visible del usuario.

### Q4 — ¿Hay historias nuevas que faltan?

Sí, dos historias completas.

La primera: **persistir el `google_event_id` al crear un evento en Google
Calendar.** Ninguna historia de la Épica 5 contempla guardar el
identificador del evento generado. Sin ese dato, las historias "Actualizar
el evento al cambiar la fecha límite" y "Eliminar o marcar el evento" no
son implementables — no hay forma de referenciar qué evento de Google
corresponde a qué tarea.

La segunda: **manejar la revocación de acceso OAuth realizada desde el
lado de Google, no desde FlowSync.** Este no es un hallazgo nuevo — es el
Hallazgo #4 de mi propio `poke-holes.md` de S4 ("Revocación de acceso
OAuth fuera de FlowSync, caso 401/403 no distinguido del caso de 'API no
disponible'"), que identifiqué entonces pero nunca trasladé al backlog de
historias. Revisando hoy con la perspectiva de S5, confirmo que sigue sin
existir ninguna historia ni AC que lo cubra — un gap detectado y luego
perdido, no uno nuevo.

### Q5 — Contraste con el backlog del mentor (Linear, directo de S4)

Se obtuvo el documento fuente del backlog del mentor (`backlog-flowsync.md`,
generado para revisión humana previa a cargar issues en Linear). Hallazgos:

- **El mentor anticipó el gap de `google_event_id`** desde el diseño
  inicial: su "Technical Context" en `US-S3` dice explícitamente *"Requiere
  almacenar el `google_event_id` en el modelo Task para poder
  actualizar/borrar."* Esto valida de forma independiente el hallazgo de Q4
  — el mentor acertó primero; yo lo detecté después, en revisión
  retrospectiva. Diferencia de timing de descubrimiento, no de si el
  problema era visible.
- **El mentor bloqueó estructuralmente todo el Epic 5 detrás de un spike**
  (`US-S5`) antes de permitir que cualquier historia de sincronización
  entrara a sprint. Mi backlog original no secuenció en sprints — aunque
  esto responde a un non-goal explícito de mi propio prompt ("no estimes
  tiempos"), revela una práctica de priorización de riesgo (dado que el PRD
  marca la sync como "el mayor riesgo técnico del MVP") que no repliqué.
- **El mentor dividió proactivamente las historias grandes de sync**
  (`US-S2` → S2a/S2b, `US-S3` → S3a/S3b) con una etiqueta `needs-splitting`.
  Mi backlog dejó esas historias como bloques únicos sin dividir.
- **El mentor resolvió la ambigüedad "se elimina o se marca" con una
  decisión provisional explícita** (elige "se elimina"), registrada aparte
  como pendiente de confirmar con el PO — más maduro que dejar las dos
  alternativas conviviendo en el mismo AC, como ocurrió en mi backlog.
- Como contraparte, mi backlog cubrió el aislamiento de datos como historia
  dedicada; el mentor lo integró disperso como ACs puntuales dentro de las
  historias normales (403 en edición cruzada, 401 en creación sin auth) —
  diferencia de estilo, no de cobertura real.

**¿Quién acertó y por qué?** El mentor, en los tres puntos técnicos
(`google_event_id`, bloqueo por spike, división de historias grandes) —
por experiencia previa en descomponer features de alto riesgo técnico antes
de escribir el backlog. La diferencia no es de criterio sino de que esos
gaps solo se hacen visibles con experiencia de implementación real, que el
mentor ya tiene y yo estoy construyendo.

## Paso 3 — Ajustes concretos

```
Ajuste 1: Embeber el contexto de negocio del PRD directamente en el prompt
(al menos un resumen autocontenido), en vez de delegarlo enteramente a la
referencia @PRD.md.
Motivo: El evaluador de S4 marcó esto como el único gap real (6/10 en
"Completitud Contexto"): el prompt debe funcionar sin depender de que el
archivo esté presente en el entorno de ejecución.

Ajuste 2: Añadir una historia (o AC) que contemple la persistencia del
google_event_id al crear un evento en Google Calendar.
Motivo: Sin ese dato, "actualizar" y "eliminar el evento correspondiente"
no son criterios implementables — no hay forma de referenciar qué evento
corresponde a qué tarea. Validado de forma independiente: el backlog del
mentor en Linear ya contemplaba este mismo requisito en su Technical
Context desde el diseño inicial.

Ajuste 3: Resolver explícitamente la ambigüedad del AC "el evento se
elimina o se marca como completado" (Story: Eliminar o marcar el evento),
eligiendo un comportamiento único en vez de dejar dos alternativas
mutuamente excluyentes.
Motivo: Un AC que describe dos comportamientos a la vez no es verificable
—no se puede escribir un test que sepa qué esperar. El PRD dejó la
decisión abierta ("según corresponda"); el backlog debió marcarla como
decisión pendiente de resolver antes del refinamiento, no heredarla tal
cual. El mentor sí tomó una postura provisional explícita para este mismo
punto.

Ajuste 4: Bloquear estructuralmente todo el Epic 5 (sincronización con
Google Calendar) detrás de un spike técnico explícito, en vez de dejar sus
historias como bloques a implementar sin una dependencia formal declarada.
Motivo: El PRD marca la sincronización como "el mayor riesgo técnico del
MVP". El backlog del mentor no dejó entrar ninguna historia de sync a
sprint hasta resolver el spike (US-S5), y dividió las historias grandes en
partes más chicas (needs-splitting). Mi backlog original no secuenció ni
declaró esa dependencia — la sincronización quedó al mismo nivel de riesgo
percibido que el resto del backlog, cuando el propio PRD ya advertía que no
lo era.
```

---

# Parte B — Auditoría de documentación existente

> Repositorio auditado: copia propia de `full-stack-adonisjs-s5-base`
> (template base de la cohorte, sin FlowSync propio).

## Paso 4 — Formato del artefacto

Tabla en Markdown con columnas: **tipo de documentación · estado ·
observación · ubicación**. Se eligió por ser el formato más consultable
para comparar 8+ tipos de un vistazo, y porque replica el patrón de tabla
usado en el propio material de S5 para comparar capas de documentación.

## Paso 5 — Auditoría por tipo de documentación

| # | Tipo de documentación | Estado | Observación | Ubicación |
|---|---|---|---|---|
| 1 | README de proyecto | **Completa** | Permite arrancar desde cero (Node, instalación, `APP_KEY`, migraciones, arranque backend/frontend). Verificado: la tabla de 7 endpoints coincide exactamente con `start/routes.ts` — no hay desfase. | `README.md` (raíz) |
| 2 | Arquitectura general | **Parcial** | `CLAUDE.md` da stack y una frase de contexto, pero no hay diagrama ni explicación de relación entre componentes. `docs/README.md` menciona que un diagrama C4 "se genera en el Ejercicio 3", pero no existe en `docs/PRD.md` actual. | `CLAUDE.md`, `docs/README.md` |
| 3 | Documentación de API/endpoints | **Parcial** | No hay spec OpenAPI real (sin `adonis-autoswagger` en `package.json`, sin Scalar). Lo que sí existe es fuerte para lo que cubre: `openspec/specs/authentication/spec.md` y `.../users/spec.md` documentan cada endpoint con status codes, requirements y escenarios Given/When/Then — más detallado que una tabla, pero no es un formato que un integrador externo consuma directamente (no es JSON Schema/OpenAPI). | `README.md` (tabla), `openspec/specs/` |
| 4 | Docstrings/TSDoc en código | **Parcial** | Todos los controllers tienen comentario de bloque con ruta + una línea de descripción. Es consistente, pero no sigue TSDoc real: sin `@param`, `@returns`, `@throws`. El transformer tiene el mejor comentario del repo (explica el *por qué*, no solo el *qué*). | `backend/app/controllers/*.ts`, `transformers/user_transformer.ts` |
| 5 | Decisiones técnicas (ADRs) | **Inexistente** | No hay `docs/adr/`, ni `log4brains`, ni ningún registro de decisión. La elección de SQLite, VineJS, o el guard `api` de tokens no está justificada en ningún documento — solo se observa en el código. | — |
| 6 | Guía operacional | **Inexistente** | No hay instrucciones de despliegue, runbooks, ni troubleshooting en ningún lugar del repo. | — |
| 7 | Convenciones de código | **Parcial** | `CLAUDE.md`, sección "Convenciones del backend": lógica en controllers, validación con VineJS, serialización vía transformers, imports con subpaths, sección "No hacer" explícita — bien seguida y verificada contra el código real. Pero el propio encabezado del archivo tiene una contradicción interna: afirma *"la formalizamos como `AGENTS.md` y la enlazamos con `ln -s AGENTS.md CLAUDE.md`"*, y ninguna de las dos cosas es cierta — `AGENTS.md` no existe en el repo, y `CLAUDE.md` no es un symlink (es un archivo regular). El mismo documento que sirve de fuente de verdad para las convenciones se equivoca sobre su propio origen. | `CLAUDE.md` |
| 8 | Especificación OpenSpec y trazabilidad | **⚠️ Divergencia real** | `openspec/specs/users/spec.md` documenta el requirement "Listado de usuarios activos" (`GET /api/v1/users/active`) con 3 escenarios completos. Comparando contra `backend/app/controllers/users_controller.ts` y `backend/start/routes.ts`: el método `active` no existe y no hay ninguna ruta `/users/active` registrada. El dato que lo soportaría (`last_seen_at`) sí existe en el modelo y la migración — la spec promete una capability que el backend no expone. | `openspec/specs/users/spec.md` vs. `backend/app/controllers/users_controller.ts` + `backend/start/routes.ts` |
| 9 (adicional) | Tests automatizados | **Inexistente** | `backend/tests/` solo contiene `bootstrap.ts` (configuración de arranque del test runner). No hay ningún archivo de test real para ningún controller, modelo o validator. No estaba en la lista original de 8 tipos, se añade porque es una ausencia significativa detectada al recorrer el repo. | `backend/tests/` |

## Paso 6 — Top 3 carencias y Top 3 fortalezas

```
Top 3 carencias que más duelen:

1. Dos documentos distintos, el mismo patrón de divergencia: `openspec/specs/users/spec.md` documenta el endpoint `GET /api/v1/users/active` con 3 escenarios completos que el código no implementa (no existe en `users_controller.ts` ni en `routes.ts`). El mismo patrón se repite en `CLAUDE.md`: su encabezado afirma que la memoria del proyecto se formalizó como `AGENTS.md` y se enlaza por symlink (`ln -s AGENTS.md CLAUDE.md`) — pero `AGENTS.md` no existe en el repo, y `CLAUDE.md` es un archivo regular, no un symlink. Dos documentos distintos afirmando algo que el repositorio real no respalda; cualquier agente IA o developer nuevo que confíe en cualquiera de los dos parte de una premisa falsa.

2. Ausencia total de ADRs, con un ejemplo concreto sin justificar: la elección de SQLite + better-sqlite3 sobre PostgreSQL, fijada en `CLAUDE.md`, no tiene ningún registro de por qué se eligió ni qué alternativas se descartaron. Es, literalmente, el mismo ejemplo que usa el propio material de S5 para enseñar el formato MADR ("Uso de SQLite + better-sqlite3 en lugar de PostgreSQL") — el curso usa como ejemplo pedagógico exactamente la decisión que este repo real dejó sin documentar.

3. Ausencia total de guía operacional: no hay instrucciones de
   despliegue ni troubleshooting en ningún lugar del repo. Si algo falla
   en producción, no existe ningún documento de referencia para
   diagnosticar.

Top 3 cosas que ya están bien:

1. La sección de convenciones de backend de CLAUDE.md se sigue de
   verdad, no es solo una declaración: lógica en controllers (no en
   routes.ts), validación siempre con VineJS, serialización siempre vía
   transformer — verificado contra el código real. Esta fiabilidad es
   específica de esa sección: el encabezado del mismo archivo tiene la
   contradicción señalada en el tipo 7 (Convenciones de código), así que
   no todo CLAUDE.md pesa igual.

2. README verificado y preciso: la tabla de endpoints coincide
   exactamente con las rutas reales del código; permite arrancar el
   proyecto desde cero sin fricción ni preguntas.

3. Specs de OpenSpec con Given/When/Then: para lo que cubren (auth,
   users), documentan comportamiento con precisión de nivel test —
   más riguroso que una spec informal de prosa.
```

## Paso 7 — Exploración rápida de tres formatos de documentación

- **C4** aporta niveles de zoom coordinados (Context → Container →
  Component → Code) que se mantienen consistentes entre sí: mover un
  componente actualiza todas las vistas relacionadas, algo que notas
  sueltas en Markdown no logran sin reescribir cada diagrama a mano por
  separado.

- **ADR** (formato MADR) impone una estructura fija de secciones
  (Contexto y problema → Opciones consideradas → Decisión →
  Consecuencias) que fuerza a registrar *por qué se descartó* cada
  alternativa, no solo qué se eligió: una nota suelta normalmente solo
  tiene la última sección (la decisión final), sin las tres anteriores.

- **OpenAPI** tiene una estructura de spec fija (paths + components/schemas
  + securitySchemes) que herramientas como Scalar, generadores de
  clientes o tests de contrato parsean y consumen directamente sin
  intervención humana: notas sueltas no tienen ninguna de esas tres
  partes formalizadas, son prosa libre que alguien debe leer e
  interpretar, sin garantía de que coincida con el comportamiento real
  del código.
