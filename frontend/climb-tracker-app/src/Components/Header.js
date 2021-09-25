import axios from 'axios';
import { useHistory } from 'react-router';
import Link from 'react-router-dom/es/Link';
import { appName } from '../Constants';

export default function Header(props){
  const history = useHistory();
  
  let header = [
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
        <Link to="" className="header-item-right" onClick={logout}>{props.user.firstName} {props.user.lastName}</Link>
        :
        <Link to="login" className="header-item-right">Prijavi se</Link>
      }
      <div style={{clear: "both"}}></div>
    </div>
  );
}