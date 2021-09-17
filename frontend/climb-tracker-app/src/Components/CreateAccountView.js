import { Grid, FormControl, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button, Tooltip, Input, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import MyTextField from "./common/MyTextField.js";
import '../index.css';
import { emailPattern } from '../Constants.js';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: '#c6cccb',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

const passwordComplexityCheck = (password) => {
  if(password.length < 8) {
    return "Password should contain 8 characters including upper and lower case letter, number and a sign.";
  }
  if(password.indexOf(" ") >= 0) {
    return "Password should not contain any spaces."
  }
  return "";
}


function CreateAccountView(props){
  const [sending, setSending] = useState(false);

  const [firstName, setFirstName] = useState({value: "", error: ""});
  const [lastName, setLastName] = useState({value: "", error: ""});
  const [email, setEmail] = useState({value: "", error: ""});
  const [gender, setGender] = useState({value: "", error: ""});
  const [year, setYear] = useState({value: "", error: ""});
  const [password, setPassword] = useState({value: "", error: ""});
  const [repeatPassword, setRepeatPassword] = useState({value: "", error: ""});
  
  const formData = {
    firstName: {state: firstName, set: setFirstName},
    lastName: {state: lastName, set: setLastName},
    email: {state: email, set: setEmail},
    gender: {state: gender, set: setGender},
    year: {state: year, set: setYear},
    password: {state: password, set: setPassword},
    repeatPassword: {state: repeatPassword, set: setRepeatPassword}
  };

  const yearList = [];
  for(var i=new Date().getFullYear(); i>1910; i--){
    yearList.push(i);
  }

  const classes = useStyles();

  /**
   * Submit form data to backend.
   */
  const onSubmit = (event) => {
    event.preventDefault();

    // verify if there are any errors present and if there are any empty fields
    var validationPassed = true;
    for(let entry in formData) {
      if(formData[entry].state.error){
        validationPassed = false;
      } else if(formData[entry].state.value == "") {
        formData[entry].set({ value: formData[entry].state.value, error: "Field is required"});
        validationPassed = false;
      }
    }
    if(!validationPassed) {
      return;
    }
  
    setSending(true);
    axios.post('users/create', {
      firstName: firstName.value, 
      lastName: lastName.value,
      email: email.value,
      gender: gender.value,
      yearOfBirth: year.value,
      password: password.value
    }, {headers: {
      'Content-Type': 'application/json',
    }}).then(response => {
      props.history.push("/accountCreated");
    }).catch(response => {
      alert("Failed with " + response.response.statusText + " " + response.response.status + "\n");
      let data = response.response.data;
      // highlight fields that have been reported incorrect
      if(data) {
        for(let entry in formData) {
          if(entry in data) {
            formData[entry].set({value: formData[entry].state.value, error: data[entry]});
          }
        }
      }
      setSending(false)
    });
  };

  return(
    <form className="form" noValidate onSubmit={onSubmit}>
      
      <h2 style={{marginBottom: "16px"}}>Create account</h2>
      <MyTextField
          label="First Name"
          state={firstName}
          setValue={setFirstName}
          setError={(value) => /[0-9!"#$%&/()='+*?,.-;_:<>[\]]/.test(value) ? "Enter a valid name" : ""} />
      <MyTextField
          label="Last Name"
          state={lastName}
          setValue={setLastName} 
          setError={(value) => /[0-9!"#$%&/()='+*?,.-;_:<>[\]]/.test(value) ? "Enter a valid name" : ""} />
      <MyTextField
          label="Email"
          state={email}
          setValue={setEmail}
          setError={(value) => emailPattern.test(value) ? "" : "Email is invalid"} />
      <MyTextField
          label="Password"
          state={password}
          setValue={setPassword}
          setError={passwordComplexityCheck}
          type="password" />
      <MyTextField
          label="Repeat password"
          state={repeatPassword}
          setValue={setRepeatPassword}
          setError={(value) => password.value == value ? "" : "Passwords do not match"}
          type="password" />


        <FormControl className="form-control" error={!!year.error}>
          <FormLabel component="legend">Year of birth*</FormLabel>
          <Select value={year != undefined ? year.value : ""} onChange={(event) => setYear({value: event.target.value, error: ""})}>
            {yearList.map(year => <MenuItem value={year}>{year}</MenuItem>)}
          </Select>
          {year.error ? <FormHelperText>{year.error}</FormHelperText> : <React.Fragment />}
        </FormControl>
        <FormControl className="form-control form-control-radio" component="fieldset" error={!!gender.error}>
          <FormLabel component="legend">Gender*</FormLabel>
          <RadioGroup className="radio-group" aria-label="gender" name="gender" value={gender.value} onChange={(event) => setGender({value: event.target.value, error: ""})}>
            <FormControlLabel value="F" control={<Radio size="small" />} label="Female" />
            <FormControlLabel value="M" control={<Radio size="small" />} label="Male" />
            <FormControlLabel value="None" control={<Radio size="small" />} label="I don't want to say" />
          </RadioGroup>
          {gender.error ? <FormHelperText>{gender.error}</FormHelperText> : <React.Fragment />}
        </FormControl>
        <Button className="fit-content" style={{marginTop: "17px"}} size="small" variant="contained" color="primary" 
          type="submit">
            Create{sending ? <CircularProgress size={24} className={classes.buttonProgress} /> : "" }</Button>
      
      
    </form>
  );
}

export default CreateAccountView;