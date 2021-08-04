import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Load from "./components/Load";
import Register from "./components/Register";
import LogIn from "./components/LogIn"
import Notes from "./components/Notes";

function App() {
  return (
    <div> 
      <Router>
        <Switch>
          <Route exact path='/' component={Load}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={LogIn}/>
          <Route exact path='/home' component={Notes}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
