import React, {  useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { SignIn } from '../../redux/actions/authAction'
import { updateUser2 } from '../../redux/actions/userAction';
import { useNavigate ,useParams } from 'react-router-dom';
import { toast } from "react-toastify";



const Copyright=(props) =>{
 
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


 const Activate=(props)=> {
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const { idUser } = useParams()
   const [login, setlogin] = useState({
    plainPassword:'',
    plainPassword1:''
     
   })
  const handleSubmit = (event) => {

    

    event.preventDefault();

    if(login.plainPassword === login.plainPassword1){
        dispatch(updateUser2(login,idUser,navigate))
       
    }else{
        toast.error(`Mot de passe non identique`,{position:toast.POSITION.BOTTOM_LEFT})
    }
    
    

    
    //props.history.push('/')
    
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="plainPassword"
              label="Password"
              name="plainPassword"
              type='password'
              value={login.plainPassword}
              onChange={e=>setlogin({...login,plainPassword:e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="plainPassword1"
              label="Confirmer Password"
              type="password"
              id="plainPassword1"
           
              value={login.plainPassword1}
              onChange={e=>setlogin({...login,plainPassword1:e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmer
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Activate