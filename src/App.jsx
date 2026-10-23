import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Box, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { AuthProvider } from './auth/AuthProvider'
import { useAuth } from './auth/useAuth'
import AuthPage from './pages/AuthPage'
const Dashboard = lazy(() => import('./pages/Dashboard'))

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}
export default function App() {
  return <ThemeProvider theme={theme}><CssBaseline /><HashRouter><AuthProvider><Routes>
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/register" element={<AuthPage mode="register" />} />
    <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
    <Route path="/reset-password" element={<AuthPage mode="reset" />} />
    <Route path="/dashboard" element={<ProtectedRoute><Suspense fallback={<Box role="status" aria-label="Loading dashboard" sx={{ minHeight: '100svh', display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>}><Dashboard /></Suspense></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes></AuthProvider></HashRouter></ThemeProvider>
}
