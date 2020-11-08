import React from "react";
import "./App.css";
import Home from "./views/Home";
import About from "./views/About";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "./views/Dashboard/Dashboard";
function App() {
  const customHistory = createBrowserHistory();

  return (
    <div className="App">
      <header className="App-header">
        <Router history={customHistory}>
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
