# Sesión 05 — Auditoría de documentación existente

## Autor

Pedro Fernández

## Repositorio auditado

`full-stack-adonisjs-s5-base-2606-roo`

## Rama de trabajo

`alumno/pedro-fernandez-s5`

## Objetivo del ejercicio

Este documento recoge dos partes:

1. Revisión del backlog generado en el ejercicio previo de S4.
2. Auditoría de documentación existente sobre el repositorio base de S5.

La intención no es reescribir la documentación del proyecto, sino identificar el estado real: qué existe, qué falta, qué está desactualizado y qué debería priorizarse en la sesión.

---

# Parte A — Revisión del backlog S4

## Evidencia revisada

Para esta parte he revisado mi entregable anterior de S4:

```txt
~/ai4devs/openspec-sandbox/entregables/sesion-04/
├── prompt.md
├── output.md
├── poke-holes.md
└── reflexion.md
```

Especialmente:

- el backlog inicial generado para FlowSync;
- el análisis poke-holes de la story de Google Calendar;
- la reflexión final sobre los límites del output generado por IA.

---

## Evaluación general del backlog generado

El backlog generado en S4 sigue teniendo sentido como primera descomposición del MVP de FlowSync.

Las historias visibles están alineadas con el PRD:

- registro;
- inicio de sesión;
- cierre de sesión;
- onboarding mínimo;
- creación de tareas;
- listado de tareas;
- edición y borrado;
- cambio de estado;
- filtrado por estado;
- sincronización con Google Calendar.

En general, el alcance no parece haberse salido gravemente del MVP. El output respetó varios non-goals importantes:

- no añadió verificación de email;
- no añadió recuperación de contraseña;
- no añadió Outlook/iCal;
- no añadió subtareas, etiquetas ni proyectos;
- no convirtió la sincronización inversa completa en compromiso cerrado.

Eso es positivo.

El problema principal no fue el scope grueso, sino la falsa sensación de completitud. Algunas stories parecían AI-ready por estar bien formateadas, pero escondían decisiones no tomadas.

---

## Qué sigue teniendo sentido

### 1. Separar autenticación, tareas, organización, exportación y sincronización

La agrupación por módulos era razonable porque sigue la estructura del PRD.

La separación ayuda a no mezclar funcionalidades de riesgo muy distinto:

- auth es relativamente estándar;
- CRUD de tareas es core del producto;
- filtros y exportación son funcionalidad de soporte;
- Google Calendar es el riesgo técnico principal.

### 2. Usar Given/When/Then

Los criterios de aceptación en formato escenario ayudan a convertir el PRD en trabajo ejecutable.

Esto sigue siendo válido porque hace que la IA y el developer tengan condiciones concretas que revisar.

### 3. Marcar supuestos

El backlog ya marcaba algunos supuestos, por ejemplo:

- longitud del título no definida en PRD;
- comportamiento exacto de tareas archivadas pendiente de refinamiento;
- error para tarea inexistente pendiente de decisión técnica.

Eso es correcto.

Un backlog AI-ready debe separar lo confirmado de lo asumido.

---

## Qué ahora veo incompleto o débil

### 1. Algunas historias mezclan más de una responsabilidad

Ejemplo claro:

```txt
Story 1.3 — Cierre de sesión y onboarding mínimo
```

Cierre de sesión y onboarding pertenecen a gestión de cuenta, pero no son la misma funcionalidad.

Tienen distinta UI, distinta lógica y distintos criterios de validación.

Mejor dividirlas:

```txt
Story A — Cierre de sesión
Story B — Onboarding mínimo tras registro
```

Esto reduce ambigüedad y facilita implementación incremental.

---

### 2. Algunos criterios no son suficientemente verificables

Ejemplos:

```txt
muestra un error comprensible
```

o:

```txt
el listado carga en menos de 1 segundo
```

Son buenos como intención, pero insuficientes como acceptance criteria cerrados.

Para hacerlos verificables faltaría definir:

- dónde se muestra el error;
- qué mensaje mínimo debe aparecer;
- si se valida en backend, frontend o ambos;
- entorno de medición del rendimiento;
- volumen de datos;
- métrica concreta;
- límite aceptable.

Mejor:

```txt
Then muestra el mensaje "La contraseña debe tener al menos 8 caracteres"
```

o:

```txt
Then el endpoint GET /tasks responde en menos de 1 segundo con 200 tareas en entorno local seedado
```

---

### 3. Google Calendar necesita un spike previo

El PRD ya marca Google Calendar como el mayor riesgo técnico del MVP.

Mi backlog trató la sincronización como stories funcionales, pero ahora veo que antes de comprometer implementación habría que añadir un spike técnico.

Ese spike debería aclarar:

- OAuth con Google;
- scopes mínimos;
- refresh tokens;
- almacenamiento seguro;
- mapping tarea-evento;
- eventos de todo el día vs eventos con hora;
- zonas horarias;
- idempotencia;
- reintentos;
- token expirado/revocado;
- límites de la sincronización inversa.

Sin ese spike, las stories de sincronización parecen ejecutables pero en realidad obligan al agente o al developer a inventar decisiones.

---

### 4. La sincronización con Google Calendar necesita contratos explícitos

El poke-holes detectó los gaps más importantes:

- no está definido cómo convertir una fecha límite en evento;
- no está definido el mapping de campos tarea-evento;
- falta criterio de idempotencia;
- falta separar token inválido de error temporal;
- falta feedback claro cuando FlowSync guarda la tarea pero Google falla.

Esto cambia la naturaleza de las stories de Google Calendar.

No son solo stories de integración.

Son stories de contrato entre dominio interno y sistema externo.

---

## Historias que cambiarían de naturaleza

### Sincronización tarea → evento

Antes parecía una historia funcional directa:

```txt
Como usuario, quiero que mis tareas con fecha límite aparezcan en Google Calendar.
```

Ahora la trataría como varias piezas:

1. Definir mapping tarea-evento.
2. Guardar metadata de evento externo.
3. Crear evento idempotente.
4. Actualizar evento al cambiar fecha.
5. Gestionar errores temporales.
6. Gestionar token inválido.
7. Mostrar estado de sincronización al usuario.

Así se reduce el riesgo de una story demasiado grande.

---

### Exportación CSV

La exportación parece simple, pero debería especificar mejor:

- columnas exactas;
- orden de columnas;
- encoding;
- formato de fechas;
- si incluye archivadas;
- si respeta filtros;
- nombre del archivo;
- manejo de caracteres especiales.

No es la parte más riesgosa del MVP, pero sus AC podrían ser más verificables.

---

### Listado de tareas

El PRD dice que el listado debe ordenarse por relevancia para “hoy”, pero deja el criterio exacto para refinamiento.

Eso no debería quedar escondido dentro de una story genérica.

Haría falta un ajuste:

```txt
Ajustar criterio de ordenación antes de implementar listado final.
```

Si no, cada agente podría inventar un orden distinto.

---

## Historias nuevas que añadiría hoy

### 1. Spike técnico de Google Calendar

Como equipo técnico, queremos validar OAuth, creación de eventos, actualización, eliminación, reintentos y zonas horarias con Google Calendar, para reducir el riesgo antes de comprometer las stories funcionales.

Motivo:

El PRD marca Google Calendar como riesgo principal y la sincronización inversa como alcance condicionado.

---

### 2. Definición del contrato tarea-evento

Como equipo, queremos documentar cómo se transforma una tarea de FlowSync en un evento de Google Calendar, para evitar decisiones implícitas e inconsistentes.

Debe definir:

- título;
- descripción;
- fecha;
- duración;
- zona horaria;
- metadata;
- relación taskId-eventId;
- comportamiento con tareas completadas o archivadas.

---

### 3. Estado de sincronización visible para el usuario

Como usuario, quiero saber si una tarea se ha sincronizado correctamente, está pendiente o ha fallado, para no asumir que ya aparece en Google Calendar cuando solo existe en FlowSync.

Esto viene directamente del poke-holes.

---

### 4. Manejo diferenciado de errores de Google

Como sistema, quiero distinguir errores temporales de Google de errores permanentes o de autorización, para reintentar solo cuando tenga sentido.

Casos:

- API temporalmente no disponible;
- rate limit;
- token expirado;
- token revocado;
- permisos insuficientes;
- configuración OAuth incorrecta.

---

## Contraste con el backlog del directo de S4

No tengo en este documento el backlog exacto construido por el mentor en Linear durante el directo, así que no puedo afirmar una comparación story por story.

Lo que sí puedo concluir con lo revisado es:

- Mi backlog inicial priorizó una cobertura amplia del PRD.
- La revisión posterior muestra que algunas stories necesitaban más refinamiento antes de considerarse listas para ejecución por IA.
- El foco debería moverse antes hacia riesgo técnico, especialmente Google Calendar, idempotencia y contratos.
- Si el backlog del mentor priorizó primero historias base, trazabilidad, spikes o reducción de riesgo, esa priorización es más defendible que intentar implementar toda la sincronización demasiado pronto.

Lectura final:

```txt
Mi backlog era útil como inventario inicial.
No era todavía un backlog suficientemente refinado para ejecución agentic completa.
```

---

## Ajustes concretos que haría hoy

### Ajuste 1

**Ajuste:** Dividir la story de cierre de sesión y onboarding mínimo en dos stories separadas.

**Motivo:** Mezclan responsabilidades distintas. Logout es control de sesión; onboarding es UX inicial. Separarlas mejora testabilidad y evita que una story pequeña oculte dos flujos.

---

### Ajuste 2

**Ajuste:** Añadir un spike técnico de Google Calendar antes de las stories de sincronización.

**Motivo:** El PRD identifica Google Calendar como principal riesgo técnico. Además, el poke-holes detectó gaps de zonas horarias, tokens, reintentos e idempotencia. Sin spike, el agente tendría que inventar decisiones.

---

### Ajuste 3

**Ajuste:** Añadir una story o ADR específico para el mapping tarea-evento.

**Motivo:** No basta con decir “la tarea aparece en Google Calendar”. Hay que definir cómo se traduce una fecha límite en evento, qué campos se copian y cómo se evita crear duplicados.

---

### Ajuste 4

**Ajuste:** Endurecer los acceptance criteria ambiguos sustituyendo frases como “error comprensible” o “según filtro aplicado” por resultados observables.

**Motivo:** Después de S4 y S5, queda claro que una story AI-ready necesita criterios verificables. Si no, la IA genera una solución plausible pero difícil de revisar objetivamente.

---

# Parte B — Auditoría de documentación del proyecto

## Evidencia revisada

He inspeccionado el repositorio base y revisado:

```txt
README.md
backend/README.md
docs/README.md
docs/PRD.md
CLAUDE.md
openspec/config.yaml
openspec/specs/authentication/spec.md
openspec/specs/users/spec.md
backend/start/routes.ts
backend/app/controllers/*
backend/app/models/user.ts
backend/package.json
frontend/package.json
backend/.env.example
frontend/.env.example
```

También se ejecutaron búsquedas para localizar:

- ADRs;
- OpenAPI/Swagger;
- runbooks;
- documentación operacional;
- bloques TSDoc/JSDoc;
- rutas reales del backend.

---

## Auditoría por tipo de documentación

| Tipo de documentación | Estado | Ubicación | Observación |
|---|---|---|---|
| README de proyecto | Completa | `README.md` | Permite arrancar backend y frontend desde cero en el happy path: indica Node 24, npm, instalación, `.env`, `APP_KEY`, migraciones y servidores. Como mejora, faltaría troubleshooting básico para errores comunes. |
| Descripción de arquitectura general | Parcial o pobre | `README.md`, `backend/README.md`, `CLAUDE.md`, `docs/README.md` | Hay estructura de carpetas y stack, pero no hay documento de arquitectura general ni diagrama C4. `docs/README.md` dice que ADRs y diagramas se añadirán después. |
| Documentación de API/endpoints | Parcial o pobre | `README.md`, `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md` | El README lista endpoints y OpenSpec describe auth/users con escenarios. Pero no hay OpenAPI/Swagger/Scalar ni ejemplos completos de request/response consumibles por un integrador sin leer rutas/controladores. |
| Docstrings y comentarios significativos en código | Parcial o pobre | `backend/app/controllers/*`, `backend/app/validators/*`, `backend/app/transformers/*` | Hay comentarios breves en controllers y otros archivos, útiles como orientación rápida. No son TSDoc completo: faltan `@param`, `@returns`, `@throws`, ejemplos y semántica en modelo/servicios. |
| Decisiones técnicas registradas | Inexistente | No encontrado | No hay ADRs ni equivalente. Las decisiones como SQLite, access tokens, VineJS, transformers o OpenSpec aparecen en README/CLAUDE, pero no están justificadas con alternativas y trade-offs. |
| Guía operacional | Parcial o pobre | `README.md`, `backend/README.md`, `.env.example` | Hay arranque local, scripts y variables de entorno, pero no hay despliegue, runbooks, troubleshooting, rollback, guía de incidencias ni operación de producción. |
| Convenciones de código del proyecto | Parcial o pobre | `CLAUDE.md`, `backend/README.md` | Hay convenciones claras de backend: controllers, VineJS, transformer, subpath imports, no lógica en routes. Falta una convención equivalente para frontend, tests, naming global, estructura de features y criterios de PR. |
| Especificación OpenSpec y trazabilidad con código | Parcial o pobre | `openspec/specs/authentication/spec.md`, `openspec/specs/users/spec.md`, `backend/start/routes.ts` | La spec de auth parece alineada con rutas/controladores. Pero `users/spec.md` incluye `GET /api/v1/users/active`, mientras que `routes.ts` solo expone `/users` y `/users/:id`; además el README indica que `/users/active` se implementa en vivo. Hay divergencia spec-código. |
| PRD de producto | Completa | `docs/PRD.md` | Documento muy útil: define MVP, non-goals, requisitos funcionales/no funcionales, riesgos y glosario. Es una fortaleza clara para generar backlog y documentación posterior. |
| Documentación para copilotos IA | Parcial o pobre | `CLAUDE.md`, `.claude/`, `.cursor/` | Existe una memoria útil para agentes y comandos/skills OpenSpec. Aun así, `CLAUDE.md` dice que en S3 se formaliza `AGENTS.md`, pero en la raíz no aparece `AGENTS.md`; podría inducir confusión. |
| Documentación de calidad/CI documental | Inexistente | No encontrado | No hay workflows de markdownlint, Vale, lychee, TypeDoc ni `llms.txt`. No es imprescindible en el starter, pero según S5 sería el siguiente paso si se quiere documentación viva. |

---

## Observaciones específicas

### README de proyecto

El README raíz es una de las partes más fuertes del repo.

Permite arrancar el proyecto localmente:

```bash
cd backend
npm install
cp .env.example .env
node ace generate:key
npm run migration:run
npm run dev
```

y también el frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Eso cumple la función principal de onboarding técnico.

La mejora no sería reescribirlo entero, sino añadir una sección corta de troubleshooting:

- error si falta `APP_KEY`;
- error si no se ejecutan migraciones;
- error si el frontend no conecta con backend;
- comprobación de `VITE_API_URL`;
- cómo resetear SQLite.

---

### Arquitectura general

Hay descripción de stack y estructura, pero no arquitectura como tal.

Lo que existe:

- árbol de carpetas en README;
- estructura backend en `backend/README.md`;
- stack en `CLAUDE.md`;
- PRD con diseño de producto.

Lo que falta:

- diagrama C4 de contexto;
- diagrama de containers;
- diagrama del flujo de auth;
- explicación de relación frontend-backend-db;
- límites de responsabilidad;
- decisiones de arquitectura.

Estado justo:

```txt
Parcial o pobre
```

No está vacío, pero no cumple del todo la función de arquitectura documentada.

---

### API/endpoints

La API está parcialmente documentada.

Fortalezas:

- README lista los endpoints principales;
- OpenSpec documenta authentication y users con escenarios;
- rutas reales están limpias en `backend/start/routes.ts`.

Carencias:

- no hay spec OpenAPI;
- no hay endpoint `/openapi`;
- no hay UI tipo Scalar;
- no hay schemas de request/response;
- no hay ejemplos completos de payload;
- no hay explicación suficientemente completa para integradores externos.

Además, existe una divergencia importante:

```txt
openspec/specs/users/spec.md documenta GET /api/v1/users/active
backend/start/routes.ts no lo expone
README.md dice que se implementa en vivo en Sesión 3
```

Esto es el hallazgo más importante de trazabilidad.

---

### TSDoc/JSDoc

Hay comentarios inline, pero son básicos.

Ejemplo de controller:

```ts
/**
 * POST /account/login
 * Verifica credenciales y emite un access token.
 */
```

Esto ayuda, pero no equivale a TSDoc completo.

Faltan:

- `@param`;
- `@returns`;
- `@throws`;
- ejemplos de uso;
- explicación de errores;
- semántica de transformers;
- contrato de validadores.

Estado justo:

```txt
Parcial o pobre
```

No es inexistente, pero aún no sirve como referencia robusta para TypeDoc o agentes IA.

---

### ADRs

No se encontraron ADRs.

Esto duele porque el repo ya contiene decisiones técnicas que merecerían justificación:

- AdonisJS 7;
- SQLite + better-sqlite3;
- access tokens opacos en lugar de JWT;
- VineJS;
- UserTransformer como contrato de salida;
- OpenSpec como flujo spec-driven;
- monorepo backend/frontend.

La documentación actual dice qué se usa, pero no por qué se eligió ni qué alternativas se descartaron.

---

### Guía operacional

Hay guía de arranque local, pero no guía operacional.

Falta:

- despliegue;
- entorno producción;
- variables requeridas por entorno;
- backup/restauración SQLite;
- logs;
- troubleshooting;
- runbooks;
- rollback;
- health checks operacionales;
- incidencias típicas.

Para un starter académico esto puede ser aceptable, pero como auditoría documental debe quedar marcado.

---

### Convenciones de código

`CLAUDE.md` es útil y concreto.

Incluye reglas como:

- no meter lógica de negocio en `start/routes.ts`;
- validar input con VineJS;
- serializar salida con `UserTransformer`;
- usar rutas bajo `/api/v1`;
- usar subpath imports;
- no commitear `.env` ni SQLite local.

Eso es una fortaleza.

Carencia:

- está más centrado en backend;
- no hay equivalente para frontend;
- no hay definición de tests;
- no hay convención de commits;
- no hay Definition of Done;
- no hay política de actualización documental.

---

### OpenSpec y trazabilidad

La spec de autenticación parece bastante alineada con el código.

La spec de users tiene una divergencia clara:

```txt
Spec:
GET /api/v1/users/active existe.

Código:
No aparece en backend/start/routes.ts.

README:
Indica que se implementa en vivo en la Sesión 3.
```

Esto demuestra exactamente el riesgo del Módulo 5:

```txt
La documentación puede parecer completa y aun así no coincidir con el código.
```

Aquí el foco del directo debería ser trazabilidad spec-código.

---

# Top 3 carencias que más duelen

## 1. Divergencia OpenSpec-código en `GET /api/v1/users/active`

La spec documenta un endpoint que no existe en las rutas actuales.

Esto es grave porque OpenSpec debería ser una fuente de verdad ejecutable o al menos trazable. Si no coincide con el código, puede inducir a la IA o al developer a asumir funcionalidad inexistente.

---

## 2. Falta de documentación formal de API

El README y OpenSpec ayudan, pero no hay OpenAPI/Scalar.

Para integrarse contra la API sin leer código, faltan:

- schemas;
- payloads;
- respuestas;
- errores;
- auth;
- ejemplos;
- contrato machine-readable.

Esto limita al frontend, a integradores y a agentes IA.

---

## 3. Falta de ADRs y diagramas de arquitectura

El repo tiene decisiones técnicas claras, pero no están justificadas.

Sin ADRs, un developer nuevo puede cuestionar o rehacer decisiones sin contexto.

Sin diagramas, la arquitectura se entiende leyendo árbol de carpetas y código, pero no con una vista clara del sistema.

---

# Top 3 cosas que ya están bien

## 1. README de arranque local

El README raíz permite levantar backend y frontend desde cero en el caso normal.

Eso es una base sólida y no debería romperse.

---

## 2. PRD de FlowSync

`docs/PRD.md` es una fortaleza.

Define MVP, non-goals, riesgos, requisitos funcionales/no funcionales y glosario.

Sirve como fuente de verdad de producto para backlog y specs.

---

## 3. CLAUDE.md como memoria de proyecto

`CLAUDE.md` aporta mucho valor para agentes IA.

Explica stack, comandos, convenciones y límites.

No es perfecto, pero es una base muy buena para trabajo agentic y evita varios errores típicos.

---

# Exploración rápida de formatos

## C4

Un diagrama C4 aporta una vista por niveles del sistema: contexto, containers, componentes y código. A primera vista da estructura visual y relaciones, algo que unas notas sueltas en Markdown no muestran tan rápido.

## ADR

Un ADR aporta memoria de decisión: explica qué se decidió, por qué, qué alternativas se descartaron y qué consecuencias se aceptan. Unas notas sueltas suelen perder ese razonamiento.

## OpenAPI

Una spec OpenAPI convierte endpoints en contrato estructurado y legible por herramientas: rutas, parámetros, request, response, errores y auth. Un Markdown libre puede explicar la API, pero no permite la misma validación ni generación automática.

---

# Conclusión final

El repositorio tiene una buena base documental para un starter académico:

- README útil;
- PRD sólido;
- OpenSpec inicial;
- memoria para agentes;
- convenciones backend.

Pero todavía no tiene documentación viva completa.

Las prioridades serían:

1. Corregir la divergencia entre OpenSpec y código.
2. Añadir documentación formal de API con OpenAPI/Scalar.
3. Añadir ADRs mínimos y diagramas Mermaid/C4.
4. Mejorar TSDoc en controllers, validators y transformers.
5. Añadir troubleshooting y guía operacional básica.

La principal lección es que la documentación no debe parecer correcta: debe ser trazable contra el código real.
