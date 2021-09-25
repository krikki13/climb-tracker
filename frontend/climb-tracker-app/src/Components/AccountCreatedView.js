import { Button } from '@mui/material';


export default function AccountCreated(props) {
    return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h2>Account created successfully</h2>
      <Button className="fit-content" style={{marginTop: "15px"}} size="small" variant="contained" color="primary"
      onClick={() => props.history.push("/login") } >
        Log in
      </Button>
    </div>
    );

};
