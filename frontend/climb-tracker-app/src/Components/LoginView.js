import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@material-ui/core';
import Link from 'react-router-dom/es/Link';
import { useHistory } from 'react-router-dom';
import '../index.css';

function LoginView(){
  const history = useHistory();
    
  return(
    <Grid container justify="center">
      <div>
      <h2 style={{marginBottom: "9px"}}>Create account</h2>
      <FormControl style={{margin: "auto"}}>
        <TextField
          id="email"
          label="Email"
          type="email"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <a style={{textAlign: "right", marginTop: "8px", marginBottom: "8px", fontSize: "14px"}}>Forgot your password?</a>
        <Button variant="contained" color="primary">LOG IN</Button>
        <Button variant="outlined" size="small" style={{marginTop: "5px"}} onClick={() => history.push("createAccount")}>
          Create new account
        </Button>
      </FormControl>
      </div>
    </Grid>
  );
}

export default LoginView;