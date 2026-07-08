# Ejercicio previo S5 — Auditoría de documentación existente

**Alumno:** Jaime Pinal (Caronter)
**Fecha:** Julio 2026

---

## Parte A — Revisión del backlog de historias de usuario (S4)

### Contraste con la perspectiva actual

**¿Siguen teniendo sentido las historias tal como se generaron? ¿El alcance sigue ceñido al MVP?**

Sí — el ejercicio confirmó que la IA respetó los non-goals definidos en el PRD (no inventó equipos, notificaciones push, ni sincronización inversa completa). El alcance sigue bien ceñido al MVP.

**¿Hay historias cuyos criterios de aceptación ahora se ven incompletos o poco verificables?**

Sí. Las historias de la épica de sincronización con Google Calendar (G1-G5) tienen solo 1-2 criterios de aceptación cuando el prompt original pedía entre 3 y 5, justo en la épica que el propio PRD marcaba como la más riesgosa técnicamente. Esto fue señalado en la calificación de la entrega de S4 como un problema de coherencia entre el prompt y el output generado.

**¿Hay historias que han cambiado de naturaleza desde entonces?**

Sí. Con lo visto en el módulo de documentación de arquitectura, la decisión de dirección de sincronización (FlowSync → Google Calendar, no bidireccional en el MVP) debería registrarse como una decisión técnica explícita, con sus alternativas consideradas — no tratarse como una historia de tipo CRUD más.

**¿Hay historias nuevas que no aparecieron y que ahora sí deberían estar?**

Sí. El ejercicio de "poke-holes" ya había señalado estos huecos, pero nunca se convirtieron en historias propias:
- Sincronización retroactiva para tareas creadas antes de conectar Google Calendar.
- Reintento explícito tras fallo de sincronización (parcialmente cubierto, no como historia independiente).

**Al contrastar con el backlog que el mentor construyó en el directo: ¿qué se priorizó distinto?**

No se hizo una comparación directa punto por punto en el momento del ejercicio. En retrospectiva, esa comparación es justo el hábito que faltó: verificar el propio trabajo contra un criterio externo antes de darlo por bueno es la misma disciplina que faltó al no revisar que el output cumpliera el prompt.

### Ajustes al backlog

- **Ajuste 1:** Completar los criterios de aceptación de las historias G1-G5 a un mínimo de 3 por historia.
  **Motivo:** coherencia prompt-output — fue el motivo principal de la penalización en la entrega anterior.

- **Ajuste 2:** Agregar una historia explícita de sincronización retroactiva.
  **Motivo:** hallazgo del ejercicio de poke-holes que nunca se convirtió en historia propia.

- **Ajuste 3:** Documentar la decisión de dirección de sincronización (FlowSync → Google) como una decisión técnica registrada, con las alternativas consideradas.
  **Motivo:** es el tipo de decisión que un developer nuevo cuestionaría sin ese contexto.

- **Ajuste 4:** Marcar la parte de la sincronización con mayor incertidumbre real (eventos recurrentes, zonas horarias) como pendiente de dividir ("needs-splitting"), en vez de forzarla dentro de historias ya cerradas.
  **Motivo:** cuando una historia tiene demasiado desconocimiento técnico, no se le deben forzar criterios de aceptación completos — se marca para investigarse aparte primero (spike). No se aplicó este criterio la primera vez, y es probablemente la raíz de por qué esa épica quedó más débil que las demás.

---

## Parte B — Auditoría de documentación del proyecto

**Repositorio auditado:** fork de `enzo-lidr/full-stack-adonisjs-s5-base-2606-roo`

### Tabla de auditoría

| # | Tipo de documentación | Estado | Observación | Ubicación |
|---|---|---|---|---|
| 1 | README de proyecto | **Completa** | Explica requisitos, pasos exactos para levantar backend y frontend, y trae una tabla de endpoints. Permite arrancar sin preguntar. *Evaluado por lectura crítica de los pasos, no se ejecutó el proyecto físicamente.* | `README.md` |
| 2 | Descripción de arquitectura general | **Inexistente** | El propio proyecto lo declara explícitamente: "ADRs y diagramas de arquitectura se añaden en sesiones posteriores". No hay ningún diagrama todavía. | `docs/README.md` |
| 3 | Documentación de API/endpoints | **Parcial** | Hay una tabla de endpoints (ruta, autenticación requerida, descripción) en el README, pero no hay una spec OpenAPI generada — para integrarse contra la API hay que leer el código de las rutas. | `README.md` |
| 4 | Docstrings y comentarios en código | **Parcial** | Verificado en los 5 controllers del backend (`access_tokens_controller.ts`, `health_controller.ts`, `new_accounts_controller.ts`, `profiles_controller.ts`, `users_controller.ts`): todos siguen el mismo patrón — un comentario mínimo con la ruta HTTP y una línea de descripción, sin `@param`, `@returns` ni `@throws` en ninguno de los cinco. Es un patrón consistente en todo el backend, no un caso aislado. | `backend/app/controllers/*.ts` |
| 5 | Decisiones técnicas registradas (ADRs) | **Inexistente** | Mismo hallazgo que el ítem 2 — declarado explícitamente como pendiente para sesiones posteriores. | `docs/` |
| 6 | Guía operacional | **Inexistente** | No se encontró ninguna carpeta de CI/CD, ni archivos de tipo despliegue, runbook o troubleshooting en ningún punto del repositorio. | — |
| 7 | Convenciones de código del proyecto | **Completa** | `CLAUDE.md` es explícito: describe el stack, los comandos disponibles, reglas claras de dónde debe vivir la lógica de negocio, y hasta una sección dedicada de "qué no hacer". | `CLAUDE.md` |
| 8 | Especificación OpenSpec y su trazabilidad con el código | **Parcial** | La spec de `authentication` coincide exactamente con el comportamiento real del código (verificado línea por línea contra `access_tokens_controller.ts`). Sin embargo, la spec de `users` describe el endpoint `GET /api/v1/users/active` como comportamiento "ya implementado", mientras que `users_controller.ts` solo implementa `index` y `show` — el endpoint no existe en el código. Es una divergencia real entre la especificación y la implementación, no un descuido menor: el dato que necesitaría (`last_seen_at`) sí existe en el modelo, pero el endpoint que lo expondría no está construido. | `openspec/specs/` |

### Top 3 carencias que más duelen

1. **No hay ADRs ni documentación de arquitectura.** El proyecto lo admite como pendiente — es el hueco más grande porque un developer nuevo no tiene forma de entender el "por qué" de ninguna decisión técnica tomada hasta ahora.
2. **La especificación de OpenSpec promete un endpoint que el código no tiene** (`GET /api/v1/users/active`). Es el tipo de divergencia que erosiona la confianza en la documentación como fuente de verdad.
3. **No existe ninguna guía operacional.** Sin runbooks ni instrucciones de despliegue, cualquier incidente dependería completamente de quien ya conoce el sistema de memoria.

### Top 3 cosas que ya están bien

1. **El README es sólido** — instrucciones exactas paso a paso, tabla de endpoints, permite arrancar el proyecto sin tener que preguntar.
2. **`CLAUDE.md` es un buen ejemplo de convenciones de código documentadas** — reglas explícitas y una sección clara de qué no hacer.
3. **Donde sí existe una spec de OpenSpec completa (`authentication`), la trazabilidad con el código es perfecta** — es evidencia de que el patrón funciona bien cuando se aplica; el problema no es la herramienta, es la cobertura incompleta.

---

## Paso 7 — Exploración rápida de formatos de documentación

**C4:** Lo que más aporta es poder "hacer zoom" por niveles — ver primero el panorama completo y luego ir bajando al detalle solo cuando se necesita, en vez de un solo dibujo con todo mezclado.

**ADR:** Es la respuesta a algo que pasa seguido en cualquier equipo: alguien pregunta "¿por qué hicimos esto así?" y nadie se acuerda. Un ADR es la minuta de esa decisión, guardada para cuando haga falta consultarla.

**OpenAPI:** Aporta poder probar la API en vivo en vez de solo leer una descripción de lo que hace — la diferencia entre un manual y un simulador donde se puede apretar el botón de verdad.
