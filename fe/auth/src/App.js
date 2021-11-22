import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import SuccessPage from './components/successPage';
import './App.css';


class App extends React.Component {

  render(){
  return (
    <React.Fragment>
    <main className="container">
      <Switch>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/successPage" component={SuccessPage}></Route>
        <Redirect from="/" exact to="/login" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
    </React.Fragment>

  );
  }
}

export default App;
