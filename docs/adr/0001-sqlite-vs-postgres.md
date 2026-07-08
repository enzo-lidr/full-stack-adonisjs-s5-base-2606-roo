# Uso de SQLite + better-sqlite3 en lugar de PostgreSQL

## Estado

Aceptado

## Contexto y problema

El proyecto FlowSync es una aplicación de gestión de tareas con una carga de trabajo
predecible y un equipo de 2-4 developers. Necesitamos una base de datos para el
desarrollo local y para los entornos de testing del máster.

## Opciones consideradas

* SQLite + better-sqlite3
* PostgreSQL en Docker
* Turso (SQLite distribuido)

## Decisión

Se elige **SQLite + better-sqlite3** porque:

* Cero overhead de infraestructura para desarrollo local
* AdonisJS 7 + Lucid ORM soporta SQLite de primera clase
* better-sqlite3 es síncrono — elimina la complejidad async en queries simples
* Para producción real del proyecto del máster, la carga no justifica Postgres

## Consecuencias

* Los tipos de columna disponibles son los de SQLite (sin arrays, sin jsonb avanzado)
* Migrar a Postgres en producción requiere revisar los migrations (los tipos son compatibles vía Lucid)
* No hay soporte para conexiones concurrentes de escritura a escala — aceptable en este
  contexto de desarrollo y del máster, donde la carga es predecible y baja
