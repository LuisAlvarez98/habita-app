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
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ErrorComponent from "./views/ErrorComponent/ErrorComponent";
import HabitView from "./views/Dashboard/Habit/HabitView";

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
        <Router history={customHistory}>
          <Navbar />
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

              <PrivateRoute
                component={Dashboard}
                path="/dashboard"
              ></PrivateRoute>
              <PrivateRoute component={HabitView} path="/habits"></PrivateRoute>
              <Route path="*" exact={true} component={ErrorComponent} />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
