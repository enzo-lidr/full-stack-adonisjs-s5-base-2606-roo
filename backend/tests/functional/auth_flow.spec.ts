import { test } from '@japa/runner'

/**
 * Test End-to-End del flujo crítico de autenticación.
 *
 * @remarks Inspirado en el "Flow X" que el mentor añadió por iniciativa
 * propia en el directo de S4 (ver entregables/sesion-05/): ni mi IA ni la
 * del mentor generaron una historia de verificación end-to-end por su
 * cuenta — cubre justo ese hueco para el tramo de auth ya implementado
 * (registro → login → perfil → listado → logout → token revocado).
 *
 * Usa emails únicos por corrida (no una transacción de rollback): este
 * starter no trae un plugin de Japa para envolver cada test en una
 * transacción de base de datos, y no quise inventar uno que no existe.
 */
test.group('Flujo E2E · registro → login → perfil → logout', () => {
  test('un usuario nuevo puede registrarse, autenticarse, ver su perfil, aparecer en el listado, y su token deja de servir tras logout', async ({
    client,
    assert,
  }) => {
    const email = `e2e-${Date.now()}@flowsync.test`
    const password = 'password123'

    // 1. Registro
    const registerResponse = await client.post('/api/v1/account/register').json({
      email,
      password,
      fullName: 'E2E Flow X',
    })
    registerResponse.assertStatus(201)
    const { token: registerToken } = registerResponse.body()
    assert.isString(registerToken)

    // 2. Login con las mismas credenciales (token nuevo, independiente del de registro)
    const loginResponse = await client.post('/api/v1/account/login').json({ email, password })
    loginResponse.assertStatus(200)
    const { user, token } = loginResponse.body()
    assert.equal(user.email, email)
    assert.isString(token)

    // 3. Perfil autenticado con el token de login
    const profileResponse = await client
      .get('/api/v1/account/profile')
      .header('Authorization', `Bearer ${token}`)
    profileResponse.assertStatus(200)
    assert.equal(profileResponse.body().user.email, email)

    // 4. El usuario aparece en el directorio (fila 8 de la auditoría: /users SÍ existe)
    const usersResponse = await client
      .get('/api/v1/users')
      .header('Authorization', `Bearer ${token}`)
    usersResponse.assertStatus(200)
    const emails = usersResponse.body().users.map((u: { email: string }) => u.email)
    assert.include(emails, email)

    // 5. Logout revoca el token actual
    const logoutResponse = await client
      .post('/api/v1/account/logout')
      .header('Authorization', `Bearer ${token}`)
    logoutResponse.assertStatus(200)
    assert.isTrue(logoutResponse.body().revoked)

    // 6. El token revocado ya no sirve para pedir el perfil
    const profileAfterLogout = await client
      .get('/api/v1/account/profile')
      .header('Authorization', `Bearer ${token}`)
    profileAfterLogout.assertStatus(401)
  })

  test('credenciales inválidas no autentican y no revelan cuál dato falló', async ({
    client,
  }) => {
    const email = `e2e-bad-${Date.now()}@flowsync.test`
    await client.post('/api/v1/account/register').json({ email, password: 'password123' })

    const badLogin = await client
      .post('/api/v1/account/login')
      .json({ email, password: 'password-incorrecta' })
    badLogin.assertStatus(400)
  })
})
