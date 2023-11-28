import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

export const ForgotPassword = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} width={"100vw"} height={"100vh"}>
        
        <Stack spacing={1} width={'40rem'} p={4} component={Paper} elevation={6}>
            <Typography variant='h4' fontWeight={300}>Enter Email</Typography>
            <TextField fullWidth placeholder='Email'/>
            <Button variant='contained'>Send Password Reset Link</Button>
        </Stack>

        <Typography mt={2} sx={{textDecoration:"none",color:"text.primary"}} component={Link} to='/login'>go back to Login</Typography>
        

    </Stack>
  )
}
