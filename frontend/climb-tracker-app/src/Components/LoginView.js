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
      <h2 style={{marginBottom: "9px"}}>Prijava</h2>

      <FormControl style={{margin: "auto"}}>
        <TextField
          label="E-pošta"
          type="email"
          size="small"
          margin="dense"
          value={email.value}
          onChange={event => setEmail({value: event.target.value, error: ""})}
          error={wasIncorrect || email.error}
          helperText={email.error}
        />
        <TextField
          label="Geslo"
          type="password"
          size="small"
          margin="dense"
          value={password.value}
          onChange={event => setPassword({value: event.target.value, error: ""})}
          autoComplete="current-password"
          error={wasIncorrect || password.error}
          helperText={password.error}
        />
        {wasIncorrect ? <div style={{marginTop: "4px", marginBottom: "6px", fontSize: "14px", textAlign: "center", color: "#f44336"}}>E-pošta in geslo se ne ujemata</div> : ""}
        <a className="clickable" style={{textAlign: "right", marginTop: "8px", marginBottom: "8px", fontSize: "14px"}}
          onClick={() => {
            alert("Ponastavitev gesla še ne deluje. Prosim ne pozabi gesla."); 
            alert("Hmm... Glede na to, da si kliknil na ta gumb, si verjetno že pozabil geslo... Oh well. Sucks to be you");
            alert("Hahahaha :D :D :D");
            }}>
        Si pozabil geslo?</a>
        <Button style={{marginTop: "10px", marginBottom: "6px"}} variant="contained" color="primary" type="submit">PRIJAVI SE</Button>
        <Button variant="outlined" size="small" style={{marginTop: "5px"}} onClick={() => history.push("createAccount")}>
          Ustvari nov račun
        </Button>
      </FormControl>
      </form>
    </Grid>
  );
}

export default LoginView;