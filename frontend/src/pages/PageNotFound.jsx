import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <Stack justifyContent={'center'} width={"100vw"} height={"100vh"} alignItems={'center'}>
      <Stack spacing={4} alignItems={'center'} justifyContent={'center'}>
        <Typography variant='h5'>We could't find the page you were looking for</Typography>
        <Typography variant='h5'>404 not found</Typography>
        <Button variant='contained' component={Link} to={"/"}>Go back to home</Button>
      </Stack>
    </Stack>
  )
}
