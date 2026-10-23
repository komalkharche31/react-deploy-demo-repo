// Browser-local demo adapter. Replace with server API calls for production.
const ACCOUNTS = 'workspace.accounts.v1'
const SESSION = 'workspace.session.v1'
const RESET = 'workspace.reset.v1'
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
const accounts = () => read(ACCOUNTS, [])
const normalize = email => email.trim().toLowerCase()
async function digest(password, salt) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256)
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('')
}
const publicUser = ({ id, name, email, createdAt }) => ({ id, name, email, createdAt })
export const authService = {
  getSession() {
    const session = read(SESSION, null)
    const account = session && session.expires > Date.now() && accounts().find(item => item.id === session.id)
    return account ? publicUser(account) : null
  },
  async register({ name, email, password }) {
    const list = accounts()
    if (list.some(item => item.email === normalize(email))) throw new Error('An account with this email already exists. Please sign in.')
    const salt = crypto.randomUUID()
    const account = { id: crypto.randomUUID(), name: name.trim(), email: normalize(email), salt, passwordHash: await digest(password, salt), createdAt: new Date().toISOString() }
    localStorage.setItem(ACCOUNTS, JSON.stringify([...list, account]))
    return this.login({ email, password })
  },
  async login({ email, password }) {
    const account = accounts().find(item => item.email === normalize(email))
    if (!account || account.passwordHash !== await digest(password, account.salt)) throw new Error('Email or password is incorrect.')
    localStorage.setItem(SESSION, JSON.stringify({ id: account.id, expires: Date.now() + 86400000 }))
    return publicUser(account)
  },
  logout() { localStorage.removeItem(SESSION) },
  requestReset(email) {
    const account = accounts().find(item => item.email === normalize(email))
    if (!account) return null
    const token = crypto.randomUUID()
    localStorage.setItem(RESET, JSON.stringify({ id: account.id, token, expires: Date.now() + 900000 }))
    return `/reset-password?token=${token}`
  },
  async resetPassword(token, password) {
    const reset = read(RESET, null)
    if (!reset || reset.token !== token || reset.expires < Date.now()) throw new Error('This reset link is invalid or has expired. Request a new link.')
    const list = accounts()
    const index = list.findIndex(item => item.id === reset.id)
    if (index < 0) throw new Error('Account not found. Please register again.')
    const salt = crypto.randomUUID()
    list[index] = { ...list[index], salt, passwordHash: await digest(password, salt) }
    localStorage.setItem(ACCOUNTS, JSON.stringify(list))
    localStorage.removeItem(RESET)
    this.logout()
  },
}
