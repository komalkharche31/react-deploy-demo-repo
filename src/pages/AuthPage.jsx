import { useState } from 'react'
import { Link as RouterLink, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import AuthLayout from '../components/AuthLayout'
import PasswordField from '../components/PasswordField'
import { useAuth } from '../auth/useAuth'
import { authService } from '../auth/authService'
const content = {
  login: ['Welcome back', 'Sign in to your account to pick up where you left off.', 'Sign in'],
  register: ['Create your account', 'A fresh workspace is waiting for you. Let’s get started.', 'Create account'],
  forgot: ['Forgot your password?', 'Enter your email and we’ll help you get back into your account.', 'Get reset link'],
  reset: ['Choose a new password', 'Make it strong, and make it yours.', 'Reset password'],
}
export default function AuthPage({ mode }) {
  return <AuthForm key={mode} mode={mode} />
}
function AuthForm({ mode }) {
  const { user, login, register, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resetLink, setResetLink] = useState(null)
  const [busy, setBusy] = useState(false)
  const [title, subtitle, action] = content[mode]
  if (user && (mode === 'login' || mode === 'register')) return <Navigate to="/dashboard" replace />
  const field = name => ({ name, value: values[name], onChange: event => setValues({ ...values, [name]: event.target.value }), error: Boolean(errors[name]), helperText: errors[name] })
  async function submit(event) {
    event.preventDefault()
    const next = {}
    if (mode === 'register' && values.name.trim().length < 2) next.name = 'Enter your full name (at least 2 characters).'
    if (mode !== 'reset' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (mode !== 'forgot' && !values.password) next.password = 'Enter your password.'
    if (['register', 'reset'].includes(mode)) {
      if (values.password.length < 8) next.password = 'Use at least 8 characters.'
      if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'
    }
    setErrors(next); setError(''); setSuccess(false)
    if (Object.keys(next).length) return
    setBusy(true)
    try {
      if (mode === 'login' || mode === 'register') { await (mode === 'login' ? login : register)(values); navigate('/dashboard', { replace: true }) }
      else if (mode === 'forgot') { setResetLink(authService.requestReset(values.email)); setSuccess(true) }
      else { await resetPassword(params.get('token'), values.password); setSuccess(true) }
    } catch (cause) { setError(cause.message) } finally { setBusy(false) }
  }
  return <AuthLayout><Typography variant="overline" color="primary" sx={{ letterSpacing: 2, fontWeight: 700 }}>LET’S MAKE THINGS HAPPEN</Typography><Typography component="h1" variant="h4" mt={1} mb={1.5}>{title}</Typography><Typography color="text.secondary" mb={4}>{subtitle}</Typography>
    <Stack component="form" onSubmit={submit} noValidate spacing={2.5}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{mode === 'reset' ? 'Password updated. You can now sign in with your new password.' : 'If this email has an account, a reset link is ready. Demo links expire after 15 minutes.'}</Alert>}
      {success && resetLink && <Button component={RouterLink} to={resetLink} variant="outlined">Open demo reset link</Button>}
      {!(success && mode === 'reset') && <>
        {mode === 'register' && <TextField label="Full name" autoComplete="name" {...field('name')} />}
        {mode !== 'reset' && <TextField label="Email address" type="email" autoComplete="email" {...field('email')} />}
        {mode !== 'forgot' && <PasswordField label={mode === 'reset' ? 'New password' : 'Password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} {...field('password')} helperText={errors.password || (mode !== 'login' ? 'Use at least 8 characters.' : undefined)} />}
        {['register', 'reset'].includes(mode) && <PasswordField label="Confirm password" autoComplete="new-password" {...field('confirm')} />}
        {mode === 'login' && <Box textAlign="right"><Link component={RouterLink} to="/forgot-password" underline="hover" fontSize={14}>Forgot password?</Link></Box>}
        <Button type="submit" variant="contained" size="large" disabled={busy} endIcon={<ArrowForwardRounded />}>{busy ? 'Please wait…' : action}</Button>
      </>}
      {success && mode === 'reset' && <Button variant="contained" component={RouterLink} to="/login">Back to sign in</Button>}
    </Stack>
    {['login', 'register'].includes(mode) ? <Typography textAlign="center" variant="body2" color="text.secondary" mt={4}>{mode === 'login' ? 'New around here? ' : 'Already have an account? '}<Link component={RouterLink} to={mode === 'login' ? '/register' : '/login'} fontWeight={700} underline="hover">{mode === 'login' ? 'Create an account' : 'Sign in'}</Link></Typography> : <Button component={RouterLink} to="/login" startIcon={<ArrowBackRounded />} sx={{ mt: 3 }}>Back to sign in</Button>}
    {mode === 'reset' && !success && <Typography variant="body2" mt={2}><Link component={RouterLink} to="/forgot-password">Request a new reset link</Link></Typography>}
    <Typography variant="caption" color="text.secondary" display="block" mt={4}>Demo mode: accounts are saved only in this browser. Recovery links appear here instead of being emailed.</Typography>
  </AuthLayout>
}
