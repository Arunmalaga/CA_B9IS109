import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, Navigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { Alert, FormHelperText, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync, selectError, selectLoggedInUser } from '../authSlice';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ecommerce
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Signup=()=> {

    const {register,handleSubmit,watch,formState : {errors}}=useForm()

    const dispatch=useDispatch()
    const user=useSelector(selectLoggedInUser)
    console.log(user)

    const defaultTheme=createTheme()
    const error=useSelector(selectError)


  return (
    <>
    {user && <Navigate to={'/'} replace={true}></Navigate>}
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" padding={"0rem 4vw"}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ecommerce
          </Typography>
          <Stack spacing={1} component="form" method='post' width={'100%'}  onSubmit={handleSubmit((data)=>{dispatch(createUserAsync(data))})} noValidate sx={{ mt: 3 }}>
                <TextField
                  {...register("name",{required:'first name is required'})}
                  id="firstName"
                  fullWidth
                  label="Name"
                  autoFocus
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register("email",{required:"email is required",

                  pattern:{
                    value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message:"email is not valid"
                  }})}
                />
                 <FormHelperText>{errors.email?.message}</FormHelperText>
                <TextField
                  fullWidth
                  {...register("password",{required:"password is required",
                
                  pattern:{
                    value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:`at least 8 characters\n
                    -must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    -can contain special character`
                  },

                })}
                  label="Password"
                  type="password"
                  id="password"
                />
                <FormHelperText>{errors.password?.message}</FormHelperText>
                <TextField
                  fullWidth
                  {...register("confirmPassword",{required:'Confirm password is requried',
                  validate:(value,formValues)=>value===formValues.password || `Password dosen't match`
                })}
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                />
                <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Stack>
          <Box mt={2}>

                <Typography component={Link} to={"/login"} variant="body2">
                  Already have an account? Log in
                </Typography>
          </Box>
          <Box margin={"1rem 0"}>

          {error && <Alert severity='error'>{error?.message}</Alert>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}