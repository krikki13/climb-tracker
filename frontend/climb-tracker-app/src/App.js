import logo from './logo.svg';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Route from "react-router-dom/es/Route";
import Link from 'react-router-dom/es/Link';
import Switch from 'react-router-dom/es/Switch';

import HomeView from './Components/HomeView';
import LoginView from './Components/LoginView';
import CreateAccountView from './Components/CreateAccountView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginView} />
        <Route path='/createAccount' component={CreateAccountView} />
        <Route path='/' component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;