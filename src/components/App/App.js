import './App.css';
import Login from '../Account/Login/Login';
import Register from '../Account/Register/Register';
import MediphorsForm from '../Mediphors/MediphorsForm/MediphorsForm';
import MediphorList from '../Mediphors/List/MediphorList';
import Navbar from '../Navbar/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react'
import useToken from '../Account/Login/useToken'
import 'font-awesome/css/font-awesome.min.css';
import Mediphor from '../Mediphors/Mediphors/Mediphor';

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return (
    <BrowserRouter>
      <Navbar className="m-2" type="login"/>
      <Switch>
        <Route path="/login"><Login setToken={setToken}/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/mediphor/:imageURL"><Mediphor/></Route>
        <Route path="/"><MediphorList loggedIn='false'/></Route>
      </Switch>
    </BrowserRouter>)
  }

  return(
      <BrowserRouter>
        <Navbar className="m-2" type="app" setToken={setToken}/>
        <Switch>
          <Route path="/form"><MediphorsForm/></Route>
          <Route path="/mediphor/:imageURL"><Mediphor/></Route>
          <Route path="/"><MediphorList loggedIn='true'/></Route>
        </Switch>
      </BrowserRouter>
  )
}

export default App;
