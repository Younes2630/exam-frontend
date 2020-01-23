import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import facade from "./ApiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    window.history.pushState("/");
  };

  const login = (user, password) => {
    facade
      .login(user, password)
      .then(res => setLoggedIn(true))
      .catch(err => console.log("Incorrect username or password"));
    window.history.pushState("/");
  };

  return (
    <div>
      <Router>
        <Route>
          <ul className="header">
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/readme">
                README
              </NavLink>
            </li>

            <li>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </Route>
      </Router>

      <ContentPaths />
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [userCreds, setUserCreds] = useState(init);

  const performLogin = evt => {
    evt.preventDefault();
    login(userCreds.username, userCreds.password);
  };

  const onChange = evt => {
    setUserCreds({
      ...userCreds,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}

const ContentPaths = ({ login, props }) => {
  return (
    <Router>
      {" "}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LogIn login={login} />
      </Route>
      {/* <Route path="/readme">
        <Readme />
      </Route> */}
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h3>Welcome</h3>
      
    </div>
  );
};



export default App;
