import './App.css';
import Login from '../Account/Login/Login';
import Register from '../Account/Register/Register';
import MediphorsForm from '../Mediphors/Mediphors/MediphorsForm/MediphorsForm';
import Mediphors from '../Mediphors/Mediphors/Mediphors';
import Navbar from '../Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react'
import useToken from '../Account/Login/useToken'
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return (
    <BrowserRouter>
      <Navbar className="m-2" type="login"/>
      <Switch>
        <Route path="/login"><Login setToken={setToken}/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/"><Mediphors loggedIn='false'/></Route>
      </Switch>
    </BrowserRouter>)
  }

  return(
      <BrowserRouter>
        <Navbar className="m-2" type="app"/>
        <Switch>
          <Route path="/form"><MediphorsForm/></Route>
          <Route path="/"><Mediphors loggedIn='true'/></Route>
        </Switch>
      </BrowserRouter>
  )
}

export default App;
