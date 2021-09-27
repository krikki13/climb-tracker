import { Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Link from 'react-router-dom/es/Link';
import { appName } from '../Constants';

export default function Header(props){
  const [profileMenu, setProfileMenu] = useState(null);
  const history = useHistory();
  
  let header = [ // all links must have leading slash
    {label: "Slovenska plezališča", link: "/crags?c=SI", class: "header-item-left"},
    {label: "Tuja plezališča", link: "/countries", class: "header-item-left"},
    {label: "Plezalni dnevnik", link: "", class: "header-item-left"}
  ];

  const logout = () => {
    axios.post("users/logout")
    .then(response => { 
      props.onLogout();
    });
  };
  
  return(
    <div className="header">
      <h2 className="app-name clickable" onClick={()=>history.push("")}>{appName}</h2>
      {header.map(item => <Link to={item.link} class={item.class}>{item.label}</Link>)}

      {props.user ? 
        <React.Fragment><Link to="" className="header-item-right" 
          onClick={(event) => setProfileMenu(event.currentTarget)}>{props.user.firstName} {props.user.lastName}</Link>
          <Menu
            id="basic-menu"
            anchorEl={profileMenu}
            open={!!profileMenu}
            onClose={() => {setProfileMenu(null)}}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
        :
        <Link to="/login" className="header-item-right">Prijavi se</Link>
      }
      <div style={{clear: "both"}}></div>
    </div>
  );
}