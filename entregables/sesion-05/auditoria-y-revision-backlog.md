# Entregable pre-S5 — Revisión de backlog + Auditoría de documentación

> Aviso de transparencia: al explorar el repo abrí sin querer
> `docs/NOTAS-FORMADOR.md`, un archivo marcado como material interno del mentor
> con un spoiler explícito sobre la divergencia spec↔código de este mismo
> ejercicio. Es decir, vi la respuesta del Paso 5 (tipo 8) antes de descubrirla
> por mi cuenta. Lo dejo anotado por honestidad en vez de fingir que la
> encontré auditando línea a línea — de todos modos verifiqué la divergencia
> contra el código real (controllers + rutas), no me quedé con lo que decía la
> nota del mentor.

**Índice** — [Parte A: backlog](#parte-a--revisión-del-backlog-de-historias-de-usuario-s4) ·
[Ajustes](#6-ajustes-concretos) ·
[Parte B: auditoría](#parte-b--auditoría-de-documentación) ·
[Top 3 carencias](#top-3-carencias-que-más-duelen) ·
[Top 3 fortalezas](#top-3-cosas-que-ya-están-bien) ·
[Paso 7](#paso-7--exploración-rápida-de-tres-formatos)

---

## Parte A — Revisión del backlog de historias de usuario (S4)

Fuente: [`prompt.md`](../sesion-04/prompt.md), [`output.md`](../sesion-04/output.md)
(18 historias, `HUSR-001`–`HUSR-018`), [`poke-holes.md`](../sesion-04/poke-holes.md)
y [`reflexion.md`](../sesion-04/reflexion.md) del ejercicio pre-S4 — los copié a
`entregables/sesion-04/` de este repo para que el PR sea autocontenido y se
pueda verificar cada cita sin salir de él (son el "output crudo" de S4, no los
reformateo).

### 1. ¿Siguen teniendo sentido? ¿El alcance sigue ceñido al MVP?

Sí, en general. Ninguna historia viola los non-goals del PRD (sin equipos, sin
Outlook/iCal, sin notificaciones, sin app nativa, sin etiquetas/subtareas, sin
recordatorios propios). La disciplina de marcar `(asumido)` se sostuvo en las 18
historias sin excepción.

Con la perspectiva de hoy, el único punto donde el backlog se queda corto de
alcance —no se pasa, se queda corto— es que **nunca convierte en historia de
usuario los huecos que el propio `poke-holes.md` encontró**. Los hallazgos #2
(revocación de permisos) y #5 (backfill/duplicados al reconectar) quedan
señalados como "vacío de información" dentro de las Notas de `HUSR-014` y
`HUSR-018`, pero ninguna historia nueva los convierte en trabajo planificable
con su propio AC. Cuando un vacío de información se señala pero nunca se
convierte en una tarea concreta, el equipo termina olvidándolo.

### 2. Criterios de aceptación incompletos o poco verificables

- **`HUSR-011`, Escenario 3** ("las más relevantes para hoy aparecen primero"):
  sigue sin regla de ordenación definida. Es un AC no verificable tal como está
  — pasaría dos implementaciones distintas del mismo criterio. En S4 esto se
  dejó como "vacío de información" del PRD; con lo visto en S5 sobre specs
  verificables (`SHALL` + escenarios concretos en OpenSpec), hoy lo trataría
  como bloqueante antes de estimar en firme, no solo como nota.
- **`HUSR-017`, Escenario 1** ("se elimina o se marca según corresponda"): el
  propio autor ya lo señaló como ambiguo en `poke-holes.md` (hallazgo #6) y
  nunca se resolvió. Sigue sin ser testeable.
- **`HUSR-016`, Escenario 3**: depende de que `HUSR-018` (cola de reintentos)
  esté *implementada*, no solo documentada, para poder considerarse completa.
  Es una dependencia dura no reflejada en el campo "Relaciones/Dependencias"
  con la fuerza que merece (ahí solo dice "depende de" sin marcar que es
  bloqueante de sprint).

### 3. Historias que cambiaron de naturaleza

Ninguna cambió de naturaleza en el sentido de "descubrimos que el dominio era
distinto" — el PRD no ha cambiado. Lo que sí cambió es la lectura de **qué tan
resuelto** está cada vacío: una segunda auditoría interna (mencionada en el
propio `output.md`) ya acotó los hallazgos #2 y #6 a un alcance más preciso.
Es la prueba de que "vacío de información" no es un estado final, sino algo
que hay que revisitar.

### 4. Historias nuevas que faltan

- **Visibilidad del estado de conexión de Google** para el usuario (ver
  Ajuste 1 abajo) — hoy no existe ninguna historia que la cubra, y el propio
  backlog reconoce el hueco sin agendarlo.
- **Reconciliación al reconectar** (backfill, evitar duplicados) — mencionado
  como hallazgo #5, sin historia propia.

### 5. Contraste con el backlog del mentor en Linear (S4, directo)

Verificado contra la transcripción real del directo (Iván Hernández), no es
inferencia. Datos concretos:

| | Mi IA (S4) | IA del mentor (directo) | Backlog final del mentor (Linear) |
|---|---|---|---|
| Historias | 18, en 5 módulos | 20, en 5 épicas | **~10 historias + 1 spike** |
| Esfuerzo | 23.5 días (todo "MVP") | — | ≤20 pts sprint 1 (28 pts totales, buffer 30%) |
| Auth incluido | Registro, Login, Logout, Onboarding (4) | — | **Solo Registro (1.1) y Login (1.2)** |
| Google Calendar | 6 historias (`HUSR-013`–`018`), todas Alta | historias detalladas | **1 spike de 16h**, cero historias |

**El punto de partida fue casi idéntico** — la IA del mentor también generó
~20 historias en 5 épicas, prácticamente el mismo número que mis 18. Esto me
confirma algo importante: **no fue un error mío generar de más** — es lo que
hace cualquier IA cuando un humano no recorta el resultado con criterio
después. La diferencia real está en lo que pasó *después* de generar.

**Lo que el mentor cortó y yo no:**

- **Logout (1.3) y Onboarding (1.4) — eliminados por "secundarios en un
  MVP"**, junto con la sugerencia de recortar también "Borrar tarea" y
  "Cambiar estado" en la primera fase. Mi backlog, en cambio, trata
  `HUSR-003` (logout) y `HUSR-004` (onboarding) como parte plena de `MOD-001`
  con prioridad Media — nunca me cuestioné si eran necesarias para un primer
  sprint, solo si estaban bien escritas.
- **Sincronización con Google Calendar → reemplazada por completo por un
  Spike (11) de 16h**, no por historias, con el argumento explícito de que
  "no se pueden crear historias accionables si hay desconocimiento técnico".
  Yo sí llegué a la misma sospecha (el propio PRD §7 recomienda spike,
  y mi `poke-holes.md` lo repite en la conclusión), pero **no la ejecuté**:
  dividí igual en 6 historias estimables (`HUSR-013`–`018`) en vez de
  sustituirlas por un spike. Diagnosticar el riesgo y no actuar sobre él es mi
  gap real aquí.
- **Estimaciones recalibradas, no solo aceptadas**: el equipo bajó Registro de
  5→3 puntos (la IA sobreestimó), pero *subió* el spike de Calendar de 8h→16h
  (la IA subestimó el riesgo incluso al proponer un spike). Yo no tuve
  este contraste porque nunca sometí mis estimaciones a una segunda revisión
  humana — quedaron tal como las generó la IA.

**Lo que el mentor añadió y ninguna de las dos IAs propuso:** una historia
"sorpresa" de **test End-to-End del flujo completo** (`Flow X`, 5 puntos), no
derivada del PRD sino añadida por criterio propio para asegurar calidad. Ni
mi `output.md` ni la IA del mentor la generaron espontáneamente — es
evidencia de que la IA genera *features*, no *verificación de que las
features funcionan juntas*; ese criterio lo pone el humano.

**Quién acertó y por qué:** acerté en rigor de historia individual (INVEST,
AC en Gherkin, trazabilidad, `(asumido)` explícito) — tengo mejor documentada
cada historia que lo que se ve en la transcripción del directo. El mentor
acertó en algo que yo nunca me planteé: **el backlog no termina cuando las
historias están bien escritas, termina cuando caben en un sprint con
presupuesto de puntos y buffer**. Escribir 18 historias impecables y no cortar
ninguna para el primer sprint es optimizar la parte fácil (calidad de la
historia) y saltarme la difícil (qué NO entra todavía).

### 6. Ajustes concretos

```text
Ajuste: Agregar una historia de usuario (HUSR-019) para que el usuario vea el
estado de conexión de su cuenta de Google (conectada / desconectada / con
error de autorización).
Motivo: los propios hallazgos de poke-holes (#2 y #5) señalan que ninguna
historia decide qué ve el usuario cuando el token se revoca en background;
sin esa visibilidad, el usuario cree que sigue sincronizando cuando ya no es
así — es valor de usuario, no solo un detalle técnico, y hoy solo aparece
mencionado en una nota de HUSR-014.

Ajuste: Resolver o bloquear explícitamente el criterio de ordenación de
HUSR-011 antes de estimarla en firme, en vez de dejarlo como nota abierta.
Motivo: con lo visto en S5 sobre specs verificables (SHALL + escenarios
concretos), un AC como "aparecen primero" sin regla definida no es Testable
según INVEST; dejarlo abierto indefinidamente es acumular deuda de
especificación, no gestionarla.

Ajuste: Reemplazar las 6 historias de Google Calendar (HUSR-013-018) por un
solo spike técnico de investigación (~2 días), y recortar el sprint 1 a
Registro + Login + CRUD básico (crear/ver/editar tarea) — sacando Logout,
Onboarding, exportación CSV y el resto de MOD-005 a una segunda vuelta del
mismo MVP, con un presupuesto de puntos (no de días) y buffer para imprevistos.
Motivo: es exactamente lo que hizo el mentor en el directo de S4 con el mismo
punto de partida (su IA también generó ~20 historias) — cortó a ~10 historias
+ 1 spike de 16h, con un tope de 20 puntos de sprint sobre 28 estimados
(30% de buffer). Yo diagnostiqué el mismo riesgo en poke-holes (zona
horaria, reconexión) pero lo dejé como nota dentro de 6 historias "Alta" en
vez de convertirlo en spike; y nunca cuestioné si Logout/Onboarding eran
necesarios para un primer sprint, solo si estaban bien escritos.

Ajuste: Agregar una historia/ticket de test End-to-End del flujo crítico
(registro → login → crear tarea → ver listado), al estilo del "Flow X" que el
mentor añadió por iniciativa propia en el directo.
Motivo: ni mi IA ni la IA del mentor generaron esta historia por su
cuenta — ninguna de las dos pensó en verificar que las features funcionan
juntas, solo en las features individuales. Es la evidencia más concreta de
que hay un tipo de trabajo (calidad/verificación end-to-end) que un prompt de
descomposición de PRD no va a producir solo, sin que un humano lo pida.
```

---

## Parte B — Auditoría de documentación

**Repositorio auditado:** copia local de `full-stack-adonisjs-s5-base`
(`D:\LIDR\Modulo5\full-stack-adonisjs-s5-base-2606-roo`).

> **Hilo conductor de esta auditoría (lo que encontré al verificar, no al leer):**
> el problema más repetido de este repo no es que *falte* documentación — es que
> la que existe **afirma cosas que el código no respalda**. El mismo patrón, en
> tres documentos distintos: la spec de `users` promete `GET /users/active` que
> no existe (fila 8); `CLAUDE.md` dice enlazar un `AGENTS.md` que no está en el
> repo (fila 7); y la tabla de endpoints del README se mantiene a mano, sin nada
> que avise cuando se desincronice (fila 1). Los tres se *leen* como verdad y no
> lo son. Por eso mi Top 3 y mis recomendaciones apuntan menos a "escribir más
> documentación" y más a "que algo valide que la documentación no miente". Cada
> uno de estos lo confirmé contra el código, no me quedé con lo que el documento
> decía de sí mismo — que es justo el error en el que el propio repo cae.

### Marco de referencia aplicado: 4 capas + docs-as-code

Mapeo los 8 tipos que audité a las 4 capas de documentación de S5, y marco
cuáles viven como *docs-as-code* — en el repo, versionadas y con algo que las
valide — y cuáles no. La columna de la derecha es la que importa: es donde se
ve que "estar versionado" no es lo mismo que "estar validado".

| Capa | Tipos de esta auditoría | Estado agregado | ¿Vive como docs-as-code? |
|---|---|---|---|
| **Arquitectura** (ADRs, C4) | #2 Arquitectura, #5 ADRs | Inexistente | No aplica — no hay nada que versionar todavía. |
| **API** (OpenAPI, contratos) | #3 API/endpoints, #8 OpenSpec | Parcial, con divergencia confirmada | **A medias, y ahí está el problema**: las specs SÍ están versionadas en `openspec/`, pero nadie las valida contra las rutas reales — no hay ninguna prueba automática en CI que hubiera detectado `/users/active`. Parecen documentación actualizada, pero como nadie las revisa contra el código, pueden decir algo que ya no es cierto sin que nadie se entere. |
| **Código** (TSDoc, README) | #1 README, #4 Docstrings | Completa / Parcial | Sí vive en el repo y se actualiza con el código, pero sin ninguna regla (lint, CI) que fuerce TSDoc real más allá de la convención informal de un comentario por método. |
| **Operacional** (Runbooks) | #6 Guía operacional | Inexistente | No aplica — no hay infraestructura de producción documentada todavía. |

**Por qué la fila 8 pesa más en 2026 que hace unos años:** hoy más de la mitad
del tráfico de documentación técnica ya es de agentes de IA, no de humanos
(dato de Mintlify). Un humano que lee `users/spec.md` y ve `/users/active`
quizá sospecha y revisa el código; un agente que la toma como contexto para
"seguir el patrón existente" construye contra ese endpoint dándolo por real,
sin dudar. La spec no miente menos por estar versionada — miente con más
alcance, porque ahora la lee un consumidor que no cuestiona.

| # | Tipo de documentación | Estado | Observación |
|---|---|---|---|
| 1 | README de proyecto | **Completa en la lectura, con 3 bugs reales al ejecutarla** | [`README.md`](../../README.md) se ve completo (requisitos, pasos de backend/frontend, tabla de endpoints), pero al **ejecutar** el arranque desde cero paso a paso aparecieron 3 problemas que la lectura sola no detecta: **(a)** en un clon recién hecho, `npm run dev` falla de entrada con `ERR_MODULE_NOT_FOUND: @poppinss/ts-exec` — `@adonisjs/assembler@8.4.0` necesita ese paquete mientras corre, pero no lo declara como su propia dependencia (yo lo instalé a mano como devDependency de este proyecto para resolverlo). **(b)** `npm run migration:run` falla con `Cannot open database because the directory does not exist` si `backend/tmp/` no existe — el README no menciona crear ese directorio. **(c)** El README no menciona cómo correr los tests, y si lo intentaras, tampoco funcionaría: `npm run test` no ejecuta ni un solo test, nunca — `adonisrc.ts` trae por defecto un patrón de búsqueda de archivos con una sintaxis de alternancia (para aceptar tanto `.ts` como `.js`) que la versión instalada de `@japa/runner` ya no soporta, porque cambió el motor de búsqueda que usa por dentro. No da ningún error, solo dice "sin tests que correr", así que es fácil no darse cuenta nunca. Corregido en [`docs/adr/0002-fix-glob-tests-japa.md`](../../docs/adr/0002-fix-glob-tests-japa.md). Ninguno de los 3 es visible leyendo el documento; solo ejecutando los pasos tal cual los describe. **El frontend sí arranca limpio**: `npm install` + `npm run dev` levanta Vite en `5173` y sirve el `index.html` con el mount de React (verificado con `curl`, `200 text/html`); typecheck limpio. Un riesgo más a futuro: la tabla de endpoints del README está escrita a mano, no generada desde `start/routes.ts` — hoy coincide con el código, pero nada avisa si mañana cambia una ruta y nadie actualiza la tabla (mismo problema de fondo que la fila 8, aplicado a otro documento). |
| 2 | Descripción de arquitectura general | **Parcial al momento de la auditoría → mejorada después** | No existía documento ni diagrama cuando hice esta auditoría (`docs/README.md` decía "se añaden en sesiones posteriores"). Añadí dos diagramas **Mermaid** a [`README.md`](../../README.md#arquitectura) (contexto C4 + secuencia real de login, verificados contra `access_tokens_controller.ts` y `user.ts`) como ejemplo de que cerrar esta carencia cuesta poco. Sigue faltando: diagrama de componentes/contenedores si el proyecto crece, y una explicación en prosa de por qué está organizado así (los diagramas muestran el "qué", no el "por qué" — eso vive mejor en un ADR). |
| 3 | Documentación de la API / endpoints | **Parcial al momento de la auditoría → OpenAPI real añadido y verificado en vivo** | Existían dos capas: la tabla del README y las specs de OpenSpec (completas pero escritas a mano — ver fila 8). Instalé y verifiqué **`adonis-autoswagger` + Scalar** (v3.73.0) — AdonisJS 7 no tiene paquete oficial de OpenAPI; existe una alternativa más moderna basada en decoradores (`@foadonis/openapi`) pero con comunidad todavía pequeña, así que me quedé con la opción más madura. `GET /openapi` genera la spec OpenAPI 3.0 real desde las rutas de `start/routes.ts` (confirmado con `curl` contra el servidor levantado) y `GET /docs` sirve la UI de Scalar (`200 text/html`, confirmado). Ventaja verificada: al generarse desde las rutas reales, **no puede tener endpoints fantasma como el de la fila 8** — `/api/v1/users/active` no aparece porque no existe como ruta, a diferencia de la spec de OpenSpec que sí la promete. **Pero no es infalible**: en la primera generación, `POST /account/login` salía como **`201 Created`** cuando el controller devuelve **`200`** (`response.ok`); autoswagger infiere el status por convención (POST → 201) y se equivocaba. Es decir, el spec generado elimina la divergencia de *existencia* (endpoints que no existen) pero puede introducir inexactitudes de *detalle* (status, shapes). **Corregido**: se añadieron bloques de anotación de autoswagger (`@<método>` + `@summary` + `@responseBody <status>`) a los 7 endpoints — separados del bloque TSDoc humano para no perder los tooltips del IDE (autoswagger exige que su bloque **empiece** con `@store`/`@index`/etc., si no lo ignora; ese fue el detalle que costó encontrar). Verificado en vivo: el spec ahora dice login→200, register→201, users/:id→404, y una prueba rápida real (`curl` de registro + login + credenciales inválidas) confirmó que el comportamiento **coincide** con lo documentado (201/200/400). |
| 4 | Docstrings / comentarios (TSDoc/JSDoc) | **Parcial al momento de la auditoría → mejorado y medido después** | Originalmente todos los controllers tenían solo un comentario corto (ruta + una línea), sin `@throws` ni `@remarks`, y el modelo (`app/models/user.ts`) no tenía ningún comentario. Subí a TSDoc real los 4 controllers de auth/users (`@throws` con los mismos códigos de error ya verificados en `openspec/specs/`, `@remarks` con las reglas de negocio no obvias) y añadí un docstring de clase a `User`. **Instalé TypeDoc y generé el sitio real** (`backend/docs/api-reference/`, gitignorado — se regenera con `npx typedoc`); corriendo `--validation.notDocumented` obtuve cobertura real, no supuesta: **`user_transformer.ts` y `validators/auth.ts` no tienen ni un solo `@param`/`@returns`** — exactamente las dos capas que dejé fuera al enfocarme en los controllers. Sigue faltando: `health_controller.ts` (trivial), esos dos archivos, y todo el frontend (`authService.ts`, componentes) — **cero** comentarios ahí, se apoya solo en naming. |
| 5 | Decisiones técnicas registradas (ADRs) | **Inexistente al momento de la auditoría → 1 ejemplo añadido después** | No había carpeta `adr/` ni archivos equivalentes cuando hice esta auditoría. Añadí [`docs/adr/0001-sqlite-vs-postgres.md`](../../docs/adr/0001-sqlite-vs-postgres.md) en formato MADR como demostración de cómo cerrar esta carencia, no como remediación completa — sigue faltando registrar el resto de decisiones relevantes (guard `api` de tokens vs sesiones, SQLite→Postgres si el proyecto escala, etc.). |
| 6 | Guía operacional (deploy, runbooks, troubleshooting) | **Inexistente** | No hay instrucciones de despliegue más allá de "arranque en local" del README, ni runbooks para incidencias típicas (ej. qué hacer si la sync con Google falla en producción), ni un documento de troubleshooting. Todo lo que existe está pensado para desarrollo local. |
| 7 | Convenciones de código del proyecto | **Completa, con una imprecisión real** | [`CLAUDE.md`](../../CLAUDE.md) es concreto y accionable: dónde va la lógica de negocio, cómo se valida entrada, cómo se serializa salida, convención de imports con subpaths, y una sección explícita de "No hacer". Es el mejor documento del repo — pero su propio encabezado dice *"En la Sesión 3 formalizamos esta memoria como `AGENTS.md` y la enlazamos con `ln -s AGENTS.md CLAUDE.md`"*, y **ese `AGENTS.md` no existe en ningún lado del repo** (lo comprobé buscándolo, no solo leyendo la frase). Es el mismo patrón que la fila 8, en miniatura: un documento afirma algo que la realidad no respalda — solo que esta vez está dentro del documento que mejor calificamos. También le falta una sección de convenciones de frontend (solo cubre backend). |
| 8 | Especificación OpenSpec y su trazabilidad con el código | **Parcial o pobre** | **Divergencia confirmada spec↔código**: [`openspec/specs/users/spec.md`](../../openspec/specs/users/spec.md) documenta el requirement "Listado de usuarios activos" — `GET /api/v1/users/active`, con 3 escenarios completos — pero [`backend/app/controllers/users_controller.ts`](../../backend/app/controllers/users_controller.ts) solo implementa `index` y `show`, y [`backend/start/routes.ts`](../../backend/start/routes.ts) no registra ninguna ruta `/users/active`. El propio controller tiene un comentario heredado ("se implementa EN VIVO durante la Sesión 3") que explica por qué falta, pero la spec no lo señala como pendiente — se lee como si ya estuviera implementado. El resto de `authentication/spec.md` sí está al día con el código (verificado línea a línea contra los 3 controllers de auth: `new_accounts`, `access_tokens` y `profiles`). Más allá de esa divergencia puntual, la cobertura de fondo es baja: el PRD tiene 5 áreas funcionales (§3.1 a §3.5 — auth, tareas, organización, exportación, sincronización con Calendar) y solo `openspec/specs/` cubre auth. Las otras 4 (80% del PRD) no tienen ninguna spec, ni actualizada ni desactualizada — directamente no existen, porque ese código tampoco está implementado todavía. |

### Tipo adicional detectado

| Tipo de documentación | Estado | Observación |
|---|---|---|
| Documentación de frontend (componentes React) | **Inexistente** | Ningún componente (`LoginForm.tsx`, `SignupForm.tsx`, `ProtectedRoute.tsx`, páginas) tiene comentarios o JSDoc. No es grave para un starter de este tamaño, pero es el tipo de documentación con menos cobertura de todo el repo. |

### Top 3 carencias que más duelen

1. **Divergencia spec↔código en `/users/active`, y casi nada más tiene spec** — la divergencia rompe confianza: una spec que promete algo que no existe es peor que no tener spec, porque alguien puede tomar decisiones basado en ella. El arreglo más barato ni siquiera es implementar el endpoint: basta con editar la spec para marcarlo como pendiente. Pero el problema de fondo es más grande que este caso puntual: de las 5 áreas del PRD, solo auth tiene spec — el 80% restante (tareas, organización, exportación, sincronización con Calendar) no tiene ninguna, así que cuando se empiece a implementar, no va a haber ninguna spec que sirva de referencia ni contra la cual validar lo que se construye.
2. **Descripción de arquitectura casi inexistente** — al auditar no había ningún documento ni diagrama que explicara cómo se relacionan backend/frontend/OpenSpec; cualquier persona nueva tiene que inferirlo leyendo código. Agregué 2 diagramas Mermaid en el README, pero sigue faltando el "por qué" (contenedores, decisiones) — con un equipo o agentes de IA en paralelo, esto escala mal.
3. **Casi cero ADRs** — decisiones como SQLite vs Postgres, o el guard `api` de tokens vs sesiones, no tenían su "por qué" registrado en ningún lado consultable. Creé `0001-sqlite-vs-postgres.md` como primer ejemplo, pero el resto de decisiones sigue sin registrar; si se revisitan en 6 meses, se reinventa la discusión desde cero.

### Top 3 cosas que ya están bien

1. **`CLAUDE.md`** — conciso, accionable, con reglas positivas y negativas claras; es el estándar a imitar para lo demás. Un arreglo de 1 línea sí hace falta: borrar la frase del encabezado sobre el symlink a `AGENTS.md` (ver fila 7) — el resto no hay que tocarlo.
2. **El código hace lo que `CLAUDE.md` promete** — leí los 5 controllers para comprobarlo, no lo di por hecho. Las 4 reglas que `CLAUDE.md` declara se cumplen en el código real: la lógica vive en los controllers (no en las rutas), toda entrada se valida con VineJS, toda salida pasa por `UserTransformer` (nunca se devuelve el modelo tal cual), y los imports usan subpaths en vez de rutas relativas. Esto importa porque es justo lo contrario del problema de la fila 8: ahí la documentación dice algo que el código no hace; aquí `CLAUDE.md` describe exactamente lo que el código hace. No hay que tocar nada de esto en el directo.
3. **Specs de `authentication`** — están completas, verificadas contra el código real (los 3 controllers de auth: `new_accounts`, `access_tokens`, `profiles`), con escenarios de error incluidos (`422`, `401`, `400`). Es el ejemplo a seguir cuando se corrija la spec de `users`.

---

## Paso 7 — Exploración rápida de tres formatos

- **C4 model** — *Qué aporta:* muestra la arquitectura en varios niveles, desde una vista general (quién usa el sistema) hasta el detalle de cada parte, sin mezclarlos en un mismo texto. *En este repo:* hoy la arquitectura documentada es solo un árbol de carpetas de una línea (fila 2); los 2 diagramas Mermaid que agregué dan el dibujo, pero no esos niveles. → **Veredicto: todavía no.** Con solo 3 piezas (React, AdonisJS, SQLite) los Mermaid alcanzan; C4 tendría sentido cuando el proyecto crezca a más servicios.
- **ADR** (`joelparkerhenderson/architecture-decision-record`) — *Qué aporta:* guarda por qué se tomó una decisión y qué opciones se descartaron, no solo el resultado — que es lo que una nota suelta nunca conserva. *En este repo:* la elección de SQLite en vez de Postgres (carencia #3) está en el código pero sin explicación en ningún lado. → **Veredicto: sí, ya.** Es la carencia más barata de cerrar y ya empecé (`docs/adr/0001`).
- **OpenAPI** — *Qué aporta:* describe la API en un formato que las herramientas pueden leer y comparar contra el código automáticamente, no solo una persona. *En este repo:* lo probé — al generarlo desde las rutas reales, no puede documentar un endpoint que no existe. → **Veredicto: sí, ya lo apliqué.** Es justo lo que habría evitado la divergencia de `/users/active` (fila 8).
