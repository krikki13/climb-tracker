import React from 'react';
import { useEffect, useState } from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Route from "react-router-dom/es/Route";
import Redirect from "react-router-dom/es/Redirect";
import Switch from 'react-router-dom/es/Switch';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { addDays } from 'date-fns';

import HomeView from './Components/HomeView';
import LoginView from './Components/LoginView';
import CreateAccountView from './Components/CreateAccountView';
import AccountCreated from './Components/AccountCreatedView';
import CragListView from './Components/CragListView';
import Header from './Components/Header';
import { appName } from './Constants';
import CountryListView from './Components/CountryListView';

export default function App() {
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken, removeCsrfToken] = useCookies(['csrftoken']);

  axios.defaults.baseURL = "http://127.0.0.1:8000/"
  axios.defaults.withCredentials = true;
  axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }

  const onLogin = (retrievedCsrfToken) => {
    var expiration = addDays(new Date(), 31);
    
    setCsrfToken("csrftoken", retrievedCsrfToken, { expires: expiration });    
    getLoggedInUser();
  };

  const getLoggedInUser = () => {
    axios.get("users/whoami")
    .then(response => {  
      if(typeof response.data === 'object' && response.data.email) {
        setUser(response.data);
      } else if (response.data === "No one") {
        setUser(undefined);
        removeCsrfToken('csrftoken');
      }
    });
  };

  axios.interceptors.request.use(config => {
      if(config.withCredentials && csrfToken?.csrftoken) {
        config.headers["X-CSRFTOKEN"] = csrfToken.csrftoken;
      }
      return config;
  });

  useEffect(() => {
    document.title = appName;

    getLoggedInUser();
  }, []);

  return (
    <div style={{position: "fixed", width: "100%", height: "100%", top: "0"}}>
    <BrowserRouter>
      <Header user={user} onLogout={getLoggedInUser} />
      <div className="body">
      <Switch>
        <Route exact path='/login' render={props => <LoginView {...props} user={user} onLogin={onLogin} />} />
        <Route exact path='/createAccount' render={props => <CreateAccountView {...props} user={user} />} />
        <Route exact path='/accountCreated' render={props => <AccountCreated {...props} user={user} />} />
        <Route exact path='/countries' render={props => <CountryListView {...props} user={user} />} />
        <Route exact path='/crags' render={props => <CragListView {...props} user={user} />} />
        <Route exact path='/' render={props => <HomeView {...props} user ={user} />} />
        <Redirect from='/*' to='/' />
      </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}