# Corregir el glob de test suites en adonisrc.ts (paréntesis → llaves)

## Estado

Aceptado

## Contexto y problema

`npm run test` (`node ace test`) siempre reportaba `NO TESTS EXECUTED`, sin
ningún error — incluso con un archivo de test nuevo y correcto en
`tests/functional/`. No era un problema del archivo de test: ningún archivo,
de ningún suite, se ejecutaba nunca en este starter, para nadie.

## Investigación

`adonisrc.ts` trae de fábrica:

```ts
files: ['tests/unit/**/*.spec(.ts|.js)']
```

Esa sintaxis `(a|b)` es de `fast-glob` (o extglob de shell). Pero
`@japa/runner` en la versión instalada (verificado leyendo
`node_modules/@japa/runner/build/create_test-*.js`) ya no usa `fast-glob`
internamente — usa el `glob()` **nativo** de `node:fs/promises` (una API
relativamente nueva de Node). Ese glob nativo no soporta el paréntesis de
alternancia: devuelve 0 coincidencias con ese patrón, sin lanzar ningún error.

Verificado en el REPL de Node, mismo directorio, mismo archivo real:

```js
glob('tests/functional/**/*.spec(.ts|.js)', { cwd })  // → 0 archivos
glob('tests/functional/**/*.spec.{ts,js}', { cwd })   // → 1 archivo (el real)
```

## Opciones consideradas

- Instalar `fast-glob` u otra librería de globs más permisiva como shim.
- Reescribir los patrones a la sintaxis que el glob nativo sí soporta
  (llaves `{ts,js}` en vez de paréntesis).
- No tocar nada y asumir que los tests "no aplican" a este proyecto.

## Decisión

Cambiar los patrones de `adonisrc.ts` de `*.spec(.ts|.js)` a `*.spec.{ts,js}`
en ambos suites (`unit`, `functional`). Cero dependencias nuevas, corrige el
problema en su origen (el patrón, no la herramienta), y usa exactamente la
sintaxis que Node ya soporta de forma nativa.

## Consecuencias

- `npm run test` ahora sí descubre y ejecuta los archivos `*.spec.ts` reales.
- Cualquier archivo de test añadido antes de este fix "existía" en el repo
  pero **nunca se había ejecutado ni una vez** — no hay forma de saber, sin
  este fix, si algún test histórico pasaba o fallaba.
- Si se actualiza `@japa/runner` a una versión que vuelva a usar `fast-glob`,
  la sintaxis `{ts,js}` sigue siendo válida ahí también (brace expansion es
  compatible con ambas herramientas) — no hay que revertir este cambio.
