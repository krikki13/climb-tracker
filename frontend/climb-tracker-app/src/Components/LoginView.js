import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from '@material-ui/core';
import Link from 'react-router-dom/es/Link';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import '../index.css';
import { useState } from 'react';

function LoginView(){
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasIncorrect, setWasIncorrect] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    axios.post('login', {
      email: email,
      password: password
    }).then(response => {
      history.push("/");
    }).catch(response => setWasIncorrect(true));
  }

  return(
    <Grid container justify="center">
      <div className="form">
      <h2 style={{marginBottom: "9px"}}>Create account</h2>
      <FormControl style={{margin: "auto"}}>
        <TextField
          label="Email"
          type="email"
          value={email.value}
          onChange={event => setEmail(event.target.value)}
          error={wasIncorrect}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          autoComplete="current-password"
          error={wasIncorrect}
        />
        {wasIncorrect ? <div style={{marginTop: "4px", marginBottom: "6px", fontSize: "14px", textAlign: "center", color: "#f44336"}}>Username and password do not match</div> : ""}
        <a style={{textAlign: "right", marginTop: "8px", marginBottom: "8px", fontSize: "14px"}}>Forgot your password?</a>
        <Button style={{marginTop: "10px", marginBottom: "6px"}} variant="contained" color="primary" onClick={event => onSubmit(event)}>LOG IN</Button>
        <Button variant="outlined" size="small" style={{marginTop: "5px"}} onClick={() => history.push("createAccount")}>
          Create new account
        </Button>
      </FormControl>
      </div>
    </Grid>
  );
}

export default LoginView;