import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
  palette: { primary: { main: '#6355d8' }, secondary: { main: '#28a38c' }, background: { default: '#f6f7fb', paper: '#fff' }, text: { primary: '#20243b', secondary: '#777b90' } },
  typography: { fontFamily: '"Segoe UI", sans-serif', h3: { fontWeight: 750, letterSpacing: '-1.3px' }, h4: { fontWeight: 750, letterSpacing: '-.8px' }, h6: { fontWeight: 700 }, button: { textTransform: 'none', fontWeight: 650 } },
  shape: { borderRadius: 12 },
  components: { MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { padding: '11px 20px' } } }, MuiPaper: { defaultProps: { elevation: 0 } }, MuiTextField: { defaultProps: { fullWidth: true, variant: 'outlined' } } },
})
