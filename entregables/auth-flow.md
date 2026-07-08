# Flujo de autenticación

Autenticación por **access tokens** (`@adonisjs/auth`, guard `api`). Todas las rutas
cuelgan de `/api/v1`. El token se emite en registro/login y se envía en las rutas
protegidas mediante la cabecera `Authorization: Bearer <token>`.

Derivado de:

- `backend/app/controllers/new_accounts_controller.ts` — registro
- `backend/app/controllers/access_tokens_controller.ts` — login / logout
- `backend/app/controllers/profiles_controller.ts` — ruta protegida
- `backend/app/middleware/auth_middleware.ts` — verificación del Bearer token
- `backend/app/validators/auth.ts` — validación de payloads (VineJS)

---

## Diagrama de secuencia

```mermaid
sequenceDiagram
  autonumber
  actor C as Cliente
  participant API as API (router /api/v1)
  participant Ctrl as Controller
  participant V as Validator (Vine)
  participant U as User (Lucid)
  participant DB as DB auth_access_tokens

  Note over C,DB: 1 · Registro — POST /account/register
  C->>API: POST /account/register {fullName?, email, password}
  API->>Ctrl: NewAccountsController.store
  Ctrl->>V: signupValidator (email único, password ≥8)
  V-->>Ctrl: datos válidos
  Ctrl->>U: User.create(data)
  Ctrl->>DB: User.accessTokens.create(user)
  DB-->>Ctrl: token (oat_...)
  Ctrl-->>C: 201 {user (sin password), token}

  Note over C,DB: 2 · Login — POST /account/login
  C->>API: POST /account/login {email, password}
  API->>Ctrl: AccessTokensController.store
  Ctrl->>V: loginValidator
  V-->>Ctrl: datos válidos
  Ctrl->>U: User.verifyCredentials(email, password)
  U-->>Ctrl: user (o 400 credenciales inválidas)
  Ctrl->>U: set lastSeenAt = now y save
  Ctrl->>DB: User.accessTokens.create(user)
  DB-->>Ctrl: token
  Ctrl-->>C: 200 {user, token}

  Note over C,DB: 3 · Acceso protegido — GET /account/profile
  C->>API: GET /account/profile (Authorization: Bearer <token>)
  API->>API: middleware.auth() → auth.authenticateUsing
  API->>DB: valida token
  alt token válido
    DB-->>API: user autenticado
    API->>Ctrl: ProfilesController.show
    Ctrl-->>C: 200 {user}
  else token inválido/ausente
    API-->>C: 401 Unauthorized
  end

  Note over C,DB: 4 · Logout — POST /account/logout
  C->>API: POST /account/logout (Authorization: Bearer <token>)
  API->>API: middleware.auth()
  API->>Ctrl: AccessTokensController.destroy
  Ctrl->>DB: User.accessTokens.delete(user, currentAccessToken.identifier)
  DB-->>Ctrl: ok
  Ctrl-->>C: 200 {revoked: true}
```

---

## Notas

- **Formato del token:** `Bearer`, prefijo `oat_`, longitud de secreto 40, **expira a los 30 días** (`User.accessTokens`, `backend/app/models/user.ts`).
- **Salida siempre vía `UserTransformer`** (`backend/app/transformers/user_transformer.ts`): el `password` nunca se devuelve.
- **Rutas protegidas** (`logout`, `profile`, `users`) exigen el header `Authorization: Bearer <token>`; sin él → `401`.
- **Credenciales inválidas** en login → `400` (excepción de `verifyCredentials`).
