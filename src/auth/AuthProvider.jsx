import { useEffect, useState } from 'react'
import { authService } from './authService'
import { AuthContext } from './useAuth'
export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getSession)
  useEffect(() => {
    const refresh = () => setUser(authService.getSession())
    window.addEventListener('storage', refresh)
    const timer = window.setInterval(refresh, 30000)
    return () => { window.removeEventListener('storage', refresh); window.clearInterval(timer) }
  }, [])
  const authenticate = async (method, values) => { const next = await authService[method](values); setUser(next) }
  return <AuthContext.Provider value={{ user, login: values => authenticate('login', values), register: values => authenticate('register', values), logout: () => { authService.logout(); setUser(null) }, resetPassword: async (token, password) => { await authService.resetPassword(token, password); setUser(null) } }}>{children}</AuthContext.Provider>
}
