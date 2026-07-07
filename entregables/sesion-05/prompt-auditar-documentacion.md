# Prompt para auditar la documentación del Repo

## Rol
Eres un auditor de documentación experto.

## Contexto del producto
Ver @CLAUDE.md


## Tarea
Recorrer el repositorio y evaluar el estado de cada tipo de documentación. 
Para cada uno, asignar un estado:
- Completa: existe, está actualizada y cumple su función.
- Parcial o pobre: existe pero está incompleta, desactualizada, mal organizada o no cumple su función.
- Inexistente: no hay nada que cubra esto.

Y añadir una observación específica (una o dos líneas): qué falta, qué chirría, qué está bien, o dónde se encuentra si está disperso.

Tipos a auditar:
- README de proyecto. ¿Permite que alguien nuevo arranque el proyecto desde cero (instalar dependencias, configurar .env, correr migraciones, levantar el servidor) sin tener que preguntar?
- Descripción de la arquitectura general. ¿Hay un documento que explique cómo está organizado el sistema, qué componentes lo forman y cómo se relacionan?
- Documentación de la API o de los endpoints. El proyecto expone una API (auth, /health, etc.). ¿Está documentada de forma que otro pueda integrarse contra ella sin leer el código de las rutas?
- Docstrings y comentarios significativos en código (TSDoc/JSDoc). ¿Los controllers, services y modelos relevantes tienen documentación inline útil, o solo comentarios genéricos (o ninguno)?
- Decisiones técnicas registradas. ¿Existen ADRs (Architecture Decision Records) o equivalentes que justifiquen las decisiones tomadas y por qué se descartaron otras alternativas?
- Guía operacional. ¿Hay instrucciones para desplegar el proyecto, runbooks para incidencias típicas, o documentación de troubleshooting?
- Convenciones de código del proyecto. ¿Hay un documento (o un CLAUDE.md / AGENTS.md) que explique cómo se nombra, cómo se estructura, qué patrones se siguen?
- Especificación OpenSpec y su trazabilidad con el código. ¿La especificación está al día respecto al código actual? ¿Se ven divergencias entre lo que dice la spec y lo que hace el código? (Pista: mira si hay endpoints en la spec que no existen en el código, o al revés).

Si detectas tipos adicionales de documentación que no encajan en esta lista, añadirlos al final. 
Si alguno claramente no aplica, márcalo como "no aplica" y justifica brevemente por qué.

## Formato de salida
Tabla en Markdown con las columnas: Tipo de documentación, Estado, Observación y Ubicación.
Para el estado, usar literalmente uno de los tres valores definidos arriba: Completa, Parcial o pobre, Inexistente.
Si el estado es Inexistente, dejar Ubicación como "-" o indicar dónde debería estar (p. ej. "no existe, esperable en /docs/adr/").
Guardar la tabla resultante en `entregables/sesion-05/entregable.md`, insertandose a continuación de la linea: ## Auditoría:.


## Ejemplo de output esperado

| Tipo de documentación | Estado | Observación | Ubicación |
|---|---|---|---|
| README | Completa | Cubre instalación y arranque, falta sección de troubleshooting | /README.md |
| Decisiones técnicas (ADR) | Inexistente | No hay carpeta de ADRs ni decisiones registradas | - |
| Convenciones de código | Parcial o pobre | Existe CLAUDE.md pero desactualizado tras el último refactor | /CLAUDE.md |


## Restricciones (non-goals)
No modificar ningún archivo del repo salvo `entregables/sesion-05/entregable.md` para guardar el resultado.
Puedes leer código fuente en modo solo lectura cuando sea necesario para contrastar la documentación contra la realidad (p. ej. comparar endpoints de OpenSpec con `routes.ts`, o comprobar si hay docstrings en controllers/models). No lo hagas para analizar o evaluar el código en sí, solo como referencia de contraste.

## Transparencia
Ante cualquier duda, preguntar.

# Cantidad esperada
Todos los archivos de documentación del repositorio.