# Arquitectura

Documento vivo que describe la arquitectura del **backend** (AdonisJS 7 + Lucid):
sus entidades de datos, las relaciones entre ellas y los grupos de endpoints REST
expuestos bajo `/api/v1`.

Generado a partir de:

- `backend/app/models/` — modelos Lucid.
- `backend/start/routes.ts` — cableado de rutas.

---

## Entidades

| Entidad | Origen | Campos principales | Notas |
|---|---|---|---|
| **User** | `app/models/user.ts` (modelo Lucid) | `id`, `fullName`, `email`, `password`*, `lastSeenAt`, `createdAt`, `updatedAt` | `password` no se serializa. UID de login: `email`. |
| **auth_access_tokens** | Tabla gestionada por `DbAccessTokensProvider` | `tokenable_id` (→ `User.id`), `hash`, `type`, `expires_at` | Access tokens con prefijo `oat_`, expiran a los 30 días. |

\* `password` está marcado `serializeAs: null` — nunca sale en las respuestas.

**Relación:** un `User` tiene muchos access tokens (1 → N).

---

## Endpoints REST

Todas las rutas de la API cuelgan del prefijo **`/api/v1`**. Las marcadas con 🔒
requieren `middleware.auth()` (Bearer token).

### Health

| Método | Ruta | Controller | Acceso |
|---|---|---|---|
| `GET` | `/health` | `HealthController.index` | Público |

### Cuenta / Autenticación

| Método | Ruta | Controller | Acceso |
|---|---|---|---|
| `POST` | `/account/register` | `NewAccountsController.store` | Público |
| `POST` | `/account/login` | `AccessTokensController.store` | Público |
| `POST` | `/account/logout` | `AccessTokensController.destroy` | 🔒 Protegido |
| `GET` | `/account/profile` | `ProfilesController.show` | 🔒 Protegido |

### Users

| Método | Ruta | Controller | Acceso |
|---|---|---|---|
| `GET` | `/users` | `UsersController.index` | 🔒 Protegido |
| `GET` | `/users/:id` | `UsersController.show` | 🔒 Protegido |

> Fuera de `/api/v1`: `GET /` devuelve el estado de la app (`{ app, status }`).

---

## Diagrama

```mermaid
graph LR
  subgraph Entidades
    User[(User)]
    Token[(auth_access_tokens)]
    User -->|1..N| Token
  end

  subgraph API["API v1 · /api/v1"]
    subgraph Health
      H_GET["GET /health"]
    end
    subgraph Account["Cuenta / Auth"]
      A_REG["POST /account/register"]
      A_LOG["POST /account/login"]
      A_OUT["POST /account/logout 🔒"]
      A_PRO["GET /account/profile 🔒"]
    end
    subgraph Users
      U_IDX["GET /users 🔒"]
      U_SHOW["GET /users/:id 🔒"]
    end
  end

  A_REG --> User
  A_LOG --> Token
  A_OUT --> Token
  A_PRO --> User
  U_IDX --> User
  U_SHOW --> User
```

---

## Diagrama Entidad Relacion

Modelo de datos derivado de `backend/app/models/user.ts`. `User` es el único modelo
Lucid; `AUTH_ACCESS_TOKENS` es la tabla gestionada por `DbAccessTokensProvider`.
Un usuario puede tener cero o muchos access tokens.

```mermaid
erDiagram
  USER ||--o{ AUTH_ACCESS_TOKENS : "posee"

  USER {
    int id PK
    string fullName "nullable"
    string email "UID de login"
    string password "serializeAs: null"
    datetime lastSeenAt "nullable"
    datetime createdAt
    datetime updatedAt
  }

  AUTH_ACCESS_TOKENS {
    int id PK
    int tokenable_id FK "-> USER.id"
    string type "auth_token"
    string hash
    string abilities
    datetime last_used_at "nullable"
    datetime expires_at "oat_ · 30 días"
    datetime created_at
    datetime updated_at
  }
```

---

