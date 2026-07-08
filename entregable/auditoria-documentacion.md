# Ejercicio pre-S5 — Entrega única

> Documento único de entrega: Se dividen las secciones correspondientes según los enunciados y ejercicios.
> Fecha de entrega: 08/07/26
> Autor: Luis Lujan
> Auditoría realizada con Codex.

---

## Parte A — Revisión del backlog de historias de usuario

### Paso 1 — Material revisado

Para esta parte volví a revisar los entregables del ejercicio pre-S4:

- `prompt.md`: prompt usado para descomponer el PRD de FlowSync en historias de usuario.
- `output.md`: backlog generado por la IA.
- `poke-holes.md`: crítica sobre la Story 10, enfocada en sincronización con Google Calendar.
- `reflexion.md`: reflexión personal posterior al ejercicio.
- `docs/PRD.md`: PRD original de FlowSync MVP.

### Paso 2 — Contraste con lo aprendido en S4 y S5

#### Análisis general

Mi impresión general es que el backlog que generé sigue siendo una buena primera versión. Las épicas principales están bien encaminadas: autenticación, gestión de tareas, organización y filtros, exportación y sincronización con Google Calendar.

También creo que el prompt ayudó bastante porque haber definido alcance, non-goals, formato de salida, criterios Given/When/Then y la regla de marcar supuestos como `(asumido)` evitó que la IA se fuera demasiado lejos del MVP. He comprobado que `asumido` es importantísimo para el contexto y la documentación y evitar caer en la trampa de que la IA hizo el trabajo y no revisarlo luego.

No veo una historia claramente inventada fuera del producto porque el backlog respeta bastante bien lo que dice el PRD: registro, login, CRUD de tareas, estados, filtros, exportación CSV y sincronización con Google Calendar.

Lo que sí veo ahora, después de S4, es que algunas historias quedaron más “cerradas” de lo que realmente estaban. En una primera lectura parecían listas para implementar pero al mirarlas con más criterio aparecen decisiones importantes que todavía faltan. Por ejemplo : la sincronización con Google Calendar. La Story 10, “Crear y actualizar eventos desde tareas con fecha límite”, suena correcta como intención de producto, pero no está lista para implementación sin refinamiento previo. Una fecha límite no se transforma automáticamente en un evento de calendario: falta definir si será un evento de todo el día, si tendrá hora, duración, zona horaria y en qué calendario se creará.

Además la story habla de actualizar “el evento correspondiente” pero no explica cómo FlowSync sabe cuál es ese evento. Eso me parece un hallazgo importante: sin una relación persistente entre tarea y evento de Google Calendar, es fácil terminar con duplicados o no poder actualizar/borrar el evento correcto.

La Story 11 también necesita revisión porque el criterio que dice que al completar o borrar una tarea el evento “se elimina o se marca según corresponda” no es realmente verificable. Esa frase muestra que hay una decisión pendiente, no un criterio de aceptación cerrado.

La Story 12 sobre "fallos y observabilidad" sigue siendo necesaria pero también quedó algo amplia. El PRD dice que la tarea debe guardarse aunque falle Google y que la sincronización se reintenta más tarde, pero todavía falta definir estados mínimos, estrategia de reintentos, qué pasa con tokens vencidos o permisos revocados, y cómo se comunica ese problema al usuario.

En resumen: el backlog sirve como mapa inicial del MVP pero no todas las historias están igual de maduras. Las stories de sincronización necesitan más refinamiento antes de considerarlas AI-ready.

#### Respuestas a las preguntas del ejercicio

##### ¿Siguen teniendo sentido las historias tal como las generé?

Pienso que sí, en general siguen teniendo bastante sentido: cubren las áreas principales del PRD y están agrupadas de forma razonable.

Lo que cambiaría no es tanto la lista completa de historias, sino el nivel de refinamiento de algunas porque varias están bien como primera descomposición, pero no todas están listas para pasar directo a implementación.

##### ¿El alcance sigue ceñido al MVP del PRD, o se coló alguna que la IA inventó fuera de scope?

El alcance se mantiene bastante ceñido al MVP. No detecto historias claramente fuera de scope.

El prompt original ayudó porque bloqueaba explícitamente funcionalidades como equipos, tareas compartidas, app móvil nativa, Outlook/iCal, notificaciones, recuperación de contraseña, subtareas o sincronización inversa completa como feature comprometida.

El único punto que podría generar confusión es la sincronización con Google Calendar, porque el PRD menciona lectura y escritura, pero también aclara que la dirección principal del MVP es FlowSync → Google Calendar y que la sincronización inversa completa requiere un spike técnico. Por eso me parece correcto que no haya quedado como story comprometida del MVP.

##### ¿Hay historias cuyos criterios de aceptación ahora veo incompletos o poco verificables?

Sí, sobre todo:

- Story 10: crear y actualizar eventos desde tareas con fecha límite.
- Story 11: completar o borrar tareas sincronizadas.
- Story 12: manejo de fallos y observabilidad de sincronización.

En la Story 10 faltan casos importantes: quitar fecha límite, evitar duplicados, definir zona horaria, duración y calendario destino.

En la Story 11 hay un criterio poco verificable: “el evento se elimina o se marca según corresponda”. Eso debería convertirse en una decisión explícita antes de implementar.

En la Story 12 se habla de reintentos y diagnóstico, pero todavía no está claro qué estados maneja el sistema ni qué ve el usuario cuando una sincronización falla.

##### ¿Hay historias que han cambiado de naturaleza desde entonces?

La Story 10 cambió de naturaleza para mí.

Antes la veía como una feature funcional: “crear o actualizar eventos desde tareas”. Ahora la veo como una story que depende de decisiones previas de producto y diseño técnico. No basta con implementarla; primero hay que definir cómo se representa una fecha límite como evento y cómo se mantiene la relación tarea ↔ evento.

También la Story 12 pasó a parecerme menos “historia de soporte” y más parte central del MVP. Como Google Calendar es el diferencial del producto y también su mayor riesgo, el manejo de fallos no debería quedar como detalle secundario.

##### ¿Hay historias nuevas que no aparecieron cuando lo generé y que ahora sí deberían estar?

No agregaría muchas historias nuevas, porque el backlog ya cubre bastante bien el MVP. Pero sí agregaría o separaría mejor una historia/caso sobre quitar fecha límite de una tarea sincronizada.

Ese caso no apareció originalmente y me parece importante porque puede dejar eventos huérfanos en Google Calendar.

También consideraría agregar un spike o tarea de refinamiento sobre el modelo de sincronización con Google Calendar, especialmente para fecha límite, zona horaria, calendario destino, relación tarea-evento y reintentos. No necesariamente como user story de usuario final, pero sí como trabajo necesario antes de implementar la sincronización.

##### Al contrastar con el backlog del mentor en Linear: ¿qué prioricé distinto? ¿Quién acertó y por qué?

La primera diferencia fue la **estimación**. Mi prompt prohibía explícitamente estimar tiempos, story points o tamaños. El backlog del mentor si incorporó tamaños tipo S/M/L y labels de Linear. Viéndolo ahora, no creo que una opción sea “correcta” y la otra “incorrecta”: mi enfoque buscaba un backlog limpio a nivel producto, mientras que el del mentor parecía más orientado a llevar las stories a una herramienta de planificación real.

La segunda diferencia fue el **contexto técnico anticipado**. Mi prompt pedía no proponer arquitectura, endpoints concretos, nombres de clases, tablas ni estructura de carpetas. En ese momento lo hice para evitar que la IA inventara detalles técnicos no respaldados por el PRD.

La tercera diferencia fue el **tratamiento del riesgo de Google Calendar**. Mi backlog marcó varios puntos como supuestos o refinamiento pendiente, especialmente alrededor de fecha límite, zona horaria, reintentos y sincronización inversa. Pero esas advertencias quedaron escritas como notas. Una nota puede pasarse por alto, mientras que un bloqueo visible en el board evita arrastrar una story inmadura a sprint.

La cuarta diferencia fue la **verificación final de scope**. Mi prompt tenía non-goals claros y el output se mantuvo bastante dentro del MVP, pero no cerré con una sección explícita verificando que ninguna story tocara out-of-scope del PRD. Esa práctica me parece adoptable: al final de una descomposición hecha con IA, conviene incluir una mini-verificación de alcance para detectar si se coló alguna funcionalidad inventada.

Mi conclusión es que mi backlog fue mejor como primera descomposición funcional y prudente del PRD, porque evitó inventar detalles técnicos. El enfoque del mentor, en cambio, parece más útil para convertir el backlog en trabajo operativo dentro del contexto que vimos. Si rehiciera el ejercicio hoy, mantendría mi restricción de no inventar contexto técnico, pero agregaría dos cosas del enfoque del mentor: labels/estados para marcar stories bloqueadas o que necesitan splitting, y una verificación final explícita contra los out-of-scope del PRD.

### Paso 3 — Ajustes que haría si rehiciera el backlog hoy

#### Ajuste 1: Refinar la Story 10 antes de considerarla lista para implementación

**Ajuste:** Reescribir o dividir la Story 10 para definir mejor cómo una fecha límite se convierte en evento de Google Calendar.

**Motivo:** La story original asume que una fecha límite puede transformarse directamente en un evento, pero falta decidir si será evento de todo el día, evento con hora, duración por defecto, zona horaria y calendario destino. Sin eso, la IA podría implementar algo que “funciona” técnicamente pero no coincide con la expectativa del producto.

#### Ajuste 2: Agregar el caso de quitar fecha límite en una tarea sincronizada

**Ajuste:** Agregar un criterio de aceptación o una story específica para cuando el usuario elimina la fecha límite de una tarea que ya tenía evento en Google Calendar.

**Motivo:** El backlog cubre crear, actualizar y agregar fecha límite, pero no cubre quitarla. Ese hueco puede dejar eventos huérfanos en Google Calendar, que es justamente el tipo de desalineación que FlowSync intenta evitar.

#### Ajuste 3: Hacer explícita la relación persistente tarea ↔ evento

**Ajuste:** Incorporar como regla o criterio que FlowSync debe guardar una relación estable entre la tarea y el evento creado en Google Calendar.

**Motivo:** La frase “evento correspondiente” no alcanza. Para actualizar, borrar o evitar duplicados, el sistema necesita saber exactamente qué evento pertenece a cada tarea. Este fue el hallazgo más técnico del poke-holes y me parece clave para que la sincronización sea confiable.

#### Ajuste 4: Reescribir criterios ambiguos de la Story 11

**Ajuste:** Cambiar criterios como “el evento se elimina o se marca según corresponda” por una decisión explícita, o dejarlo como punto de refinamiento antes de implementar.

**Motivo:** Ese criterio no permite saber cuándo la story está terminada. Después de S4, lo trataría como una decisión pendiente de producto, no como un acceptance criteria válido.

## Parte B — Auditoría de documentación del proyecto

### Paso 4 — Formato elegido

Para esta auditoría elegí una tabla en Markdown, porque permite consultar rápido cada tipo de documentación, su estado, la ubicación revisada y una observación concreta.

El objetivo no es dejar impresiones generales, sino un artefacto consultable que muestre qué documentación existe, qué falta y qué existe pero todavía no cumple del todo su función.

#### Nota metodológica

La auditoría se realizó sobre mi fork local del repositorio `full-stack-adonisjs-s5-base-2606-roo`.

Usé Codex como apoyo para inspeccionar la estructura del repositorio, pero la evaluación final fue revisada manualmente. El copiloto sirvió como andamiaje para encontrar archivos y posibles divergencias, no como auditor definitivo.

Durante la auditoría, Codex creó accidentalmente archivos que no formaban parte del estado original del repo (`AGENTS.md` y `.agents/`). Esos archivos fueron eliminados y no se consideran evidencia válida en esta revisión.

### Paso 5 — Auditoría por tipo de documentación

| Tipo de documentación                                | Estado          | Ubicación / evidencia                                                                                                      | Observación                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| README de proyecto                                   | Completa        | `README.md`, `backend/.env.example`, `frontend/.env.example`                                                               | El README permite arrancar el proyecto base en condiciones normales. Incluye requisitos, instalación de dependencias, configuración de `.env`, generación de key, migraciones, backend, frontend y flujo básico de registro/login. No encontré seeders necesarios para el arranque. Le falta troubleshooting si algo falla, pero eso lo considero más parte de guía operacional que del README inicial.  |
| Descripción de arquitectura general                  | Parcial o pobre | `README.md`, `backend/README.md`, `docs/PRD.md`, `docs/README.md`                                                          | Hay stack, mapa del monorepo y una idea general de backend/frontend, pero no hay una documentación de arquitectura que explique cómo se relacionan frontend, backend, base de datos, autenticación, OpenSpec y flujos principales. `docs/README.md` anticipa que ADRs y diagramas se agregarán en sesiones posteriores, pero hoy no están.                                                               |
| Documentación de API / endpoints                     | Parcial o pobre | `README.md`, `backend/start/routes.ts`, `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`            | El README lista algunos endpoints básicos y OpenSpec documenta mejor la parte de autenticación. Sin embargo, no hay OpenAPI/Swagger, ejemplos `curl`, schemas completos de request/response/error ni contrato formal consumible por un integrador. Además, hay una divergencia detectada: OpenSpec menciona `GET /api/v1/users/active`, pero en las rutas reales inspeccionadas no aparece ese endpoint. |
| Docstrings y comentarios significativos en código    | Parcial o pobre | `backend/app/controllers/*`, `backend/app/validators/*`, `backend/app/transformers/user_transformer.ts`                    | Hay algunos comentarios breves en controllers, validators y transformer, pero son orientativos. No vi una documentación inline consistente que explique contratos, invariantes, errores esperados o decisiones no obvias. Varios comentarios parecen más boilerplate o ayuda local que documentación técnica mantenible.                                                                                 |
| Decisiones técnicas registradas                      | Inexistente     | `docs/README.md`, `docs/`                                                                                                  | No encontré ADRs ni documentos equivalentes. El PRD registra alcance, riesgos y stack, pero no decisiones técnicas con contexto, opciones consideradas y consecuencias. `docs/README.md` indica que los ADRs se agregarán en sesiones posteriores.                                                                                                                                                       |
| Guía operacional                                     | Parcial o pobre | `README.md`, `backend/README.md`, `backend/app/controllers/health_controller.ts`                                           | Hay comandos de desarrollo, migraciones, test/typecheck y un endpoint de health. Eso ayuda para desarrollo local, pero no llega a ser una guía operacional: no hay deploy, troubleshooting, runbooks, manejo de incidentes, política de logs ni guía de errores típicos.                                                                                                                                 |
| Convenciones de código del proyecto                  | Parcial o pobre | `CLAUDE.md`, estructura de `backend/` y `frontend/`                                                                        | `CLAUDE.md` aporta bastante contexto para trabajar con IA: stack, comandos, patrones backend, validaciones, transformers y cosas a evitar. Es útil como guía para copilotos/agentes, pero no lo marcaría como documentación completa del equipo porque no cubre todo el proyecto ni reemplaza una guía formal de convenciones.                                                                           |
| Especificación OpenSpec y trazabilidad con el código | Parcial o pobre | `openspec/config.yaml`, `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`, `backend/start/routes.ts` | OpenSpec existe y cubre autenticación y usuarios. La parte de auth parece razonablemente alineada con controllers y validators. La spec de users muestra una divergencia concreta: documenta `GET /api/v1/users/active`, pero ese endpoint no aparece en las rutas inspeccionadas. Además, el PRD habla de tareas y Google Calendar, pero esas capacidades todavía no tienen spec ni código equivalente. |

### Paso 6 — Cierre de la auditoría

#### Top 3 carencias que más duelen

1. **La documentación de API no alcanza para integrarse sin leer código.**  
   Hay endpoints listados y OpenSpec parcial, pero falta contrato formal, ejemplos, schemas de error y consistencia entre spec y rutas reales. La divergencia de `/users/active` muestra que la trazabilidad todavía no está cerrada.

2. **No existe una arquitectura general real del sistema.**  
   Hay stack y estructura de carpetas, pero no una explicación de componentes, relaciones ni flujos principales. Para alguien nuevo, o para un agente IA, todavía falta entender cómo se conectan backend, frontend, SQLite, autenticación, OpenSpec y futuras features de tareas/calendario.

3. **No hay ADRs ni guía operacional suficiente.**  
   Las decisiones técnicas no están registradas como memoria del proyecto y tampoco hay runbooks o troubleshooting. Si algo falla al levantar el proyecto, desplegarlo o entender una decisión, la respuesta todavía depende de leer código o preguntar.

#### Top 3 cosas que ya están bien

1. **El README permite arrancar el proyecto base.**  
   Para un repo de referencia, el arranque local está bastante bien cubierto: requisitos, instalación, `.env`, key, migraciones, backend y frontend.

2. **`CLAUDE.md` aporta buen contexto para trabajar con IA.**  
   Aunque no reemplaza documentación formal, sí ayuda a que un agente entienda stack, comandos, convenciones y restricciones importantes del proyecto.

3. **OpenSpec ya existe y auth está relativamente bien encaminado.**  
   No se parte de cero: hay specs para autenticación y usuarios, y la parte de auth parece más alineada con el código que otras zonas. Eso da una base para mejorar trazabilidad en vez de crearla desde cero.

### Paso 7 — Exploración rápida de formatos

- **C4:** Aporta una forma visual y por niveles de entender el sistema. A primera vista ayuda más que notas sueltas porque muestra contexto, containers y relaciones entre partes sin obligar a leer carpetas o código.
- **ADR:** Aporta memoria de decisión. Sirve para entender por qué se eligió una opción técnica y qué alternativas se descartaron, algo que normalmente se pierde en Slack, PRs o conversaciones.
- **OpenAPI:** Aporta un contrato formal de API. Permite entender endpoints, parámetros, respuestas y errores esperados sin tener que leer directamente las rutas o controllers.

## Nota final

La auditoría confirma que el repositorio tiene una buena base para arrancar y para trabajar con IA, pero la documentación todavía está más orientada a setup y convenciones que a arquitectura, contratos y operación.

La prioridad no debería ser escribir mucha documentación nueva, sino cubrir primero los huecos que más riesgo generan: contrato de API, arquitectura general, trazabilidad OpenSpec-código y decisiones técnicas relevantes.
