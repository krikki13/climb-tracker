import logo from './logo.svg';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Route from "react-router-dom/es/Route";
import Link from 'react-router-dom/es/Link';
import Switch from 'react-router-dom/es/Switch';

import HomeView from './Components/HomeView';
import LoginView from './Components/LoginView';
import CreateAccountView from './Components/CreateAccountView';
import AccountCreated from './Components/AccountCreatedView';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/"
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginView} />
        <Route path='/createAccount' component={CreateAccountView} />
        <Route path='/accountCreated' component={AccountCreated} />
        <Route path='/' component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
