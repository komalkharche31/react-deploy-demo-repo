import { Box, Stack, Typography } from '@mui/material'
import LayersRounded from '@mui/icons-material/LayersRounded'
export default function Brand({ light = false }) {
  return <Stack direction="row" alignItems="center" spacing={1.2}><Box sx={{ bgcolor: light ? '#ffffff20' : 'primary.main', color: '#fff', display: 'flex', p: 1, borderRadius: 2 }}><LayersRounded /></Box><Typography variant="h6" color={light ? '#fff' : 'text.primary'}>Workspace<span style={{ color: '#a79afa' }}>.</span></Typography></Stack>
}
