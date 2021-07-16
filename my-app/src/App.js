import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Load from "./components/Load";
import Register from "./components/Register";
import LogIn from "./components/LogIn"
import Home from './components/Home'

function App() {
  return (
    <div> 
      <Router>
        <Switch>
          <Route path='/load'>
            <Load />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <LogIn/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
