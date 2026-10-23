import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded'
import Brand from './Brand'
export default function AuthLayout({ children }) {
  return <Box sx={{ minHeight: '100svh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '46% 54%' } }}>
    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', p: { md: 5, lg: 8 }, color: '#fff', background: 'radial-gradient(ellipse at 10% 90%, #8879e9 0%, transparent 55%), linear-gradient(140deg, #24234f, #5344a6)' }}>
      <Brand light /><Box sx={{ my: 5 }}><Chip label="YOUR SPACE TO DO MORE" sx={{ bgcolor: '#ffffff18', color: '#d9d4ff', mb: 3, letterSpacing: 2, fontSize: 10 }} /><Typography variant="h3" sx={{ maxWidth: 450, fontSize: { md: 44, lg: 56 }, lineHeight: 1.13 }}>Great work starts<br />with a clear space.</Typography><Typography sx={{ color: '#d4cfef', mt: 3, maxWidth: 360, lineHeight: 1.8 }}>One place to stay organized, keep things moving, and make room for what matters.</Typography>
      <Paper sx={{ mt: 5, p: 3, bgcolor: '#ffffff10', border: '1px solid #ffffff25', color: '#fff' }}><Stack direction="row" spacing={1.5} alignItems="center"><CheckCircleOutlineRounded sx={{ color: '#b7ead6' }} /><Typography fontWeight={600}>A fresh start, every day</Typography></Stack><Typography sx={{ mt: 1.5, color: '#d4cfef', fontSize: 14 }}>Your workspace. Your rhythm. Everything in reach.</Typography><Stack direction="row" spacing={.7} mt={3}>{['Plan', 'Focus', 'Achieve'].map(item => <Chip key={item} label={item} size="small" sx={{ color: '#fff', bgcolor: '#ffffff15' }} />)}</Stack></Paper></Box>
      <Typography variant="caption" sx={{ color: '#c5bfee' }}>A little clarity. A lot of possibility.</Typography>
    </Box>
    <Stack component="main" justifyContent="center" sx={{ p: { xs: 3, sm: 6 }, bgcolor: '#fcfcfe', minHeight: '100svh' }}><Box sx={{ display: { md: 'none' }, mb: 5 }}><Brand /></Box><Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>{children}</Box><Typography variant="caption" color="text.secondary" textAlign="center" mt={6}>Workspace · A place for your next chapter</Typography></Stack>
  </Box>
}
