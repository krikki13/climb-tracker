import logo from './logo.svg';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Route from "react-router-dom/es/Route";
import Redirect from "react-router-dom/es/Redirect";
import Link from 'react-router-dom/es/Link';
import Switch from 'react-router-dom/es/Switch';

import HomeView from './Components/HomeView';
import LoginView from './Components/LoginView';
import CreateAccountView from './Components/CreateAccountView';
import AccountCreated from './Components/AccountCreatedView';
import CragListView from './Components/CragListView';
import axios from 'axios';
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import { appName } from './Constants';
import CountryListView from './Components/CountryListView';

function App() {
  const [user, setUser] = useState(undefined);

  axios.defaults.baseURL = "http://127.0.0.1:8000/"
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  const getLoggedInUser = () => {
    axios.get("users/whoami")
    .then(response => {  
      if(typeof response.data === 'object' && response.data.email) {
        setUser(response.data);
      }
    });
  };

  useEffect(() => {
    document.title = appName;

    getLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} onLogout={getLoggedInUser} />
      <div style={{paddingTop: "95px"}}>
      <Switch>
        <Route exact path='/login' render={props => <LoginView {...props} user={user} />} />
        <Route exact path='/createAccount' render={props => <CreateAccountView {...props} user={user} />} />
        <Route exact path='/accountCreated' render={props => <AccountCreated {...props} user={user} />} />
        <Route exact path='/countries' render={props => <CountryListView {...props} user={user} />} />
        <Route exact path='/crags' render={props => <CragListView {...props} user={user} />} />
        <Route exact path='/' render={props => <HomeView {...props} user ={user} />} />
        <Redirect from='/*' to='/' />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;