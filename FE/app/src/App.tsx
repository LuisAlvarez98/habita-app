import React from "react";
import "./App.css";
import Home from "./views/Home";
import About from "./views/About";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "./views/Dashboard/Dashboard";
import Background from "./img/bg-img.jpg";
import Navbar from "./views/Navbar/Navbar";

function App() {
  const customHistory = createBrowserHistory();

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(24,160,251,0), rgba(24,160,251,0.75)),url(${Background})`,
        objectFit: "cover",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="App"
    >
      <header className="App-header">
        {/*This navbar must be modified for private routes and not private routes*/}
        <Navbar />
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
