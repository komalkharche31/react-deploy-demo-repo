import { Paper, Stack, Typography, Box } from '@mui/material'
export default function StatCard({ label, value, detail, icon }) {
  return <Paper sx={{ p: 3, border: '1px solid #e9eaf2', height: '100%' }}><Stack direction="row" justifyContent="space-between" alignItems="center"><Typography color="text.secondary" variant="body2">{label}</Typography><Box sx={{ color: 'primary.main', bgcolor: '#f0edff', p: 1, display: 'flex', borderRadius: 2 }}>{icon}</Box></Stack><Typography variant="h4" mt={1.5}>{value}</Typography><Typography variant="caption" color="text.secondary">{detail}</Typography></Paper>
}
