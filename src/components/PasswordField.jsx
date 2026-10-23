import { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
export default function PasswordField(props) {
  const [visible, setVisible] = useState(false)
  return <TextField {...props} type={visible ? 'text' : 'password'} slotProps={{ input: { endAdornment: <InputAdornment position="end"><IconButton aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)} edge="end">{visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}</IconButton></InputAdornment> } }} />
}
