import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';


export default function MyTextField(props) {
    let errorMessage = props.state.error ? props.state.error : "";
    return (<TextField
        label={props.label + (props.required ? "*" : "")}
        type={props.type}
        value={props.state.value}
        error={errorMessage !== ""}
        helperText={errorMessage}
        onChange={(event) => {
            props.setValue({value: event.target.value.trim(), error: props.setError(event.target.value.trim())})}} />);

};
MyTextField.propTypes = {
    label: PropTypes.string, 
    state: PropTypes.object,
    type: PropTypes.string,
    setValue: PropTypes.func,
    required: PropTypes.bool, 
    setError: PropTypes.func
}
MyTextField.defaultProps = {
    required: true, 
    setError: () => "",
    type: "text"
}