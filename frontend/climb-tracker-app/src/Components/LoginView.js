import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@mui/material';
import Link from 'react-router-dom/es/Link';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { emailPattern } from '../Constants.js';

import '../index.css';
import { useState } from 'react';

function LoginView(props){
  const history = useHistory();
  const [email, setEmail] = useState({value: "", error: ""});
  const [password, setPassword] = useState({value: "", error: ""});
  const [wasIncorrect, setWasIncorrect] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    var incorrect = false; // use incorrect variable because state will not update fast enough
    if(!emailPattern.test(email.value)){
      setEmail({value: email.value, error: "Email is invalid"});
      incorrect = true;
    }
    if(password.value.length < 8) {
      setPassword({value: password.value, error: "Password is too short"});
      incorrect = true;
    }
    if(incorrect || email.error || password.error) {
      return;
    }

    axios.post('login', {
      email: email.value,
      password: password.value
    }).then(response => {
      if(response.data && response.data.csrftoken) {
        props.onLogin(response.data.csrftoken);
        history.push("");
      }
    }).catch(response => {
      var cva=2;
      setWasIncorrect(true);
    });
  }

  return(
    <Grid container justify="center">
      <form className="form" noValidate onSubmit={onSubmit}>
      <h2 style={{marginBottom: "9px"}}>Create account</h2>

      <FormControl style={{margin: "auto"}}>
        <TextField
          label="Email"
          type="email"
          value={email.value}
          onChange={event => setEmail({value: event.target.value, error: ""})}
          error={wasIncorrect || email.error}
          helperText={email.error}
        />
        <TextField
          label="Password"
          type="password"
          value={password.value}
          onChange={event => setPassword({value: event.target.value, error: ""})}
          autoComplete="current-password"
          error={wasIncorrect || password.error}
          helperText={password.error}
        />
        {wasIncorrect ? <div style={{marginTop: "4px", marginBottom: "6px", fontSize: "14px", textAlign: "center", color: "#f44336"}}>Username and password do not match</div> : ""}
        <a style={{textAlign: "right", marginTop: "8px", marginBottom: "8px", fontSize: "14px"}}>Forgot your password?</a>
        <Button style={{marginTop: "10px", marginBottom: "6px"}} variant="contained" color="primary" type="submit">LOG IN</Button>
        <Button variant="outlined" size="small" style={{marginTop: "5px"}} onClick={() => history.push("createAccount")}>
          Create new account
        </Button>
      </FormControl>
      </form>
    </Grid>
  );
}

export default LoginView;