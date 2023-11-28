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
import { Alert, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, selectError, selectLoggedInUser } from '../authSlice';

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

const defaultTheme = createTheme();


export const Login=()=> {
  
  const error=useSelector(selectError)
  const {register,handleSubmit,watch,formState : {errors}}=useForm()
  const dispatch=useDispatch()

  const user=useSelector(selectLoggedInUser)


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
          <Box component="form" width={'100%'} noValidate method='post' onSubmit={handleSubmit((data)=>dispatch(loginUserAsync(data)))} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register("email",{required:'email is required',
            pattern:{
              value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message:"Please enter a valid email",
            }
            
            })}
              autoFocus
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
            <TextField
              margin="normal"
              fullWidth
              {...register("password",{required:'password is required'})}
              label="Password"
              type="password"
              id="password"
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Typography  component={Link} to={"/signup"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box m={'1rem 0'}>

          {error && <Alert severity='error'>{error?.message}</Alert>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider></>
  );
}