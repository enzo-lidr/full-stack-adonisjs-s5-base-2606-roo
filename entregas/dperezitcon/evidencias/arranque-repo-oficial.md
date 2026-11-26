# Evidencias reales — Módulo 5, Parte B (arranque y comprobaciones del repositorio oficial)

- **Fecha:** 2026-11-26 · **Entorno:** Windows 11, Git Bash, Node v24.16.0, npm 11.13.0.
- **Repositorio auditado:** `enzo-lidr/full-stack-adonisjs-s5-base-2606-roo`, commit `49634b1` ("Initial commit"), clonado en una **copia aislada fuera de OneDrive** (`<COPIA-AISLADA>`). No se modificó ningún fichero de código versionado.
- **Salidas sin editar**, salvo: (1) códigos de color ANSI eliminados, (2) rutas locales sustituidas por `<COPIA-AISLADA>`, (3) tokens de acceso sustituidos por `<REDACTADO>` y (4) el cuerpo de un 404, truncado como se indica en su sitio.
- **Cambios en la copia aislada durante la prueba (solo en ese entorno):** `backend/.env` (copia de `.env.example` + `APP_KEY`), directorio `backend/tmp/` (ignorado por git), `npm install --no-save @poppinss/ts-exec` (sin tocar `package.json`), `frontend/.env`. `npm install` actualizó `package-lock.json`, `generate:key` cambió el salto de línea final de `.env.example` y la migración generó `database/schema.ts`. Nada de esto se sube.

## Backend: instalación y pasos del README

```text
# Arranque real del backend (copia aislada, sin modificar código)
Fecha: 2026-11-26T15:58:04+01:00 · Windows 11 · Node v24.16.0 · npm 11.13.0
Commit auditado: 49634b1 (enzo-lidr/full-stack-adonisjs-s5-base-2606-roo)
$ cd backend && npm install
npm warn deprecated prebuild-install@7.1.3: No longer maintained. Please contact the author of the relevant native addon; alternatives are available.

added 570 packages in 34s
$ cp .env.example .env
$ node ace generate:key
DONE:    add APP_KEY to .env
$ npm run migration:run
   63 ┃  	// Make sure the specified directory exists
   64 ┃  	if (!anonymous && !filename.startsWith('file:') && !fs.existsSync(path.dirname(filename))) {
 ❯ 65 ┃  		throw new TypeError('Cannot open database because the directory does not exist');
   66 ┃  	}
   67 ┃  
   68 ┃  	Object.defineProperties(this, {
   69 ┃  		[util.cppdb]: { value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null) },
   70 ┃  		...wrappers.getters,

 ⁃ at Client_BetterSQLite3.acquireRawConnection (<COPIA-AISLADA>/backend/node_modules/knex/lib/dialects/better-sqlite3/index.js:14:16)
 ⁃ at create (<COPIA-AISLADA>/backend/node_modules/knex/lib/client.js:333:39)


$ ls -d backend/tmp   # tras el fallo
ls: cannot access 'tmp': No such file or directory
$ mkdir tmp   # solución mínima (directorio ignorado por git, no es código)
$ npm run migration:run
❯ migrated database/migrations/1700000000001_create_access_tokens_table

Migrated in 143 ms
❯ Scanned "sqlite" database and found 2 tables
❯ Scanned table auth_access_tokens
❯ Scanned table users
❯ Creating schema classes for scanned tables
[ success ] Schema classes generated (15 ms)
```

## Backend: typecheck y tests

```text
$ npm run typecheck

> full-stack-adonisjs-master@1.0.0 typecheck
> tsc --noEmit

$ npm run test
    at moduleResolve (node:internal/modules/esm/resolve:859:18)
    at defaultResolve (node:internal/modules/esm/resolve:992:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:691:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:708:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:740:52)
    at #resolve (node:internal/modules/esm/loader:673:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:593:35)
    at node:internal/modules/esm/loader:622:32 {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.16.0
```

## Backend: API en ejecución

```text
# Pruebas reales de la API (servidor con 'node ace serve', 2026-11-26T16:02:08+01:00); token redactado

$ curl localhost:3333/api/v1/health
{"status":"ok"}
[HTTP 200]

$ curl -X POST .../account/register (email auditoria@example.com)
{"user":{"id":1,"email":"auditoria@example.com","lastSeenAt":null,"createdAt":"2026-11-26T15:02:08.875+00:00"},"token":"oat_<REDACTADO>"}

$ curl -X POST localhost:3333/api/v1/account/login -H Content-Type: application/json -d {"email":"auditoria@example.com","password":"mala"}
{"errors":[{"message":"Invalid user credentials"}]}
[HTTP 400]

$ curl -X POST localhost:3333/api/v1/account/login -H Content-Type: application/json -d {"email":"auditoria@example.com","password":"ClaveSegura123"}
{"user":{"id":1,"fullName":null,"email":"auditoria@example.com","lastSeenAt":"2026-11-26T15:02:09.313+00:00","createdAt":"2026-11-26T15:02:08.000+00:00"},"token":"oat_<REDACTADO>"}
[HTTP 200]

$ curl localhost:3333/api/v1/account/profile -H Authorization: Bearer <REDACTADO>
{"user":{"id":1,"fullName":null,"email":"auditoria@example.com","lastSeenAt":"2026-11-26T15:02:09.000+00:00","createdAt":"2026-11-26T15:02:08.000+00:00"}}
[HTTP 200]

$ curl localhost:3333/api/v1/users -H Authorization: Bearer <REDACTADO>
{"users":[{"id":1,"fullName":null,"email":"auditoria@example.com","lastSeenAt":"2026-11-26T15:02:09.000+00:00","createdAt":"2026-11-26T15:02:08.000+00:00"}]}
[HTTP 200]

$ curl localhost:3333/api/v1/users/1 -H Authorization: Bearer <REDACTADO>
{"user":{"id":1,"fullName":null,"email":"auditoria@example.com","lastSeenAt":"2026-11-26T15:02:09.000+00:00","createdAt":"2026-11-26T15:02:08.000+00:00"}}
[HTTP 200]

$ curl localhost:3333/api/v1/users/active -H Authorization: Bearer <REDACTADO>
{"message":"Row not found","name":"E_ROW_NOT_FOUND", ... [CUERPO TRUNCADO: el resto de la respuesta es un stack trace con rutas locales del equipo; incluía "code":"E_ROW_NOT_FOUND" y status 404] }
[HTTP 404]

$ curl localhost:3333/api/v1/users
{"errors":[{"message":"Unauthorized access"}]}
[HTTP 401]

$ curl -X POST localhost:3333/api/v1/account/logout -H Authorization: Bearer <REDACTADO>
{"revoked":true}
[HTTP 200]

$ curl localhost:3333/api/v1/account/profile -H Authorization: Bearer <REDACTADO>
{"errors":[{"message":"Unauthorized access"}]}
[HTTP 401]

$ curl -X POST localhost:3333/api/v1/account/register -H Content-Type: application/json -d {"email":"auditoria@example.com","password":"ClaveSegura123"}
{"errors":[{"message":"The email has already been taken","rule":"database.unique","field":"email"}]}
[HTTP 422]

$ curl -X POST localhost:3333/api/v1/account/register -H Content-Type: application/json -d {"email":"otro@example.com","password":"corta"}
{"errors":[{"message":"The password field must have at least 8 characters","rule":"minLength","field":"password","meta":{"min":8}}]}
[HTTP 422]

$ curl -i -X POST .../account/register (email segundo@example.com) — solo para capturar el código HTTP del registro
[HTTP 201]
```

## Frontend

```text
# Frontend (copia aislada) 2026-11-26T16:02:24+01:00
$ npm install

added 48 packages in 10s
$ cp .env.example .env
$ npm run typecheck

> full-stack-adonisjs-master-frontend@1.0.0 typecheck
> tsc --noEmit

$ npm run build
transforming...✓ 38 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.48 kB │ gzip:  0.31 kB
dist/assets/index-hrMmHjZj.css   10.92 kB │ gzip:  2.95 kB
dist/assets/index-DZkt9R52.js   267.49 kB │ gzip: 85.19 kB

✓ built in 338ms
```
