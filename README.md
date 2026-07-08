# full-stack-adonisjs-master

Starter kit full-stack con autenticación por **access tokens**. Repo hilo conductor
del máster **AI4Devs** (LIDR). Monorepo con backend y frontend independientes.

```text
full-stack-adonisjs-master/
├── backend/      AdonisJS 7 + Lucid + SQLite + VineJS + @adonisjs/auth
├── frontend/     React 19 + Vite + React Router + Tailwind v4 + shadcn/ui
├── openspec/     Configuración de OpenSpec (flujo /opsx:*)
├── docs/         Documentación del producto (PRD.md, ADRs, diagramas)
├── CLAUDE.md     Memoria de proyecto para copilotos de IA
└── README.md
```

## Requisitos

- **Node.js 24** o superior (AdonisJS 7 lo requiere). Comprueba con `node -v`.
- npm 10+.

## Arranque rápido

### 1. Backend (`http://localhost:3333`)

```bash
cd backend
npm install
cp .env.example .env
node ace generate:key      # rellena APP_KEY en .env
npm run migration:run      # crea las tablas users + auth_access_tokens
npm run dev                # servidor con HMR
```

### 2. Frontend (`http://localhost:5173`)

```bash
cd frontend
npm install
cp .env.example .env       # VITE_API_URL ya apunta al backend
npm run dev
```

Abre `http://localhost:5173`, regístrate, entra al dashboard y cierra sesión.

## Endpoints del backend

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/v1/health` | — | Liveness (`{ status: 'ok' }`) |
| POST | `/api/v1/account/register` | — | Registro → `{ user, token }` |
| POST | `/api/v1/account/login` | — | Login → `{ user, token }` |
| POST | `/api/v1/account/logout` | Bearer | Revoca el token actual |
| GET | `/api/v1/account/profile` | Bearer | Usuario autenticado |
| GET | `/api/v1/users` | Bearer | Lista de usuarios |
| GET | `/api/v1/users/:id` | Bearer | Usuario por id |

> El endpoint `GET /api/v1/users/active` se implementa en vivo en la Sesión 3.

## Arquitectura

Diagrama de contexto (C4 básico):

```mermaid
graph LR
    User["👤 Usuario\n[Persona]"]
    FE["Frontend React\n[SPA\nReact 19 + Vite]"]
    BE["Backend AdonisJS 7\n[API REST /api/v1\nTypeScript + Lucid]"]
    DB[("SQLite\n[better-sqlite3]")]

    User -->|"Navega en el navegador"| FE
    FE -->|"HTTP/JSON · Bearer oat_*"| BE
    BE -->|"SQL vía Lucid ORM"| DB
```

> El PRD (`docs/PRD.md`) describe además una integración con Google Calendar;
> este starter todavía no la implementa, por eso no aparece en el diagrama.
> Reflejar solo lo que existe en el código evita el mismo problema de
> divergencia spec↔código detectado en la auditoría de `entregables/sesion-05/`.

Flujo de login (verificado contra `access_tokens_controller.ts` y `app/models/user.ts`):

```mermaid
sequenceDiagram
    participant C as Cliente React
    participant A as AdonisJS API (/api/v1/account/login)
    participant DB as SQLite (users / auth_access_tokens)

    C->>A: POST /api/v1/account/login {email, password}
    A->>DB: SELECT user WHERE email = ?
    DB-->>A: User record
    A->>A: Verificar password (scrypt vía AuthFinder)
    A->>DB: UPDATE users SET last_seen_at = now()
    A->>DB: INSERT auth_access_tokens (user_id, hash, expires_at)
    DB-->>A: Token emitido (prefijo oat_, expira en 30 días)
    A-->>C: 200 { user, token }
```

## Workflow con OpenSpec

Flujo spec-driven con Claude Code o Cursor:

```text
/opsx:propose "añadir endpoint X"   # genera proposal + specs + tasks
/opsx:apply                          # implementa según las tasks
/opsx:archive                        # archiva el cambio aplicado
```

La configuración vive en `openspec/config.yaml`. Los comandos y skills se
instalaron en `.claude/` y `.cursor/`.
