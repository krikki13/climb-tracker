import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'react-router-dom/es/Link';
import '../index.css';


function HomeView() {
  const [user, setUser] = useState(undefined);

  var header = [
    {label: "Slovenska plezališča", link: "", class: "header-item-left"},
    {label: "Tuja plezališča", link: "", class: "header-item-left"},
    {label: "Plezalni dnevnik", link: "", class: "header-item-left"}
  ];

  useEffect(() => {
    axios.get("users/whoami")
    .then(response => {
      if(typeof response.data === 'object' && response.data.email) {
        setUser(response.data);
      }
    })
  }, []);

  return (
    <div className="App">
      <div className="header">
        {header.map(item => <Link to={item.link} class={item.class}>{item.label}</Link>)}

        {user ? 
          <Link to="" className="header-item-right">{user.firstName}</Link>
          :
          <Link to="login" className="header-item-right">Prijavi se</Link>
        }
        <div style={{clear: "both"}}></div>
      </div>
    </div>
  );
}

export default HomeView;
