import { Grid, FormControl, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button, Tooltip, Input, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import MyTextField from "./common/MyTextField.js";
import '../index.css';
import { emailPattern } from '../Constants.js';


const passwordComplexityCheck = (password) => {
  if(password.length < 8) {
    return "Geslo mora biti dolgo 8 znakov in vsebovati male in velike črke, številke in znake.";
  }
  if(password.indexOf(" ") >= 0) {
    return "Geslo ne sme vsebovati presledkov."
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
        formData[entry].set({ value: formData[entry].state.value, error: "Polje je zahtevano"});
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
      
      <h2 style={{marginBottom: "16px"}}>Ustvari račun</h2>
      <MyTextField
          label="Ime"
          state={firstName}
          setValue={setFirstName}
          setError={(value) => /[0-9!"#$%&/()='+*?,.;_:<>[\]]/.test(value) ? "Vnesi pravo ime" : ""} />
      <MyTextField
          label="Priimek"
          state={lastName}
          setValue={setLastName} 
          setError={(value) => /[0-9!"#$%&/()='+*?,.;_:<>[\]]/.test(value) ? "Vnesi pravi priimek" : ""} />
      <MyTextField
          label="E-pošta"
          state={email}
          setValue={setEmail}
          setError={(value) => emailPattern.test(value) ? "" : "E-pošta ni pravilna"} />
      <MyTextField
          label="Geslo"
          state={password}
          setValue={setPassword}
          setError={passwordComplexityCheck}
          type="password" />
      <MyTextField
          label="Ponovi geslo"
          state={repeatPassword}
          setValue={setRepeatPassword}
          setError={(value) => password.value == value ? "" : "Gesli se ne ujemata"}
          type="password" />


        <FormControl className="form-control" error={!!year.error}>
          <FormLabel component="legend">Leto rojstva*</FormLabel>
          <Select value={year != undefined ? year.value : ""} size="small"
            onChange={(event) => setYear({value: event.target.value, error: ""})}>
            {yearList.map(year => <MenuItem value={year}>{year}</MenuItem>)}
          </Select>
          {year.error ? <FormHelperText>{year.error}</FormHelperText> : <React.Fragment />}
        </FormControl>
        <FormControl className="form-control form-control-radio" component="fieldset" error={!!gender.error}>
          <FormLabel component="legend">Spol*</FormLabel>
          <RadioGroup className="radio-group" aria-label="gender" name="gender" value={gender.value} onChange={(event) => setGender({value: event.target.value, error: ""})}>
            <FormControlLabel value="F" control={<Radio size="small" />} label="Ženski" />
            <FormControlLabel value="M" control={<Radio size="small" />} label="Moški" />
            <FormControlLabel value="None" control={<Radio size="small" />} label="Ne želim odgovoriti" />
          </RadioGroup>
          {gender.error ? <FormHelperText>{gender.error}</FormHelperText> : <React.Fragment />}
        </FormControl>
        <Button className="fit-content" style={{marginTop: "17px"}} size="small" variant="contained" color="primary" 
          type="submit">
            Ustvari{sending ? <CircularProgress size={24} className="button-progress" /> : "" }</Button>
      
      
    </form>
  );
}

export default CreateAccountView;