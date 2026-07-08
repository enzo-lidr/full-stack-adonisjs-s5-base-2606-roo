workspace "Starter Full-Stack AdonisJS" "Modelo C4 del starter kit full-stack (React + AdonisJS + SQLite) del máster AI4Devs." {

    model {
        usuario = person "Usuario" "Persona que se registra, inicia sesión y consulta su perfil / usuarios."

        sistema = softwareSystem "Starter Full-Stack AdonisJS" "Aplicación full-stack con autenticación por access tokens." {

            spa = container "SPA Web" "Single-Page App: login, signup, dashboard. Guarda el token en localStorage." "React 19, TypeScript, Vite, Tailwind" {
                tags "WebApp"
            }

            api = container "API JSON" "API REST bajo /api/v1. Registro, login, logout, perfil y usuarios." "AdonisJS 7, TypeScript, Lucid" {
                router          = component "Router" "Cablea las rutas /api/v1 a los controllers." "AdonisJS router (start/routes.ts)"
                authMiddleware  = component "Auth Middleware" "Verifica el header Authorization: Bearer <token> en rutas protegidas." "@adonisjs/auth (guard api)"
                accountCtrl     = component "Controllers de Cuenta" "Registro, login y logout: emiten y revocan access tokens." "NewAccountsController, AccessTokensController"
                profileCtrl     = component "Profile Controller" "Devuelve el usuario autenticado." "ProfilesController"
                usersCtrl       = component "Users Controller" "Lista y muestra usuarios." "UsersController"
                healthCtrl      = component "Health Controller" "Healthcheck del servicio." "HealthController"
                validators      = component "Validators" "Valida los payloads de entrada (signup / login)." "VineJS"
                transformer     = component "User Transformer" "Serializa la salida de usuario (excluye password)." "UserTransformer"
                userModel       = component "User Model" "Modelo de dominio + proveedor de access tokens." "Lucid ORM (User)"
            }

            db = container "Base de datos" "Persiste usuarios y access tokens (tablas users, auth_access_tokens)." "SQLite (better-sqlite3)" {
                tags "Database"
            }
        }

        # Relaciones de contexto / contenedores
        usuario -> spa "Usa la aplicación web" "HTTPS"
        spa -> api "Llama a los endpoints REST/JSON con Authorization: Bearer <token>" "JSON/HTTPS"
        api -> db "Lee y escribe datos" "Lucid ORM / SQL"

        # Relaciones de componentes (dentro de la API)
        spa -> router "Envía peticiones HTTP" "JSON/HTTPS"
        router -> authMiddleware "Protege rutas con" ""
        router -> accountCtrl "Enruta /account/register, /login, /logout"
        router -> profileCtrl "Enruta /account/profile"
        router -> usersCtrl "Enruta /users y /users/:id"
        router -> healthCtrl "Enruta /health"

        authMiddleware -> userModel "Autentica el token contra"
        accountCtrl -> validators "Valida entrada con"
        accountCtrl -> userModel "Crea usuario y emite/revoca tokens"
        accountCtrl -> transformer "Serializa salida con"
        profileCtrl -> transformer "Serializa salida con"
        usersCtrl -> userModel "Consulta"
        usersCtrl -> transformer "Serializa salida con"
        userModel -> db "Lee/escribe vía Lucid"
    }

    views {
        systemContext sistema "Contexto" {
            include *
            autolayout lr
        }

        container sistema "Contenedores" {
            include *
            autolayout lr
        }

        component api "Componentes_API" {
            include *
            autolayout lr
        }

        styles {
            element "Person" {
                shape Person
                background #08427b
                color #ffffff
            }
            element "Container" {
                background #1168bd
                color #ffffff
            }
            element "WebApp" {
                shape WebBrowser
            }
            element "Component" {
                background #438dd5
                color #ffffff
            }
            element "Database" {
                shape Cylinder
                background #2f6f4f
                color #ffffff
            }
        }

        theme default
    }
}
