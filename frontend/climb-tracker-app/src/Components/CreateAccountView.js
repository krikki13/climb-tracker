import { Grid, FormControl, FormHelperText, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button, Tooltip, Input } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import '../index.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  }
}));

// email regex by RFC 5322 Official Standard
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordComplexityCheck = (password) => {
  if(password.length < 8) {
    return "Password should contain 8 characters including upper and lower case letter, number and a sign.";
  }
  if(password.indexOf(" ") >= 0) {
    return "Password should not contain any spaces."
  }
  if(!/[A-Z]/.test(password)){
    return "Password should contain at least one upper case letter."; 
  }
  if(!/[a-z]/.test(password)){
    return "Password should contain at least one lower case letter.";
  }
  if(!/\d/.test(password)){
    return "Password should contain at least one number.";
  }
  if(!/[!"#$%&/()='+*?,.-;_:<>]/.test(password)){
    return "Password should contain a sign.";
  }
  if(/(.)\1{3,}/.test(password)){
    return "Password should not contain too repetitive characters.";
  }
  if(!/^[A-Za-z0-9!"#$%&/()='+*?,.-;_:<>]*$/.test(password)){
    return "Password contains characters that are not allowed.";
  }
  return "";
}

const renderTextField = (label, state, setValue, setError=(newValue)=>"", type="text") => {
  return <TextField
          label={label}
          type={type}
          value={state.value}
          error={!!state.error}
          helperText={state.error}
          onChange={(event) => setValue({value: event.target.value.trim(), error: setError(event.target.value.trim())})} />;
};

function CreateAccountView(){
  const [firstName, setFirstName] = useState({value: "", error: ""});
  const [lastName, setLastName] = useState({value: "", error: ""});
  const [email, setEmail] = useState({value: "", error: ""});
  const [gender, setGender] = useState({value: "", error: ""});
  const [year, setYear] = useState({value: "", error: ""});
  const [password, setPassword] = useState({value: "", error: ""});
  const [repeatPassword, setRepeatPassword] = useState({value: "", error: ""});
    
  const yearList = [];
  for(var i=new Date().getFullYear(); i>1910; i--){
    yearList.push(i);
  }

  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    
    
    /*axios.post('createUser', {
      firstName: firstName, 
      lastName: lastName,
      email: email,
      gender: gender,
      year: year,
      password: password*/
    axios.post('http://127.0.0.1:8000/users/create', {
      firstName: "Johnny", 
      lastName: "Bravo",
      email: "johnny.bravo@jb.com",
      gender: "male",
      year: 1980,
      password: "MrIcredible1!"
    }, {headers: {
      'Content-Type': 'application/json',
  }}).then(response => {
      alert("Yay");
    }).catch(response => {
      alert("Nay!");
    });
  };

  return(
    <form style={{margin: "auto", width: "220px", marginBottom: "100px"}} className={classes.root} noValidate onSubmit={(event) => this.onSubmit(event)}>
      
      <h2 style={{marginBottom: "9px"}}>Create account</h2>
      {renderTextField("First Name", firstName, setFirstName)}
      {renderTextField("Last Name", lastName, setLastName)}
      {renderTextField("Email", email, setEmail, (value) => emailPattern.test(value) ? "" : "Email is invalid")}

      {renderTextField("Password", password, setPassword, passwordComplexityCheck, "password")}
      {renderTextField("Repeat password", repeatPassword, setRepeatPassword, (value) => password.value == value ? "" : "Passwords do not match", "password")}

        <FormControl className="form-control">
          <FormLabel component="legend">Year of birth</FormLabel>
          <Select value={year != undefined ? year.value : ""} onChange={(event) => setYear({value: event.target.value, isValid: true})}>
            {yearList.map(year => <MenuItem value={year}>{year}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="form-control form-control-radio" component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup className="radio-group" aria-label="gender" name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
            <FormControlLabel size="small" value="female" control={<Radio size="small" />} label="Female" />
            <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
            <FormControlLabel value="none" control={<Radio size="small" />} label="I don't want to say" />
          </RadioGroup>
        </FormControl>
        <Button className="fit-content" style={{marginTop: "15px"}} size="small" variant="contained" color="primary" onClick={event => onSubmit(event)}>Create</Button>
      
      
    </form>
  );
}

export default CreateAccountView;